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
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Route change loader
  useEffect(() => {
    if (previousPath.current !== pathname) {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
        loadingTimeout.current = null;
        hideLoader();
      }

      showLoader();

      loadingTimeout.current = setTimeout(() => {
        hideLoader();
        loadingTimeout.current = null;
      }, 400);

      previousPath.current = pathname;
    }

    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
        loadingTimeout.current = null;
        hideLoader();
      }
    };
  }, [pathname, showLoader, hideLoader]);

  // Search params change loader (filters, pagination, etc.)
  useEffect(() => {
    if (previousPath.current === pathname) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
        searchTimeout.current = null;
        hideLoader();
      }

      showLoader();

      searchTimeout.current = setTimeout(() => {
        hideLoader();
        searchTimeout.current = null;
      }, 150);

      return () => {
        if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
          searchTimeout.current = null;
          hideLoader();
        }
      };
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