import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.spark_app import SparkAppModel
from app.services.notebook import Notebook
from app.services.spark_app import SparkApp
import json

class SparkAppServiceTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.client = self.app.test_client()
    with self.app.app_context():
      db.create_all()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def test_create_spark_app(self):
    with self.app.app_context():
      # Create notebook
      notebook = Notebook.create_notebook_with_init_cells(notebook_name='Test Notebook', notebook_path='/path/to/notebook')
      notebook_dict = json.loads(notebook.data)
      notebook_path = notebook_dict['path']

      # Create spark app
      spark_app = SparkApp.create_spark_app(spark_app_id='1234', notebook_path=notebook_path)
      spark_app_dict = json.loads(spark_app.data)
      self.assertEqual(spark_app_dict['spark_app_id'], '1234')
      self.assertEqual(spark_app_dict['notebook_path'], notebook_path)

      # Check that spark app id is in the notebook
      notebook = Notebook.get_notebook_by_path(notebook_path)
      notebook_dict = json.loads(notebook.data)
      self.assertEqual(notebook_dict['spark_app_id'], '1234')