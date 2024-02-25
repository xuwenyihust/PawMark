import os
from google.cloud import storage
import subprocess
from pyspark.sql import SparkSession
from IPython import get_ipython
from IPython.display import *
from kubernetes import client, config

environment = os.getenv('ENVIRONMENT', 'development')  # Default to 'development' if not set

# Set the environment variables
def set_env():
    # kubernetes_host = os.environ.get('KUBERNETES_SERVICE_HOST')
    # kubernetes_port = os.environ.get('KUBERNETES_SERVICE_PORT')
    # kubernetes_url = f"k8s://https://{kubernetes_host}:{kubernetes_port}"

    # app_name = os.environ.get("APP_NAME", "PySpark Example")
    # driver_host = "notebook-cluster-ip.spark-dev.svc.cluster.local"
    # namespace = os.environ.get("NAMESPACE", "spark-dev")
    # service_account = os.environ.get("SERVICE_ACCOUNT", "spark")
    # executor_image = os.environ.get("EXECUTOR_IMAGE", "wenyixu101/spark:3.5.0-python3.11")

    # app_name = os.environ.get("APP_NAME", "PySpark Example")
    # master_url = os.environ.get("MASTER_URL", "k8s://https://kubernetes.default.svc")

    pass

# Create a Spark session
def create_spark(app_name, master_url):
    spark = SparkSession.builder \
        .appName(app_name) \
        .master(kubernetes_url) \
        .config("spark.submit.deployMode", "client") \
        .config("spark.driver.host", driver_host) \
        .config("spark.driver.cores", "1") \
        .config("spark.driver.memory", "1g") \
        .config("spark.executor.instances", "1") \
        .config("spark.executor.cores", "1") \
        .config("spark.executor.memory", "1g") \
        .config("spark.kubernetes.namespace", namespace) \
        .config("spark.kubernetes.container.image", executor_image) \
        .config("spark.kubernetes.authenticate.driver.serviceAccountName", service_account) \
        .config("spark.kubernetes.authenticate.executor.serviceAccountName", service_account) \
        .config("spark.eventLog.enabled", "true") \
        .config("spark.eventLog.dir", f"gs://{bucket_name}/event-logs/") \
        .config("spark.history.fs.logDirectory", f"gs://{bucket_name}/event-logs/") \
        .config("spark.hadoop.fs.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem") \
        .config("spark.hadoop.fs.AbstractFileSystem.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFS") \
        .config("spark.hadoop.fs.gs.auth.service.account.enable", "true") \
        .getOrCreate()
    
    return spark

def start():
    # Configuring the API client
    config.load_incluster_config()

    # Creating an API instance to interact with the K8s service
    v1 = client.CoreV1Api()

    # Fetching the service details
    service_name = os.environ.get("WEBUI_SERVICE_NAME", "notebook-spark-ui")
    service = v1.read_namespaced_service(service_name, namespace)

    webui_host = service.status.load_balancer.ingress[0].ip
    webui_port = spark.sparkContext.uiWebUrl.split(":")[-1]
    webui_url = f"http://{webui_host}:{webui_port}"

    msg = f"**App name**: {app_name}\n\n" + \
        f"**Master**: {kubernetes_url}\n\n" + \
        f"**Driver host**: {driver_host}\n\n" + \
        f"**Spark UI**: {webui_url}"

    display(Markdown(msg))

def display_msg():
    app_name = 'unknown'
    kubernetes_url = 'unknown'
    driver_host = 'unknown'
    webui_url = 'unknown'

    msg = f"**App name**: {app_name}\n\n" + \
        f"**Master**: {kubernetes_url}\n\n" + \
        f"**Driver host**: {driver_host}\n\n" + \
        f"**Spark UI**: {webui_url}"
    display(Markdown(msg))

def create_spark_dev():
    spark = SparkSession.builder \
        .appName("PySpark Example") \
        .master("local[*]") \
        .getOrCreate()
    
    return spark

# if environment == 'development':
#     pass

# elif environment == 'production':
#     # Initialize the GCS client
#     storage_client = storage.Client()

#     # Get the GCS bucket
#     bucket_name = os.environ.get("BUCKET_NAME", "default-bucket-name")
#     bucket = storage_client.bucket(bucket_name)

#     # Ensure the local directory exists
#     local_notebook_dir = os.environ.get("HOME_DIR", "/home/jovyan")
#     os.makedirs(local_notebook_dir, exist_ok=True)

#     # Sync from GCS to local
#     print("Copying notebooks from GCS to local")
#     subprocess.run(["gsutil", "-m", "rsync", "-r", f"gs://{bucket_name}/notebooks", local_notebook_dir])

#     set_env()
#     spark = create_spark()
#     start()
# else:
#     raise ValueError(f"Invalid environment: {environment}")
    
spark = create_spark_dev()

