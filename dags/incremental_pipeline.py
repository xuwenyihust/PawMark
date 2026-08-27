from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

default_args = {
    'owner': 'airflow',
    'start_date': datetime(2023, 1, 1),
    'catchup': True
}

dag = DAG(
    'incremental_pipeline_dag',
    default_args=default_args,
    description='An example of an incremental pipeline where only new data is processed on each run',
    schedule_interval='@daily',
    catchup=False,
)

run_pipeline = BashOperator(
    task_id='run_incremental_pipeline',
    bash_command='python /opt/airflow/examples/incremental_pipeline.py',
    dag=dag,
)

run_pipeline
