'use client'

import { useState, FormEvent } from 'react'
import { Search, Lock, Star, Loader2 } from 'lucide-react'
import WalletButton from './WalletButton'

interface AddressBarProps {
  url: string
  onUrlChange: (url: string) => void
  onNavigate: (url: string) => void
  isLoading: boolean
  pageTitle: string
  favicon?: string
  isBookmarked: boolean
  onToggleBookmark: () => void
}

export default function AddressBar({
  url,
  onUrlChange,
  onNavigate,
  isLoading,
  pageTitle,
  favicon,
  isBookmarked,
  onToggleBookmark,
}: AddressBarProps) {
  const [inputValue, setInputValue] = useState(url)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onNavigate(inputValue.trim())
    }
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    onUrlChange(value)
  }

  const isSecure = url.startsWith('https://')

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top shadow-sm">
      <div className="flex items-center gap-2 p-3">
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2.5">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
          ) : isSecure && url ? (
            <Lock className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
          )}
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search or enter URL..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 min-w-0"
          />

          {url && (
            <button
              type="button"
              onClick={onToggleBookmark}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors flex-shrink-0"
            >
              <Star 
                className={`w-4 h-4 ${
                  isBookmarked 
                    ? 'text-yellow-500 fill-yellow-500' 
                    : 'text-gray-500'
                }`} 
              />
            </button>
          )}
        </form>

        <WalletButton />
      </div>
    </div>
  )
}
