from flask import Blueprint, jsonify, request
from models.notebook import Notebook

notebook_blueprint = Blueprint('notebook', __name__)

@notebook_blueprint.route('/notebook')
def notebook():
    return jsonify(
        {
           "message": "notebook endpoint"
        }
    )

@notebook_blueprint.route('/notebook/create', methods=['POST'])
def create_notebook():
    data = request.get_json()
    notebook_name = data.get('notebookName', None)
    return Notebook.create_notebook_with_init_cells(notebook_name=notebook_name)