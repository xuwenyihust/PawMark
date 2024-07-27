import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.notebook_spark_app import NotebookSparkAppModel
from app.models.notebook import NotebookModel
from app.models.spark_app import SparkAppModel
from app.models.user import UserModel

class NotebookSparkAppModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_notebook_spark_app_model(self):
        with self.app.app_context():
            user = UserModel(name='testuser', email='testuser@example.com')
            password = 'test_password'
            user.set_password(password)
            db.session.add(user)
            db.session.commit()

            notebook = NotebookModel(name='Test Notebook', path='', user_id=user.id)
            db.session.add(notebook)
            db.session.commit()

            spark_app = SparkAppModel(spark_app_id='Test Spark App')
            db.session.add(spark_app)
            db.session.commit()

            notebook_spark_app = NotebookSparkAppModel(notebook_id=notebook.id, spark_app_id='Test Spark App')
            db.session.add(notebook_spark_app)
            db.session.commit()

            self.assertIsNotNone(notebook_spark_app.id)
            self.assertEqual(notebook_spark_app.notebook_id, 1)
            self.assertEqual(notebook_spark_app.spark_app_id, 'Test Spark App')

            notebook_spark_app_dict = notebook_spark_app.to_dict()
            self.assertEqual(notebook_spark_app_dict, {
                'id': notebook_spark_app.id,
                'notebook_id': 1,
                'spark_app_id': 'Test Spark App'
            })
