FROM apache/airflow:2.9.1-python3.11

USER root

# Install OpenJDK 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

USER airflow

RUN pip install --upgrade pip && \
    pip install apache-airflow-providers-papermill ipython jupyter ipykernel papermill pandas numpy matplotlib seaborn pyspark

# Add and install the Python 3 kernel
RUN python3 -m ipykernel install --user --name python3 --display-name "Python 3"

# Set JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-17-openjdk-amd64

