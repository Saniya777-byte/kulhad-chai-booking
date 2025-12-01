/**
 * Cached wrapper for Supabase service
 * Automatically handles caching for read operations and invalidates cache on write operations
 */

import * as supabaseService from './supabase-service';
import { cacheManager } from './cache-manager';

const withCache = (cacheType, fetchFn) => async (...args) => {
  const key = args.length > 0 ? JSON.stringify(args) : 'default';

  try {
    // Try to get from cache first
    const cachedData = await cacheManager.get(cacheType, key);
    if (cachedData) {
      return cachedData;
    }

    const freshData = await fetchFn(...args);

    await cacheManager.set(cacheType, freshData, key);

    return freshData;
  } catch (error) {
    console.error(`Error in cached ${cacheType}:`, error);
    throw error;
  }
};

const withCacheInvalidation = (cacheType, mutateFn) => async (...args) => {
  try {
    const result = await mutateFn(...args);

    // Invalidate the cache for this type
    await cacheManager.invalidate(cacheType);

    return result;
  } catch (error) {
    throw error;
  }
};

// Customer operations - cached
export const getCustomers = withCache('customers', supabaseService.getCustomers);
export const saveCustomer = withCacheInvalidation('customers', supabaseService.saveCustomer);
export const addCustomer = withCacheInvalidation('customers', supabaseService.addCustomer);
export const updateCustomer = withCacheInvalidation('customers', supabaseService.updateCustomer);
export const deleteCustomer = withCacheInvalidation('customers', supabaseService.deleteCustomer);

// Product operations - cached
export const getProducts = withCache('products', supabaseService.getProducts);
export const saveProduct = withCacheInvalidation('products', supabaseService.saveProduct);
export const updateProduct = withCacheInvalidation('products', supabaseService.updateProduct);
export const getLowStockProducts = withCache('lowStockProducts', supabaseService.getLowStockProducts);

// Invoice operations - cached
export const getInvoices = withCache('invoices', supabaseService.getInvoices);
export const saveInvoice = async (invoice) => {
  const result = await supabaseService.saveInvoice(invoice);
  // Invalidate multiple caches as invoices affect products (stock) too
  await Promise.all([
    cacheManager.invalidate('invoices'),
    cacheManager.invalidate('products'),
    cacheManager.invalidate('lowStockProducts'),
  ]);
  return result;
};
export const updateInvoice = withCacheInvalidation('invoices', supabaseService.updateInvoice);
export const deleteInvoice = withCacheInvalidation('invoices', supabaseService.deleteInvoice);

// Payment operations - cached
export const getPayments = withCache('payments', supabaseService.getPayments);
export const savePayment = async (payment) => {
  const result = await supabaseService.savePayment(payment);
  // Invalidate both payments and invoices cache
  await Promise.all([
    cacheManager.invalidate('payments'),
    cacheManager.invalidate('invoices'),
  ]);
  return result;
};
export const updatePayment = withCacheInvalidation('payments', supabaseService.updatePayment);
export const deletePayment = withCacheInvalidation('payments', supabaseService.deletePayment);

// User operations - cached
export const getUsers = withCache('users', supabaseService.getUsers);
export const addUser = withCacheInvalidation('users', supabaseService.addUser);
export const updateUser = withCacheInvalidation('users', supabaseService.updateUser);
export const deleteUser = withCacheInvalidation('users', supabaseService.deleteUser);
export const getUserActivity = withCache('userActivity', supabaseService.getUserActivity);

export const getBusinessSettings = withCache('businessSettings', supabaseService.getBusinessSettings);
export const updateBusinessSettings = withCacheInvalidation('businessSettings', supabaseService.updateBusinessSettings);

export const generateInvoiceNumber = supabaseService.generateInvoiceNumber;
export const calculateInvoiceTotal = supabaseService.calculateInvoiceTotal;

// Manual cache control functions
export const invalidateCache = async (cacheType) => {
  await cacheManager.invalidate(cacheType);
};

export const invalidateAllCaches = async () => {
  await cacheManager.clearAll();
};

export const getCacheStats = async () => {
  return await cacheManager.getStats();
};

// Prefetch function to load data into cache before it's needed
export const prefetchData = async (types = ['customers', 'products', 'invoices']) => {
  const prefetchPromises = types.map(async (type) => {
    try {
      switch (type) {
        case 'customers':
          await getCustomers();
          break;
        case 'products':
          await getProducts();
          break;
        case 'invoices':
          await getInvoices();
          break;
        case 'payments':
          await getPayments();
          break;
        case 'users':
          await getUsers();
          break;
        case 'businessSettings':
          await getBusinessSettings();
          break;
        case 'lowStockProducts':
          await getLowStockProducts();
          break;
        default:
          console.warn(`Unknown prefetch type: ${type}`);
      }
    } catch (error) {
      console.error(`Error prefetching ${type}:`, error);
    }
  });

  await Promise.all(prefetchPromises);
};
