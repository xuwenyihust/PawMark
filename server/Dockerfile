FROM python:3.11-slim

WORKDIR /server

COPY . /server

RUN pip install -r requirements.txt

EXPOSE 5002

CMD ["python", "run.py"]