import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator() {
  const [studentId, setStudentId] = useState("");

  const containerStyle = {
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '300px',
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    marginBottom: '20px'
  };

  const qrContainerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    margin: '20px 0'
  };

  const titleStyle = {
    color: '#333',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const instructionStyle = {
    color: '#666',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: '1.5'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>QR Code Generator</h1>
      
      <p style={instructionStyle}>
        Enter your Student ID below to generate a QR code
      </p>
      
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        style={inputStyle}
        onFocus={(e) => e.target.style.borderColor = '#007bff'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />
      
      {studentId && (
        <div style={qrContainerStyle}>
          <QRCodeCanvas 
            value={studentId} 
            size={window.innerWidth > 480 ? 200 : 150}
            level="M"
            includeMargin={true}
          />
          <p style={{marginTop: '15px', color: '#333', fontWeight: 'bold'}}>
            Student ID: {studentId}
          </p>
        </div>
      )}
      
      {!studentId && (
        <div style={{color: '#999', fontSize: '14px', marginTop: '20px'}}>
          Your QR code will appear here
        </div>
      )}
    </div>
  );
}
