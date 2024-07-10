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

      print(">>>>>>>")
      print(response_0.data)

      # Create session

