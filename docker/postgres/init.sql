CREATE USER server WITH PASSWORD 'password-server';

CREATE DATABASE server_db;

\c server_db

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE notebooks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(100) NOT NULL
);

CREATE TABLE directories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(100) NOT NULL
);

CREATE TABLE spark_apps (
    spark_app_id VARCHAR(100) PRIMARY KEY
);

CREATE TABLE notebook_spark_apps (
    id SERIAL PRIMARY KEY,
    notebook_id INT REFERENCES notebooks(id),
    spark_app_id VARCHAR(100) REFERENCES spark_apps(spark_app_id)
);

GRANT ALL PRIVILEGES ON TABLE users TO server;
GRANT ALL PRIVILEGES ON SEQUENCE users_id_seq TO server;

GRANT ALL PRIVILEGES ON TABLE notebooks TO server;
GRANT ALL PRIVILEGES ON SEQUENCE notebooks_id_seq TO server;

GRANT ALL PRIVILEGES ON TABLE directories TO server;
GRANT ALL PRIVILEGES ON SEQUENCE directories_id_seq TO server;

GRANT ALL PRIVILEGES ON TABLE spark_apps TO server;

GRANT ALL PRIVILEGES ON TABLE notebook_spark_apps TO server;
GRANT ALL PRIVILEGES ON SEQUENCE notebook_spark_apps_id_seq TO server;

-- Add some initial data
INSERT INTO users (name, password_hash, email) VALUES ('user_0', 'pbkdf2:sha256:150000$3Z6Z6Z6Z$e3', 'user_0@gmail.com');
INSERT INTO users (name, password_hash, email) VALUES ('user_1', 'pbkdf2:sha256:150000$3Z6Z6Z6Z$e3', 'user_1@gmail.com');

INSERT INTO notebooks (name, path) VALUES ('demo.ipynb', 'work/demo.ipynb');
INSERT INTO notebooks (name, path) VALUES ('notebook.ipynb', 'work/notebook.ipynb');
INSERT INTO notebooks (name, path) VALUES ('quickstart.ipynb', 'work/quickstart.ipynb');
INSERT INTO notebooks (name, path) VALUES ('sg-resale-flat-prices.ipynb', 'work/sg-resale-flat-prices/sg-resale-flat-prices.ipynb');

INSERT INTO directories (name, path) VALUES ('work', '/work');
INSERT INTO directories (name, path) VALUES ('word-count', '/work/word-count');
INSERT INTO directories (name, path) VALUES ('sg-resale-flat-prices', '/work/sg-resale-flat-prices');
INSERT INTO directories (name, path) VALUES ('output', '/work/sg-resale-flat-prices/output');

INSERT INTO spark_apps (spark_app_id) VALUES ('app-0000-0000');
INSERT INTO spark_apps (spark_app_id) VALUES ('app-0000-0001');
INSERT INTO spark_apps (spark_app_id) VALUES ('app-0000-0002');
INSERT INTO spark_apps (spark_app_id) VALUES ('app-0000-0003');
INSERT INTO spark_apps (spark_app_id) VALUES ('app-0000-0004');
