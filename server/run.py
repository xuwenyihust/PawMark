from flask import Flask, Response
from flask_cors import CORS
from database import db
import os
import json
from app.routes.notebook import notebook_blueprint
from app.routes.directory import directory_blueprint
from app.routes.session import session_blueprint
from app.routes.kernel import kernel_blueprint
from app.routes.spark_app import spark_app_blueprint
from app.routes.login import login_blueprint
from flask_jwt_extended import JWTManager
from config import DevelopmentConfig, IntegrationTestingConfig, TestingConfig

def create_app():
    app = Flask(__name__)
    if os.environ.get('ENV', 'development') == 'development':
        app.config.from_object(DevelopmentConfig)
    elif os.environ.get('ENV', 'development') == 'testing':
        app.config.from_object(TestingConfig)
    elif os.environ.get('ENV', 'development') == 'integration':
        app.config.from_object(IntegrationTestingConfig)

    # Set the secret key for JWT
    try:
        from app_secrets import JWT_SECRET_KEY
    except ImportError:
        JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'default_secret_key')

    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    jwt = JWTManager(app)
    @jwt.expired_token_loader
    def my_expired_token_callback(jwt_header, jwt_payload):
        return Response(
            response=json.dumps({'message': 'Token has expired'}), 
            status=401)

    db.init_app(app)

    allowed_origins = ["http://localhost:5001", "http://localhost:3000"]
    CORS(app, resources={
        r"/*": {"origins": allowed_origins}
    })

    return app

app = create_app()

app.register_blueprint(notebook_blueprint)
app.register_blueprint(directory_blueprint)
app.register_blueprint(session_blueprint)
app.register_blueprint(kernel_blueprint)
app.register_blueprint(spark_app_blueprint)
app.register_blueprint(login_blueprint)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
