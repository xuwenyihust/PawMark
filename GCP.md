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