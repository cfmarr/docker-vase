FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install numpy

COPY . .

CMD [ "python", "./run.py" ]
