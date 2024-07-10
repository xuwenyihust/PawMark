import logging
from flask import Response
import requests
import json
from flask import current_app as app


logger = logging.getLogger(__name__)


class Session:

  @staticmethod
  def create_session(notebook_path: str) -> None:
    jupyter_api_path = app.config['JUPYTER_SESSION_API_PATH']

    data = {
      "notebook": {
        "path": notebook_path
      },
      "kernel": {
        "id": None, 
        "name": "python3"
      }
    }

    try:
      response = requests.post(
        jupyter_api_path,
        json=data
      )
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Error creating session in Jupyter Server: ' + str(e)}), 
        status=404)
    
    return Response(
      response=response, 
      status=200,
      mimetype='application/json'
    )

    


