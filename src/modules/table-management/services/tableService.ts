import apiService from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../config';
import { Table } from '../../../types/table';

export const tableService = {
  getAllTables: async (): Promise<Table[]> => {
    const response = await apiService.get<{ data: Table[] }>(API_ENDPOINTS.tables);
    return response.data;
  },
  
  getTableById: async (id: string): Promise<Table> => {
    const response = await apiService.get<Table>(`${API_ENDPOINTS.tables}/${id}`);
    return response;
  },
  
  updateTableStatus: async (id: string, status: string): Promise<Table> => {
    const response = await apiService.put<Table>(`${API_ENDPOINTS.tables}/${id}`, { status });
    return response;
  }
};

export default tableService;