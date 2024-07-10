import unittest
from flask_cors import CORS
from run import create_app
import json
from app.services.session import Session
from app.services.notebook import Notebook


class SessionServiceTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.client = self.app.test_client()
    
  def test_create_session(self):
    with self.app.app_context():
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

