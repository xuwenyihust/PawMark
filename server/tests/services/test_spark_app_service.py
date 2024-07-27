import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.spark_app import SparkAppModel
from app.models.notebook import NotebookModel
from app.models.user import UserModel
from app.models.notebook_spark_app import NotebookSparkAppModel
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
      user_0 = UserModel(name='testuser0', email='testuser0@example.com')
      password = 'test_password'
      user_0.set_password(password)
      db.session.add(user_0)
      db.session.commit()

      # Create notebook
      response_0 = Notebook.create_notebook_with_init_cells(notebook_name='Test Notebook', notebook_path='')
      notebook_dict = json.loads(response_0.data.decode('utf8'))
      notebook_path = notebook_dict['path']

      # Create spark app
      response_1 = SparkApp.create_spark_app(spark_app_id='1234', notebook_path=notebook_path)
      spark_app_dict = json.loads(response_1.data)
      self.assertEqual(spark_app_dict['spark_app_id'], '1234')

      # Check that spark app is in the database
      spark_app = SparkAppModel.query.filter_by(spark_app_id='1234').first()
      self.assertIsNotNone(spark_app)

      # Check that spark app id is associated with the notebook id
      notebook = NotebookModel.query.filter_by(path=notebook_path).first()
      notebook_id = notebook.id
      notebook_spark_app = NotebookSparkAppModel.query \
        .filter_by(notebook_id=notebook_id, spark_app_id='1234') \
        .first()
      
      self.assertIsNotNone(notebook_spark_app)