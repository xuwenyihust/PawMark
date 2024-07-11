from app.models.spark_app import SparkAppModel
from app.models.notebook import NotebookModel
from app.models.notebook_spark_app import NotebookSparkAppModel
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
  
  @staticmethod
  def create_spark_app(spark_app_id: str = None, notebook_path: str = None):
    logger.info(f"Creating spark app with id: {spark_app_id}")

    if spark_app_id is None:
      logger.error("Spark app id is None")
      return Response(
        response=json.dumps({'message': 'Spark app id is None'}), 
        status=404)

    if notebook_path is None:
      logger.error("Notebook path is None")
      return Response(
        response=json.dumps({'message': 'Notebook path is None'}), 
        status=404)

    try:
      spark_app = SparkAppModel(
        spark_app_id=spark_app_id,
      )

      # Update the notebook_spark_app relationship
      notebook = NotebookModel.query.filter_by(path=notebook_path).first()
      notebook_id = notebook.notebook_id

      notebook_spark_app = NotebookSparkAppModel(
        notebook_id=notebook_id,
        spark_app_id=spark_app_id
      )

      db.session.add(spark_app)
      db.session.add(notebook_spark_app)
      db.session.commit()

      logger.info(f"Spark app created: {spark_app}")
    except Exception as e:
      return Response(
        response=json.dumps({'message': 'Error creating spark app: ' + str(e)}), 
        status=404)

    return Response(
      response=json.dumps(spark_app.to_dict()), 
      status=200
    )