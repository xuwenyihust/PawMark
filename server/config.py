class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost/production_db'
    JUPYTER_SERVER_PATH = 'http://localhost:8888'
    JUPYTER_CONTENT_API_PATH = JUPYTER_SERVER_PATH + '/api/contents'
    JUPYTER_SESSION_API_PATH = JUPYTER_SERVER_PATH + '/api/sessions'
    JUPYTER_DEFAULT_PATH = 'work'

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://server:password-server@localhost:5432/server_db'
    JUPYTER_SERVER_PATH = 'http://localhost:8888'
    JUPYTER_CONTENT_API_PATH = JUPYTER_SERVER_PATH + '/api/contents'
    JUPYTER_SESSION_API_PATH = JUPYTER_SERVER_PATH + '/api/sessions'
    JUPYTER_DEFAULT_PATH = 'work'

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://server:password-server@postgres:5432/server_db'
    JUPYTER_SERVER_PATH = 'http://notebook:8888'
    JUPYTER_CONTENT_API_PATH = JUPYTER_SERVER_PATH + '/api/contents'
    JUPYTER_SESSION_API_PATH = JUPYTER_SERVER_PATH + '/api/sessions'
    JUPYTER_DEFAULT_PATH = 'work'

class IntegrationTestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://server:password-server@localhost:5432/server_db'
    JUPYTER_SERVER_PATH = 'http://localhost:8888'
    JUPYTER_CONTENT_API_PATH = JUPYTER_SERVER_PATH + '/api/contents'
    JUPYTER_SESSION_API_PATH = JUPYTER_SERVER_PATH + '/api/sessions'
    JUPYTER_DEFAULT_PATH = 'work'
