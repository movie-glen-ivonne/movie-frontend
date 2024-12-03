import React, { useEffect } from "react";

// Define a type for the props
interface ToastProps {
    message: string;
    onClose: () => void;
    type: 'success' | 'error'; // Add 'error' as a possible type
}

const Toast: React.FC<ToastProps> = ({ message, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Automatically close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  // Set the background color based on the type
  const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-4 z-999 right-4 ${backgroundColor} text-white px-4 py-3 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out opacity-100`}>
      {message}
    </div>
  );
};

export default Toast;