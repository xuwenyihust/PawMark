import org.apache.spark.sql.SparkSession
import java.lang.Thread.sleep

object WordCount {
  def main(args: Array[String]) {
    val inputPath = args(0)
    val outputPath = args(1)

    // Create SparkSession
    val spark = SparkSession
      .builder
      .appName("Word Count")
      .getOrCreate()

    import spark.implicits._

    val textFile = spark.read.text(inputPath).as[String]

    // Split each line into words
    val words = textFile.flatMap(line => line.split("\\W+"))  // Split on non-word characters

    // Count each word
    val wordCounts = words.groupBy("value").count()

    wordCounts
      .write
      .format("csv")
      .option("path", outputPath)
      .save()

    sleep(10000)  
    // Stop the SparkSession
    spark.stop()
  }
}
