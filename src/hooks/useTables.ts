import { useState, useEffect } from 'react';
import tableService from '../modules/table-management/services/tableService';
import { Table } from '../types/table';

export const useTables = (floor?: number) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const fetchedTables = await tableService.getAllTables();
        
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

    fetchTables();
  }, [floor]);

  const updateTableStatus = async (tableId: string, newStatus: string) => {
    try {
      const updatedTable = await tableService.updateTableStatus(tableId, newStatus);
      setTables(prevTables => 
        prevTables.map(table => 
          table.id === tableId ? { ...table, status: updatedTable.status } : table
        )
      );
      return updatedTable;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { tables, loading, error, updateTableStatus };
};

export default useTables;