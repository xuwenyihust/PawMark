from flask import Flask
from flask_cors import CORS
from database import db
from app.routes.notebook import notebook_blueprint
from app.routes.directory import directory_blueprint


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://server:password-server@localhost:5432/server_db'
    db.init_app(app)

    allowed_origins = ["http://localhost:5001", "http://localhost:3000"]
    CORS(app, resources={
        r"/*": {"origins": allowed_origins}
    })

    return app

app = create_app()

app.register_blueprint(notebook_blueprint)
app.register_blueprint(directory_blueprint)


if __name__ == '__main__':
    app.run(debug=True, port=5002)
