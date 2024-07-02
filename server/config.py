class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost/production_db'

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://server:password-server@localhost:5432/server_db'
    JUPYTER_SERVER_PATH = 'http://localhost:8888'

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://server:password-server@postgres:5432/server_db'
    JUPYTER_SERVER_PATH = 'http://notebook:8888'