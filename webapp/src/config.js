const config = {
  jupyterBaseUrl: (window._env_ && window._env_.REACT_APP_JUPYTER_BASE_URL) || process.env.REACT_APP_JUPYTER_BASE_URL,
  serverBaseUrl: (window._env_ && window._env_.REACT_APP_SERVER_BASE_URL) || process.env.REACT_APP_SERVER_BASE_URL,
  sparkUiBaseUrl: (window._env_ && window._env_.REACT_APP_SPARK_UI_BASE_URL) || process.env.REACT_APP_SPARK_UI_BASE_URL,
  airflowBaseUrl: (window._env_ && window._env_.REACT_APP_AIRFLOW_BASE_URL) || process.env.REACT_APP_AIRFLOW_BASE_URL,
  username: (window._env_ && window._env_.REACT_APP_USERNAME) || process.env.REACT_APP_USERNAME,
  password: (window._env_ && window._env_.REACT_APP_PASSWORD) || process.env.REACT_APP_PASSWORD,
};

export default config;
