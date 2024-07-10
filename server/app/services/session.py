import logging
from flask import Response
import requests
import json
from flask import current_app as app


logger = logging.getLogger(__name__)


class Session:

  @staticmethod
  def get_all_sessions():
    try:
      response = requests.get(app.config['JUPYTER_SESSION_API_PATH'])
    except Exception as e:
      logger.error(f"Met exception getting all sessions: {e}")
      return Response(
        response=json.dumps({'message': 'Error getting all sessions from Jupyter Server: ' + str(e)}), 
        status=404)
    
    return Response(
      response=response, 
      status=200,
      mimetype='application/json'
    )
    

  @staticmethod
  def create_session(notebook_path: str) -> None:
    logger.info(f"Creating session for {notebook_path}")
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
      logger.error(f"Met exception creating session: {e}")
      return Response(
        response=json.dumps({'message': 'Error creating session in Jupyter Server: ' + str(e)}), 
        status=404)
    
    return Response(
      response=response, 
      status=200,
      mimetype='application/json'
    )

    


