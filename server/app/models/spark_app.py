from database import db


class SparkAppModel(db.Model):
  
    __tablename__ = 'spark_apps'
  
    spark_app_id = db.Column(db.String, primary_key=True, nullable=False)
  
    def __init__(self, spark_app_id):
        self.spark_app_id = spark_app_id

    def to_dict(self):
        return {
            'spark_app_id': self.spark_app_id,
        }