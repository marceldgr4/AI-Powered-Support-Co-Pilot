AI-Powered Support Co-Pilot
Sistema completo de gestión de tickets de soporte con análisis de IA en tiempo real.

🚀 URLs del Proyecto Desplegado
Dashboard Frontend: [URL de tu Vercel]
API Backend: [URL de tu Railway/Render]
Base de Datos: Supabase
📋 Descripción
Sistema que procesa tickets de soporte automáticamente usando IA para:

Clasificar tickets por categoría (Técnico, Facturación, Comercial)
Analizar sentimiento (Positivo, Neutral, Negativo)
Enviar notificaciones automáticas para tickets negativos
Actualización en tiempo real con Supabase Realtime
🏗️ Arquitectura
┌─────────────┐ ┌──────────────┐ ┌─────────────┐
│ Frontend │ ──── │ Supabase │ ──── │ Backend │
│ (Vercel) │ │ (Database) │ │ (Railway) │
└─────────────┘ └──────────────┘ └─────────────┘
│
│
┌──────┴───────┐
│ n8n │
│ (Automation) │
└──────────────┘
🛠️ Stack Tecnológico
Frontend
React 19 + TypeScript
Vite
Tailwind CSS
Supabase Client
Date-fns
Lucide React (iconos)
Backend
Python 3.11
FastAPI
LangChain + OpenAI
Supabase Client
Pydantic
Base de Datos
Supabase (PostgreSQL)
Realtime Subscriptions
Row Level Security (RLS)
Automatización
n8n (Low-code automation)
📦 Instalación Local
Prerequisitos
Node.js 20+
Python 3.11+
Cuenta de Supabase
API Key de OpenAI

1. Clonar el repositorio
   bash
   git clone https://github.com/tu-usuario/ai-powered-support-co-pilot.git
   cd ai-powered-support-co-pilot
2. Configurar variables de entorno
   bash
   cp .env.example .env
   Editar .env con tus credenciales:

env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_KEY=tu_service_key
OPENAI_API_KEY=tu_openai_api_key
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
VITE_API_URL=http://localhost:8000 3. Configurar Base de Datos (Supabase)
Ejecutar el SQL en el editor de Supabase:

sql
-- Crear tabla tickets
CREATE TABLE tickets (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
description TEXT NOT NULL,
category TEXT,
sentiment TEXT,
processed BOOLEAN DEFAULT false,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Crear índices
CREATE INDEX idx_tickets_processed ON tickets(processed);
CREATE INDEX idx_tickets_sentiment ON tickets(sentiment);
CREATE INDEX idx_tickets_created_at ON tickets(created_at DESC);

-- Habilitar Row Level Security
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Enable read access for all users" ON tickets
FOR SELECT USING (true);

-- Política para permitir inserción pública
CREATE POLICY "Enable insert for all users" ON tickets
FOR INSERT WITH CHECK (true);

-- Política para permitir actualización pública
CREATE POLICY "Enable update for all users" ON tickets
FOR UPDATE USING (true);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE tickets; 4. Instalar y ejecutar Backend
bash
cd BackEnd/TicketProcessorService

# Crear entorno virtual

python -m venv venv
source venv/bin/activate # En Windows: venv\Scripts\activate

# Instalar dependencias

pip install -r requirements.txt

# Ejecutar servidor

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
El backend estará disponible en: http://localhost:8000

5. Instalar y ejecutar Frontend
   bash
   cd FrontEnd/front

# Instalar dependencias

npm install

# Ejecutar en modo desarrollo

npm run dev
El frontend estará disponible en: http://localhost:5173

🚀 Despliegue
Frontend (Vercel)
Conectar repositorio a Vercel
Configurar Build Settings:
Framework Preset: Vite
Root Directory: FrontEnd/front
Build Command: npm run build
Output Directory: dist
Configurar Variables de Entorno:
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_anon_key
VITE_API_URL=https://tu-backend.railway.app
Backend (Railway/Render)
Railway:
Crear nuevo proyecto en Railway
Conectar repositorio
Configurar Root Directory: BackEnd/TicketProcessorService
Railway detectará automáticamente el Dockerfile
Agregar variables de entorno
Render:
Crear Web Service
Conectar repositorio
Configurar:
Root Directory: BackEnd/TicketProcessorService
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Agregar variables de entorno
n8n Workflow
Importar BackEnd/n8n/n8nWorkflow.json en tu instancia de n8n
Configurar credenciales:
Supabase API credentials
Python API Auth (opcional)
SMTP credentials (para emails)
Slack Webhook URL (opcional)
Activar el workflow
🎯 Estrategia de Prompt Engineering
El sistema utiliza un prompt cuidadosamente diseñado para clasificación precisa:

python
"""You are an expert customer support ticket analyzer.
Analyze the following support ticket description and determine its category and sentiment.
Provide a brief explanation for your choice in the 'reasoning' field.

Ticket Description:
{description}

Return only valid JSON with the following structure:
{
"category": "Técnico|Facturación|Cuenta|Solicitud de Funcionalidad|Otro",
"sentiment": "Positivo|Neutral|Negativo",
"reasoning": "Brief explanation"
}
"""
Ventajas del enfoque:
Zero-shot learning: No requiere entrenamiento previo
Structured output: Garantiza respuestas consistentes con Pydantic
Explicabilidad: El campo 'reasoning' permite auditar decisiones
Multilingüe: Funciona en español e inglés
📊 Funcionalidades
✅ Creación de tickets en tiempo real
✅ Análisis automático con IA (categoría + sentimiento)
✅ Dashboard con estadísticas en vivo
✅ Filtros por estado, sentimiento y búsqueda
✅ Notificaciones automáticas para tickets negativos
✅ Actualización en tiempo real (Supabase Realtime)
✅ UI moderna y responsive
🧪 Testing
Backend
bash
cd BackEnd/TicketProcessorService
python test_service.py
Health Check
bash
curl http://localhost:8000/health
Process Ticket
bash
curl -X POST http://localhost:8000/process-ticket \
 -H "Content-Type: application/json" \
 -d '{
"ticket_id": "uuid-here",
"description": "Mi internet está lento"
}'
Estructura del Proyecto
.
├── BackEnd/
│ ├── TicketProcessorService/
│ │ ├── app/
│ │ │ ├── **init**.py
│ │ │ ├── main.py
│ │ │ ├── models.py
│ │ │ ├── services.py
│ │ │ └── config.py
│ │ ├── Dockerfile
│ │ ├── requirements.txt
│ │ └── test_service.py
│ └── n8n/
│ └── n8nWorkflow.json
├── FrontEnd/
│ └── front/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── types/
│ │ ├── api/
│ │ └── App.tsx
│ ├── package.json
│ └── vite.config.ts
├── .env.example
├── docker-compose.yml
└── README.md
Contribuir
Las contribuciones son bienvenidas. Por favor:

Fork el proyecto
Crea tu Feature Branch (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la Branch (git push origin feature/AmazingFeature)
Abre un Pull Request
📄 Licencia
Este proyecto está bajo la Licencia MIT.

👤 Autor
marcel-diaz-granados-robayo - GitHub

🙏 Agradecimientos
OpenAI por GPT-3.5
Supabase por la infraestructura
Anthropic por Claude (documentación y pruebas)
