FROM jupyter/all-spark-notebook:spark-3.5.0

USER root

# Install necessary packages for Google Cloud SDK
RUN apt-get update -y && \
    apt-get install -y curl gcc python3-dev apt-transport-https lsb-release gnupg && \
    rm -rf /var/lib/apt/lists/*

# Install pyspark
RUN pip install pyspark

# Add Google Cloud SDK to the sources list
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Import Google's public key
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

# Install Google Cloud SDK
RUN apt-get update -y && \
    apt-get install -y google-cloud-sdk && \
    rm -rf /var/lib/apt/lists/*

# Install the Google Cloud Storage Python library
RUN pip install --upgrade google-cloud-storage \
    kubernetes

# GCS connector
RUN wget -P /usr/local/spark/jars/ \
    https://repo1.maven.org/maven2/com/google/cloud/bigdataoss/gcs-connector/hadoop3-2.2.6/gcs-connector-hadoop3-2.2.6-shaded.jar

# Create a new directory for the IPython profile
RUN mkdir -p /home/jovyan/.custom_ipython_profile/profile_default/startup/ && \
    chown -R jovyan:users /home/jovyan/.custom_ipython_profile && \
    chmod -R 775 /home/jovyan/.custom_ipython_profile

# Copy the custom IPython profile to the new directory
COPY startup.py /home/jovyan/.custom_ipython_profile/profile_default/startup/

# Copy the save hook script and configuration file into the container
COPY gcs_save_hook.py /home/jovyan/.jupyter/
COPY jupyter_notebook_config.py /home/jovyan/.jupyter/

# Switch back to the jovyan user
USER jovyan

# Set environment variable to use the custom IPython profile directory
ENV IPYTHONDIR=/home/jovyan/.custom_ipython_profile

# Set JUPYTER_CONFIG_DIR to point to the directory with the config file
ENV JUPYTER_CONFIG_DIR /home/jovyan/.jupyter/

# Add the JUPYTER_CONFIG_DIR to the PYTHONPATH
ENV PYTHONPATH "${PYTHONPATH}:${JUPYTER_CONFIG_DIR}"

ENV HOME_DIR="/home/jovyan"
ENV BUCKET_NAME="data-platform-bucket-20231126"
ENV NAMESPACE="spark-dev"
ENV SERVICE_ACCOUNT="spark"
ENV EXECUTOR_IMAGE="wenyixu101/spark:3.5.0-python3.11"
ENV WEBUI_SERVICE_NAME="notebook-spark-ui"

CMD ["jupyter", "notebook", "--ip='0.0.0.0'", "--port=8888", "--no-browser", "--allow-root", "--NotebookApp.token=''", "--NotebookApp.password=''"]


