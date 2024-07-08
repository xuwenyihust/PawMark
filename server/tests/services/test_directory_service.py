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

  def test_get_content_by_path(self):
    with self.app.app_context():
      response = Directory.get_content_by_path()
      print(response)
      # self.assertEqual(response['name'], '666')

  # def test_create_directory(self):
  #   with self.app.app_context():
  #     Directory.create_directory('666')