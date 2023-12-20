#!/bin/bash

# Check if the release exists
if helm list -n $GKE_NAMESPACE | grep -q $RELEASE_DATA_PLATFORM_NAME; then
    helm uninstall $RELEASE_DATA_PLATFORM_NAME -n $GKE_NAMESPACE
else
    echo "Release '$RELEASE_DATA_PLATFORM_NAME' not found."
fi

if helm list -n $GKE_NAMESPACE | grep -q $RELEASE_SPARK_UI_NAME; then
    helm uninstall $RELEASE_SPARK_UI_NAME -n $GKE_NAMESPACE
else
    echo "Release '$RELEASE_SPARK_UI_NAME' not found."
fi