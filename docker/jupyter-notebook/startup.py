import os
from pyspark.sql import SparkSession

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
