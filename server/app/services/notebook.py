from app.models.notebook import NotebookModel
from flask import jsonify
from datetime import datetime
import requests
from database import db
import json
import os
from flask import current_app as app

class Notebook:

  @staticmethod
  def get_all_notebooks():
    print(app.config('JUPYTER_SERVER_PATH'))

    notebooks = NotebookModel.query.all()

    # Convert the notebooks to dictionaries
    notebooks_dict = [notebook.to_dict() for notebook in notebooks]

    # Now you can serialize notebooks_dict
    notebooks_json = json.dumps(notebooks_dict)

    return notebooks_json
  
  @staticmethod
  def get_notebook_by_path(notebook_path: str = None):
    jupyter_server_path = os.environ.get("JUPYTER_SERVER_PATH", "http://localhost:8888")

    path = f"{jupyter_server_path}/api/contents/{notebook_path}"
    response = requests.get(path)

    return response.json()

  @staticmethod
  def create_notebook(notebook_name: str = None) -> None:
    jupyter_server_path = os.environ.get("JUPYTER_SERVER_PATH", "http://localhost:8888")

    path = f"{jupyter_server_path}/api/contents/work/{notebook_name}"
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

    response = requests.put(
      path,
      json=data
    )

    return response.json()

  @staticmethod
  def create_notebook_with_init_cells(notebook_name: str = None) -> None:
    jupyter_server_path = os.environ.get("JUPYTER_SERVER_PATH")

    if not notebook_name or notebook_name == "":
      notebook_name = f"notebook_{datetime.now().strftime('%Y%m%d%H%M%S')}.ipynb"
    else:
      notebook_name = f"{notebook_name}.ipynb"

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

    Notebook.create_notebook(notebook_name)

    path = f"{jupyter_server_path}/api/contents/{notebook_name}"
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

    notebook = NotebookModel(
      name=notebook_name,
      path=notebook_name
    )

    db.session.add(notebook)
    db.session.commit()

    return response.json()

  @staticmethod
  def delete_notebook_by_path(notebook_path: str = None):
    jupyter_server_path = os.environ.get("JUPYTER_SERVER_PATH")

    path = f"{jupyter_server_path}/api/contents/{notebook_path}"
    response = requests.delete(path)

    if response.status_code != 204:
        return jsonify({'message': 'Notebook not found in jupyter server'}), 404

    try:
      notebook = NotebookModel.query.filter_by(path=notebook_path).first()

      if notebook is None:
          # If no notebook was found with the given path, return a 404 error
          return jsonify({'message': 'Notebook not found in DB'}), 404

      # Delete the notebook
      db.session.delete(notebook)

      # Commit the transaction
      db.session.commit()
    except Exception as e:
      return jsonify({'message': 'Notebook not found in DB'}), 404

    return jsonify({'message': 'Notebook deleted'}), 200
  
  @staticmethod
  def rename_notebook_by_path(notebook_path: str = None, new_notebook_name: str = None):
    jupyter_server_path = os.environ.get("JUPYTER_SERVER_PATH")

    path = f"{jupyter_server_path}/api/contents/{notebook_path}"
    response = requests.patch(
      path,
      json={"path": f"work/{new_notebook_name}"}
    )

    if response.status_code != 200:
        return jsonify({'message': 'Failed to rename in jupyter server'}), 404

    notebook = NotebookModel.query.filter_by(path=notebook_path).first()

    if notebook is None:
        # If no notebook was found with the given path, return a 404 error
        return jsonify({'message': 'Notebook not found in DB'}), 404

    # Rename the notebook
    notebook.name = new_notebook_name
    notebook.path = f'work/{new_notebook_name}'
    try:
      db.session.commit()
    except Exception as e:
      return jsonify({'message': 'Notebook not found in DB'}), 404

    return jsonify({'message': 'Notebook renamed'}), 200