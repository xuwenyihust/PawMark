from app.models.notebook import NotebookModel
from datetime import datetime
import requests
from database import db
import json
import os

class Notebook:

  @staticmethod
  def get_all_notebooks():
    notebooks = NotebookModel.query.all()

    # Convert the notebooks to dictionaries
    notebooks_dict = [notebook.to_dict() for notebook in notebooks]

    # Now you can serialize notebooks_dict
    notebooks_json = json.dumps(notebooks_dict)

    return notebooks_json

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
    jupyter_server_path = os.environ.get("JUPYTER_SERVER_PATH", "http://localhost:8888")

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

    path = f"{jupyter_server_path}/api/contents/work/{notebook_name}"
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
      path=f'work/{notebook_name}'
    )

    db.session.add(notebook)
    db.session.commit()

    return response.json()

  