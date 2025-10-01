// Format currency to Vietnamese Dong
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN') + 'đ';
};

// Format date to Vietnamese format
export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('vi-VN');
};

// Format time
export const formatTime = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

// Get table status color
export const getTableStatusColor = (status: string): string => {
  switch (status) {
    case 'empty':
      return '#f0f0f0';
    case 'inUse':
      return '#1890ff';
    case 'reserved':
      return '#f5222d';
    default:
      return '#f0f0f0';
  }
};

// Get order status text and color
export const getOrderStatusInfo = (status: string): { text: string; color: string } => {
  switch (status) {
    case 'completed':
      return { text: 'Hoàn thành', color: '#52c41a' };
    case 'cancelled':
      return { text: 'Đã hủy', color: '#f5222d' };
    case 'processing':
      return { text: 'Đang xử lý', color: '#faad14' };
    default:
      return { text: 'Không xác định', color: '#f0f0f0' };
  }
};