#!/bin/bash

# Set the path to your spark-submit binary if not in PATH
# SPARK_SUBMIT="/path/to/spark/bin/spark-submit"

# Define your Spark application's main class
MAIN_CLASS="class org.apache.spark.examples.SparkPi"

# Define the path to your application's jar file
APP_JAR="/Users/wenyixu/Coding/spark-3.5.0-bin-hadoop3/examples/jars/spark-examples_2.12-3.5.0.jar"

# Set other Spark configurations and application arguments
APP_ARGS="1000"

KUBERNETES_API_SERVER_HOST="https://127.0.0.1"
KUBERNETES_API_SERVER_PORT="49385"
K8S_NAMESPACE="default"
SERVICE_ACCOUNT="spark"
DOCKER_IMAGE="apache/spark:3.5.0"
FILE_UPLOAD_PATH="file:///tmp/spark-uploads"

# The command to submit the Spark job
spark-submit \
    --class $MAIN_CLASS \
    --master k8s://$KUBERNETES_API_SERVER \
    --deploy-mode cluster \
    --driver-cores 1 \
    --driver-memory 1g \
    --num-executors 1 \
    --executor-cores 1 \
    --executor-memory 1g \
    --name my-spark-job \
    --conf spark.kubernetes.container.image=$DOCKER_IMAGE \
    --conf spark.kubernetes.namespace=$K8S_NAMESPACE \
    --conf spark.kubernetes.authenticate.driver.serviceAccountName=$SERVICE_ACCOUNT \
    --conf spark.kubernetes.authenticate.executor.serviceAccountName=$SERVICE_ACCOUNT \
    --conf spark.kubernetes.file.upload.path=$FILE_UPLOAD_PATH \
    $APP_JAR \
    $APP_ARGS

# You can add additional commands or logic here if needed



