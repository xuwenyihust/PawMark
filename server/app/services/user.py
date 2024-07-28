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
