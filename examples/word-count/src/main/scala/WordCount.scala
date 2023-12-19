import org.apache.spark.sql.SparkSession
import java.lang.Thread.sleep

object WordCount {
  def main(args: Array[String]) {
    // String to perform word count on
    val outputPath = args(0)
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

    val dfWithoutSchema = spark.createDataFrame(wordCounts)
    dfWithoutSchema
      .write
      .format("csv")
      .option("path", outputPath)
      .save()

    sleep(10000)  
    // Stop the SparkSession
    spark.stop()
  }
}
