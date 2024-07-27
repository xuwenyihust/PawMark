import unittest
from flask_cors import CORS
from flask import g
from run import create_app
from database import db
import json
from app.services.session import Session
from app.services.notebook import Notebook
from app.models.user import UserModel


class SessionServiceTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.client = self.app.test_client()
    with self.app.app_context():
      db.create_all()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def test_get_all_sessions(self):
    with self.app.app_context():
      user = UserModel(name='testuser0', email='testuser0@example.com')
      password = 'test_password'
      user.set_password(password)
      db.session.add(user)
      db.session.commit()
      g.user = user

      # Create Notebook
      response_0 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook_0.ipynb', notebook_path='')
      self.assertEqual(response_0.status_code, 200)

      notebook_0 = json.loads(response_0.data.decode('utf-8'))
      notebook_path_0 = notebook_0['path']

      # Create session
      response_1 = Session.create_session(notebook_path_0)
      self.assertEqual(response_1.status_code, 200)

      # Create Notebook
      response_1 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook_1.ipynb', notebook_path='')
      self.assertEqual(response_1.status_code, 200)

      notebook_1 = json.loads(response_1.data.decode('utf-8'))
      notebook_path_1 = notebook_1['path']

      # Create session
      response_2 = Session.create_session(notebook_path_1)
      self.assertEqual(response_2.status_code, 200)

      # Get all sessions
      response_3 = Session.get_all_sessions()
      self.assertEqual(response_3.status_code, 200)
      sessions = json.loads(response_3.data.decode('utf-8'))

      session_0 = [x for x in sessions if x["path"] == notebook_path_0]
      session_1 = [x for x in sessions if x["path"] == notebook_path_1]

      self.assertEqual(len(session_0), 1)
      self.assertEqual(len(session_1), 1)

  def test_get_session_by_path(self):
    with self.app.app_context():
      user = UserModel(name='testuser0', email='testuser0@example.com')
      password = 'test_password'
      user.set_password(password)
      db.session.add(user)
      db.session.commit()
      g.user = user

      # Create Notebook
      response_0 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook_0.ipynb', notebook_path='')
      self.assertEqual(response_0.status_code, 200)

      notebook_0 = json.loads(response_0.data.decode('utf-8'))
      notebook_path_0 = notebook_0['path']

      # Create session
      response_1 = Session.create_session(notebook_path_0)
      self.assertEqual(response_1.status_code, 200)

      # Create Notebook
      response_1 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook_1.ipynb', notebook_path='')
      self.assertEqual(response_1.status_code, 200)

      notebook_1 = json.loads(response_1.data.decode('utf-8'))
      notebook_path_1 = notebook_1['path']

      # Create session
      response_2 = Session.create_session(notebook_path_1)
      self.assertEqual(response_2.status_code, 200)

      # Get session by path
      response_3 = Session.get_session_by_path(notebook_path_0)
      self.assertEqual(response_3.status_code, 200)
      session_0 = json.loads(response_3.data.decode('utf-8'))

      response_4 = Session.get_session_by_path(notebook_path_1)
      self.assertEqual(response_4.status_code, 200)
      session_1 = json.loads(response_4.data.decode('utf-8'))

      response_5 = Session.get_session_by_path("fake_path")
      self.assertEqual(response_5.status_code, 404)

      self.assertEqual(session_0["path"], notebook_path_0)
      self.assertEqual(session_1["path"], notebook_path_1)  

  def test_create_session(self):
    with self.app.app_context():
      user = UserModel(name='testuser0', email='testuser0@example.com')
      password = 'test_password'
      user.set_password(password)
      db.session.add(user)
      db.session.commit()
      g.user = user
      
      # Create Notebook
      response_0 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook.ipynb', notebook_path='')
      self.assertEqual(response_0.status_code, 200)

      notebook = json.loads(response_0.data.decode('utf-8'))
      notebook_path = notebook['path']

      # Create session
      response_1 = Session.create_session(notebook_path)
      self.assertEqual(response_1.status_code, 200)

      session = json.loads(response_1.data.decode('utf-8'))
      self.assertIsNotNone(session["id"])
      self.assertIsNotNone(session["kernel"]["id"])
      self.assertEquals(session["kernel"]["name"], "python3")

