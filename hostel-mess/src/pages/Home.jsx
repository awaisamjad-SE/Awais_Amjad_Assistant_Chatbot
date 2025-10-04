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
            <QRGenerator />
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

  const cardTitleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px"
  };

  const cardDescStyle = {
    color: "#666",
    marginBottom: "20px",
    lineHeight: "1.5"
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    transition: "background-color 0.3s ease"
  };

  const instructionStyle = {
    backgroundColor: "#e3f2fd",
    padding: "20px",
    borderRadius: "12px",
    margin: "40px 0",
    textAlign: "center"
  };

  const stepStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px"
  };

  const stepItemStyle = {
    flex: "1",
    minWidth: "200px",
    textAlign: "center"
  };

  const stepNumberStyle = {
    backgroundColor: "#007bff",
    color: "white",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px auto",
    fontWeight: "bold"
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Welcome to Hostel Mess Management System</h1>
        <p style={subtitleStyle}>
          Streamline your meal ordering process with QR code technology
        </p>
      </div>

      <div style={instructionStyle}>
        <h3 style={{ color: "#1976d2", marginBottom: "20px" }}>How it works:</h3>
        <div style={stepStyle}>
          <div style={stepItemStyle}>
            <div style={stepNumberStyle}>1</div>
            <strong>Students:</strong> Generate your personal QR code
          </div>
          <div style={stepItemStyle}>
            <div style={stepNumberStyle}>2</div>
            <strong>Staff:</strong> Scan student QR codes
          </div>
          <div style={stepItemStyle}>
            <div style={stepNumberStyle}>3</div>
            <strong>Order:</strong> Select meals and view history
          </div>
        </div>
      </div>

      <div style={cardsContainerStyle}>
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
        >
          <div style={iconStyle}>📱</div>
          <h3 style={cardTitleStyle}>Generate QR Code</h3>
          <p style={cardDescStyle}>
            Students can generate their unique QR code containing their student ID for easy identification
          </p>
          <Link 
            to="/generate-qr" 
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            Generate QR Code
          </Link>
        </div>

        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
        >
          <div style={iconStyle}>📸</div>
          <h3 style={cardTitleStyle}>Scan QR Code</h3>
          <p style={cardDescStyle}>
            Staff can scan student QR codes to quickly identify students and access their meal options
          </p>
          <Link 
            to="/scan-qr" 
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            Scan QR Code
          </Link>
        </div>

        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
        >
          <div style={iconStyle}>🍽️</div>
          <h3 style={cardTitleStyle}>Meal Selection</h3>
          <p style={cardDescStyle}>
            After scanning, students can select their meals and quantities for the day
          </p>
          <Link 
            to="/meal-selection" 
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            Select Meals
          </Link>
        </div>

        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
        >
          <div style={iconStyle}>📋</div>
          <h3 style={cardTitleStyle}>Meal History</h3>
          <p style={cardDescStyle}>
            View your complete meal history with dates, quantities, and total spending
          </p>
          <Link 
            to="/meal-history" 
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;