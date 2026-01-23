# AI-Powered Support Co-Pilot

Sistema completo de gestión de tickets de soporte con análisis automático mediante IA, actualizaciones en tiempo real y notificaciones inteligentes.

## URLs del Proyecto Activo

- **Dashboard Frontend (Vercel):**  
  https://aipoweredsupport-co-pilot-2a3s.vercel.app

- **API Backend (Python / FastAPI – Railway):**  
  https://railway.com/project/98297f36-de9e-4c07-aad1-16e35f2ad6b9?environmentId=44f87bc4-7ea4-4bdb-9d45-37ef94562ebc

## Estructura del Repositorio

```
.
├── supabase/
│   └── setup.sql
├── python-api/
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
├── n8n-workflow/
│   └── workflow.json
├── frontend/
│   └── src/
└── README.md
```

## Descripción General

El sistema permite crear, procesar y analizar tickets de soporte de forma automática utilizando IA para clasificación y análisis de sentimiento, con visualización en tiempo real.

## Estrategia de Prompt Engineering

Se utiliza un enfoque de zero-shot learning con salida estructurada en JSON para garantizar consistencia, auditabilidad y compatibilidad con validación mediante Pydantic.

```python
You are an expert customer support ticket analyzer.
Analyze the following support ticket description and determine its category and sentiment.

Return only valid JSON:
{
  "category": "Técnico|Facturación|Cuenta|Solicitud de Funcionalidad|Otro",
  "sentiment": "Positivo|Neutral|Negativo",
  "reasoning": "Brief explanation"
}
```

Este enfoque permite:
- Clasificación precisa sin entrenamiento previo
- Salida estructurada y validable
- Explicabilidad del resultado
- Soporte multilingüe

## Tecnologías

Frontend: React, TypeScript, Vite, Tailwind CSS  
Backend: Python 3.11, FastAPI, LangChain, OpenAI  
Base de Datos: Supabase (PostgreSQL, Realtime, RLS)  
Automatización: n8n

## Autor

Marcel Díaz Granados Robayo  
GitHub: marcel-diaz-granados-robayo

## Licencia

MIT License
