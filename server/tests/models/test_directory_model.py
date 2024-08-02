import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.directory import DirectoryModel
from app.models.user import UserModel

class DirectoryModelTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_directory_model(self):
        with self.app.app_context():
            # Create user first
            user = UserModel(name='testuser', email='testuser@example.com')
            password = 'test_password'
            user.set_password(password)
            db.session.add(user)
            db.session.commit()

            # Create directory
            directory = DirectoryModel(name='Test Directory', path='/path/to/directory', user_id=user.id)
            db.session.add(directory)
            db.session.commit()

            self.assertIsNotNone(directory.id)
            self.assertEqual(directory.name, 'Test Directory')
            self.assertEqual(directory.path, '/path/to/directory')

            directory_dict = directory.to_dict()
            self.assertEqual(directory_dict, {
                'id': directory.id,
                'name': 'Test Directory',
                'path': '/path/to/directory',
                'user_id': user.id
            })