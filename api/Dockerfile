# Base Image
FROM python:3.9.6-slim

# Install netcat
RUN apt-get update && \
    apt-get -y install netcat && \
    apt-get clean

# set working directory
WORKDIR /usr/src/app


# add and install requirements
COPY ./requirements.txt /usr/src/app/requirements.txt
#COPY ./api_secrets.py /usr/src/app/api_secrets.py
RUN pip install -r requirements.txt


# add app
COPY . /usr/src/app

# run server
CMD python server.py