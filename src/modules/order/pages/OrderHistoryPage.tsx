import React, { useState } from 'react';
import { Table, Button, Input, DatePicker, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

const StyledTable = styled(Table)`
  margin-top: 16px;
`;

const mockOrders = Array.from({ length: 10 }, (_, i) => ({
  key: i.toString(),
  id: `ORD${98 + i}`,
  date: '19/08/2025',
  time: '18:09:22',
  total: 400000,
  status: i % 3 === 0 ? 'completed' : i % 5 === 0 ? 'cancelled' : 'processing',
}));

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
    render: (text: number) => `${text.toLocaleString()}đ`,
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (status: string) => (
      <span style={{ 
        color: status === 'completed' ? '#52c41a' : status === 'cancelled' ? '#f5222d' : '#faad14'
      }}>
        {status === 'completed' ? 'Hoàn thành' : status === 'cancelled' ? 'Đã hủy' : 'Đang xử lý'}
      </span>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_: any, record: any) => (
      <Button type="primary" size="small">
        Xem
      </Button>
    ),
  },
];

const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
`;

const OrderHistoryPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Lịch sử đơn hàng</PageTitle>
      </PageHeader>
      
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm đơn hàng"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        
        <RangePicker />
        
        <Button type="primary">Tìm kiếm</Button>
      </Space>
      
      <StyledTable 
        columns={columns} 
        dataSource={mockOrders} 
        pagination={{ pageSize: 8 }}
      />
    </PageContainer>
  );
};

export default OrderHistoryPage;