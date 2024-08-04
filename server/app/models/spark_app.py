from database import db


class SparkAppModel(db.Model):
  
    __tablename__ = 'spark_apps'
  
    spark_app_id = db.Column(db.String, primary_key=True, nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False)
  
    def __init__(self, spark_app_id, notebook_id, user_id, created_at):
        self.spark_app_id = spark_app_id
        self.notebook_id = notebook_id
        self.user_id = user_id
        self.created_at = created_at

    def set_status(self, status):
        self.status = status
        db.session.commit()

    def to_dict(self):
        return {
            'spark_app_id': self.spark_app_id,
            'notebook_id': self.notebook_id,
            'user_id': self.user_id,
            'status': self.status,
            'created_at': self.created_at
        }