import React, { useState } from 'react';

const ManualStudentIdInput = ({ onStudentIdSet }) => {
  const [inputId, setInputId] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow alphanumeric characters and underscores
    if (/^[a-zA-Z0-9_]*$/.test(value)) {
      setInputId(value);
    }
  };

  const handleSubmit = () => {
    if (inputId.trim() && inputId.length >= 1) {
      setIsValidating(true);
      
      // Simulate validation delay
      setTimeout(() => {
        onStudentIdSet(inputId.trim());
        setIsValidating(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      margin: '20px 0'
    }}>
      <h4 style={{ color: '#333', marginBottom: '15px' }}>
        ✏️ Manual Student ID Entry
      </h4>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: 'bold',
          color: '#333'
        }}>
          🆔 Enter Student ID:
        </label>
        <input
          type="text"
          value={inputId}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="e.g., 12, 123, student_12"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #ddd',
            fontSize: '16px',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!inputId.trim() || isValidating}
        style={{
          backgroundColor: isValidating ? '#6c757d' : !inputId.trim() ? '#dc3545' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: (!inputId.trim() || isValidating) ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'background-color 0.3s ease'
        }}
      >
        {isValidating ? '⏳ Validating...' : '✅ Set Student ID'}
      </button>

      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#1976d2'
      }}>
        💡 <strong>Tip:</strong> Enter the complete student ID (e.g., if ID is "12", enter "12" not just "1")
      </div>
    </div>
  );
};

export default ManualStudentIdInput;