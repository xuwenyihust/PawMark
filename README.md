<h1 align="center">DataPulse: Platform For Big Data & AI</h2>
<p align="center">
    <a href="https://github.com/xuwenyihust/Data-Platform/actions/workflows/build-deploy-examples.yml">
        <img alt="GitHub Workflow Status (with event)" src="https://img.shields.io/github/actions/workflow/status/xuwenyihust/Data-Platform/build-deploy-examples.yml?logo=github&label=build%20%20examples">
    </a>
    <a href="https://github.com/xuwenyihust/Data-Platform/blob/main/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/github/license/xuwenyihust/Data-Platform?link=https%3A%2F%2Fgithub.com%2Fxuwenyihust%2FData-Platform%2Fblob%2Fmain%2FLICENSE">
</p>

> ⚠️ Currently in Development: Expect breaking changes and bugs!

## Features
- Spark Application Deployment
    - Jar Application Submission
    - PySpark Application Submission
    - Jupyter Notebook
        - Customized Integration with PySpark
- Monitoring
  - Spark UI
  - History Server

## Supported Versions
- Spark: 3.5.0
- Scala: 2.12
- Python: 3.11
- GCS Connector: hadoop3-2.2.0

## Prerequisites
- GCP account
  - Kubernetes Engine
  - Cloud Storage
- gcloud SDK
- kubectl
- helm
- docker
- python3

## Quickstart
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

### Prepare Input Data (If Needed)
- GCS directory: `gs://<BUCKET_NAME>/application/`

### Deploy Spark Application on Kubernetes
```bash
source bin/submit_spark_app.sh --image APP_IMAGE --name APP_NAME --main MAIN_CLASS --jar JAR_FILE
```

## License
This project is licensed under the terms of the MIT license.

## Reference
- [Running Apache Spark on Kubernetes](https://medium.com/empathyco/running-apache-spark-on-kubernetes-2e64c73d0bb2)
- [spark-docker](https://github.com/apache/spark-docker)