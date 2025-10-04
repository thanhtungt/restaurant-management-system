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

  const handleContinue = async () => {
    if (paymentMethod === 'Chuyển khoản') {
      setPaymentStatus('qr');
    } else {
      // Thanh toán tiền mặt - hiển thị modal success
      try {
        setLoading(true);
        
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Chỉ hiển thị modal success, KHÔNG gọi onConfirm ở đây
        setPaymentStatus('success');
      } catch (error) {
        console.error('Payment error:', error);
        setPaymentStatus('failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      
      // Simulate payment processing cho quét mã
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Chỉ hiển thị modal success, KHÔNG gọi onConfirm ở đây
      setPaymentStatus('success');
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus('selecting');
  };

  const handleExit = async () => {
    // Nếu đang ở trạng thái success, gọi onConfirm trước khi đóng
    if (paymentStatus === 'success') {
      await onConfirm({
        method: paymentMethod === 'Chuyển khoản' ? 'transfer' : 'cash',
        amountPaid: total,
        change: 0,
      });
    }
    
    // Reset và đóng modal
    setPaymentStatus('selecting');
    setPaymentMethod('Tiền mặt');
    onClose();
  };

  const handleCancel = () => {
    setPaymentStatus('failed');
  };

  // Render content based on status
  const renderContent = () => {
    switch (paymentStatus) {
      case 'selecting':
        return (
          <div>
            <p style={{ 
              fontSize: '14px', 
              color: '#707070',
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
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button 
                size="small"
                onClick={handleCancel}
                style={{ 
                  height: '44px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: '1px solid #0088FF',
                  color: '#0088FF',
                  fontWeight: '700',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                }}
              >
                Hủy
              </Button>
              <Button 
                type="primary" 
                size="small"
                onClick={handleContinue}
                loading={loading}
                style={{ 
                  height: '44px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  paddingLeft: '24px',
                  paddingRight: '24px',
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
              fontSize: '15px', 
              color: '#707070',
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
              textAlign: 'right',
              fontSize: '16px',
              marginBottom: '24px',
            }}>
              <span style={{ color: '#000000' }}>Tổng : </span>
              <span style={{ 
                color: '#0094FE',
                fontWeight: '400',
                fontSize: '20px',
              }}>
                {total.toLocaleString('vi-VN')}₫
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button 
                size="small"
                onClick={handleCancel}
                style={{ 
                  height: '44px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  border: '1px solid #0088FF',
                  color: '#0088FF',
                  fontWeight: '700',
                }}
              >
                Hủy
              </Button>
              <Button 
                type="primary" 
                size="small"
                onClick={handleConfirm}
                loading={loading}
                style={{ 
                  height: '44px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  background: '#0088FF',
                  fontWeight: '700',
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
              value="Đơn hàng của bạn"
              disabled
              size="large"
              style={{ width: '100%', marginBottom: '30px' }}
            />
            <div style={{ marginBottom: '20px' }}>
              <p style={{ 
                color: '#14933E',
                fontSize: '15px',
                fontWeight: '700',
                marginBottom: '24px',
              }}>
                Thanh toán thành công!
              </p>
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                border: '6px solid #27C840',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: '#E5FBD8',
              }}>
                <div style={{
                  width: '60px',
                  height: '30px',
                  borderBottom: '6px solid #27C840',
                  borderLeft: '6px solid #27C840',
                  transform: 'rotate(-45deg)',
                  marginTop: '-10px',
                  marginLeft: '5px',
                }}></div>
              </div>
            </div>
            <div style={{ 
              textAlign: 'right',
              fontSize: '16px',
              marginBottom: '30px',
            }}>
              <span style={{ color: '#000000' }}>Tổng : </span>
              <span style={{ 
                color: '#0094FE',
                fontWeight: '400',
                fontSize: '20px',
              }}>
                {total.toLocaleString('vi-VN')}₫
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="primary" 
                size="small"
                onClick={handleExit}
                style={{ 
                  height: '44px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  background: '#0088FF',
                  fontWeight: '700',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                }}
              >
                Thoát
              </Button>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div style={{ textAlign: 'center' }}>
            <Select
              value="Đơn hàng của bạn"
              disabled
              size="large"
              style={{ width: '100%', marginBottom: '30px' }}
            />
            <div style={{ marginBottom: '20px' }}>
              <p style={{ 
                color: '#FF5F57',
                fontSize: '15px',
                fontWeight: '700',
                marginBottom: '24px',
              }}>
                Thanh toán thất bại
              </p>
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                border: '6px solid #FF0005',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  width: '70px',
                  height: '6px',
                  background: '#FF0005',
                  transform: 'rotate(45deg)',
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '70px',
                  height: '6px',
                  background: '#FF0005',
                  transform: 'rotate(-45deg)',
                }}></div>
              </div>
            </div>
            <div style={{ 
              fontSize: '16px',
              marginBottom: '30px',
              textAlign: 'right',
            }}>
              <span style={{ color: '#000000' }}>Tổng : </span>
              <span style={{ 
                color: '#0094FE',
                fontWeight: '400',
                fontSize: '20px',
              }}>
                {total.toLocaleString('vi-VN')}₫
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button 
                size="small"
                onClick={handleRetry}
                style={{ 
                  height: '44px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: '1px solid #5296E5',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  color: '#5296E5',
                  fontWeight: '700',
                }}
              >
                Thử lại
              </Button>
              <Button 
                type="primary" 
                size="small"
                onClick={handleExit}
                style={{ 
                  height: '44px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  background: '#0088FF',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  fontWeight: '700',
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
