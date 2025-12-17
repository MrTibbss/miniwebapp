'use client'

import { useEffect, useRef } from 'react'

interface WebViewProps {
  url: string
  onLoadStart: () => void
  onLoadEnd: () => void
  onTitleChange: (title: string) => void
  onFaviconChange: (favicon: string) => void
  onNavigationStateChange: (state: { canGoBack: boolean; canGoForward: boolean }) => void
  onUrlChange: (url: string) => void
}

export default function WebView({
  url,
  onLoadStart,
  onLoadEnd,
  onTitleChange,
  onFaviconChange,
  onNavigationStateChange,
  onUrlChange,
}: WebViewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!url) return
    onLoadStart()
    const timer = setTimeout(() => { onLoadEnd() }, 1000)
    return () => clearTimeout(timer)
  }, [url, onLoadStart, onLoadEnd])

  useEffect(() => {
    if (url) {
      try {
        const urlObj = new URL(url)
        onTitleChange(urlObj.hostname)
        onFaviconChange(`https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`)
      } catch (e) {
        console.error('Invalid URL:', e)
      }
    }
  }, [url, onTitleChange, onFaviconChange])

  if (!url) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🌐</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Farcaster Browser</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Enter a URL or search term to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 relative overflow-hidden">
      <iframe ref={iframeRef} src={url} className="w-full h-full border-0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" title="Web Browser" />
    </div>
  )
}
