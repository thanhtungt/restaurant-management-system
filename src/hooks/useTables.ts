import { useState, useEffect } from 'react';
import tableStorageService from '../services/tableService';
import { Table } from '../types/table';

export const useTables = (floor?: number) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTables = () => {
    try {
      setLoading(true);
      const fetchedTables = tableStorageService.getAllTables();
      
      // Filter by floor if provided
      const filteredTables = floor
        ? fetchedTables.filter(table => table.floor === floor)
        : fetchedTables;
        
      setTables(filteredTables);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTables();
  }, [floor]);

  const updateTableStatus = (tableId: string, newStatus: 'empty' | 'inUse' | 'reserved') => {
    try {
      const updatedTable = tableStorageService.updateTableStatus(tableId, newStatus);
      if (updatedTable) {
        setTables(prevTables => 
          prevTables.map(table => 
            table.id === tableId ? updatedTable : table
          )
        );
      }
      return updatedTable;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const refreshTables = () => {
    loadTables();
  };

  return { tables, loading, error, updateTableStatus, refreshTables };
};

export default useTables;