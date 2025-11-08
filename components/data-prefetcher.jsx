"use client";

import { useEffect } from "react";
import { prefetchData } from "@/lib/supabase-service-cached";

/**
 * DataPrefetcher Component
 * Prefetches and caches data in the background to improve performance
 * Place this component in your root layout or main dashboard
 */
export function DataPrefetcher() {
  useEffect(() => {
    // Prefetch data after a short delay to not block initial render
    const timer = setTimeout(() => {
      prefetchData(['customers', 'products', 'invoices', 'businessSettings'])
        .then(() => {
          console.log('Data prefetched and cached successfully');
        })
        .catch((error) => {
          console.error('Error prefetching data:', error);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything
  return null;
}
