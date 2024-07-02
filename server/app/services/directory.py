from app.models.directory import DirectoryModel
from flask import jsonify
from datetime import datetime
import requests
from database import db
from flask import current_app as app
import os

class Directory:

  @staticmethod
  def create_directory(directory_path: str = None) -> None:
    jupyter_api_path = app.config['JUPYTER_API_PATH']

    path = f"{jupyter_api_path}/{directory_path}"
    data = {
      "type": "directory"
    }

    response = requests.put(
      path,
      json=data
    )

    notebook = DirectoryModel(
      name=directory_path,
      path=f'work/{directory_path}'
    )

    db.session.add(notebook)
    db.session.commit()

    return response.json()

  @staticmethod
  def rename_directory_by_path(directory_path: str = None, new_directory_path: str = None):
    jupyter_api_path = app.config['JUPYTER_API_PATH']

    path = f"{jupyter_api_path}/{directory_path}"
    response = requests.patch(
      path,
      json={"path": f"{new_directory_path}"}
    )

    if response.status_code != 200:
        return jsonify({'message': 'Failed to rename in jupyter server'}), 404

    directory = DirectoryModel.query.filter_by(path=directory_path).first()

    if directory is None:
        # If no directory was found with the given path, return a 404 error
        return jsonify({'message': 'Directory not found in DB'}), 404

    # Rename the directory
    directory.name = new_directory_path
    directory.path = f'work/{new_directory_path}'
    db.session.commit()

    return jsonify({'message': 'Directory renamed'}), 200