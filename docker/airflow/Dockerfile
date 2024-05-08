FROM apache/airflow:2.9.1-python3.11

USER root

RUN apt-get update

USER airflow

RUN pip install --upgrade pip && \
    pip install apache-airflow-providers-papermill ipython jupyter ipykernel papermill pandas numpy matplotlib seaborn pyspark

# Add and install the Python 3 kernel
RUN python3 -m ipykernel install --user --name python3 --display-name "Python 3"
