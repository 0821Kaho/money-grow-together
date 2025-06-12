
const CURRENT_VERSION = '2';
const VERSION_KEY = '__pigipe_version__';

/**
 * Initialize storage system and handle version migration
 */
export const initStorage = () => {
  try {
    const currentVersion = localStorage.getItem(VERSION_KEY);
    
    console.log('Storage version check:', { currentVersion, expectedVersion: CURRENT_VERSION });
    
    // If version doesn't match or doesn't exist, clear storage
    if (currentVersion !== CURRENT_VERSION) {
      console.log('Storage version mismatch, clearing localStorage...');
      localStorage.clear();
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    }
  } catch (error) {
    console.warn('Error during storage initialization:', error);
    // If localStorage is not available, fail silently
  }
};

/**
 * Get current storage version
 */
export const getStorageVersion = (): string | null => {
  try {
    return localStorage.getItem(VERSION_KEY);
  } catch (error) {
    console.warn('Error reading storage version:', error);
    return null;
  }
};

/**
 * Clear all storage data
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  } catch (error) {
    console.warn('Error clearing storage:', error);
  }
};
