import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.directory import DirectoryModel
from app.services.directory import Directory
import json

class DirectoryServiceTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.client = self.app.test_client()
    with self.app.app_context():
      db.create_all()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def test_create_directory(self):
    with self.app.app_context():

      # Nothing created yet, should be empty
      content_0 = Directory.get_content_by_path('work')
      self.assertEqual(content_0, [])

      # Create directory
      response_0 = Directory.create_directory('work/test_directory')
      directoryFromDB = DirectoryModel.query.filter_by(path='work/test_directory').first()
      self.assertIsNotNone(directoryFromDB)

      # Check if created directory could be detected
      content_1 = Directory.get_content_by_path('work')
      self.assertEqual(len(content_1), 1)
      self.assertEqual(content_1[0]['name'], 'test_directory')

      # Create directory with same name, should fail
      response_1 = Directory.create_directory('work/test_directory')
      directoryFromDB = DirectoryModel.query.filter_by(path='work/test_directory')
      print(directoryFromDB)
      print(response_1)


