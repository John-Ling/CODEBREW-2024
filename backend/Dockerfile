# Use an official Python runtime as the base image
FROM python:3.11-slim
# Set the working directory in the container
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY src ./src
WORKDIR ./src
# Expose the port on which the Flask app will run (e.g., 5000)
EXPOSE 5000
CMD ["gunicorn", "--config", "gunicorn_config.py", "api:app"]