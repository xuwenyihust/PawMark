FROM apache/spark:3.5.0

# Set environment variables
ENV SPARK_HOME=/opt/spark
# Install GCS Connector
RUN wget https://repo1.maven.org/maven2/com/google/cloud/bigdataoss/gcs-connector/hadoop3-2.2.0/gcs-connector-hadoop3-2.2.0-shaded.jar -P $SPARK_HOME/jars/

# Expose port 18080 for History Server UI
EXPOSE 18080

# Start the History Server
CMD ["/opt/spark/bin/spark-class", "org.apache.spark.deploy.history.HistoryServer"]
