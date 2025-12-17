'use client';

import { useState, useEffect } from 'react';
import AddressBar from '@/components/AddressBar';
import WebView from '@/components/WebView';
import BottomToolbar from '@/components/BottomToolbar';
import BookmarksPanel from '@/components/BookmarksPanel';
import HistoryPanel from '@/components/HistoryPanel';
import CastModal from '@/components/CastModal';

interface Bookmark {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  createdAt: number;
}

interface HistoryItem {
  id: string;
  url: string;
  title: string;
  visitedAt: number;
  favicon?: string;
}

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState<string>('https://www.google.com');
  const [inputUrl, setInputUrl] = useState<string>('https://www.google.com');
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [favicon, setFavicon] = useState<string>('');
  
  // Panel states
  const [showBookmarks, setShowBookmarks] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showCastModal, setShowCastModal] = useState<boolean>(false);
  
  // Data states
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Load bookmarks and history from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    const savedHistory = localStorage.getItem('history');
    
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
    
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }, []);

  // Check if current URL is bookmarked
  useEffect(() => {
    const bookmarked = bookmarks.some(bookmark => bookmark.url === currentUrl);
    setIsBookmarked(bookmarked);
  }, [currentUrl, bookmarks]);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const handleNavigate = (url: string) => {
    let finalUrl = url.trim();
    
    // If it doesn't start with http:// or https://, add https://
    if (finalUrl && !finalUrl.match(/^https?:\/\//i)) {
      // Check if it looks like a domain or a search query
      if (finalUrl.includes('.') && !finalUrl.includes(' ')) {
        finalUrl = `https://${finalUrl}`;
      } else {
        // Treat as Google search
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
      }
    }
    
    setCurrentUrl(finalUrl);
    setInputUrl(finalUrl);
    
    // Add to history
    addToHistory(finalUrl, pageTitle || 'Loading...');
  };

  const handleUrlChange = (url: string) => {
    setInputUrl(url);
  };

  const handleGoBack = () => {
    // This will be implemented by the WebView component
    window.history.back();
  };

  const handleGoForward = () => {
    // This will be implemented by the WebView component
    window.history.forward();
  };

  const handleRefresh = () => {
    setCurrentUrl(currentUrl + ''); // Trigger re-render
    setIsLoading(true);
  };

  const handleHome = () => {
    handleNavigate('https://www.google.com');
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      // Remove bookmark
      setBookmarks(bookmarks.filter(bookmark => bookmark.url !== currentUrl));
    } else {
      // Add bookmark
      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        url: currentUrl,
        title: pageTitle || currentUrl,
        favicon: favicon,
        createdAt: Date.now(),
      };
      setBookmarks([newBookmark, ...bookmarks]);
    }
  };

  const addToHistory = (url: string, title: string) => {
    // Don't add duplicate consecutive entries
    if (history.length > 0 && history[0].url === url) {
      return;
    }
    
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      url: url,
      title: title || url,
      visitedAt: Date.now(),
      favicon: favicon,
    };
    
    // Keep only last 100 history items
    const updatedHistory = [newHistoryItem, ...history].slice(0, 100);
    setHistory(updatedHistory);
  };

  const handleBookmarkClick = (url: string) => {
    setShowBookmarks(false);
    handleNavigate(url);
  };

  const handleHistoryClick = (url: string) => {
    setShowHistory(false);
    handleNavigate(url);
  };

  const handleDeleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleTitleChange = (title: string) => {
    setPageTitle(title);
  };

  const handleFaviconChange = (faviconUrl: string) => {
    setFavicon(faviconUrl);
  };

  const handleNavigationStateChange = (state: { canGoBack: boolean; canGoForward: boolean }) => {
    setCanGoBack(state.canGoBack);
    setCanGoForward(state.canGoForward);
  };

  return (
    <main className="flex flex-col h-screen bg-gray-100">
      {/* Address Bar */}
      <AddressBar
        url={inputUrl}
        onUrlChange={handleUrlChange}
        onNavigate={handleNavigate}
        isLoading={isLoading}
        pageTitle={pageTitle}
        favicon={favicon}
        isBookmarked={isBookmarked}
        onToggleBookmark={toggleBookmark}
      />

      {/* Web View */}
      <div className="flex-1 overflow-hidden relative">
        <WebView
          url={currentUrl}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onTitleChange={handleTitleChange}
          onFaviconChange={handleFaviconChange}
          onNavigationStateChange={handleNavigationStateChange}
          onUrlChange={(url) => {
            setCurrentUrl(url);
            setInputUrl(url);
          }}
        />

        {/* Bookmarks Panel */}
        {showBookmarks && (
          <BookmarksPanel
            bookmarks={bookmarks}
            onBookmarkClick={handleBookmarkClick}
            onDeleteBookmark={handleDeleteBookmark}
            onClose={() => setShowBookmarks(false)}
          />
        )}

        {/* History Panel */}
        {showHistory && (
          <HistoryPanel
            history={history}
            onHistoryClick={handleHistoryClick}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
            onClose={() => setShowHistory(false)}
          />
        )}
      </div>

      {/* Bottom Toolbar */}
      <BottomToolbar
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onRefresh={handleRefresh}
        onHome={handleHome}
        onBookmarks={() => {
          setShowBookmarks(!showBookmarks);
          setShowHistory(false);
        }}
        onHistory={() => {
          setShowHistory(!showHistory);
          setShowBookmarks(false);
        }}
        onCast={() => setShowCastModal(true)}
        showBookmarks={showBookmarks}
        showHistory={showHistory}
      />

      {/* Cast Modal */}
      {showCastModal && (
        <CastModal
          currentUrl={currentUrl}
          onClose={() => setShowCastModal(false)}
        />
      )}
    </main>
  );
}
