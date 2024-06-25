from flask import Flask
from flask_cors import CORS
from routes.notebook import notebook_blueprint

app = Flask(__name__)

allowed_origins = ["http://localhost:5001", "http://localhost:3000"]

CORS(app, resources={
    r"/*": {"origins": allowed_origins}
})

app.register_blueprint(notebook_blueprint)


if __name__ == '__main__':
    app.run(debug=True, port=5002)
