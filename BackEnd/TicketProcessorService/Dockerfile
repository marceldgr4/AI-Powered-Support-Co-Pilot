FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiamos especificando la subcarpeta
COPY BackEnd/TicketProcessorService/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiamos todo el contenido de la subcarpeta al WORKDIR
COPY BackEnd/TicketProcessorService/ .

ENV PYTHONUNBUFFERED=1

CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}