"use client";
import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMainLoader } from '@/components/ui/MainLoader';

function NavigationProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showLoader, hideLoader } = useMainLoader();
  const previousPath = useRef(pathname);
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only show loader if we're actually changing routes
    if (previousPath.current !== pathname) {
      // Clear any existing timeout
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }

      // Show loader
      showLoader();
      
      // Hide loader after a delay (simulates actual loading time)
      loadingTimeout.current = setTimeout(() => {
        hideLoader();
      }, 800); // Slightly longer for better UX

      // Update previous path
      previousPath.current = pathname;
    }

    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
    };
  }, [pathname, searchParams, showLoader, hideLoader]);

  // Handle search params changes (like filters, pagination, etc.)
  useEffect(() => {
    if (previousPath.current === pathname) {
      // This is a search params change, show a shorter loader
      showLoader();
      
      const timer = setTimeout(() => {
        hideLoader();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [searchParams, pathname, showLoader, hideLoader]);

  return <>{children}</>;
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <NavigationProviderInner>
        {children}
      </NavigationProviderInner>
    </Suspense>
  );
} 