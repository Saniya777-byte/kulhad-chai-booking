/**
 * Cache Debugging Utilities
 * Helper functions for debugging and monitoring cache behavior
 */

import { cacheManager } from './cache-manager';

/**
 * Enable cache debugging in console
 */
export const enableCacheDebug = () => {
  if (typeof window === 'undefined') return;

  window.cacheDebug = {
    // Get all cache data
    async getAll() {
      const stats = await cacheManager.getStats();
      console.log('📊 Cache Statistics:', stats);
      return stats;
    },

    // Clear all caches
    async clearAll() {
      await cacheManager.clearAll();
      console.log('🗑️ All caches cleared');
    },

    // Get specific cache
    async get(cacheType, key = 'default') {
      const data = await cacheManager.get(cacheType, key);
      console.log(`📦 Cache [${cacheType}]:`, data);
      return data;
    },

    // Invalidate specific cache
    async invalidate(cacheType, key = 'default') {
      await cacheManager.invalidate(cacheType, key);
      console.log(`❌ Cache [${cacheType}] invalidated`);
    },

    // Check if cache is valid
    async isValid(cacheType, key = 'default') {
      const valid = await cacheManager.isValid(cacheType, key);
      console.log(`✅ Cache [${cacheType}] valid:`, valid);
      return valid;
    },

    // Monitor cache operations
    enableMonitoring() {
      const originalGet = cacheManager.get.bind(cacheManager);
      const originalSet = cacheManager.set.bind(cacheManager);
      const originalInvalidate = cacheManager.invalidate.bind(cacheManager);

      cacheManager.get = async function(cacheType, key) {
        console.log(`🔍 Cache GET: ${cacheType}${key !== 'default' ? ` (${key})` : ''}`);
        const result = await originalGet(cacheType, key);
        console.log(`${result ? '✅' : '❌'} Cache ${result ? 'HIT' : 'MISS'}: ${cacheType}`);
        return result;
      };

      cacheManager.set = async function(cacheType, data, key) {
        console.log(`💾 Cache SET: ${cacheType}${key !== 'default' ? ` (${key})` : ''}`);
        const result = await originalSet(cacheType, data, key);
        console.log(`✅ Cache STORED: ${cacheType}`);
        return result;
      };

      cacheManager.invalidate = async function(cacheType, key) {
        console.log(`🗑️ Cache INVALIDATE: ${cacheType}${key !== 'default' ? ` (${key})` : ''}`);
        await originalInvalidate(cacheType, key);
        console.log(`✅ Cache INVALIDATED: ${cacheType}`);
      };

      console.log('👀 Cache monitoring enabled');
    },

    // Disable monitoring
    disableMonitoring() {
      // Note: This would require storing original functions
      console.log('⚠️ Reload page to disable monitoring');
    },

    // Test cache performance
    async testPerformance(cacheType, fetchFunction) {
      console.log(`⏱️ Testing cache performance for: ${cacheType}`);

      // First fetch (no cache)
      await cacheManager.invalidate(cacheType);
      const start1 = performance.now();
      await fetchFunction();
      const time1 = performance.now() - start1;
      console.log(`📊 First fetch (no cache): ${time1.toFixed(2)}ms`);

      // Second fetch (from cache)
      const start2 = performance.now();
      await cacheManager.get(cacheType);
      const time2 = performance.now() - start2;
      console.log(`📊 Second fetch (cached): ${time2.toFixed(2)}ms`);

      const improvement = ((time1 - time2) / time1 * 100).toFixed(1);
      console.log(`🚀 Performance improvement: ${improvement}%`);

      return { uncached: time1, cached: time2, improvement };
    },

    // Get cache size breakdown
    async getSizeBreakdown() {
      const stats = await cacheManager.getStats();
      console.log('📦 Cache Size Breakdown:');
      
      Object.entries(stats.localStorage).forEach(([type, data]) => {
        const sizeKB = (data.size / 1024).toFixed(2);
        console.log(`  ${type}: ${data.count} items, ${sizeKB} KB`);
      });

      Object.entries(stats.indexedDB).forEach(([type, data]) => {
        console.log(`  ${type}: ${data.count} items (IndexedDB)`);
      });

      const totalKB = (stats.totalSize / 1024).toFixed(2);
      console.log(`  Total: ${totalKB} KB`);
    },

    // Help
    help() {
      console.log(`
🔧 Cache Debug Commands:

  cacheDebug.getAll()              - Get all cache statistics
  cacheDebug.clearAll()            - Clear all caches
  cacheDebug.get(type, key)        - Get specific cache data
  cacheDebug.invalidate(type, key) - Invalidate specific cache
  cacheDebug.isValid(type, key)    - Check if cache is valid
  cacheDebug.enableMonitoring()    - Monitor all cache operations
  cacheDebug.testPerformance()     - Test cache performance
  cacheDebug.getSizeBreakdown()    - Get cache size breakdown
  cacheDebug.help()                - Show this help

Examples:
  cacheDebug.get('customers')
  cacheDebug.invalidate('products')
  cacheDebug.enableMonitoring()
      `);
    }
  };

  console.log('🔧 Cache debugging enabled. Type "cacheDebug.help()" for commands.');
};

/**
 * Log cache operation
 */
export const logCacheOperation = (operation, cacheType, success = true) => {
  if (process.env.NODE_ENV === 'development') {
    const emoji = success ? '✅' : '❌';
    const color = success ? 'color: green' : 'color: red';
    console.log(`%c${emoji} Cache ${operation}: ${cacheType}`, color);
  }
};

/**
 * Measure cache performance
 */
export const measureCachePerformance = async (name, fn) => {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
  }
  
  return { result, duration };
};

// Auto-enable in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  enableCacheDebug();
}
