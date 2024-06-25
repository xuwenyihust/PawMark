from flask import Blueprint, jsonify

notebook_blueprint = Blueprint('notebook', __name__)

@notebook_blueprint.route('/notebook')
def notebook():
    return jsonify(
        {
            "notebook": [
                {
                    "title": "First note",
                    "content": "This is the first note"
                },
                {
                    "title": "Second note",
                    "content": "This is the second note"
                }
            ]
        }
    )