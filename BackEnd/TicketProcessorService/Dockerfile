FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements primero para aprovechar cache de Docker
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY ./app ./app

ENV PYTHONUNBUFFERED=1

# Railway proporciona la variable $PORT automáticamente
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}