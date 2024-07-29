from flask import Blueprint, Response, g
from app.services.user import User
from app.auth.auth import auth_required
import logging
import json

login_blueprint = Blueprint('login', __name__)

logging.basicConfig(level=logging.INFO)

@login_blueprint.route('/login', methods=['POST'])
@auth_required
def login():
    logging.info(f"Logging in user: {g.user.name}")

    # name = data.get('name', None)
    # password = data.get('password', None)
    # return User.validate_user_by_name(name=name, password=password)

    return Response(
        response=json.dumps({'message': 'Login successful'}),
        status=200
    )

