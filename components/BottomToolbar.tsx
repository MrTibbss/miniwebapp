'use client'

import { ChevronLeft, ChevronRight, Home, RefreshCw, Bookmark, Clock, Send } from 'lucide-react'

interface BottomToolbarProps {
  canGoBack: boolean
  canGoForward: boolean
  onGoBack: () => void
  onGoForward: () => void
  onRefresh: () => void
  onHome: () => void
  onBookmarks: () => void
  onHistory: () => void
  onCast: () => void
  showBookmarks: boolean
  showHistory: boolean
}

export default function BottomToolbar({
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onRefresh,
  onHome,
  onBookmarks,
  onHistory,
  onCast,
  showBookmarks,
  showHistory,
}: BottomToolbarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around px-2 py-3">
        <button onClick={onGoBack} disabled={!canGoBack} className={`p-3 rounded-full transition-all active:scale-95 ${canGoBack ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={onGoForward} disabled={!canGoForward} className={`p-3 rounded-full transition-all active:scale-95 ${canGoForward ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}>
          <ChevronRight className="w-6 h-6" />
        </button>
        <button onClick={onHome} className="p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-95">
          <Home className="w-6 h-6" />
        </button>
        <button onClick={onRefresh} className="p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-95">
          <RefreshCw className="w-6 h-6" />
        </button>
        <button onClick={onBookmarks} className={`p-3 rounded-full transition-all active:scale-95 ${showBookmarks ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <Bookmark className="w-6 h-6" />
        </button>
        <button onClick={onHistory} className={`p-3 rounded-full transition-all active:scale-95 ${showHistory ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <Clock className="w-6 h-6" />
        </button>
        <button onClick={onCast} className="p-3 rounded-full bg-primary hover:bg-secondary text-white transition-all active:scale-95 shadow-md">
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
