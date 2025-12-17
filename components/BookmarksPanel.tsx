'use client'

import { X, Star, Trash2 } from 'lucide-react'

interface Bookmark {
  id: string
  url: string
  title: string
  favicon?: string
  createdAt: number
}

interface BookmarksPanelProps {
  bookmarks: Bookmark[]
  onBookmarkClick: (url: string) => void
  onDeleteBookmark: (id: string) => void
  onClose: () => void
}

export default function BookmarksPanel({
  bookmarks,
  onBookmarkClick,
  onDeleteBookmark,
  onClose,
}: BookmarksPanelProps) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-md sm:rounded-t-2xl rounded-t-2xl max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Bookmarks</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No bookmarks yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group">
                  <button onClick={() => onBookmarkClick(bookmark.url)} className="flex-1 flex items-center gap-3 min-w-0">
                    {bookmark.favicon && <img src={bookmark.favicon} alt="" className="w-6 h-6 rounded" />}
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{bookmark.title}</p>
                      <p className="text-xs text-gray-500 truncate">{bookmark.url}</p>
                    </div>
                  </button>
                  <button onClick={() => onDeleteBookmark(bookmark.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
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
