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

  def test_rename_directory_by_path(self):
    with self.app.app_context():

      response_0 = Directory.get_content_by_path('work')
      status_code_0 = response_0[1]
      content_0 = [x for x in response_0[0].json() if x['name'] == 'updated_name']
      self.assertEqual(status_code_0, 200)
      self.assertEqual(content_0, [])

      # Create directory
      response_0 = Directory.create_directory('work/original_name')
      directoryFromDB = DirectoryModel.query.filter_by(path='work/original_name').first()
      self.assertIsNotNone(directoryFromDB)

      # Rename directory
      response_1 = Directory.rename_directory_by_path('work/original_name', 'work/updated_name')
      print(response_1)

      directoryFromDB = DirectoryModel.query.filter_by(path='work/updated_name').first()
      print(directoryFromDB)
      self.assertIsNotNone(directoryFromDB)

      # Check if renamed directory could be detected
      content_1 = Directory.get_content_by_path('work')
      self.assertEqual(len(content_1), 1)
      self.assertEqual(content_1[0]['name'], 'updated_name')
      self.assertEqual(content_1[0]['path'], 'work/updated_name')

