import unittest
import json
from flask_cors import CORS
from database import db
from run import create_app
from app.routes.notebook import notebook_blueprint
from app.services.directory import Directory
from app.models.user import UserModel

class NotebookRouteTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.app.register_blueprint(notebook_blueprint)
    self.client = self.app.test_client()
    with self.app.app_context():
      user = UserModel(name='test_user', email='test_email')
      user.set_password('test_password')
      db.session.add(user)
      db.session.commit()
      db.create_all()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def test_get_all_notebooks(self):
    with self.app.app_context():
      path = '/notebook/all'
      auth = ('test_user', 'test_password')
      response = self.client.get(
        path,
        auth=auth
      )
      print(response.data)
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
      self.assertEqual(json.loads(response_2.data)["name"], 'test_notebook.ipynb')
      self.assertEqual(json.loads(response_2.data)["path"], 'work/test_create_notebook_directory/test_notebook.ipynb')

  def test_get_notebook_by_path(self):
    with self.app.app_context():
      # Create directory
      response_1 = Directory.create_directory('work/test_get_notebook_by_path_directory')
      self.assertEqual(response_1.status_code, 201)

      # Create notebook
      data = {
        "name": "test_notebook",
        "path": "work/test_get_notebook_by_path_directory"
      }
      response_2 = self.client.post('/notebook', json=data)
      self.assertEqual(response_2.status_code, 200)

      # Get notebook
      response_3 = self.client.get('/notebook/work/test_get_notebook_by_path_directory/test_notebook.ipynb')
      self.assertEqual(response_3.status_code, 200)
      self.assertEqual(json.loads(response_3.data)["name"], 'test_notebook.ipynb')
      self.assertEqual(json.loads(response_3.data)["path"], 'work/test_get_notebook_by_path_directory/test_notebook.ipynb')
