# Use official Python image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js and npm for Vite
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project files
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Go back to backend root
WORKDIR /app

# Collect static files
RUN python manage.py collectstatic --noinput

# Run the app with gunicorn
CMD gunicorn medilink.wsgi:application --bind 0.0.0.0:$PORT
