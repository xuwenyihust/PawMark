from flask import Blueprint, jsonify, request, g
from app.services.notebook import Notebook
from app.services.user import User
from app.auth.auth import auth_required
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
@auth_required
def get_all_notebooks():
    return Notebook.get_all_notebooks()

@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['GET'])
@auth_required
def get_notebook_by_path(notebook_path):
    logging.info(f"Getting notebook with path: {notebook_path} for user: {g.user.name}")
    return Notebook.get_notebook_by_path(notebook_path=notebook_path)

@notebook_blueprint.route('/notebook', methods=['POST'])
def create_notebook():
    # TODO: Implement user authentication
    g.user = User.get_mock_user()

    data = request.get_json()
    notebook_name = data.get('name', None)
    notebook_path = data.get('path', None)
    return Notebook.create_notebook_with_init_cells(notebook_name=notebook_name, notebook_path=notebook_path)

@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['PUT'])
def update_notebook(notebook_path):
    # TODO: Implement user authentication
    g.user = User.get_mock_user()

    data = request.get_json()
    content = data.get('content', None)
    return Notebook.update_notebook(notebook_path=notebook_path, content=content)
    
@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['DELETE'])
def delete_notebook(notebook_path):
    # TODO: Implement user authentication
    g.user = User.get_mock_user()
    
    logging.info(f"Deleting notebook with path: {notebook_path}")
    return Notebook.delete_notebook_by_path(notebook_path=notebook_path)

@notebook_blueprint.route('/notebook/<path:notebook_path>', methods=['PATCH'])
def rename_or_move_notebook(notebook_path):
    # TODO: Implement user authentication
    g.user = User.get_mock_user()

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
def get_spark_app_by_notebook_path(notebook_path):
    # TODO: Implement user authentication
    g.user = User.get_mock_user()

    logging.info(f"Get spark apps by notebook path: {notebook_path}")
    return Notebook.get_spark_app_by_notebook_path(notebook_path)

    

