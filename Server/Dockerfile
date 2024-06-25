# Use ARM-compatible Python image as base image
FROM arm64v8/python:3.11

# Set working directory
WORKDIR /app

# Copy requirements.txt
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Expose port 5050
EXPOSE 5050

# Command to run the Flask app
CMD ["python", "app.py"]
