import React, { useEffect } from 'react';

type ToasterProps = {
  message: string;
  type: 'alert' | 'success' | 'warning';
  onClose: () => void; 
};

const Toaster: React.FC<ToasterProps> = ({ message, type, onClose }) => {
  const getClassName = () => {
    switch (type) {
      case 'success':
        return 'bg-green-700 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      case 'alert':
        return 'bg-red-500 text-white';
      default:
        return '';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`w-fit fixed top-0 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-md transition-opacity duration-300 ${getClassName()}`}>
      {message}
    </div>
  );
};

export default Toaster;