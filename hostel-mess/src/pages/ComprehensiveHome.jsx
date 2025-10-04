import React, { useState } from 'react';
import QRGenerator from '../Components/QRGenerator';
import QRScanner from '../Components/QRScanner';
import MealForm from '../Components/MealForm';
import MealHistory from '../Components/MealHistory';

const Home = () => {
  const [studentId, setStudentId] = useState("");
  const [currentView, setCurrentView] = useState("scanner"); // scanner, generator, meal, history

  const containerStyle = {
    padding: "20px",
    maxWidth: "900px", 
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5"
  };

  const sectionStyle = {
    marginBottom: "30px",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    borderLeft: "4px solid #007bff",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  };

  const titleStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
    fontSize: "28px"
  };

  const sectionTitleStyle = {
    color: "#007bff",
    marginBottom: "20px",
    fontSize: "20px"
  };

  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap"
  };

  const navButtonStyle = (isActive) => ({
    padding: "10px 20px",
    backgroundColor: isActive ? "#007bff" : "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease"
  });

  const studentIdDisplayStyle = {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#e3f2fd",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#1976d2"
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "generator":
        return (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>📱 Generate QR Code</h2>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                👤 Enter Student ID:
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "16px",
                  marginBottom: "20px"
                }}
              />
              {studentId && (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <div 
                    style={{ 
                      display: "inline-block", 
                      padding: "20px", 
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                  >
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(studentId)}`}
                      alt={`QR Code for ${studentId}`}
                      style={{ display: "block", margin: "0 auto" }}
                    />
                    <p style={{ marginTop: "15px", color: "#333", fontWeight: "bold" }}>
                      Student ID: {studentId}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "scanner":
        return (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>📷 Scan Student QR</h2>
            <QRScanner setStudentId={setStudentId} />
          </div>
        );
      case "meal":
        return (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>📝 Log New Meal</h2>
            {!studentId && (
              <div style={{ 
                padding: "15px", 
                backgroundColor: "#fff3cd", 
                color: "#856404",
                borderRadius: "6px",
                marginBottom: "20px",
                textAlign: "center"
              }}>
                ⚠️ Please scan QR code first or enter Student ID manually
              </div>
            )}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                👤 Student ID:
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              />
            </div>
            <MealForm studentId={studentId} />
          </div>
        );
      case "history":
        return (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>📋 Meal History</h2>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                👤 Student ID:
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID to fetch meals"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              />
            </div>
            <MealHistory studentId={studentId} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🍽️ Mess Management System</h1>
      
      {/* Student ID Display */}
      {studentId && (
        <div style={studentIdDisplayStyle}>
          👤 Current Student ID: {studentId}
        </div>
      )}

      {/* Navigation */}
      <div style={navStyle}>
        <button 
          style={navButtonStyle(currentView === "scanner")}
          onClick={() => setCurrentView("scanner")}
        >
          📷 Scan QR
        </button>
        <button 
          style={navButtonStyle(currentView === "generator")}
          onClick={() => setCurrentView("generator")}
        >
          📱 Generate QR
        </button>
        <button 
          style={navButtonStyle(currentView === "meal")}
          onClick={() => setCurrentView("meal")}
        >
          🍽️ Log Meal
        </button>
        <button 
          style={navButtonStyle(currentView === "history")}
          onClick={() => setCurrentView("history")}
        >
          📋 Meal History
        </button>
      </div>

      {/* Content */}
      {renderCurrentView()}
    </div>
  );
};

export default Home;