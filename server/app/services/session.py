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
  def get_session_by_path(notebook_path: str) -> None:
    logger.info(f"Getting session for {notebook_path}")

    all_sessions = Session.get_all_sessions()
    if all_sessions.status_code != 200:
      return Response(
        response=json.dumps({'message': 'Error getting all sessions'}), 
        status=404)
    
    sessions = json.loads(all_sessions.data.decode('utf-8'))
    session = [x for x in sessions if x["path"] == notebook_path]

    if len(session) == 0:
      return Response(
        response=json.dumps({'message': 'Session not found'}), 
        status=404)
    elif len(session) > 1:
      return Response(
        response=json.dumps({'message': 'Multiple sessions found'}), 
        status=404)
    else:
      return Response(
        response=json.dumps(session[0]), 
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
      response=response.content, 
      status=200,
      mimetype='application/json'
    )

    


