import { useState, useCallback } from 'react'

type NotificationType = 'success' | 'error' | 'info'

interface Notification {
  message: string
  type: NotificationType
}

export function useNotification() {
  const [notification, setNotification] = useState<Notification | null>(null)

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    setNotification({ message, type })
    
    // Auto-hide después de 4 segundos
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(null)
  }, [])

  return {
    notification,
    showNotification,
    hideNotification,
  }
}