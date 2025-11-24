import { completeMenuItems } from './menu-data';

const menuIdMapping = new Map();
let isInitialized = false;
let initializationPromise = null;
export const menuSyncService = {
  async initializeMapping() {
    if (initializationPromise) {
      return initializationPromise;
    }

    if (isInitialized) {
      return;
    }

    if (typeof window === 'undefined') {
      console.log('Skipping menu mapping initialization on server side');
      return;
    }
    initializationPromise = (async () => {
      try {
        const {
          data: dbMenuItems,
          error
        } = await supabase.from('menu_items').select('id, name, price, category');
        if (error) {
          console.error('Error fetching menu items from database:', error);
          initializationPromise = null;
          return;
        }

        menuIdMapping.clear();

        const categoryMapping = {
          'chai': 'Classic Chai',
          'iced-tea': 'Iced Tea & Green Tea',
          'hot-coffee': 'Hot Coffee',
          'cold-coffee': 'Cold Coffee',
          'burgers': 'Burgers',
          'maggie': 'Maggie',
          'sandwiches': 'Sandwiches',
          'pasta': 'Pasta',
          'bread': 'Bread',
          'fries': 'Fries',
          'pizza': 'Pizza',
          'milkshakes': 'Milkshakes',
          'mocktails': 'Mocktails',
          'combos': 'Combo Offers'
        };

        completeMenuItems.forEach(frontendItem => {
          const dbCategory = categoryMapping[frontendItem.category] || frontendItem.category;
          const dbItem = dbMenuItems.find(dbItem => {
            if (dbItem.name.toLowerCase().trim() === frontendItem.name.toLowerCase().trim() && dbItem.category === dbCategory) {
              return true;
            }

            const dbNameBase = dbItem.name.replace(/\s*\([^)]*\)\s*/g, '').trim().toLowerCase();
            const frontendNameBase = frontendItem.name.trim().toLowerCase();
            return dbNameBase === frontendNameBase && dbItem.category === dbCategory;
          });
          if (dbItem) {
            menuIdMapping.set(frontendItem.id, dbItem.id);
          } else {
            console.warn(`No database match found for frontend item: ${frontendItem.name} (${frontendItem.id}) - Frontend category: ${frontendItem.category}, DB category: ${dbCategory}`);
          }
        });
        console.log(`Initialized menu mapping with ${menuIdMapping.size} items`);
        isInitialized = true;
      } catch (error) {
        console.error('Error initializing menu mapping:', error);
        initializationPromise = null;
      }
    })();
    return initializationPromise;
  },
  async getDbId(frontendId) {
    if (!isInitialized && typeof window !== 'undefined') {
      await this.initializeMapping();
    }
    return menuIdMapping.get(frontendId) || null;
  },
  getAllMappings() {
    return new Map(menuIdMapping);
  },
  isReady() {
    return isInitialized;
  },
  async syncMenuItems() {
    try {
      const categoryMapping = {
        'chai': 'Classic Chai',
        'iced-tea': 'Iced Tea & Green Tea',
        'hot-coffee': 'Hot Coffee',
        'cold-coffee': 'Cold Coffee',
        'burgers': 'Burgers',
        'maggie': 'Maggie',
        'sandwiches': 'Sandwiches',
        'pasta': 'Pasta',
        'bread': 'Bread',
        'fries': 'Fries',
        'pizza': 'Pizza',
        'milkshakes': 'Milkshakes',
        'mocktails': 'Mocktails',
        'combos': 'Combo Offers'
      };

      const {
        data: existingItems,
        error: fetchError
      } = await supabase.from('menu_items').select('name, category');
      if (fetchError) {
        console.error('Error fetching existing menu items:', fetchError);
        return;
      }
      const existingItemsSet = new Set(existingItems.map(item => `${item.name.toLowerCase().trim()}_${item.category}`));

      const itemsToCreate = completeMenuItems.filter(frontendItem => {
        const dbCategory = categoryMapping[frontendItem.category] || frontendItem.category;
        const key = `${frontendItem.name.toLowerCase().trim()}_${dbCategory}`;
        return !existingItemsSet.has(key);
      });
      if (itemsToCreate.length > 0) {
        console.log(`Creating ${itemsToCreate.length} missing menu items in database`);

        const {
          error: insertError
        } = await supabase.from('menu_items').insert(itemsToCreate.map(item => {
          const dbCategory = categoryMapping[item.category] || item.category;
          return {
            name: item.name,
            description: item.description,
            price: item.price,
            category: dbCategory,
            image: item.image,
            available: item.available,
            preparation_time: item.preparationTime,
            is_combo: item.isCombo || false,
            combo_items: item.comboItems || null
          };
        }));
        if (insertError) {
          console.error('Error inserting menu items:', insertError);
        } else {
          console.log('Successfully synced menu items to database');
          isInitialized = false;
          initializationPromise = null;
          await this.initializeMapping();
        }
      } else {
        console.log('All menu items are already synced');
      }
    } catch (error) {
      console.error('Error syncing menu items:', error);
    }
  }
};
