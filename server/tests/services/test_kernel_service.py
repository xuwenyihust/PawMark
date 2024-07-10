import unittest
from flask_cors import CORS
from run import create_app
from app.services.kernel import Kernel
from app.services.notebook import Notebook
from app.services.session import Session
import json

class KernelServiceTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.client = self.app.test_client()

  def test_restart_kernel(self):
    with self.app.app_context():
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
      self.assertEqual(response_2.status_code, 201)
      session = json.loads(response_2.data.decode('utf-8'))
      kernelId = session['kernel']['id']

      # Restart kernel
      response_3 = Kernel.restart_kernel(kernelId)
      self.assertEqual(response_3.status_code, 200)

      print(response_3.data)