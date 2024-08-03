from flask import Blueprint, Response, g
from flask_jwt_extended import create_access_token
from app.auth.auth import password_required
import logging
import json

login_blueprint = Blueprint('login', __name__)

logging.basicConfig(level=logging.INFO)

@login_blueprint.route('/login', methods=['POST'])
@password_required
def login():
    logging.info(f"Logging in user: {g.user.name}")
    access_token = create_access_token(identity=g.user.name)

    return Response(
        response=json.dumps({
            'message': 'Login successful',
            'name': g.user.name,
            'email': g.user.email,
            'access_token': access_token
            }),
        status=200
    )

