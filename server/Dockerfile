FROM python:3.11-slim

WORKDIR /server

COPY . /server
COPY ../requirements.txt /server

RUN pip install -r requirements.txt

EXPOSE 5002

CMD ["python", "app.py"]