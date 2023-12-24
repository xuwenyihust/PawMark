#!/bin/bash

# Check if the release exists
if helm list -n $GKE_NAMESPACE | grep -q $RELEASE_DATA_PLATFORM_NAME; then
    echo "Upgrading release '$RELEASE_DATA_PLATFORM_NAME'..."

    # Upgrade the Helm release
    helm upgrade $RELEASE_DATA_PLATFORM_NAME $CHART_DATA_PLATFORM_NAME \
        -f $CHART_DATA_PLATFORM_NAME/Values.yaml \
        --namespace $GKE_NAMESPACE \
        --version $CHART_DATA_PLATFORM_VERSION \
        --install  # The --install flag ensures it installs if not present

    echo "Upgrade completed."
else
    echo "Release '$RELEASE_DATA_PLATFORM_NAME' not found. Installing..."
    # Install the Helm chart as a new release
    helm install $RELEASE_DATA_PLATFORM_NAME $CHART_DATA_PLATFORM_NAME \
        -f $CHART_DATA_PLATFORM_NAME/Values.yaml \
        --namespace $GKE_NAMESPACE \
        --version $CHART_DATA_PLATFORM_VERSION \
        --create-namespace  # Creates the namespace if it doesn't exist
fi
