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
      response_0 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook.ipynb', notebook_path='')
      self.assertEqual(response_0.status_code, 200)

      response_1 = Notebook.get_notebook_by_path(notebook_path='work/Notebook.ipynb')
      
      notebook_1 = json.loads(response_1.data.decode('utf-8'))
      status_code_1 = response_1.status_code

      self.assertEqual(status_code_1, 200)
      self.assertEqual(notebook_1['name'], 'Notebook.ipynb')
      self.assertEqual(notebook_1['path'], 'work/Notebook.ipynb')
      self.assertEqual(len(notebook_1['content']['cells']), 2)

      # Create without name / path & get by path
      response_2 = Notebook.create_notebook_with_init_cells(notebook_name='', notebook_path='')
      self.assertEqual(response_2.status_code, 200)
      
      notebook_2 = json.loads(response_2.data.decode('utf-8'))
      notebook_name_2 = notebook_2['name']
      notebook_path_2 = notebook_2['path']

      self.assertTrue(notebook_name_2.startswith('notebook_'))
      self.assertTrue(notebook_name_2.endswith('.ipynb'))
      self.assertEqual('work/' + notebook_name_2, notebook_path_2)

      response_3 = Notebook.get_notebook_by_path(notebook_path=notebook_path_2)
      notebook_3 = json.loads(response_3.data.decode('utf-8'))
      status_code_3 = response_3.status_code

      self.assertEqual(status_code_3, 200)
      self.assertEqual(notebook_3['name'], notebook_name_2)
      self.assertEqual(notebook_3['path'], notebook_path_2)
      self.assertEqual(len(notebook_3['content']['cells']), 2)

      # Get non-exist path
      get_response_3 = Notebook.get_notebook_by_path(notebook_path='work/Notebook666.ipynb')
      status_code_3 = get_response_3.status_code

      self.assertEqual(status_code_3, 404)

      # Create with name / path & get by path
      response_4 = Notebook.create_notebook_with_init_cells(notebook_name='NotebookWithPath.ipynb', notebook_path='work')
      self.assertEqual(response_4.status_code, 200)
      
      notebook_4 = json.loads(response_4.data.decode('utf-8'))
      notebook_name_4 = notebook_4['name']
      notebook_path_4 = notebook_4['path']

      self.assertEqual('NotebookWithPath.ipynb', notebook_name_4)
      self.assertEqual('work/NotebookWithPath.ipynb', notebook_path_4)

      response_5 = Notebook.get_notebook_by_path(notebook_path=notebook_path_4)
      notebook_5 = json.loads(response_5.data.decode('utf-8'))
      status_code_5 = response_5.status_code

      self.assertEqual(status_code_5, 200)
      self.assertEqual(notebook_5['name'], notebook_name_4)
      self.assertEqual(notebook_5['path'], notebook_path_4)
      self.assertEqual(len(notebook_5['content']['cells']), 2)

  def test_delete_notebook(self):
    with self.app.app_context():
      # Create Notebook
      response_0 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook.ipynb', notebook_path='work')
      self.assertEqual(response_0.status_code, 200)

      # Delete Notebook
      response_1 = Notebook.delete_notebook_by_path(notebook_path='work/Notebook.ipynb')
      self.assertEqual(response_1.status_code, 200)

      # Get Notebook
      response_2 = Notebook.get_notebook_by_path(notebook_path='work/Notebook.ipynb')
      self.assertEqual(response_2.status_code, 404)

      notebook_1 = NotebookModel.query.filter_by(path='work/Notebook.ipynb').first()
      self.assertIsNone(notebook_1)

      # Delete non-exist Notebook
      response_3 = Notebook.delete_notebook_by_path(notebook_path='work/Notebook666.ipynb')
      self.assertEqual(response_3.status_code, 404)

  def test_rename_notebook(self):
    with self.app.app_context():
      # Create Notebook
      response_0 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook.ipynb', notebook_path='work')
      self.assertEqual(response_0.status_code, 200)

      # Rename Notebook
      response_1 = Notebook.rename_notebook_by_path(notebook_path='work/Notebook.ipynb', new_notebook_name='NewNotebook.ipynb')
      self.assertEqual(response_1.status_code, 200)
      self.assertEqual(json.loads(response_1.data)['message'], 'Notebook renamed')

      # Get Notebook
      response_2 = Notebook.get_notebook_by_path(notebook_path='work/NewNotebook.ipynb')
      self.assertEqual(response_2.status_code, 200)
      self.assertEqual(json.loads(response_2.data)['name'], 'NewNotebook.ipynb')
      self.assertEqual(json.loads(response_2.data)['path'], 'work/NewNotebook.ipynb')

      notebook_1 = NotebookModel.query.filter_by(path='work/Notebook.ipynb').first()
      self.assertIsNone(notebook_1)

      notebook_2 = NotebookModel.query.filter_by(path='work/NewNotebook.ipynb').first()
      self.assertIsNotNone(notebook_2)
      self.assertEqual(notebook_2.name, 'NewNotebook.ipynb')
      self.assertEqual(notebook_2.path, 'work/NewNotebook.ipynb')

      # Rename non-exist Notebook
      