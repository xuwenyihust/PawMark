from flask import Blueprint, jsonify, request
from app.services.directory import Directory
import logging

directory_blueprint = Blueprint('directory', __name__)

logging.basicConfig(level=logging.INFO)

@directory_blueprint.route('/directory/<path:directory_path>', methods=['GET'])
def get_directory_content(directory_path):
    return Directory.get_content_by_path(path=directory_path)

@directory_blueprint.route('/directory', methods=['POST'])
def create_directory():
    data = request.get_json()
    directory_path = data.get('directoryPath', None)
    return Directory.create_directory(directory_path=directory_path)

@directory_blueprint.route('/directory/<path:directory_path>', methods=['PATCH'])
def rename_directory(directory_path):
    data = request.get_json()
    new_directory_path = data.get('newPath', None)
    return Directory.rename_directory_by_path(directory_path=directory_path, new_directory_path=new_directory_path)