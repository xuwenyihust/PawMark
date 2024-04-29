<h1 align="center">DataPulse: Platform For Big Data & AI</h2>

[![GitHub Release](https://img.shields.io/github/v/release/xuwenyihust/DataPulse?include_prereleases&label=Release)](https://github.com/xuwenyihust/DataPulse/releases)
![Apache Spark 3.5.0](https://img.shields.io/badge/Apache%20Spark-3.5.0-brightgreen?logo=apachespark)
[![GitHub License](https://img.shields.io/github/license/xuwenyihust/Data-Platform?label=License)](https://github.com/xuwenyihust/Data-Platform/blob/main/LICENSE)


## Summary
DataPulse is a platform for big data and AI. It is based on Apache Spark and Kubernetes. The platform is designed to be scalable and easy to use. It provides a set of tools for data processing, machine learning, and data visualization.

## Quick Start
### Local Development
- Start [docker-compose](./docker-compose.yml)

  ```bash
  docker-compose up -d
  ```
- Use notebook
  - Access [http://localhost:8888](http://localhost:8888)
  - Spark session has been created automatically
  - Run the following code in the notebook to test the spark session
    ```python
    spark.range(0, 5) \
         .write \
         .format("delta") \
         .save("/opt/data/delta-table/demo_0")
    ```
- Check the history server
  - Access [http://localhost:18080](http://localhost:18080)
  - Spark application history / progress can be viewed here

- Delta tables
  - Use `/opt/data/delta-table/` as the root directory for delta tables

## Examples
### Singapore Resale Flat Prices Analysis
- [Singapore Resale Flat Prices Analysis](./examples/sg-resale-flat-prices)
  - [Data Source](https://beta.data.gov.sg/datasets/d_8b84c4ee58e3cfc0ece0d773c8ca6abc/view)
 

## Docker Images
### Spark  
[![Build Docker - Spark](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-spark.yml/badge.svg)](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-spark.yml)

  - [Dockerfile](./docker/spark/Dockerfile) 
  - Includes
    - Spark
    - Python

### Notebook
[![Build Docker - Notebook](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-notebook.yml/badge.svg)](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-notebook.yml)

  - [Dockerfile](./docker/notebook/Dockerfile)
  - Includes
    - Jupyter Notebook
    - Spark
    - Google Cloud SDK
    - GCS Connector
    - Pyspark Startup Script
    - Notebook Save Hook Function

### History Server  
[![Build Docker - History Server](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-history-server.yml/badge.svg)](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-history-server.yml)

  - [Dockerfile](./docker/history-server/Dockerfile) 
  - Includes
    - Spark
    - GCS Connector

## License
This project is licensed under the terms of the MIT license.

## Reference
- [Running Apache Spark on Kubernetes](https://medium.com/empathyco/running-apache-spark-on-kubernetes-2e64c73d0bb2)
- [spark-docker](https://github.com/apache/spark-docker)