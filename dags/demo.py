from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

default_args = {
    'owner': 'airflow',
    'start_date': datetime(2023, 1, 1),
    'catchup': True
}

dag = DAG(
    'demo_dag',
    default_args=default_args,
    description='A simple DAG for demo',
    schedule_interval='@daily',
    catchup=False,
)

run_script = BashOperator(
    task_id='display_logs',
    bash_command='python /opt/airflow/examples/airflow_demo.py',
    dag=dag,
)

run_script