import React from 'react';
import './GradientButton.css';

const GradientButton = ({ 
  children, 
  onClick, 
  type = "button", 
  disabled = false,
  variant = "primary" // primary, secondary
}) => {
  return (
    <div className={`gradient-button-container ${variant}`}>
      <button 
        className="gradient-button" 
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default GradientButton;
