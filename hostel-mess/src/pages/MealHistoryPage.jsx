import React, { useState, useEffect } from 'react';
import MealHistory from '../Components/MealHistory';

const MealHistoryPage = () => {
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
    maxWidth: "1000px", 
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
          <h1 style={titleStyle}>📋 Meal History</h1>
          <p style={subtitleStyle}>
            View your complete meal ordering history and spending summary
          </p>
        </div>

        <div style={warningStyle}>
          <h4 style={{ marginBottom: "15px" }}>⚠️ No Student ID Found</h4>
          <p style={{ marginBottom: "20px" }}>
            Please scan a QR code first or enter a Student ID manually to view meal history.
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
              View History for this ID
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>📋 Meal History</h1>
        <p style={subtitleStyle}>
          View your complete meal ordering history and spending summary
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
        <h4 style={{ color: "#1976d2", marginBottom: "15px" }}>📊 What You'll See:</h4>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: window.innerWidth > 768 ? "repeat(2, 1fr)" : "1fr",
          gap: "15px",
          color: "#1976d2", 
          fontSize: "14px",
          lineHeight: "1.8"
        }}>
          <div>
            <strong>📅 Order Dates:</strong> When you placed each order<br />
            <strong>🍽️ Food Items:</strong> What meals you ordered<br />
          </div>
          <div>
            <strong>📦 Quantities:</strong> How much of each item<br />
            <strong>💰 Total Spending:</strong> Your complete expense summary<br />
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <MealHistory studentId={studentId} />
      </div>

      <div style={{
        backgroundColor: "#fff3cd",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #ffeaa7",
        marginTop: "20px",
        textAlign: "center"
      }}>
        <h4 style={{ color: "#856404", marginBottom: "10px" }}>💡 History Features:</h4>
        <ul style={{ 
          color: "#856404", 
          textAlign: "left", 
          display: "inline-block",
          fontSize: "14px",
          lineHeight: "1.8"
        }}>
          <li>View all your past meal orders in chronological order</li>
          <li>See total spending across all orders</li>
          <li>Track your meal consumption patterns</li>
          <li>Export or print your meal history for records</li>
          <li>Contact mess administration for any discrepancies</li>
        </ul>
      </div>
    </div>
  );
};

export default MealHistoryPage;