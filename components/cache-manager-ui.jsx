"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Trash2, Database, HardDrive, Info } from "lucide-react";
import { useCacheStats, useClearCache } from "@/hooks/useCachedData";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function CacheManagerUI() {
  const { stats, loading, refresh } = useCacheStats();
  const { clearAll, clearing } = useClearCache();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRefresh = async () => {
    await refresh();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleClearCache = async () => {
    if (confirm("Are you sure you want to clear all cached data? The page will reload.")) {
      await clearAll();
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Cache Management
            </CardTitle>
            <CardDescription>
              Manage browser cache to improve performance and reduce load times
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Stats
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearCache}
              disabled={clearing}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Cache
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showSuccess && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Cache statistics refreshed successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Cache Info */}
        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">How Caching Works</p>
              <p className="text-sm text-muted-foreground">
                Data from the database is stored in your browser (localStorage and IndexedDB) 
                to reduce loading times. Cache automatically refreshes when you make changes 
                and expires after a set time period.
              </p>
            </div>
          </div>
        </div>

        {/* Cache Statistics */}
        {stats && (
          <div className="space-y-4">
            {/* LocalStorage Stats */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">LocalStorage Cache</h3>
                <Badge variant="secondary">
                  {formatBytes(stats.totalSize)}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(stats.localStorage).map(([type, data]) => (
                  <Card key={type}>
                    <CardContent className="p-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground capitalize">
                          {type.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold">{data.count}</p>
                          <p className="text-xs text-muted-foreground">items</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatBytes(data.size)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* IndexedDB Stats */}
            {Object.keys(stats.indexedDB).length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">IndexedDB Cache</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(stats.indexedDB).map(([type, data]) => (
                    <Card key={type}>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground capitalize">
                            {type.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold">{data.count}</p>
                            <p className="text-xs text-muted-foreground">items</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cache Expiry Info */}
        <div className="rounded-lg border p-4">
          <h4 className="font-medium mb-3">Cache Expiry Times</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Customers</p>
              <p className="font-medium">10 minutes</p>
            </div>
            <div>
              <p className="text-muted-foreground">Products</p>
              <p className="font-medium">15 minutes</p>
            </div>
            <div>
              <p className="text-muted-foreground">Invoices</p>
              <p className="font-medium">5 minutes</p>
            </div>
            <div>
              <p className="text-muted-foreground">Payments</p>
              <p className="font-medium">5 minutes</p>
            </div>
            <div>
              <p className="text-muted-foreground">Users</p>
              <p className="font-medium">30 minutes</p>
            </div>
            <div>
              <p className="text-muted-foreground">Settings</p>
              <p className="font-medium">1 hour</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
          <h4 className="font-medium mb-2 text-green-900 dark:text-green-100">
            Benefits of Caching
          </h4>
          <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>• Faster page load times</li>
            <li>• Reduced database queries</li>
            <li>• Better offline experience</li>
            <li>• Lower bandwidth usage</li>
            <li>• Improved user experience</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
