#!/bin/bash

# Check if the release exists
if helm list -n $GKE_NAMESPACE | grep -q $RELEASE_NAME; then
    echo "Upgrading release '$RELEASE_NAME'..."

    # Upgrade the Helm release
    helm upgrade $RELEASE_NAME $CHART_NAME \
        --namespace $GKE_NAMESPACE \
        --version $CHART_VERSION \
        --install  # The --install flag ensures it installs if not present

    echo "Upgrade completed."
else
    echo "Release '$RELEASE_NAME' not found. Installing..."
    # Install the Helm chart as a new release
    helm install $RELEASE_NAME $CHART_NAME \
        --namespace $GKE_NAMESPACE \
        --version $CHART_VERSION \
        --create-namespace  # Creates the namespace if it doesn't exist
fi
