<h1 align="center">DataPulse: Platform For Big Data & AI</h2>
<p align="center">
    <a href="https://github.com/xuwenyihust/DataPulse/actions/workflows/build-examples.yml">
        <img alt="GitHub Workflow Status (with event)" src="https://img.shields.io/github/actions/workflow/status/xuwenyihust/DataPulse/build-examples.yml?logo=github&label=Build%20%20Examples">
    </a>
    <a href="https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker.yml">
      <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/xuwenyihust/DataPulse/build-docker.yml?logo=github&label=Build%20Docker">
    </a>
    <a href="https://github.com/xuwenyihust/DataPulse/releases">
      <img alt="GitHub Release" src="https://img.shields.io/github/v/release/xuwenyihust/DataPulse?include_prereleases&label=Release">
    </a>
    <a>
      <img alt="Static Badge" src="https://img.shields.io/badge/Apache%20Spark-3.5.0-brightgreen?logo=apachespark">
    </a>
    <a href="https://github.com/xuwenyihust/Data-Platform/blob/main/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/github/license/xuwenyihust/Data-Platform?link=https%3A%2F%2Fgithub.com%2Fxuwenyihust%2FData-Platform%2Fblob%2Fmain%2FLICENSE&label=License">
    </a>
</p>
<p align="center">
  <a href="https://github.com/xuwenyihust/DataPulse/wiki">Documentation</a> 
</p>


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
- Apache Spark: 3.5.0
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
### Notebook
#### Step1: Setup Configuration
```bash
cp bin/env_template.yaml bin/env.yaml
```
Fill in the `env.yaml` file with your own configurations.

#### Step2: Create a Kubernetes cluster on GCP
```bash
source bin/setup.sh
```

#### Step3: Create a Jupyter Notebook
A service `notebook` will be created on the Kubernetes cluster.

#### Step4: Check Spark Integration
![Alt text](<resources/images/notebook-spark-integration.png>)

Check Spark information by running the following code in a notebook cell:
```python
start()
```

#### Step5: Check Spark UI
![Alt text](<resources/images/spark-ui.png>)

Check Spark UI by clicking the link in the notebook cell output.

## Docker Image
- [all-spark-notebook](https://hub.docker.com/repository/docker/wenyixu101/all-spark-notebook/general)
  - Based on jupyter/all-spark-notebook:spark-3.5.0
  - Include Google Cloud SDK and GCS connector
  - Include pyspark startup script
  - Include notebook save hook function to save notebook to GCS
 
- [spark-history-server](https://hub.docker.com/repository/docker/wenyixu101/spark-history-server)
  - Based on apache/spark:3.5.0
  - Include GCS connector

## License
This project is licensed under the terms of the MIT license.

## Reference
- [Running Apache Spark on Kubernetes](https://medium.com/empathyco/running-apache-spark-on-kubernetes-2e64c73d0bb2)
- [spark-docker](https://github.com/apache/spark-docker)