from app.models.spark_app import SparkAppModel
from app.models.notebook import NotebookModel
from flask import Response
from datetime import datetime
import json
from database import db
from flask import current_app as app
import logging

logger = logging.getLogger(__name__)

class SparkApp:

  @staticmethod
  def get_all_spark_apps():
    spark_apps = SparkAppModel.query.all()

    # Convert the spark apps to dictionaries
    spark_apps_dict = [spark_app.to_dict() for spark_app in spark_apps]

    return Response(
      response=json.dumps(spark_apps_dict),
      status=200
    )
  
  @staticmethod
  def get_spark_app_by_id(spark_app_id: str = None):
    logger.info(f"Getting spark app with id: {spark_app_id}")

    try:
      spark_app = SparkAppModel.query.filter_by(spark_app_id=spark_app_id).first()
      logger.info(f"Spark app found in DB: {spark_app}")
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Error getting spark app from DB: ' + str(e)}), 
        status=404)

    return Response(
      response=json.dumps(spark_app.to_dict()), 
      status=200
    )
  
  