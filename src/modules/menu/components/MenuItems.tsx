import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { MenuItem } from '../../../types/menu';

const MenuItemCard = styled(Card)`
  margin-bottom: 16px;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #1890ff;
  margin: 8px 0;
`;

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Salad Tuna',
    price: 500670,
    image: '/menu/salad-tuna.jpg',
    category: 'Salad',
    description: 'Thịnh soạn cho bạn',
  },
  {
    id: '2',
    name: 'Salad Egg',
    price: 300990,
    image: '/menu/salad-egg.jpg',
    category: 'Salad',
  },
  {
    id: '3',
    name: 'Wagyu Sate',
    price: 270320,
    image: '/menu/wagyu-sate.jpg',
    category: 'Thịt nướng',
  },
  {
    id: '4',
    name: 'Wagyu Black Paper',
    price: 34980,
    image: '/menu/wagyu-black-paper.jpg',
    category: 'Thịt nướng',
    description: 'Thịnh soạn cho bạn',
  }
];

const MenuItems: React.FC = () => {
  return (
    <Row gutter={16}>
      {mockMenuItems.map(item => (
        <Col span={6} key={item.id}>
          <MenuItemCard
            cover={<ItemImage src={item.image} alt={item.name} />}
            hoverable
            bodyStyle={{ padding: '12px' }}
          >
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <ItemPrice>VNĐ {item.price.toLocaleString()}</ItemPrice>
            <Button type="primary" shape="circle" size="small">+</Button>
          </MenuItemCard>
        </Col>
      ))}
    </Row>
  );
};

export default MenuItems;