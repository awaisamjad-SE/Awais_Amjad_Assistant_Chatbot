import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import GenerateQRPage from './pages/GenerateQRPage';
import ScanQRPage from './pages/ScanQRPage';
import MealSelectionPage from './pages/MealSelectionPage';
import MealHistoryPage from './pages/MealHistoryPage';

function App() {
  const appStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh"
  };

  return (
    <Router>
      <div className="App" style={appStyle}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate-qr" element={<GenerateQRPage />} />
          <Route path="/scan-qr" element={<ScanQRPage />} />
          <Route path="/meal-selection" element={<MealSelectionPage />} />
          <Route path="/meal-history" element={<MealHistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
