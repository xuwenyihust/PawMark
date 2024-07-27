import unittest
import json
from flask_cors import CORS
from database import db
from run import create_app
from app.routes.notebook import notebook_blueprint
from app.services.directory import Directory

class NotebookRouteTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.app.register_blueprint(notebook_blueprint)
    self.client = self.app.test_client()
    with self.app.app_context():
      db.create_all()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def test_get_all_notebooks(self):
    with self.app.app_context():
      response = self.client.get('/notebook/all')
      self.assertEqual(response.status_code, 200)

  def test_create_notebook(self):
    with self.app.app_context():

      # Create directory
      response_1 = Directory.create_directory('work/test_create_notebook_directory')
      self.assertEqual(response_1.status_code, 201)

      # Create notebook
      data = {
        "name": "test_notebook",
        "path": "work/test_create_notebook_directory"
      }
      response_2 = self.client.post('/notebook', json=data)
      self.assertEqual(response_2.status_code, 200)
      self.assertEqual(len(json.loads(response_2.data)["name"]), 'test_notebook.ipynb')
      self.assertEqual(len(json.loads(response_2.data)["path"]), 'work/test_create_notebook_directory/test_notebook.ipynb')