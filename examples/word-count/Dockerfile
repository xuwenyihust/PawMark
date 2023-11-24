# Use the official Apache Spark base image
FROM apache/spark:3.5.0

# Set the working directory in the container
WORKDIR /opt/spark-apps

# Copy the JAR file into the container at /opt/spark-apps
ARG JAR_FILE=target/word-count-1.0-SNAPSHOT-jar-with-dependencies.jar
COPY ${JAR_FILE} app.jar

# Set the default command for the container to run your Spark application
# Adjust the command below according to your application's requirements
CMD ["spark-submit", "--class", "com.example.WordCount", "--master", "local[4]", "app.jar"]
