interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export function Notification({ message, type, onClose }: NotificationProps) {
  const colors = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  }

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl border-2 animate-slide-in ${colors[type]}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">
          {icons[type]}
        </span>
        <p className="font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-lg hover:scale-110 transition-transform"
        >
          ✕
        </button>
      </div>
      <style >{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}