from flask import request, Response, g
from app.models.user import UserModel
from functools import wraps
import json

def auth_required(f):
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