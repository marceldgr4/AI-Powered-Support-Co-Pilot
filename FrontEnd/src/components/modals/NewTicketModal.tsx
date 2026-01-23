import { useState } from 'react'

interface NewTicketModalProps {
  onClose: () => void
  onSubmit: (description: string) => Promise<void>
}

export function NewTicketModal({ onClose, onSubmit }: NewTicketModalProps) {
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(description)
      setDescription('')
    } catch (error) {
      console.error('Error creating ticket:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl transform transition-all animate-scale-in">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Crear Nuevo Ticket</h2>
        <p className="text-slate-600 mb-6">Describe tu problema o consulta y nuestro sistema de IA lo procesará automáticamente</p>
        
        <div className="mb-6">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Mi conexión a internet está fallando constantemente desde esta mañana..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
            rows={6}
            disabled={isSubmitting}
          />
          <p className="text-sm text-slate-500 mt-2">
            {description.length} caracteres
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !description.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creando...
              </span>
            ) : (
              '✓ Crear Ticket'
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-all disabled:opacity-50 transform active:scale-95"
          >
            Cancelar
          </button>
        </div>
      </div>

      
    </div>
  )
}