export interface TableStatus {
  id: string;
  status: 'empty' | 'inUse' | 'reserved';
  floor: number;
  tableNumber: string;
}

export interface Table {
  id: string;
  number: string;
  status: 'empty' | 'inUse' | 'reserved';
  floor: number;
}