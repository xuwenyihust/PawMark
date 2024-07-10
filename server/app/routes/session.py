from flask import Blueprint, jsonify, request
from app.services.session import Session
import logging

session_blueprint = Blueprint('session', __name__)

logging.basicConfig(level=logging.INFO)

@session_blueprint.route('/session', methods=['POST'])
def create_session():
  logging.info(f"Create session")
  data = request.get_json()
  notebook_path = data.get('notebookPath', None)
  return Session.create_session(notebook_path)

