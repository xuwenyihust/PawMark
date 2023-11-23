#!/bin/bash

DOCKER_ACCOUNT="wenyixu101"
DOCKER_PATH="./kubernetes"
DOCKERFILE="Dockerfile.spark-ui"

DOCKER_IMAGE="kubectl:0.0.3"

docker build --no-cache . -t ${DOCKER_ACCOUNT}/${DOCKER_IMAGE} -f ${DOCKER_PATH}/${DOCKERFILE}
docker push ${DOCKER_ACCOUNT}/${DOCKER_IMAGE}

