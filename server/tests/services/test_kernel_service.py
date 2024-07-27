import unittest
from flask_cors import CORS
from flask import g
from run import create_app
from database import db
from app.models.user import UserModel
from app.services.kernel import Kernel
from app.services.notebook import Notebook
from app.services.session import Session
import json

class KernelServiceTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.client = self.app.test_client()
    with self.app.app_context():
      db.create_all()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def test_get_kernel_by_id(self):
    with self.app.app_context():
      # Get non-exist kernel
      response_0 = Kernel.get_kernel_by_id('kernel_id')
      self.assertEqual(response_0.status_code, 404)

      # Create User
      user = UserModel(username='testuser', email='testuser@example.com')
      password = 'test_password'
      user.set_password(password)
      g.user = user

      # Create Notebook
      response_1 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook_1.ipynb', notebook_path='')
      self.assertEqual(response_1.status_code, 200)

      notebook_1 = json.loads(response_1.data.decode('utf-8'))
      notebook_path_1 = notebook_1['path']

      # Create Session
      response_2 = Session.create_session(notebook_path_1)
      self.assertEqual(response_2.status_code, 200)
      session = json.loads(response_2.data.decode('utf-8'))
      kernelId = session['kernel']['id']

      # Get kernel
      response_3 = Kernel.get_kernel_by_id(kernelId)
      self.assertEqual(response_3.status_code, 200)

  def test_restart_kernel(self):
    with self.app.app_context():
      user = UserModel(name='testuser0', email='testuser0@example.com')
      password = 'test_password'
      user.set_password(password)
      db.session.add(user)
      db.session.commit()
      g.user = user

      # Restart non-exist kernel
      response_0 = Kernel.restart_kernel('kernel_id')
      self.assertEqual(response_0.status_code, 404)

      # Create Notebook
      response_1 = Notebook.create_notebook_with_init_cells(notebook_name='Notebook_1.ipynb', notebook_path='')
      self.assertEqual(response_1.status_code, 200)

      notebook_1 = json.loads(response_1.data.decode('utf-8'))
      notebook_path_1 = notebook_1['path']

      # Create Session
      response_2 = Session.create_session(notebook_path_1)
      self.assertEqual(response_2.status_code, 200)
      session = json.loads(response_2.data.decode('utf-8'))
      kernelId = session['kernel']['id']

      # Restart kernel
      response_3 = Kernel.restart_kernel(kernelId)
      self.assertEqual(response_3.status_code, 200)
