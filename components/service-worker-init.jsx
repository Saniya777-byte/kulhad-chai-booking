"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/register-service-worker";

/**
 * ServiceWorkerInit Component
 * Initializes the service worker for offline support and caching
 */
export function ServiceWorkerInit() {
  useEffect(() => {
    // Register service worker after component mounts
    registerServiceWorker();
  }, []);

  // This component doesn't render anything
  return null;
}
