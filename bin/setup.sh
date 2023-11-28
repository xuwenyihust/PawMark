#!/bin/bash
source bin/env.sh
source bin/connect_gcp.sh

# Install Helm chart
source bin/install_helm_chart.sh

# Setup cluster security
source bin/setup_security.sh

kubectl get namespace "$GKE_NAMESPACE" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Creating namespace: $GKE_NAMESPACE"
    kubectl create namespace "$GKE_NAMESPACE"
else
    echo "Namespace $GKE_NAMESPACE already exists"
fi