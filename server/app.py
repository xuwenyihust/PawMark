from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)

allowed_origins = ["http://localhost:5001", "http://localhost:3000"]

CORS(app, resources={
    r"/test": {"origins": allowed_origins}
})

@app.route('/test')
def handle_request():
    # Example data you might want to return
    data = {"message": "Hello from Flask!"}
    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True, port=5002)
