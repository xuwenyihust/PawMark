import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def main():
   logger.info("Starting task...")
   logger.info("Task completed successfully!")

if __name__ == "__main__":
   main()