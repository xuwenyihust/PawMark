source bin/submit_spark_app.sh \
    --image "wenyixu101/word-count:test-3" \
    --name "word-count" \
    --main "WordCount" \
    --jar "/opt/spark/app.jar"

