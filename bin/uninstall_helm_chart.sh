#!/bin/bash

# Check if the release exists
if helm list -n $NAMESPACE | grep -q $RELEASE_NAME; then
    helm uninstall $RELEASE_NAME -n $NAMESPACE
else
    echo "Release '$RELEASE_NAME' not found."
fi