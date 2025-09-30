import React, { useState } from 'react';
import SimpleCameraQRScanner from '../Components/SimpleCameraQRScanner';
import ManualStudentIdInput from '../Components/ManualStudentIdInput';
import { useNavigate } from 'react-router-dom';

const ScanQRPage = () => {
  const [scannedStudentId, setScannedStudentId] = useState("");
  const navigate = useNavigate();

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

  const successStyle = {
    backgroundColor: "#d4edda",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #c3e6cb",
    marginTop: "20px",
    textAlign: "center"
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    margin: "10px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s ease"
  };

  const handleStudentIdSet = (studentId) => {
    setScannedStudentId(studentId);
    // Store in localStorage for other pages to access
    localStorage.setItem('scannedStudentId', studentId);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>📸 Scan Student QR Code</h1>
        <p style={subtitleStyle}>
          Scan a student's QR code to access their meal options and history
        </p>
      </div>

      <div style={instructionStyle}>
        <h4 style={{ color: "#1976d2", marginBottom: "15px" }}>📋 Instructions for Staff:</h4>
        <div style={stepStyle}>
          <strong>Option 1 - Camera Scan:</strong> Click "Start Camera" and scan the QR code
        </div>
        <div style={stepStyle}>
          <strong>Option 2 - Manual Entry:</strong> Enter the complete student ID manually
        </div>
        <div style={stepStyle}>
          <strong>⚠️ Important:</strong> Enter the FULL student ID (e.g., if ID is "12", enter "12" not "1")
        </div>
        <div style={stepStyle}>
          <strong>Step 3:</strong> Navigate to meal selection or history pages
        </div>
      </div>

      <div style={sectionStyle}>
        <SimpleCameraQRScanner 
          onScanResult={handleStudentIdSet}
          onError={(error) => console.error('QR Scan Error:', error)}
        />
      </div>

      {/* Manual Input Alternative */}
      <div style={sectionStyle}>
        <ManualStudentIdInput onStudentIdSet={handleStudentIdSet} />
      </div>

      {scannedStudentId && (
        <div style={successStyle}>
          <h4 style={{ color: "#155724", marginBottom: "15px" }}>
            ✅ Successfully Scanned!
          </h4>
          <p style={{ color: "#155724", marginBottom: "20px" }}>
            <strong>Student ID:</strong> {scannedStudentId}
          </p>
          
          <div>
            <button
              style={buttonStyle}
              onClick={() => navigate('/meal-selection')}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
            >
              🍽️ Go to Meal Selection
            </button>
            
            <button
              style={{...buttonStyle, backgroundColor: "#28a745"}}
              onClick={() => navigate('/meal-history')}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#1e7e34"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
            >
              📋 View Meal History
            </button>
          </div>
        </div>
      )}

      <div style={{
        backgroundColor: "#fff3cd",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #ffeaa7",
        marginTop: "20px",
        textAlign: "center"
      }}>
        <h4 style={{ color: "#856404", marginBottom: "10px" }}>⚠️ Important Notes:</h4>
        <ul style={{ 
          color: "#856404", 
          textAlign: "left", 
          display: "inline-block",
          fontSize: "14px",
          lineHeight: "1.8"
        }}>
          <li>Make sure the camera has proper lighting</li>
          <li>Hold the QR code steady for better scanning</li>
          <li>Allow camera permissions when prompted</li>
          <li>Use Chrome or Safari for best camera support</li>
        </ul>
      </div>
    </div>
  );
};

export default ScanQRPage;