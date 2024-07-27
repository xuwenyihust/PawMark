import unittest
from flask_cors import CORS
from database import db
from run import create_app

class NotebookRouteTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.client = self.app.test_client()
    with self.app.app_context():
      db.create_all()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def test_get_all_notebooks(self):
    with self.app.app_context():
      print(self.app.url_map) # This will print all the routes registered with the app
      response = self.client.get('/notebook/all')
      print(response.data)
      self.assertEqual(response.status_code, 200)