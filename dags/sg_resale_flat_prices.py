from airflow import DAG
from airflow.providers.papermill.operators.papermill import PapermillOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    'start_date': datetime(2023, 1, 1),
    'catchup': True
}

with DAG(
    'SG_Resale_Flat_Prices',
    default_args=default_args,
    description='DAG for analysis on Singapore resale flat prices',
    schedule_interval=timedelta(days=1),
    catchup=False,
) as dag:

    run_notebook = PapermillOperator(
        task_id='sg_resale_flat_prices_notebook',
        input_nb='/opt/airflow/examples/sg-resale-flat-prices/sg_resale_flat_prices.ipynb',
        output_nb='/opt/airflow/examples/sg-resale-flat-prices/output/output-notebook-{{ execution_date }}.ipynb'
    )

run_notebook