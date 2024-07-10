import logging
from flask import Response
import requests
import json
from flask import current_app as app


logger = logging.getLogger(__name__)


class Kernel:

  @staticmethod
  def restart_kernel(kernel_id):
    path = app.config['JUPYTER_KERNEL_API_PATH'] + f"/{kernel_id}/restart"
    try:
      response = requests.post(path)
    except Exception as e:
      logger.error(f"Met exception restarting kernel: {e}")
      return Response(
        response=json.dumps({'message': 'Error restarting kernel: ' + str(e)}), 
        status=404)
    
    return Response(
      response=response.content, 
      status=200,
      mimetype='application/json'
    )