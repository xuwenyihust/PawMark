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
      response_0 = Directory.get_content_by_path('work')
      self.assertEqual(response_0.status_code, 200)
      self.assertEqual(json.loads(response_0.data)['content'], [])

      # Create directory
      response_1 = Directory.create_directory('work/test_directory')
      self.assertEqual(response_1.status_code, 201)
      directoryFromDB = DirectoryModel.query.filter_by(path='work/test_directory').first()
      self.assertIsNotNone(directoryFromDB)

      # Check if created directory could be detected
      response_2 = Directory.get_content_by_path('work')
      self.assertEqual(response_2.status_code, 200)
      self.assertEqual(len(json.loads(response_2.data)['content']), 1)
      self.assertEqual(json.loads(response_2.data)['content'][0]['name'], 'test_directory')

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

      # # Rename directory
      response_1 = Directory.rename_directory_by_path('work/original_name', 'work/updated_name')
      self.assertEqual(response_1.status_code, 200)

      directoryFromDB = DirectoryModel.query.filter_by(path='work/updated_name').first()
      print(DirectoryModel.query.all())
      print(DirectoryModel.query.all()[0].to_dict())
      self.assertIsNotNone(directoryFromDB)

      # Check if renamed directory could be detected
      response_2 = Directory.get_content_by_path('work')
      content_2 = json.loads(response_2.data)['content']
      self.assertEqual(len(content_2), 1)
      self.assertEqual(content_2[0]['name'], 'updated_name')
      self.assertEqual(content_2[0]['path'], 'work/updated_name')

