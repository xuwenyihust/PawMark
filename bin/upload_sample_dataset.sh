#!/bin/bash

# Define the path to the file you want to upload
FILE_PATH="examples/word-count/src/main/resources/example.txt"

# Use gsutil to upload the file to the GCP bucket
gsutil cp $FILE_PATH gs://$BUCKET_NAME/applications/word-count/input/example.txt