import unittest
import json
from flask_cors import CORS
from flask import g
from database import db
from run import create_app
from app.routes.notebook import notebook_blueprint
from app.routes.login import login_blueprint
from app.services.directory import Directory
from app.models.user import UserModel
from app.services.user import User
from app.models.spark_app import SparkAppModel
from app.models.notebook import NotebookModel


class NotebookRouteTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.app.register_blueprint(notebook_blueprint)
    self.app.register_blueprint(login_blueprint)
    self.client = self.app.test_client()
    with self.app.app_context():
      db.create_all()
      user = UserModel(name='test_user', email='test_email')
      user.set_password('test_password')
      db.session.add(user)
      db.session.commit()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def login_and_get_token(self):
    with self.app.app_context():
      response = self.client.post('/login', auth=('test_user', 'test_password'))
      return json.loads(response.data)['access_token']

  def test_get_all_notebooks(self):
    with self.app.app_context():
      path = '/notebook/all'
      token = self.login_and_get_token()
      headers = {
        'Authorization': f'Bearer {token}',
      }
      response = self.client.get(
        path,
        headers=headers
      )
      self.assertEqual(response.status_code, 200)

  def test_get_all_notebooks_without_auth(self):
    with self.app.app_context():
      path = '/notebook/all'
      response = self.client.get(
        path
      )
      self.assertEqual(response.status_code, 401)

  def test_get_all_notebooks_with_invalid_auth(self):
    with self.app.app_context():
      path = '/notebook/all'
      response = self.client.get(
        path,
        headers={
          'Authorization': 'Bearer invalid_token'
        }
      )
      self.assertEqual(response.status_code, 422)

  def test_get_notebook_by_path(self):
    with self.app.app_context():
      g.user = User.get_mock_user()

      # Create directory
      response_1 = Directory.create_directory('work/test_get_notebook_by_path_directory')
      self.assertEqual(response_1.status_code, 201)

      # Create notebook
      token = self.login_and_get_token()
      headers = {
        'Authorization': f'Bearer {token}',
      }
      data = {
        "name": "test_notebook",
        "path": "work/test_get_notebook_by_path_directory"
      }
      response_2 = self.client.post('/notebook', json=data, headers=headers)
      self.assertEqual(response_2.status_code, 200)

      # Get notebook
      response_3 = self.client.get('/notebook/work/test_get_notebook_by_path_directory/test_notebook.ipynb', headers=headers)
      self.assertEqual(response_3.status_code, 200)
      self.assertEqual(json.loads(response_3.data)["name"], 'test_notebook.ipynb')
      self.assertEqual(json.loads(response_3.data)["path"], 'work/test_get_notebook_by_path_directory/test_notebook.ipynb')

  def test_create_notebook(self):
    with self.app.app_context():
      g.user = User.get_mock_user()

      # Create directory
      response_1 = Directory.create_directory('work/test_create_notebook_directory')
      self.assertEqual(response_1.status_code, 201)

      # Create notebook
      token = self.login_and_get_token()
      headers = {
        'Authorization': f'Bearer {token}',
      }
      data = {
        "name": "test_notebook",
        "path": "work/test_create_notebook_directory"
      }
      response_2 = self.client.post('/notebook', json=data, headers=headers)
      self.assertEqual(response_2.status_code, 200)
      self.assertEqual(json.loads(response_2.data)["name"], 'test_notebook.ipynb')
      self.assertEqual(json.loads(response_2.data)["path"], 'work/test_create_notebook_directory/test_notebook.ipynb')

  def test_update_notebook(self):
    with self.app.app_context():
      g.user = User.get_mock_user()

      # Create directory
      response_1 = Directory.create_directory('work/test_update_notebook_directory')
      self.assertEqual(response_1.status_code, 201)

      # Create notebook
      token = self.login_and_get_token()
      headers = {
        'Authorization': f'Bearer {token}',
      }
      data = {
        "name": "test_notebook",
        "path": "work/test_update_notebook_directory"
      }
      response_2 = self.client.post('/notebook', json=data, headers=headers)
      self.assertEqual(response_2.status_code, 200)

      # Update notebook
      data = {
        "content": {
          "metadata": {
              "language_info": {
                  "name": "python",
                  "version": "3.8.5",
              }
          },
          "nbformat": 4,
          "nbformat_minor": 4,
          "cells": [
            {
              "cell_type": "code",
              "execution_count": 1,
              "metadata": {},
              "outputs": [],
              "source": "print('Hello, World!')"
            }
          ]
        }
      }
      response_3 = self.client.put('/notebook/work/test_update_notebook_directory/test_notebook.ipynb', json=data, headers=headers)
      self.assertEqual(response_3.status_code, 200)

      # Check if notebook is updated
      response_4 = self.client.get('/notebook/work/test_update_notebook_directory/test_notebook.ipynb', headers=headers)
      self.assertEqual(response_4.status_code, 200)
      self.assertEqual(json.loads(response_4.data)["content"]["cells"][0]["source"], "print('Hello, World!')")
      
  def test_delete_notebook(self):
    with self.app.app_context():
      g.user = User.get_mock_user()

      # Create directory
      response_1 = Directory.create_directory('work/test_delete_notebook_directory')
      self.assertEqual(response_1.status_code, 201)

      # Create notebook
      token = self.login_and_get_token()
      headers = {
        'Authorization': f'Bearer {token}',
      }
      data = {
        "name": "test_notebook",
        "path": "work/test_delete_notebook_directory"
      }
      response_2 = self.client.post('/notebook', json=data, headers=headers)
      self.assertEqual(response_2.status_code, 200)

      # Delete notebook
      response_3 = self.client.delete('/notebook/work/test_delete_notebook_directory/test_notebook.ipynb', headers=headers)
      self.assertEqual(response_3.status_code, 200)

      # Check if notebook is deleted
      response_4 = self.client.get('/notebook/work/test_delete_notebook_directory/test_notebook.ipynb', headers=headers)
      self.assertEqual(response_4.status_code, 404) 

  def test_rename_or_move_notebook(self):
    with self.app.app_context():
      g.user = User.get_mock_user()

      # Create directory
      response_1 = Directory.create_directory('work/test_rename_or_move_notebook_directory')
      self.assertEqual(response_1.status_code, 201)

      # Create notebook
      token = self.login_and_get_token()
      headers = {
        'Authorization': f'Bearer {token}',
      }
      data = {
        "name": "test_notebook",
        "path": "work/test_rename_or_move_notebook_directory"
      }
      response_2 = self.client.post('/notebook', json=data, headers=headers)
      self.assertEqual(response_2.status_code, 200)

      # Rename notebook
      data = {
        "newName": "new_test_notebook.ipynb"
      }
      response_3 = self.client.patch('/notebook/work/test_rename_or_move_notebook_directory/test_notebook.ipynb', json=data, headers=headers)
      self.assertEqual(response_3.status_code, 200)

      # Check if notebook is renamed
      response_4 = self.client.get('/notebook/work/test_rename_or_move_notebook_directory/new_test_notebook.ipynb', headers=headers)
      self.assertEqual(response_4.status_code, 200)

      # Move notebook
      data = {
        "newPath": "work/new_test_notebook.ipynb"
      }
      response_5 = self.client.patch('/notebook/work/test_rename_or_move_notebook_directory/new_test_notebook.ipynb', json=data, headers=headers)
      self.assertEqual(response_5.status_code, 200)

      # Check if notebook is moved
      response_6 = self.client.get('/notebook/work/new_test_notebook.ipynb', headers=headers)
      self.assertEqual(response_6.status_code, 200)

  def test_get_spark_app_by_notebook_path(self):
    with self.app.app_context():
      g.user = User.get_mock_user()

      # Create directory
      response_1 = Directory.create_directory('work/test_get_spark_app_by_notebook_path_directory')
      self.assertEqual(response_1.status_code, 201)

      # Create notebook
      token = self.login_and_get_token()
      headers = {
        'Authorization': f'Bearer {token}',
      }
      data = {
        "name": "test_notebook",
        "path": "work/test_get_spark_app_by_notebook_path_directory"
      }
      response_2 = self.client.post('/notebook', json=data, headers=headers)
      self.assertEqual(response_2.status_code, 200)

      # Get notebook id
      notebook = NotebookModel.query.filter_by(path='work/test_get_spark_app_by_notebook_path_directory/test_notebook.ipynb').first()

      # Create spark app
      spark_app = SparkAppModel(
        spark_app_id='1234', 
        notebook_id=notebook.id,
        user_id=g.user.id,
        created_at='2021-01-01 00:00:00')
      
      db.session.add(spark_app)
      db.session.commit()

      # Get spark app by notebook path
      response_3 = self.client.get('/notebook/spark_app/work/test_get_spark_app_by_notebook_path_directory/test_notebook.ipynb', headers=headers)
      self.assertEqual(response_3.status_code, 200)   