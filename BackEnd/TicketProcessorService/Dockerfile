FROM python:3.11-slim

WORKDIR /app

# Instalación de dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# 1. Copiamos el requirements primero (para aprovechar el cache de capas)
COPY BackEnd/TicketProcessorService/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. Copiamos todo el contenido de TicketProcessorService a /app
# Esto creará /app/app/main.py, /app/app/services.py, etc.
COPY BackEnd/TicketProcessorService/ .

# 3. Importante: Aseguramos que el directorio actual esté en el path
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# 4. El comando debe apuntar a la carpeta 'app' y al objeto 'app' dentro de main
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]