# Use a Python base image
FROM python:3.11-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application code
COPY . /app/

# Expose port 5050 (the port Flask app runs on)
EXPOSE 5050

# Command to run the Flask application
CMD ["python", "app.py"]
