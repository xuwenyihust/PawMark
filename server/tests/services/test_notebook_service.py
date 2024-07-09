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

      response = Notebook.get_all_notebooks()
      notebooks = json.loads(response.data)
      self.assertEqual(len(notebooks), 2)
      self.assertEqual(notebooks[0]['name'], 'Notebook0')
      self.assertEqual(notebooks[0]['path'], 'path_to_notebook0')
      self.assertEqual(notebooks[1]['name'], 'Notebook1')
      self.assertEqual(notebooks[1]['path'], 'path_to_notebook1')

  def test_create_and_get_notebook(self):
    with self.app.app_context():
      # Create with name but without path & get by path
      create_response_0 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook.ipynb', notebook_path='')
      self.assertEqual(create_response_0.status_code, 200)

      get_response_0 = Notebook.get_notebook_by_path(notebook_path='work/Notebook.ipynb')
      
      print(get_response_0)
      print(get_response_0.data)
      
      notebook_0 = json.loads(get_response_0.data)
      status_code_0 = get_response_0.status_code

      self.assertEqual(status_code_0, 200)
      self.assertEqual(notebook_0['name'], 'Notebook.ipynb')
      self.assertEqual(notebook_0['path'], 'work/Notebook.ipynb')
      self.assertEqual(len(notebook_0['content']['cells']), 2)

      # Create without name / path & get by path
      create_response_1 = Notebook.create_notebook_with_init_cells(notebook_name='', notebook_path='')
      self.assertEqual(create_response_1.status_code, 200)
      
      notebook_1 = json.loads(create_response_1.data)
      notebook_name_1 = notebook_1[0]['name']
      notebook_path_1 = notebook_1[0]['path']

      self.assertTrue(notebook_name_1.startswith('notebook_'))
      self.assertTrue(notebook_name_1.endswith('.ipynb'))
      self.assertEqual('work/' + notebook_name_1, notebook_path_1)

      get_response_1 = Notebook.get_notebook_by_path(notebook_path=notebook_path_1)
      notebook_1 = json.loads(get_response_1.data)[0]
      status_code_1 = get_response_1.status_code

      self.assertEqual(status_code_1, 200)
      self.assertEqual(notebook_1['name'], notebook_name_1)
      self.assertEqual(notebook_1['path'], notebook_path_1)
      self.assertEqual(len(notebook_1['content']['cells']), 2)

      # Create with name / path & get by path

      # Get non-exist path
      get_response_3 = Notebook.get_notebook_by_path(notebook_path='work/Notebook666.ipynb')
      status_code_3 = get_response_3.status_code

      self.assertEqual(status_code_3, 404)

  def test_delete_notebook(self):
    pass

  def test_rename_notebook(self):
    pass
      