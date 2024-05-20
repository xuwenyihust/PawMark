const config = {
  jupyterBaseUrl: (window._env_ && window._env_.REACT_APP_JUPYTER_BASE_URL) || process.env.REACT_APP_JUPYTER_BASE_URL,
};

export default config;
