# use latest python image
FROM python:3.11-slim
# Set the working directory in the container
WORKDIR /app
# Copy the requirements file to the working directory
COPY requirements.txt .
# Install the Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt
COPY src ./src
WORKDIR ./src
EXPOSE 5000
# Expose the port on which the Flask app will run (e.g., 5000)
CMD ["gunicorn", "--config", "gunicorn_config.py", "api:app"]