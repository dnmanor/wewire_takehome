import React, { createContext, useContext, useState, useEffect } from 'react';
import Toaster from '../components/Toaster';

type ToasterContextType = {
  showToast: (message: string, type: 'alert' | 'success' | 'warning') => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'alert' | 'success' | 'warning' | null>(null);

  const showToast = (message: string, type: 'alert' | 'success' | 'warning') => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
        setToastType(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      {toastMessage && <Toaster message={toastMessage} type={toastType!} onClose={() => setToastMessage(null)} />}
      <ToasterContext.Provider value={{ showToast }}>
        {children}
      </ToasterContext.Provider>
    </>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};