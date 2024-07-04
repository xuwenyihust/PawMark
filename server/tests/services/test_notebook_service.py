import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.notebook import NotebookModel
from app.services.notebook import Notebook
import json

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
      notebook_0 = NotebookModel(name='Notebook0', path='path_to_notebook0')
      db.session.add(notebook_0)

      notebook_1 = NotebookModel(name='Notebook1', path='path_to_notebook1')
      db.session.add(notebook_1)

      db.session.commit()

      notebooks = json.loads(Notebook.get_all_notebooks())
      self.assertEqual(len(notebooks), 2)
      self.assertEqual(notebooks[0]['name'], 'Notebook0')
      self.assertEqual(notebooks[0]['path'], 'path_to_notebook0')
      self.assertEqual(notebooks[1]['name'], 'Notebook1')
      self.assertEqual(notebooks[1]['path'], 'path_to_notebook1')

  def test_create_and_get_notebook(self):
    with self.app.app_context():
      Notebook.create_notebook_with_init_cells(notebook_name='Notebook.ipynb', notebook_path='')

      notebooks = Notebook.get_notebook_by_path(notebook_path='work/Notebook.ipynb')[0]
      status_code = Notebook.get_notebook_by_path(notebook_path='work/Notebook.ipynb')[1]

      self.assertEqual(status_code, 200)
      self.assertEqual(len(notebooks), 1)
      self.assertEqual(notebooks['name'], 'Notebook.ipynb')
      self.assertEqual(notebooks['path'], 'work/Notebook.ipynb')
      