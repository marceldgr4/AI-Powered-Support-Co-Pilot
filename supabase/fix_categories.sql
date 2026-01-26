-- ============================================
-- FIX: Update Categories and Add Reasoning
-- ============================================

-- 1. Asegurarnos que la columna reasoning existe
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tickets' AND column_name='reasoning') THEN
        ALTER TABLE tickets ADD COLUMN reasoning TEXT;
    END IF;
END $$;

-- 2. Eliminar la restricción antigua que está fallando
-- Nota: El nombre 'tickets_category_check' es el estándar, pero lo borramos para recrearlo
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_category_check;

-- 3. Crear la nueva restricción que incluya 'Otro' y 'Solicitud de Funcionalidad'
ALTER TABLE tickets ADD CONSTRAINT tickets_category_check 
    CHECK (category IN ('Técnico', 'Facturación', 'Comercial', 'Solicitud de Funcionalidad', 'Otro'));

-- 4. Actualizar estadísticas para incluir el nuevo campo (opcional)
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
