import os
from google.cloud import storage
import subprocess
from pyspark.sql import SparkSession

# Initialize the GCS client
storage_client = storage.Client()

# Get the GCS bucket
bucket_name = os.environ.get("BUCKET_NAME", "default-bucket-name")
bucket = storage_client.bucket(bucket_name)

# Ensure the local directory exists
local_notebook_dir = "/home/jovyan/"
os.makedirs(local_notebook_dir, exist_ok=True)

# Sync from GCS to local
subprocess.run(["gsutil", "-m", "rsync", "-r", f"gs://{bucket_name}/notebooks", local_notebook_dir])


kubernetes_host = os.environ.get('KUBERNETES_SERVICE_HOST')
kubernetes_port = os.environ.get('KUBERNETES_SERVICE_PORT')
kubernetes_url = f"k8s://https://{kubernetes_host}:{kubernetes_port}"

# Create a Spark session
spark = SparkSession.builder \
    .appName("PySpark Example") \
    .master(kubernetes_url) \
    .config("spark.submit.deployMode", "client") \
    .config("spark.driver.host", "notebook-cluster-ip.spark-dev.svc.cluster.local") \
    .config("spark.driver.cores", "1") \
    .config("spark.driver.memory", "1g") \
    .config("spark.executor.instances", "1") \
    .config("spark.executor.cores", "1") \
    .config("spark.executor.memory", "1g") \
    .config("spark.kubernetes.namespace", "spark-dev") \
    .config("spark.kubernetes.container.image", "wenyixu101/spark:3.5.0-python3.11") \
    .config("spark.kubernetes.authenticate.driver.serviceAccountName", "spark") \
    .config("spark.kubernetes.authenticate.executor.serviceAccountName", "spark") \
    .getOrCreate()

print("Spark session created on startup")