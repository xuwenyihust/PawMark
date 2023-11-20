#!/bin/bash
source bin/env.sh
source bin/connect_gke.sh

# Install Helm chart
# Check if the release is already installed
if helm list -n $NAMESPACE | grep -q $RELEASE_NAME; then
    echo "Release '$RELEASE_NAME' already installed."
else
    echo "Release '$RELEASE_NAME' not found. Installing..."

    # Install the chart
    helm install $RELEASE_NAME $CHART_NAME -n $NAMESPACE
fi

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