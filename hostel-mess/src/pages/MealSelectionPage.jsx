import React, { useState, useEffect } from 'react';
import MealForm from '../Components/MealForm';

const MealSelectionPage = () => {
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    // Get student ID from localStorage (set by QR scanner)
    const scannedId = localStorage.getItem('scannedStudentId');
    if (scannedId) {
      setStudentId(scannedId);
    }
  }, []);

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

  const warningStyle = {
    backgroundColor: "#f8d7da",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #f5c6cb",
    textAlign: "center",
    color: "#721c24"
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "300px",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    marginBottom: "20px"
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px"
  };

  if (!studentId) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>🍽️ Meal Selection</h1>
          <p style={subtitleStyle}>
            Select your meals and quantities for today
          </p>
        </div>

        <div style={warningStyle}>
          <h4 style={{ marginBottom: "15px" }}>⚠️ No Student ID Found</h4>
          <p style={{ marginBottom: "20px" }}>
            Please scan a QR code first or enter a Student ID manually to proceed with meal selection.
          </p>
          
          <div style={{ textAlign: "center" }}>
            <h5 style={{ marginBottom: "10px" }}>Enter Student ID manually:</h5>
            <input
              type="text"
              placeholder="Enter Student ID"
              style={inputStyle}
              onChange={(e) => setStudentId(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = "#007bff"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
            <br />
            <button
              style={buttonStyle}
              onClick={() => {
                if (studentId.trim()) {
                  localStorage.setItem('scannedStudentId', studentId.trim());
                }
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
            >
              Continue with this ID
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>🍽️ Meal Selection</h1>
        <p style={subtitleStyle}>
          Select your meals and quantities for today
        </p>
        {studentId && (
          <div style={{
            backgroundColor: "#d4edda",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #c3e6cb",
            display: "inline-block",
            marginTop: "10px"
          }}>
            <strong style={{ color: "#155724" }}>Student ID: {studentId}</strong>
          </div>
        )}
      </div>

      <div style={instructionStyle}>
        <h4 style={{ color: "#1976d2", marginBottom: "15px" }}>📋 How to Order:</h4>
        <ul style={{ 
          color: "#1976d2", 
          fontSize: "14px",
          lineHeight: "1.8",
          paddingLeft: "20px"
        }}>
          <li>Select the food items you want from the menu below</li>
          <li>Choose the quantity for each item</li>
          <li>Review your order and total price</li>
          <li>Click submit to place your order</li>
          <li>Your order will be recorded and saved to your meal history</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <MealForm studentId={studentId} />
      </div>

      <div style={{
        backgroundColor: "#fff3cd",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #ffeaa7",
        marginTop: "20px",
        textAlign: "center"
      }}>
        <h4 style={{ color: "#856404", marginBottom: "10px" }}>💡 Tips:</h4>
        <ul style={{ 
          color: "#856404", 
          textAlign: "left", 
          display: "inline-block",
          fontSize: "14px",
          lineHeight: "1.8"
        }}>
          <li>You can order multiple quantities of the same item</li>
          <li>Prices are calculated automatically based on quantity</li>
          <li>Orders are saved to your meal history immediately</li>
          <li>Contact mess staff if you need to modify an order</li>
        </ul>
      </div>
    </div>
  );
};

export default MealSelectionPage;