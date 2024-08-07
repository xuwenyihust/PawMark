from app.models.notebook import NotebookModel
from app.models.spark_app import SparkAppModel
from flask import g, Response
from datetime import datetime
import requests
import logging
from database import db
import json
from flask import current_app as app

logger = logging.getLogger(__name__)

class Notebook:

  @staticmethod
  def get_all_notebooks():
    # Get the authenticated user
    user = g.user

    notebooks = NotebookModel.query.filter_by(user_id=user.id).all()

    # Convert the notebooks to dictionaries
    notebooks_dict = [notebook.to_dict() for notebook in notebooks]

    return Response(
      response=json.dumps(notebooks_dict),
      status=200
    )
  
  @staticmethod
  def get_notebook_by_path(notebook_path: str = None):
    jupyter_api_path = app.config['JUPYTER_CONTENT_API_PATH']

    try:
      path = f"{jupyter_api_path}/{notebook_path}"
      logger.info(f"Getting notebook from Jupyter Server: {path}")
      response = requests.get(path)
      if response.status_code != 200:
        logger.error(f"Error getting notebook from Jupyter Server: {response.content}")
        return Response(
          response=json.dumps({'message': 'Error getting notebook from Jupyter Server'}), 
          status=404)
    except Exception as e:
      logger.error(f"Error getting notebook from Jupyter Server: {e}")
      return Response(
        response=json.dumps({'message': 'Error getting notebook from Jupyter Server: ' + str(e)}), 
        status=404)

    try:
      notebook = NotebookModel.query.filter_by(path=notebook_path).first()
      logger.info(f"Notebook found in DB: {notebook}")
    except Exception as e:
      logger.error(f"Error getting notebook from DB: {e}")
      return Response(
        response=json.dumps({'message': 'Error getting notebook from DB: ' + str(e)}), 
        status=404)

    return Response(
        response=response.content, 
        status=200,
        mimetype='application/json'
      )

  @staticmethod
  def create_notebook(notebook_name: str = None, notebook_path: str = None) -> None:
    # Get the authenticated user
    user = g.user

    logger.info(f"Creating notebook with name: {notebook_name} under path: {notebook_path} for user_name: {user.name} user_id: {user.id}")

    jupyter_api_path = app.config['JUPYTER_CONTENT_API_PATH']

    path = f"{jupyter_api_path}/{notebook_path}/{notebook_name}"
    data = {
      "type": "notebook",
      "content": {
        "cells": [],
        "metadata": {
          "kernelspec": {
            "name": 'python3',
            "display_name": 'Python 3'
            },
            "language_info": {
                "name": 'python'
            }
        },
        "nbformat": 4,
        "nbformat_minor": 4
      }
    }

    try:
      response = requests.put(
        path,
        json=data
      )
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Error creating notebook in Jupyter Server: ' + str(e)}), 
        status=404)

    try:
      notebook = NotebookModel(
        name=notebook_name,
        path=f'{notebook_path}/{notebook_name}',
        user_id=user.id
      )

      db.session.add(notebook)
      db.session.commit()
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Error creating notebook in DB: ' + str(e)}), 
        status=404)

    return Response(
      response=response.content, 
      status=200,
      mimetype='application/json')

  @staticmethod
  def create_notebook_with_init_cells(notebook_name: str = None, notebook_path: str = None) -> None:
    logger.info(f"Creating notebook with init cells with name: {notebook_name} under path: {notebook_path}")

    jupyter_api_path = app.config['JUPYTER_CONTENT_API_PATH']
    jupyter_default_path = app.config['JUPYTER_DEFAULT_PATH']

    if not notebook_name or notebook_name == "":
      notebook_name = f"notebook_{datetime.now().strftime('%Y%m%d%H%M%S')}.ipynb"
    if not notebook_name.endswith('.ipynb'):
      notebook_name = f"{notebook_name}.ipynb"
    if not notebook_path or notebook_path == "":
      notebook_path = jupyter_default_path


    cells = [
      { 
        "cell_type": 'markdown', 
        "metadata": {},
        "source": '# My Notebook' 
      }, { 
        "cell_type": 'code', 
        "execution_count": 1,
        "metadata": {},
        "outputs": [],
        "source": '# SparkSession: spark is already created\nspark' },
    ]

    Notebook.create_notebook(notebook_name, notebook_path)

    path = f"{jupyter_api_path}/{notebook_path}/{notebook_name}"
    data = {
      "type": "notebook",
      "content": {
        "cells": cells,
        "metadata": {
          "kernelspec": {
            "name": 'python3',
            "display_name": 'Python 3'
            },
            "language_info": {
                "name": 'python'
            }
        },
        "nbformat": 4,
        "nbformat_minor": 4
      }
    }

    response = requests.put(
      path,
      json=data
    )

    return Response(
      response=response.content, 
      status=response.status_code,
      mimetype='application/json')


  @staticmethod
  def update_notebook(notebook_path: str, content: dict):
    jupyter_api_path = app.config['JUPYTER_CONTENT_API_PATH']

    path = f"{jupyter_api_path}/{notebook_path}"

    logger.info("Update notebook content: " + str(content))

    response = requests.put(
      path,
      headers={"Content-Type": "application/json"},
      json={
        "content": content,
        "type": "notebook"
      }
    )

    if response.status_code != 200:
      logger.error(f"Failed to update notebook in jupyter server: {response.content}")
      return Response(
        response=json.dumps({'message': 'Failed to update notebook in jupyter server'}), 
        status=500)

    logger.info(f"Notebook updated in jupyter server: {response.content}")
    return Response(
      response=json.dumps({'message': 'Notebook updated'}), 
      status=200)


  @staticmethod
  def delete_notebook_by_path(notebook_path: str = None):
    jupyter_api_path = app.config['JUPYTER_CONTENT_API_PATH']

    path = f"{jupyter_api_path}/{notebook_path}"
    response = requests.delete(path)

    if response.status_code != 204:
        return Response(
          response=json.dumps({'message': 'Notebook not found in jupyter server'}), 
          status=404)

    try:
      notebook = NotebookModel.query.filter_by(path=notebook_path).first()

      if notebook is None:
          # If no notebook was found with the given path, return a 404 error
          return Response(
            response=json.dumps({'message': 'Notebook not found in DB'}), 
            status=404)

      # Delete the notebook
      db.session.delete(notebook)

      # Commit the transaction
      db.session.commit()
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Notebook not found in DB'}), 
        status=404)

    return Response(
      response=json.dumps({'message': 'Notebook deleted'}), 
      status=200)
  
  @staticmethod
  def rename_notebook_by_path(notebook_path: str = None, new_notebook_name: str = None):
    jupyter_api_path = app.config['JUPYTER_CONTENT_API_PATH']

    path = f"{jupyter_api_path}/{notebook_path}"

    parent_path = '/'.join(notebook_path.split('/')[:-1])
    new_path = f"{parent_path}/{new_notebook_name}"

    logger.info(f"Renaming notebook with path: {notebook_path} to {new_path}")

    response = requests.patch(
      path,
      json={"path": new_path}
    )

    if response.status_code != 200:
        return Response(
          response=json.dumps({'message': 'Failed to rename in jupyter server'}), 
          status=404)

    notebook = NotebookModel.query.filter_by(path=notebook_path).first()

    if notebook is None:
        # If no notebook was found with the given path, return a 404 error
        return Response(
          response=json.dumps({'message': 'Notebook not found in DB'}), 
          status=404)

    # Rename the notebook
    notebook.name = new_notebook_name
    notebook.path = new_path
    try:
      db.session.commit()
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Notebook not found in DB'}), 
        status=404)

    return Response(
      response=json.dumps({'message': 'Notebook renamed'}), 
      status=200)
  
  @staticmethod
  def move_notebook(notebook_path: str = None, new_notebook_path: str = None):
    jupyter_api_path = app.config['JUPYTER_CONTENT_API_PATH']

    path = f"{jupyter_api_path}/{notebook_path}"

    response = requests.patch(
      path,
      json={"path": new_notebook_path}
    )

    if response.status_code != 200:
        return Response(
          response=json.dumps({'message': 'Failed to move in jupyter server'}), 
          status=404)

    notebook = NotebookModel.query.filter_by(path=notebook_path).first()

    if notebook is None:
        # If no notebook was found with the given path, return a 404 error
        return Response(
          response=json.dumps({'message': 'Notebook not found in DB'}), 
          status=404)

    # Move the notebook
    notebook.path = new_notebook_path
    try:
      db.session.commit()
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Notebook not found in DB'}), 
        status=404)

    return Response(
      response=json.dumps({'message': 'Notebook moved'}), 
      status=200)
  
  @staticmethod
  def get_spark_app_by_notebook_path(notebook_path: str = None):
    logger.info(f"Getting spark app with notebook path: {notebook_path}")

    try:
      notebook = NotebookModel.query.filter_by(path=notebook_path).first()
      notebook_id = notebook.id
      logger.info(f"Notebook found in DB: {notebook.id}, {notebook.name}")
    except Exception as e:
      logger.error(f"Error getting notebook from DB: {e}")
      return Response(
        response=json.dumps({'message': 'Error getting notebook from DB: ' + str(e)}), 
        status=404)
  
    try:
      spark_apps = SparkAppModel.query.filter_by(notebook_id=notebook_id).all()
      if len(spark_apps) == 0:
        logger.warning(f"No spark app found for notebook: {notebook_path}")
        return Response(
          response=json.dumps({'message': 'No spark app found for notebook'}), 
          status=404)
      else:
        logger.info(f"Spark app found in DB: {spark_apps}")
    except Exception as e:
      logger.error(f"Error getting spark app from DB: {e}")
      return Response(
        response=json.dumps({'message': 'Error getting spark app from DB: ' + str(e)}),
        status=404)

    return Response(
      response=json.dumps([x.to_dict() for x in spark_apps]), 
      status=200)