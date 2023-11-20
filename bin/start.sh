#!/bin/bash
source bin/env.sh
source bin/connect_gke.sh

# Create a namespace for Spark
NAMESPACE="spark-dev"

kubectl get namespace "$NAMESPACE" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Creating namespace: $NAMESPACE"
    kubectl create namespace "$NAMESPACE"
else
    echo "Namespace $NAMESPACE already exists"
fi

# Submit spark applications
source bin/submit_spark_job.sh