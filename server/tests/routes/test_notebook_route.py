import unittest
from flask_cors import CORS
from database import db
from run import create_app
from app.routes.notebook import notebook_blueprint

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
      data = {
        "name": "test_notebook",
        "path": "test_path"
      }
      response = self.client.post('/notebook', json=data)
      print(response.data)
      self.assertEqual(response.status_code, 200)