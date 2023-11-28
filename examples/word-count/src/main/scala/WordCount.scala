import org.apache.spark.sql.SparkSession
import java.lang.Thread.sleep

object WordCount {
  def main(args: Array[String]) {
    // String to perform word count on
    val inputString = "Hello Spark. Hello world. Spark is fun."

    // Create SparkSession
    val spark = SparkSession
      .builder
      .appName("Word Count")
      .getOrCreate()

    // Parallelize the string into an RDD
    val textRdd = spark.sparkContext.parallelize(Seq(inputString))

    // Split each line into words
    val words = textRdd.flatMap(line => line.split("\\W+"))  // Split on non-word characters

    // Count each word
    val wordCounts = words.map(word => (word, 1)).reduceByKey(_ + _)

    // Collect and print word counts
    wordCounts.collect().foreach(println)

    println(22)

    val dfWithoutSchema = spark.createDataFrame(wordCounts)
    dfWithoutSchema
      .write
      .format("csv")
      .option("path", "gs://data-platform-bucket-20231126/wordcount/output")
      .save()

    sleep(120000)  // Wait 60 seconds for the Spark job to finish

    println(33)

    // Stop the SparkSession
    spark.stop()
  }
}
