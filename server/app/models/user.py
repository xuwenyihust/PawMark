from database import db
from werkzeug.security import generate_password_hash, check_password_hash

class UserModel(db.Model):

  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  username = db.Column(db.String, unique=True, nullable=False)
  password_hash = db.Column(db.String, nullable=False)
  email = db.Column(db.String, unique=True, nullable=False)

  def set_password(self, password):
        self.password_hash = generate_password_hash(password)

  def check_password(self, password):
      return check_password_hash(self.password_hash, password)


  