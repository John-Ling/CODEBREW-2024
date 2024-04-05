# Use an official Python runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code to the working directory
COPY . .

# Expose the port on which the Flask app will run (e.g., 5000)
EXPOSE 5000

# Run the Flask app
CMD ["python", "./src/api.py"]
