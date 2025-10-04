import { Table } from '../types/table';

const TABLES_STORAGE_KEY = 'restaurant_tables';

// Initialize tables in localStorage if not exists
const initializeTables = (): void => {
  const existingTables = localStorage.getItem(TABLES_STORAGE_KEY);
  if (!existingTables) {
    const initialTables: Table[] = [];
    // Generate tables for 3 floors, 8 tables per floor
    for (let floor = 1; floor <= 3; floor++) {
      for (let tableNum = 1; tableNum <= 8; tableNum++) {
        initialTables.push({
          id: `table-${floor}-${tableNum}`,
          number: `B${tableNum}`,
          status: 'empty',
          floor: floor,
        });
      }
    }
    localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(initialTables));
  }
};

export const tableStorageService = {
  // Initialize tables on first load
  initialize: (): void => {
    initializeTables();
  },

  // Get all tables
  getAllTables: (): Table[] => {
    initializeTables();
    const tablesJson = localStorage.getItem(TABLES_STORAGE_KEY);
    return tablesJson ? JSON.parse(tablesJson) : [];
  },

  // Get table by ID
  getTableById: (id: string): Table | null => {
    const tables = tableStorageService.getAllTables();
    return tables.find(table => table.id === id) || null;
  },

  // Update table status
  updateTableStatus: (id: string, status: 'empty' | 'inUse' | 'reserved'): Table | null => {
    const tables = tableStorageService.getAllTables();
    const index = tables.findIndex(table => table.id === id);
    
    if (index === -1) return null;
    
    tables[index] = {
      ...tables[index],
      status: status,
    };
    
    localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(tables));
    return tables[index];
  },

  // Get tables by floor
  getTablesByFloor: (floor: number): Table[] => {
    const tables = tableStorageService.getAllTables();
    return tables.filter(table => table.floor === floor);
  },

  // Get tables by status
  getTablesByStatus: (status: 'empty' | 'inUse' | 'reserved'): Table[] => {
    const tables = tableStorageService.getAllTables();
    return tables.filter(table => table.status === status);
  },
};

// Initialize on module load
tableStorageService.initialize();

export default tableStorageService;
