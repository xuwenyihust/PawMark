<h1 align="center">DataPulse: Platform For Big Data & AI</h2>

[![GitHub Release](https://img.shields.io/github/v/release/xuwenyihust/DataPulse?include_prereleases&label=Release)](https://github.com/xuwenyihust/DataPulse/releases)
![Apache Spark 3.5.0](https://img.shields.io/badge/Apache%20Spark-3.5.0-brightgreen?logo=apachespark)
[![GitHub License](https://img.shields.io/github/license/xuwenyihust/Data-Platform?label=License)](https://github.com/xuwenyihust/Data-Platform/blob/main/LICENSE)


## Summary
DataPulse is a platform for big data and AI. It is based on Apache Spark and Kubernetes. The platform is designed to be scalable and easy to use. It provides a set of tools for data processing, machine learning, and data visualization.

## Docker Images
- [![Build Docker - Spark](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-spark.yml/badge.svg)](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-spark.yml)
  - [Dockerfile](./docker/spark/Dockerfile)
  - Include Spark, Python
- [![Build Docker - Notebook](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-notebook.yml/badge.svg)](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-notebook.yml)
  - [Dockerfile](./docker/notebook/Dockerfile)
- [![Build Docker - History Server](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-history-server.yml/badge.svg)](https://github.com/xuwenyihust/DataPulse/actions/workflows/build-docker-history-server.yml)
  - [Dockerfile](./docker/history-server/Dockerfile) 

## License
This project is licensed under the terms of the MIT license.

## Reference
- [Running Apache Spark on Kubernetes](https://medium.com/empathyco/running-apache-spark-on-kubernetes-2e64c73d0bb2)
- [spark-docker](https://github.com/apache/spark-docker)