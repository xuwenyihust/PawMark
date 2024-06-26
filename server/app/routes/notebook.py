from flask import Blueprint, jsonify, request
from app.services.notebook import Notebook

notebook_blueprint = Blueprint('notebook', __name__)

@notebook_blueprint.route('/notebook')
def notebook():
    return jsonify(
        {
           "message": "notebook endpoint"
        }
    )

@notebook_blueprint.route('/notebook/all', methods=['GET'])
def get_all_notebooks():
    return Notebook.get_all_notebooks()

@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['GET'])
def get_notebook_by_path(notebook_path):
    return Notebook.get_notebook_by_path(notebook_path=notebook_path)

@notebook_blueprint.route('/notebook', methods=['POST'])
def create_notebook():
    data = request.get_json()
    notebook_name = data.get('notebookName', None)
    return Notebook.create_notebook_with_init_cells(notebook_name=notebook_name)

@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['DELETE'])
def delete_notebook(notebook_path):
    return Notebook.delete_notebook_by_path(notebook_path=notebook_path)