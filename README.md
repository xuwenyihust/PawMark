<h1 align="center">DataPulse: Platform For Big Data & AI</h2>
<p align="center">
    <a href="https://github.com/xuwenyihust/Data-Platform/actions/workflows/build-deploy-examples.yml">
        <img alt="GitHub Workflow Status (with event)" src="https://img.shields.io/github/actions/workflow/status/xuwenyihust/Data-Platform/build-deploy-examples.yml?logo=github&label=build%20%20examples">
    </a>
    <a href="https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker.yml">
      <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/xuwenyihust/DataPulse/build-docker.yml?logo=github&label=build%20docker">
    </a>
    <a href="https://github.com/xuwenyihust/Data-Platform/blob/main/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/github/license/xuwenyihust/Data-Platform?link=https%3A%2F%2Fgithub.com%2Fxuwenyihust%2FData-Platform%2Fblob%2Fmain%2FLICENSE">
    </a>
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

### Spark Jar Application
#### Step1: Setup Configuration
Same as above.

#### Step2: Create a Kubernetes cluster on GCP
Same as above.

#### Step3: Prepare Spark Application Docker Image
- Could prepare your own docker image
- Or use the examples in [`examples/`](examples/)

#### Step4: Prepare Input Data (If Needed)
- GCS directory: `gs://<BUCKET_NAME>/application/`

#### Step5: Deploy Spark Application on Kubernetes
```bash
source bin/submit_spark_app.sh --image APP_IMAGE --name APP_NAME --main MAIN_CLASS --jar JAR_FILE
```

## License
This project is licensed under the terms of the MIT license.

## Reference
- [Running Apache Spark on Kubernetes](https://medium.com/empathyco/running-apache-spark-on-kubernetes-2e64c73d0bb2)
- [spark-docker](https://github.com/apache/spark-docker)