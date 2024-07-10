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

@session_blueprint.route('/session/all', methods=['GET'])
def get_all_sessions():
  return Session.get_all_sessions()

@session_blueprint.route('/session/<path:notebook_path>', methods=['GET'])
def get_session_by_path(notebook_path):
  logging.info(f"Get session by path: {notebook_path}")
  return Session.get_session_by_path(notebook_path=notebook_path)

