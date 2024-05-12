# Use an official Python runtime as a parent image
FROM python:3.11-slim

COPY requirements.txt /usr/src/app/requirements.txt
COPY ../../webapp/ /usr/src/app/

# Set the working directory in the container
WORKDIR /usr/src/app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
