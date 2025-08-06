import { useEffect } from 'react';
import { Button } from './button';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
}

export default function Modal({ isOpen, onClose, title, message, type = 'info' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          bg: 'bg-red-50',
          border: 'border-red-200',
          titleColor: 'text-red-800',
          iconBg: 'bg-red-100'
        };
      case 'success':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          bg: 'bg-green-50',
          border: 'border-green-200',
          titleColor: 'text-green-800',
          iconBg: 'bg-green-100'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          titleColor: 'text-yellow-800',
          iconBg: 'bg-yellow-100'
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-600" />,
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          titleColor: 'text-blue-800',
          iconBg: 'bg-blue-100'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${styles.border} border-2`}>
        <div className={`${styles.bg} px-6 py-4 rounded-t-lg`}>
          <div className="flex items-center space-x-3">
            <div className={`${styles.iconBg} rounded-full w-10 h-10 flex items-center justify-center`}>
              {styles.icon}
            </div>
            <h3 className={`text-lg font-semibold ${styles.titleColor}`}>
              {title}
            </h3>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {message}
          </p>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
          <Button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}