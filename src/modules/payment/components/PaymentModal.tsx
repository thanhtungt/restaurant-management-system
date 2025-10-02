import React, { useState } from 'react';
import { Modal, Select, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { OrderItem } from '../../../types/order';
import { Table } from '../../../types/table';

const { Option } = Select;

interface PaymentModalProps {
  visible: boolean;
  order: OrderItem[];
  table: Table | null;
  total: number;
  onClose: () => void;
  onConfirm: (paymentData: PaymentData) => Promise<void>;
}

export interface PaymentData {
  method: 'cash' | 'card' | 'transfer';
  amountPaid: number;
  change: number;
}

type PaymentStatus = 'selecting' | 'qr' | 'success' | 'failed';

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  order,
  table,
  total,
  onClose,
  onConfirm,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('Tiền mặt');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('selecting');
  const [loading, setLoading] = useState(false);

  // Reset when modal opens
  React.useEffect(() => {
    if (visible) {
      setPaymentMethod('Tiền mặt');
      setPaymentStatus('selecting');
    }
  }, [visible]);

  const handleContinue = () => {
    if (paymentMethod === 'Chuyển khoản') {
      setPaymentStatus('qr');
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Random success/failure for demo
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        setPaymentStatus('success');
        await onConfirm({
          method: 'cash',
          amountPaid: total,
          change: 0,
        });
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus('selecting');
  };

  const handleExit = () => {
    setPaymentStatus('selecting');
    onClose();
  };

  // Render content based on status
  const renderContent = () => {
    switch (paymentStatus) {
      case 'selecting':
        return (
          <div>
            <p style={{ 
              fontSize: '14px', 
              color: '#8c8c8c',
              marginBottom: '16px',
            }}>
              Vui lòng chọn phương thức thanh toán
            </p>
            <Select
              value={paymentMethod}
              onChange={setPaymentMethod}
              size="large"
              style={{ width: '100%', marginBottom: '24px' }}
            >
              <Option value="Tiền mặt">Tiền mặt</Option>
              <Option value="Chuyển khoản">Chuyển khoản</Option>
            </Select>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                size="large" 
                block
                onClick={onClose}
                style={{ 
                  height: '44px',
                  fontSize: '15px',
                  borderRadius: '8px',
                }}
              >
                Hủy
              </Button>
              <Button 
                type="primary" 
                size="large" 
                block
                onClick={handleContinue}
                loading={loading}
                style={{ 
                  height: '44px',
                  fontSize: '15px',
                  borderRadius: '8px',
                }}
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        );

      case 'qr':
        return (
          <div>
            <Select
              value="Chuyển khoản"
              disabled
              size="large"
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <p style={{ 
              fontSize: '14px', 
              color: '#8c8c8c',
              marginBottom: '16px',
              textAlign: 'center',
            }}>
              Vui lòng quét mã để thanh toán:
            </p>
            <div style={{
              width: '200px',
              height: '200px',
              margin: '0 auto 20px',
              background: '#f5f5f5',
              border: '1px solid #d9d9d9',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#bfbfbf',
            }}>
              Mã QR ở đây
            </div>
            <div style={{ 
              textAlign: 'center',
              fontSize: '16px',
              marginBottom: '24px',
            }}>
              <span style={{ color: '#595959' }}>Tổng : </span>
              <span style={{ 
                color: '#1890ff',
                fontWeight: '600',
                fontSize: '18px',
              }}>
                {total.toLocaleString('vi-VN')}₫
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                size="large" 
                block
                onClick={onClose}
                style={{ 
                  height: '44px',
                  fontSize: '15px',
                  borderRadius: '8px',
                }}
              >
                Hủy
              </Button>
              <Button 
                type="primary" 
                size="large" 
                block
                onClick={handleConfirm}
                loading={loading}
                style={{ 
                  height: '44px',
                  fontSize: '15px',
                  borderRadius: '8px',
                }}
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        );

      case 'success':
        return (
          <div style={{ textAlign: 'center' }}>
            <Select
              value="Chuyển khoản"
              disabled
              size="large"
              style={{ width: '100%', marginBottom: '30px' }}
            />
            <div style={{ marginBottom: '20px' }}>
              <p style={{ 
                color: '#52c41a',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '24px',
              }}>
                Thanh toán thành công!
              </p>
              <CheckCircleOutlined style={{ 
                fontSize: '100px',
                color: '#52c41a',
                marginBottom: '20px',
              }} />
            </div>
            <div style={{ 
              fontSize: '16px',
              marginBottom: '30px',
            }}>
              <span style={{ color: '#595959' }}>Tổng : </span>
              <span style={{ 
                color: '#1890ff',
                fontWeight: '600',
                fontSize: '18px',
              }}>
                {total.toLocaleString('vi-VN')}₫
              </span>
            </div>
            <Button 
              type="primary" 
              size="large" 
              block
              onClick={handleExit}
              style={{ 
                height: '44px',
                fontSize: '15px',
                borderRadius: '8px',
              }}
            >
              Thoát
            </Button>
          </div>
        );

      case 'failed':
        return (
          <div style={{ textAlign: 'center' }}>
            <Select
              value="Chuyển khoản"
              disabled
              size="large"
              style={{ width: '100%', marginBottom: '30px' }}
            />
            <div style={{ marginBottom: '20px' }}>
              <p style={{ 
                color: '#ff4d4f',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '24px',
              }}>
                Thanh toán thất bại
              </p>
              <CloseCircleOutlined style={{ 
                fontSize: '100px',
                color: '#ff4d4f',
                marginBottom: '20px',
              }} />
            </div>
            <div style={{ 
              fontSize: '16px',
              marginBottom: '30px',
            }}>
              <span style={{ color: '#595959' }}>Tổng : </span>
              <span style={{ 
                color: '#1890ff',
                fontWeight: '600',
                fontSize: '18px',
              }}>
                {total.toLocaleString('vi-VN')}₫
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                size="large" 
                block
                onClick={handleRetry}
                style={{ 
                  height: '44px',
                  fontSize: '15px',
                  borderRadius: '8px',
                }}
              >
                Thử lại
              </Button>
              <Button 
                type="primary" 
                size="large" 
                block
                onClick={handleExit}
                style={{ 
                  height: '44px',
                  fontSize: '15px',
                  borderRadius: '8px',
                }}
              >
                Thoát
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      title={
        <div style={{ 
          fontSize: '20px', 
          fontWeight: '700',
          color: '#262626',
        }}>
          Thanh toán
        </div>
      }
      open={visible}
      onCancel={handleExit}
      width={440}
      footer={null}
      centered
      closeIcon={
        <span style={{ 
          color: '#ff4d4f',
          fontSize: '18px',
          fontWeight: '600',
        }}>
          ✕
        </span>
      }
    >
      <div style={{ padding: '8px 0' }}>
        {renderContent()}
      </div>
    </Modal>
  );
};

export default PaymentModal;
