from database import db

class NotebookSparkAppModel(db.Model):

  __tablename__ = 'notebook_spark_apps'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=False)
  spark_app_id = db.Column(db.String, db.ForeignKey('spark_apps.spark_app_id'), nullable=False)

  def __init__(self, notebook_id, spark_app_id):
      self.notebook_id = notebook_id
      self.spark_app_id = spark_app_id

  def to_dict(self):
      return {
          'id': self.id,
          'notebook_id': self.notebook_id,
          'spark_app_id': self.spark_app_id
      }