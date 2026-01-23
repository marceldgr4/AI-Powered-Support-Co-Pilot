FROM python:3.11-slim

WORKDIR /app

# Instalamos dependencias mínimas del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# 1. Copiamos el archivo de requerimientos al directorio actual (.)
COPY requirements.txt .

# 2. Instalamos las librerías de Python
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copiamos todo el resto del código
COPY . .

ENV PYTHONUNBUFFERED=1

# Railway inyectará automáticamente el valor de la variable $PORT
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}