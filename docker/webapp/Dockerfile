# Use an official Python runtime as a parent image
FROM python:3.11-slim

COPY requirements.txt /app/requirements.txt
COPY ../notebook/startup.py /app/startup.py
COPY ../../webapp /app

# Set the working directory in the container
WORKDIR /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
