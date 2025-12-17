'use client'

import { X, Clock, Trash2 } from 'lucide-react'

interface HistoryItem {
  id: string
  url: string
  title: string
  visitedAt: number
  favicon?: string
}

interface HistoryPanelProps {
  history: HistoryItem[]
  onHistoryClick: (url: string) => void
  onDeleteHistoryItem: (id: string) => void
  onClearHistory: () => void
  onClose: () => void
}

export default function HistoryPanel({
  history,
  onHistoryClick,
  onDeleteHistoryItem,
  onClearHistory,
  onClose,
}: HistoryPanelProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-md sm:rounded-t-2xl rounded-t-2xl max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">History</h2>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button onClick={onClearHistory} className="text-xs text-red-500 hover:text-red-600 font-medium px-3 py-1 hover:bg-red-50 rounded-full">Clear All</button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No browsing history</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group">
                  <button onClick={() => onHistoryClick(item.url)} className="flex-1 flex items-center gap-3 min-w-0">
                    {item.favicon && <img src={item.favicon} alt="" className="w-6 h-6 rounded" />}
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500 truncate flex-1">{item.url}</p>
                        <p className="text-xs text-gray-400 whitespace-nowrap">{formatTime(item.visitedAt)}</p>
                      </div>
                    </div>
                  </button>
                  <button onClick={() => onDeleteHistoryItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
