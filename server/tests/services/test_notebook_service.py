import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.notebook import NotebookModel
from app.services.notebook import Notebook

class NotebookServiceTestCase(unittest.TestCase):

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
      notebook = NotebookModel(name='Test Notebook', path='/path/to/notebook')
      db.session.add(notebook)
      db.session.commit()

      notebooks = Notebook.get_all_notebooks()
      self.assertEqual(len(notebooks), 1)
      self.assertEqual(notebooks[0].name, 'Test Notebook')
      self.assertEqual(notebooks[0].path, '/path/to/notebook')