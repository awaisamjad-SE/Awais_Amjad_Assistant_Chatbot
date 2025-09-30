import React from 'react';
import QRGenerator from '../Components/QRGenerator';

const GenerateQRPage = () => {
  const containerStyle = {
    padding: "20px",
    maxWidth: "800px", 
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "calc(100vh - 80px)"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "30px"
  };

  const titleStyle = {
    color: "#333",
    fontSize: window.innerWidth > 768 ? "28px" : "24px",
    marginBottom: "10px"
  };

  const subtitleStyle = {
    color: "#666",
    fontSize: window.innerWidth > 768 ? "16px" : "14px",
    lineHeight: "1.6"
  };

  const sectionStyle = {
    backgroundColor: "white",
    margin: "20px 0",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  const instructionStyle = {
    backgroundColor: "#e3f2fd",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
    border: "1px solid #bbdefb"
  };

  const stepStyle = {
    margin: "10px 0",
    padding: "10px 0",
    fontSize: "14px",
    color: "#1976d2"
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>📱 Generate Your QR Code</h1>
        <p style={subtitleStyle}>
          Create a unique QR code with your Student ID for easy meal ordering
        </p>
      </div>

      <div style={instructionStyle}>
        <h4 style={{ color: "#1976d2", marginBottom: "15px" }}>📋 Instructions:</h4>
        <div style={stepStyle}>
          <strong>Step 1:</strong> Enter your Student ID in the field below
        </div>
        <div style={stepStyle}>
          <strong>Step 2:</strong> Your QR code will be automatically generated
        </div>
        <div style={stepStyle}>
          <strong>Step 3:</strong> Show this QR code to mess staff for scanning
        </div>
        <div style={stepStyle}>
          <strong>Step 4:</strong> Save or screenshot your QR code for future use
        </div>
      </div>

      <div style={sectionStyle}>
        <QRGenerator />
      </div>

      <div style={{
        backgroundColor: "#fff3cd",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #ffeaa7",
        marginTop: "20px",
        textAlign: "center"
      }}>
        <h4 style={{ color: "#856404", marginBottom: "10px" }}>💡 Pro Tips:</h4>
        <ul style={{ 
          color: "#856404", 
          textAlign: "left", 
          display: "inline-block",
          fontSize: "14px",
          lineHeight: "1.8"
        }}>
          <li>Keep your Student ID handy for quick QR generation</li>
          <li>Take a screenshot of your QR code to save time</li>
          <li>Make sure your QR code is clear and not damaged when showing to staff</li>
          <li>Each Student ID generates a unique QR code</li>
        </ul>
      </div>
    </div>
  );
};

export default GenerateQRPage;