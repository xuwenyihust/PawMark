# test_notebook_model.py
import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.notebook import NotebookModel

class NotebookModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_notebook_model(self):
        with self.app.app_context():
            notebook = NotebookModel(name='Test Notebook', path='/path/to/notebook')
            db.session.add(notebook)
            db.session.commit()

            self.assertIsNotNone(notebook.id)
            self.assertEqual(notebook.name, 'Test Notebook')
            self.assertEqual(notebook.path, '/path/to/notebook')

            notebook_dict = notebook.to_dict()
            self.assertEqual(notebook_dict, {
                'id': notebook.id,
                'name': 'Test Notebook',
                'path': '/path/to/notebook'
            })

if __name__ == '__main__':
    unittest.main()