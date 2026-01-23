-- ============================================
-- AI Support Co-Pilot - Supabase Setup
-- ============================================

-- Crear tabla tickets
CREATE TABLE IF NOT EXISTS tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    sentiment TEXT,
    processed BOOLEAN DEFAULT false NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_tickets_processed ON tickets(processed);
CREATE INDEX IF NOT EXISTS idx_tickets_sentiment ON tickets(sentiment);
CREATE INDEX IF NOT EXISTS idx_tickets_category ON tickets(category);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para updated_at
DROP TRIGGER IF EXISTS update_tickets_updated_at ON tickets;
CREATE TRIGGER update_tickets_updated_at
    BEFORE UPDATE ON tickets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Enable read access for all users" ON tickets;
DROP POLICY IF EXISTS "Enable insert for all users" ON tickets;
DROP POLICY IF EXISTS "Enable update for all users" ON tickets;
DROP POLICY IF EXISTS "Enable delete for all users" ON tickets;

-- Políticas RLS para permitir acceso público (para demo)
-- En producción, ajustar según necesidades de seguridad

-- Política para lectura
CREATE POLICY "Enable read access for all users" 
ON tickets FOR SELECT 
USING (true);

-- Política para inserción
CREATE POLICY "Enable insert for all users" 
ON tickets FOR INSERT 
WITH CHECK (true);

-- Política para actualización
CREATE POLICY "Enable update for all users" 
ON tickets FOR UPDATE 
USING (true);

-- Política para eliminación (opcional)
CREATE POLICY "Enable delete for all users" 
ON tickets FOR DELETE 
USING (true);

-- Habilitar Realtime para la tabla tickets
ALTER PUBLICATION supabase_realtime ADD TABLE tickets;

-- Crear función para obtener estadísticas
CREATE OR REPLACE FUNCTION get_ticket_stats()
RETURNS TABLE (
    total BIGINT,
    processed BIGINT,
    pending BIGINT,
    positivo BIGINT,
    neutral BIGINT,
    negativo BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::BIGINT as total,
        COUNT(*) FILTER (WHERE processed = true)::BIGINT as processed,
        COUNT(*) FILTER (WHERE processed = false)::BIGINT as pending,
        COUNT(*) FILTER (WHERE sentiment = 'Positivo')::BIGINT as positivo,
        COUNT(*) FILTER (WHERE sentiment = 'Neutral')::BIGINT as neutral,
        COUNT(*) FILTER (WHERE sentiment = 'Negativo')::BIGINT as negativo
    FROM tickets;
END;
$$ LANGUAGE plpgsql;

-- Insertar datos de ejemplo (opcional)
INSERT INTO tickets (description, category, sentiment, processed) VALUES
    ('Mi conexión a internet está muy lenta desde esta mañana', 'Técnico', 'Negativo', true),
    ('Excelente servicio, muy satisfecho con la atención', 'Comercial', 'Positivo', true),
    ('Necesito información sobre mi factura del mes pasado', 'Facturación', 'Neutral', true),
    ('El sistema está caído y no puedo acceder', 'Técnico', 'Negativo', true),
    ('¿Cuándo van a implementar la nueva funcionalidad?', 'Solicitud de Funcionalidad', 'Neutral', true);

-- Verificar la configuración
SELECT 
    'Tabla creada exitosamente' as status,
    COUNT(*) as total_tickets
FROM tickets;

-- Mostrar políticas RLS activas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'tickets';

-- Verificar que Realtime está habilitado
SELECT 
    schemaname,
    tablename,
    pubname
FROM pg_publication_tables
WHERE tablename = 'tickets';