<h1 align="center">Data Platform: For Big Data & AI</h2>
<p align="center">
    <a href="https://github.com/xuwenyihust/Data-Platform/actions/workflows/build-deploy-examples.yml">
        <img alt="GitHub Workflow Status (with event)" src="https://img.shields.io/github/actions/workflow/status/xuwenyihust/Data-Platform/build-deploy-examples.yml?logo=github&label=build%20%26%20deploy%20examples">
    </a>
    <a href="https://github.com/xuwenyihust/Data-Platform/blob/main/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/github/license/xuwenyihust/Data-Platform?link=https%3A%2F%2Fgithub.com%2Fxuwenyihust%2FData-Platform%2Fblob%2Fmain%2FLICENSE">
    </a>
</p>

## Overview
A big data platform for data processing and machine learning based on Kubernetes and Spark.

## Setup
### Prerequisites
- GCP account
  - Kubernetes Engine
  - Cloud Storage
- gcloud SDK
- kubectl
- helm
- docker
- python3

### Configuration
```bash
cp bin/env_template.yaml bin/env.yaml
```

Update the configuration in `bin/env.yaml` accordingly.

### Create a Kubernetes cluster on GCP
```bash
source bin/setup.sh
```

### Prepare Spark Application Docker Image
- Could prepare your own docker image
- Or use the examples in [`examples/`](examples/)

### Deploy Spark Application on Kubernetes
```bash
source bin/submit_spark_app.sh --image APP_IMAGE --name APP_NAME --main MAIN_CLASS --jar JAR_FILE
```

## License
This project is licensed under the terms of the MIT license.

## Reference
- [Running Apache Spark on Kubernetes](https://medium.com/empathyco/running-apache-spark-on-kubernetes-2e64c73d0bb2)
- [spark-docker](https://github.com/apache/spark-docker)