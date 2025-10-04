import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ setStudentId }) {
  const [scannerRunning, setScannerRunning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const scannerRef = useRef(null);

  const onScanSuccess = (decodedText) => {
    setStudentId(decodedText);
    setScanResult(decodedText);
    
    // Stop the scanner after successful scan
    if (scannerRef.current && scannerRunning) {
      scannerRef.current.clear().then(() => {
        setScannerRunning(false);
      }).catch(err => console.error("Failed to clear scanner", err));
    }
  };

  const startScanner = () => {
    if (!scannerRunning) {
      scannerRef.current = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
      scannerRef.current.render(onScanSuccess);
      setScannerRunning(true);
      setScanResult("");
    }
  };

  const stopScanner = () => {
    if (scannerRef.current && scannerRunning) {
      scannerRef.current.clear().then(() => {
        setScannerRunning(false);
      }).catch(err => console.error("Failed to clear scanner", err));
    }
  };

  useEffect(() => {
    if (!scannerRunning) {
      startScanner();
    }
    
    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Cleanup error", err));
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ textAlign: "center" }}>
      <div id="reader" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}></div>
      
      {scanResult && (
        <div style={{ 
          marginTop: "15px", 
          padding: "12px", 
          backgroundColor: "#d4edda", 
          color: "#155724",
          border: "1px solid #c3e6cb",
          borderRadius: "6px"
        }}>
          ✅ QR Scanned Successfully: {scanResult}<br />
          📱 Camera stopped. Ready to log meal!
        </div>
      )}
      
      <div style={{ marginTop: "15px" }}>
        {!scannerRunning ? (
          <button 
            onClick={startScanner}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            📷 Start Scanner
          </button>
        ) : (
          <button 
            onClick={stopScanner}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            ⏹️ Stop Scanner
          </button>
        )}
      </div>
    </div>
  );
}
