"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useMainLoader() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useMainLoader must be used within a MainLoaderProvider');
  }
  return context;
}

interface MainLoaderProviderProps {
  children: ReactNode;
}

export function MainLoaderProvider({ children }: MainLoaderProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = useCallback(() => {
    setLoadingCount(prev => prev + 1);
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setLoadingCount(prev => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        setIsLoading(false);
        return 0;
      }
      return newCount;
    });
  }, []);

  // Use loadingCount to prevent premature hiding
  const shouldShowLoader = loadingCount > 0 || isLoading;

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, showLoader, hideLoader }}>
      {children}
      <MainLoaderOverlay isLoading={shouldShowLoader} />
    </LoadingContext.Provider>
  );
}

interface MainLoaderOverlayProps {
  isLoading: boolean;
}

function MainLoaderOverlay({ isLoading }: MainLoaderOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative">
        {/* Main spinner */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-blue-100 rounded-full animate-ping opacity-20"></div>
        
        {/* Loading text */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 font-medium">Loading...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait while we prepare your content</p>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

// Hook for automatic loading on route changes
export function useRouteLoader() {
  const { showLoader, hideLoader } = useMainLoader();

  useEffect(() => {
    const handleStart = () => {
      showLoader();
      // Auto-hide after a short delay to prevent stuck loading states
      setTimeout(() => hideLoader(), 2000);
    };

    // Add event listeners for Next.js router events
    if (typeof window !== 'undefined') {
      // Listen for navigation events
      window.addEventListener('popstate', handleStart);
      
      // Listen for link clicks (this is a fallback)
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link && link.href && !link.href.startsWith('javascript:') && !link.href.startsWith('#')) {
          const currentPath = window.location.pathname;
          const newPath = new URL(link.href).pathname;
          if (currentPath !== newPath) {
            handleStart();
          }
        }
      });
    }
    
    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', handleStart);
      }
    };
  }, [showLoader, hideLoader]);
} 