import React, { useEffect, useState } from 'react';
import './MessageBox.css';

const MessageBox = ({ msg, status }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (msg) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [msg]);

  if (!isVisible) return null;

  return (
    <div className={`message-box ${status === 1 ? 'success' : 'error'}`}>
      {msg}
    </div>
  );
};

export default MessageBox;
