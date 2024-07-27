import unittest
from flask_cors import CORS
from run import create_app
from database import db
from app.models.user import UserModel

class UserModelTestCase(unittest.TestCase):

  def setUp(self):
    self.app = create_app()
    self.client = self.app.test_client()
    with self.app.app_context():
        db.create_all()

  def tearDown(self):
    with self.app.app_context():
      db.session.remove()
      db.drop_all()

  def test_user_model(self):
    with self.app.app_context():
      user = UserModel(name='testuser', email='testuser@example.com')
      password = 'test_password'
      user.set_password(password)
      db.session.add(user)
      db.session.commit()
      assert user.id is not None
      assert user.name == 'testuser'
      assert user.email == 'testuser@example.com'

  def test_password_setter(self):
    with self.app.app_context():
      user = UserModel(name='testuser', email='testuser@example.com')
      password = 'test_password'
      user.set_password(password)
      db.session.add(user)
      db.session.commit()
      assert user.password_hash is not None

  def test_check_password(self):
    with self.app.app_context():
      user = UserModel(name='testuser', email='testuser@example.com')
      password = 'test_password'
      user.set_password(password)
      db.session.add(user)
      db.session.commit()
      assert user.check_password(password)
      assert not user.check_password('wrong_password')