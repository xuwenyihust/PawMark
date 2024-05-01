FROM apache/spark:3.5.0

USER root

# Install Python 3.11 and pip
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get install -y python3.11 python3.11-venv python3.11-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Python 3.11 as the default Python version
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1 && \
    update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
    python3.11 get-pip.py

RUN mkdir /opt/data/spark-warehouse
RUN chmod -R 777 /opt/data/spark-warehouse

USER spark
