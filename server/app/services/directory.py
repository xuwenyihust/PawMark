from app.models.directory import DirectoryModel
from flask import Response
import json
from datetime import datetime
import requests
from database import db
from flask import current_app as app
import logging

logger = logging.getLogger(__name__)

class Directory:

  @staticmethod
  def get_content_by_path(path: str = None):
    logger.info(f"Getting content with path: {path}")
     
    jupyter_api_path = app.config['JUPYTER_API_PATH']
    jupyter_default_path = app.config['JUPYTER_DEFAULT_PATH']
    
    if path is None:
      path = jupyter_default_path
    path = f"{jupyter_api_path}/{path}"

    try:
      response = requests.get(path)
      content = response.json()['content']
      logger.info(f"Content: {content}")
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Error getting content from Jupyter Server: ' + str(e)}), 
        status=404)

    return Response(
      response=json.dumps({'content': content}), 
      status=200)

  @staticmethod
  def create_directory(directory_path: str = None) -> None:
    logger.info(f"Creating directory with path: {directory_path}")

    jupyter_api_path = app.config['JUPYTER_API_PATH']

    if directory_path is None:
      logger.error("Directory path is None")
      return Response(
        response=json.dumsp({'message': 'Directory path is None'}), 
        status=404)

    path = f"{jupyter_api_path}/{directory_path}"
    data = {
      "type": "directory"
    }

    response = requests.put(
      path,
      json=data
    )

    logger.info(f"Response: {response.content}")

    notebook = DirectoryModel(
      name=directory_path,
      path=directory_path
    )

    try:
      db.session.add(notebook)
      db.session.commit()
    except Exception as e:
      return Response(
        response=({'message': 'Error creating directory in DB: ' + str(e)}), 
        status=404)

    return response

  @staticmethod
  def rename_directory_by_path(directory_path: str = None, new_directory_path: str = None):
    jupyter_api_path = app.config['JUPYTER_API_PATH']

    path = f"{jupyter_api_path}/{directory_path}"
    response = requests.patch(
      path,
      json={"path": f"{new_directory_path}"}
    )

    if response.status_code != 200:
        return Response(
          response=({'message': 'Failed to rename in jupyter server'}), 
          status=404)

    directory = DirectoryModel.query.filter_by(path=directory_path).first()

    if directory is None:
        # If no directory was found with the given path, return a 404 error
        return Response(
          response=json.dumps({'message': 'Directory not found in DB'}), 
          status=404)

    # Rename the directory
    try:
      directory.name = new_directory_path
      directory.path = new_directory_path
      db.session.commit()
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Error renaming directory in DB: ' + str(e)}), 
        status=404)

    return Response(
      response=json.dumps({'message': 'Directory renamed'}), 
      status=200)