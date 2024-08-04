import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.spark_app import SparkAppModel
from app.models.notebook import NotebookModel
from app.models.user import UserModel
import datetime

class SparkAppModelTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_spark_app_model(self):
        with self.app.app_context():
            # Create user first
            user = UserModel(name='testuser', email='testuser@example.com')
            password = 'test_password'
            user.set_password(password)
            db.session.add(user)
            db.session.commit()

            # Create notebook
            notebook = NotebookModel(name='Test Notebook', path='Test Path', user_id=user.id)
            db.session.add(notebook)
            db.session.commit()

            spark_app = SparkAppModel(
                spark_app_id='spark_app0000', 
                notebook_id=notebook.id,
                user_id=user.id,
                created_at='2021-01-01 00:00:00')
            db.session.add(spark_app)
            db.session.commit()

            spark_app_dict = spark_app.to_dict()
            self.assertEqual(spark_app_dict['spark_app_id'], 'spark_app0000')
            self.assertEqual(spark_app_dict['notebook_id'], notebook.id)
            self.assertEqual(spark_app_dict['user_id'], user.id)
            self.assertEqual(spark_app_dict['status'], None)
            self.assertEqual(spark_app_dict['created_at'], '2021-01-01 00:00:00')