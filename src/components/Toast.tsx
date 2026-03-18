import React from 'react';
import './Toast.css';

export interface ToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

const Toast: React.FC<ToastProps> = ({ show, message, type = 'success' }) => {
  if (!show) return null;

  const icons: Record<string, React.ReactNode> = {
    success: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2"/>
        <path d="M8 12l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2"/>
        <path d="M12 16v-4M12 8h.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M12 8v4M12 16h.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
        <path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };

  return (
    <div className={`global-toast global-toast-${type}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};

export default Toast;

// Hook for toast state management
export function useToast() {
  const [toast, setToast] = React.useState<ToastProps>({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: ToastProps['type'] = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3500);
  };

  return { toast, showToast };
}
