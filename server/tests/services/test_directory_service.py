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

      response_0 = Directory.get_content_by_path('work')
      self.assertEqual(response_0.status_code, 200)

      # Create directory
      response_1 = Directory.create_directory('work/test_directory')
      self.assertEqual(response_1.status_code, 201)
      directoryFromDB = DirectoryModel.query.filter_by(path='work/test_directory').first()
      self.assertIsNotNone(directoryFromDB)
      self.assertEqual(directoryFromDB.name, 'test_directory')

      # Check if created directory could be detected
      response_2 = Directory.get_content_by_path('work')
      self.assertEqual(response_2.status_code, 200)
      self.assertEqual(len(json.loads(response_2.data)['content']), 1)
      self.assertEqual(json.loads(response_2.data)['content'][0]['name'], 'test_directory')

  def test_delete_directory_by_path(self):
    with self.app.app_context():

      # Create directory
      response_0 = Directory.create_directory('work/test_directory')
      directoryFromDB = DirectoryModel.query.filter_by(path='work/test_directory').first()
      self.assertIsNotNone(directoryFromDB)
      self.assertEqual(directoryFromDB.name, 'test_directory')

      response_1 = Directory.get_content_by_path('work')
      self.assertEqual(response_1.status_code, 200)
      self.assertEqual(len([x for x in json.loads(response_3.data)['content'] if x['name'] == 'test_directory']), 1)

      # Delete directory
      response_2 = Directory.delete_directory_by_path('work/test_directory')
      self.assertEqual(response_2.status_code, 200)

      # Check if deleted directory could not be detected
      response_3 = Directory.get_content_by_path('work')
      self.assertEqual(response_3.status_code, 200)
      self.assertEqual(len([x for x in json.loads(response_3.data)['content'] if x['name'] == 'test_directory']), 0)

  def test_rename_directory_by_path(self):
    with self.app.app_context():

      response_0 = Directory.get_content_by_path('work')
      contents = json.loads(response_0.data)['content']
      content_0 = [x for x in contents if x['name'] == 'updated_name']
      self.assertEqual(response_0.status_code, 200)
      self.assertEqual(content_0, [])

      # Create directory
      response_0 = Directory.create_directory('work/original_name')
      directoryFromDB = DirectoryModel.query.filter_by(path='work/original_name').first()
      self.assertIsNotNone(directoryFromDB)
      self.assertEqual(directoryFromDB.name, 'original_name')

      # Rename directory
      response_1 = Directory.rename_directory_by_path('work/original_name', 'work/updated_name')
      self.assertEqual(response_1.status_code, 200)

      directoryFromDB = DirectoryModel.query.filter_by(path='work/updated_name').first()
      self.assertIsNotNone(directoryFromDB)
      self.assertEqual(directoryFromDB.name, 'updated_name')

      # Check if renamed directory could be detected
      response_2 = Directory.get_content_by_path('work')
      contents = json.loads(response_2.data)['content']
      content_original = [x for x in contents if x['name'] == 'original_name']
      content_updated = [x for x in contents if x['name'] == 'updated_name']
      
      self.assertEqual(len(content_original), 0)
      self.assertEqual(len(content_updated), 1)
      self.assertEqual(content_updated[0]['name'], 'updated_name')
      self.assertEqual(content_updated[0]['path'], 'work/updated_name')

