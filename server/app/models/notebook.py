from database import db

class NotebookModel(db.Model):

  __tablename__ = 'notebooks'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String, nullable=False)
  path = db.Column(db.String, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  def __init__(self, name, path, user_id):
      self.name = name
      self.path = path
      self.user_id = user_id

  def to_dict(self):
      return {
          'id': self.id,
          'name': self.name,
          'path': self.path,
          'user_id': self.user_id
      }

  

