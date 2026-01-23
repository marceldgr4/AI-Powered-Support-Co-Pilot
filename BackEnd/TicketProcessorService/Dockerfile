FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements primero para aprovechar cache de Docker
# Copiar todo el contenido del servicio
COPY requirements.txt

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

ENV PYTHONUNBUFFERED=1

# Railway proporciona la variable $PORT automáticamente
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:}
