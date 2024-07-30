from flask import request, Response, g
from app.models.user import UserModel
from flask_jwt_extended import get_jwt_identity
from functools import wraps
import json

def password_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not auth.username or not auth.password:
            return Response(
                response=json.dumps({'message': 'Missing credentials'}), 
                status=401
            )

        user = UserModel.query.filter_by(name=auth.username).first()
        if not user or not user.check_password(auth.password):
            return Response(
                response=json.dumps({'message': 'Invalid credentials'}), 
                status=401
            )

        g.user = user
        return f(*args, **kwargs)
    return decorated

def identify_user(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_name = get_jwt_identity()
        g.user = UserModel.query.filter_by(name=user_name).first()
        return f(*args, **kwargs)
    return decorated
