FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY src ./src
WORKDIR ./src
EXPOSE 5000
CMD ["gunicorn", "--config", "gunicorn_config.py", "api:app"]