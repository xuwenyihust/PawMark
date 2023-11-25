#!/bin/bash

# Initialize variables
image=""
name=""
main=""
jar=""
args=""

arg_check() {
    local LONGOPTS=image:,name:,main:,jar:,args:
    # Parse the arguments
    PARSED=$(getopt --longoptions=$LONGOPTS -- "$@")
    if [ $? -ne 0 ]; then
        # getopt will print an error message
        exit 2
    fi

    echo "Arguments before parsing: $@"
    # Use eval with $PARSED to properly handle the quoting
    eval set -- "$PARSED"
    echo "Arguments after parsing: $PARSED"

    # Extract the arguments
    while true; do
        case "$1" in
            --image)
                image="$2"
                shift 2
                ;;
            --name)
                name="$2"
                shift 2
                ;;
            --main)
                main="$2"
                shift 2
                ;;
            --jar)
                jar="$2"
                shift 2
                ;;
            --args)
                args="$2"
                shift 2
                ;;
            --)
                shift
                ;;
            *)
                break
                ;;
        esac
    done

    # Check if required arguments were provided
    if [ -z "$image" ]; then
        echo "Error: Argument for --image is required"
        return 1
    fi

    if [ -z "$name" ]; then
        echo "Error: Argument for --name is required"
        return 1
    fi

    if [ -z "${main}" ]; then
        echo "Error: Argument for --main is required"
        return 1
    fi

    if [ -z "$jar" ]; then
        echo "Error: Argument for --jar is required"
        return 1
    fi

    echo "image: $image"
    echo "name: $name"
    echo "main: $main"   
    echo "jar: $jar"
    echo "args: $args"
}

arg_check "$@"
parse_status=$?

if [ $parse_status -ne 0 ]; then
    echo "An error occurred in arg_check"
# elif

else

fi


# Set the path to your spark-submit binary if not in PATH
# SPARK_SUBMIT="/path/to/spark/bin/spark-submit"

# APP_NAME="spark-app"
# PROJECT_HOME=$(pwd)

# # Define your Spark application's main class
# # MAIN_CLASS="org.apache.spark.examples.SparkPi"
# MAIN_CLASS="WordCount"

# # APP_JAR="/opt/spark/examples/jars/spark-examples_${SCALA_VERSION}-${SPARK_VERSION}.jar"
# APP_JAR="/opt/spark/app.jar"
# DRIVER_TEMPLATE="$PROJECT_HOME/kubernetes/spark-driver-template.yaml"

# # Set other Spark configurations and application arguments
# APP_ARGS="1000"

# K8S_NAMESPACE="spark-dev"
# SERVICE_ACCOUNT="spark"
# # DOCKER_IMAGE="apache/spark:${SPARK_VERSION}"
# DOCKER_IMAGE="wenyixu101/word-count:test-3"

# FILE_UPLOAD_PATH="/tmp/spark-uploads"

# # The command to submit the Spark job
# spark-submit \
#     --class $MAIN_CLASS \
#     --master k8s://$KUBERNETES_API_SERVER_HOST:$KUBERNETES_API_SERVER_PORT \
#     --deploy-mode cluster \
#     --driver-cores 1 \
#     --driver-memory 1g \
#     --num-executors 1 \
#     --executor-cores 1 \
#     --executor-memory 1g \
#     --name $APP_NAME \
#     --conf spark.kubernetes.driver.podTemplateFile=$DRIVER_TEMPLATE \
#     --conf spark.kubernetes.container.image=$DOCKER_IMAGE \
#     --conf spark.kubernetes.namespace=$K8S_NAMESPACE \
#     --conf spark.kubernetes.authenticate.driver.serviceAccountName=$SERVICE_ACCOUNT \
#     --conf spark.kubernetes.authenticate.executor.serviceAccountName=$SERVICE_ACCOUNT \
#     --conf spark.kubernetes.file.upload.path=$FILE_UPLOAD_PATH \
#     --conf spark.kubernetes.driver.label.app=spark \
#     local://$APP_JAR \
#     $APP_ARGS



