from flask import Blueprint, jsonify, request, g
from app.services.notebook import Notebook
from flask_jwt_extended import jwt_required
from app.auth.auth import identify_user
import logging

notebook_blueprint = Blueprint('notebook', __name__)

logging.basicConfig(level=logging.INFO)

@notebook_blueprint.route('/notebook')
def notebook():
    return jsonify(
        {
           "message": "notebook endpoint"
        }
    )

@notebook_blueprint.route('/notebook/all', methods=['GET'])
@jwt_required()
@identify_user
def get_all_notebooks():
    logging.info(f"Getting all notebooks by user: {g.user.name}")
    return Notebook.get_all_notebooks()

@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['GET'])
@jwt_required()
@identify_user
def get_notebook_by_path(notebook_path):
    logging.info(f"Getting notebook with path: {notebook_path} by user: {g.user.name}")
    return Notebook.get_notebook_by_path(notebook_path=notebook_path)

@notebook_blueprint.route('/notebook', methods=['POST'])
@jwt_required()
@identify_user
def create_notebook():
    data = request.get_json()
    notebook_name = data.get('name', None)
    notebook_path = data.get('path', None)
    logging.info(f"Creating notebook with name: {notebook_name} and path: {notebook_path} by user {g.user.name}")
    return Notebook.create_notebook_with_init_cells(notebook_name=notebook_name, notebook_path=notebook_path)

@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['PUT'])
@jwt_required()
@identify_user
def update_notebook(notebook_path):
    data = request.get_json()
    content = data.get('content', None)
    logging.info(f"Updating notebook with path: {notebook_path} by user: {g.user.name}")
    return Notebook.update_notebook(notebook_path=notebook_path, content=content)
    
@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['DELETE'])
@jwt_required()
@identify_user
def delete_notebook(notebook_path):
    logging.info(f"Deleting notebook with path: {notebook_path}")
    return Notebook.delete_notebook_by_path(notebook_path=notebook_path)

@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['PATCH'])
@jwt_required()
@identify_user
def rename_or_move_notebook(notebook_path):
    data = request.get_json()
    if 'newName' in data:
        logging.info(f"Renaming notebook with path: {notebook_path} to {data['newName']}")
        new_notebook_name = data.get('newName', None)
        return Notebook.rename_notebook_by_path(notebook_path=notebook_path, new_notebook_name=new_notebook_name)
    elif 'newPath' in data:
        logging.info(f"Moving notebook with path: {notebook_path} to {data['newPath']}")
        new_notebook_path = data.get('newPath', None)
        return Notebook.move_notebook(notebook_path=notebook_path, new_notebook_path=new_notebook_path)

@notebook_blueprint.route('/notebook/spark_app/<path:notebook_path>', methods=['GET'])
@jwt_required()
@identify_user
def get_spark_app_by_notebook_path(notebook_path):
    logging.info(f"Get spark apps by notebook path: {notebook_path}")
    return Notebook.get_spark_app_by_notebook_path(notebook_path)

    

