from flask import jsonify
from database import db

class DirectoryModel(db.Model):

  __tablename__ = 'directories'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String, nullable=False)
  path = db.Column(db.String, nullable=False)

  def __init__(self, name, path):
      self.name = name
      self.path = path

  def to_dict(self):
      return {
          'id': self.id,
          'name': self.name,
          'path': self.path
      }