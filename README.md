# Spark-on-Kubernetes
## Overview
A demo of running Spark on Kubernetes WITHOUT Spark operators.

## Architecture


## Versions

| Kubernetes Version | Spark Version |
| ------------------ | ------------- |
|  *TODO*            |     *TODO*    |

## Setup
### Minikube
*TODO*

### GCP
*TODO*

## Key Questions
- How to submit Spark jobs
    - CI/CD
    - Docker image
- Spark configuration
- How to schedule batch jobs
- How to handle work flow
- How to support Spark History Server
- How to support Jupyter Notebook
- How to support Spark Streaming
- How to support priority & preemption
- How to manage namespaces
    - Spark system namespace
    - Spark application namespace
- Shuffle
    - Shuffle tracking
    - External shuffle storage based on PVC
- Security
- Stress test
    - Simoultaneous concurrent jobs
    - Large jobs using lots of executors
    - ETCD 
        - Size usage
        - Compaction tuning
- Monitoring
    - ETCD
    - Logs
    - Spark Listeners
    - AI feedback
- Dashboard
    - Spark UI
    - Spark History Server
    - Kubernetes Dashboard
    - Prometheus
    - Grafana

## Reference
- [Running Apache Spark on Kubernetes](https://medium.com/empathyco/running-apache-spark-on-kubernetes-2e64c73d0bb2)
- [spark-docker](https://github.com/apache/spark-docker)