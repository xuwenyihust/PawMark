#!/bin/bash
source bin/env.sh
source bin/connect_gcp.sh

# Install Helm chart
source bin/install_helm_chart.sh

kubectl get namespace "$NAMESPACE" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Creating namespace: $NAMESPACE"
    kubectl create namespace "$NAMESPACE"
else
    echo "Namespace $NAMESPACE already exists"
fi