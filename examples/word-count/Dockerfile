# Use the official Apache Spark base image
FROM apache/spark:3.5.0

ARG VERSION
ARG JAR_FILE=target/word-count-${VERSION}.jar

ADD ${JAR_FILE} /opt/spark/app.jar

# Set the default command for the container to run your Spark application
# Adjust the command below according to your application's requirements
CMD ["ls", "-l", "/opt/spark"]
