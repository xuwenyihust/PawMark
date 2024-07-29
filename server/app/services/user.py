import logging
from flask import Response
import requests
import json
from flask import current_app as app
from database import db
from app.models.user import UserModel

logger = logging.getLogger(__name__)

class User:

  @staticmethod
  def get_mock_user():
    mock_user = UserModel.query.filter_by(name='testuser0').first()
    if mock_user is None:
      mock_user = UserModel(name='testuser0', email='testuser0@example.com')
      password = 'test_password'
      mock_user.set_password(password)
      db.session.add(mock_user)
      db.session.commit()

    return mock_user
  
  @staticmethod
  def get_user_by_name(name):
    user = UserModel.query.filter_by(name=name).first()
    return user
  
  @staticmethod
  def get_user_by_email(email):
    user = UserModel.query.filter_by(email=email).first()
    return user
  
  @staticmethod
  def create_user(name, email, password):
    user = UserModel(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user
  
  @staticmethod
  def delete_user(name):
    user = UserModel.query.filter_by(name=name).first()
    db.session.delete(user)
    db.session.commit()
    return Response(
      response=json.dumps({'message': 'User deleted successfully'}),
      status=200
    )
  
  @staticmethod
  def update_user(name, email, password):
    user = UserModel.query.filter_by(name=name).first()
    user.email = email
    user.set_password(password)
    db.session.commit()
    return Response(
      response=json.dumps({'message': 'User updated successfully'}),
      status=200
    )
  
  @staticmethod
  def get_all_users():
    users = UserModel.query.all()
    return users
  
  @staticmethod
  def validate_user_by_name(name, password):
    user = UserModel.query.filter_by(name=name).first()
    if user is None:
      return False
    return user.check_password(password)
  
  @staticmethod
  def validate_user_by_email(email, password):
    user = UserModel.query.filter_by(email=email).first()
    if user is None:
      return False
    return user.check_password(password)
