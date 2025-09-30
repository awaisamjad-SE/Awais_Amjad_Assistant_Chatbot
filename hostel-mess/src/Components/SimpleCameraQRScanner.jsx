import React, { useState, useRef, useEffect, useCallback } from 'react';

const SimpleCameraQRScanner = ({ onScanResult, onError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front, 'environment' for back
  const videoRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  const stopScanning = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
      scanTimeoutRef.current = null;
    }
    
    setIsScanning(false);
  }, [stream]);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  const startScanning = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setIsScanning(true);
        
        // Simulate QR detection after camera starts
        simulateQRDetection();
      }
    } catch (error) {
      console.error('Error starting camera:', error);
      onError && onError(error.message || 'Camera access denied');
    }
  };

  const simulateQRDetection = () => {
    // Simulate QR code detection with realistic student IDs
    const studentIds = ["12", "123", "1234", "45", "67", "890"];
    
    scanTimeoutRef.current = setTimeout(() => {
      if (isScanning) {
        const randomId = studentIds[Math.floor(Math.random() * studentIds.length)];
        onScanResult && onScanResult(randomId);
        stopScanning();
      }
    }, 3000); // Simulate 3 second scan time
  };

  const switchCamera = () => {
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacingMode);
    
    if (isScanning) {
      stopScanning();
      setTimeout(() => startScanning(), 500);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <h3 style={{ 
        color: '#333', 
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Camera QR Scanner
      </h3>
      
      <div style={{
        position: 'relative',
        width: '300px',
        height: '200px',
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          playsInline
          muted
        />
        
        {isScanning && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid #00ff00',
            width: '150px',
            height: '150px',
            borderRadius: '8px',
            animation: 'pulse 1.5s infinite'
          }} />
        )}
        
        {isScanning && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            Scanning for QR code...
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {!isScanning ? (
          <button
            onClick={startScanning}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            📷 Start Scanning
          </button>
        ) : (
          <button
            onClick={stopScanning}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          >
            ⏹️ Stop Scanning
          </button>
        )}
        
        <button
          onClick={switchCamera}
          disabled={!isScanning}
          style={{
            backgroundColor: isScanning ? '#28a745' : '#6c757d',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: isScanning ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            if (isScanning) e.target.style.backgroundColor = '#218838';
          }}
          onMouseOut={(e) => {
            if (isScanning) e.target.style.backgroundColor = '#28a745';
          }}
        >
          🔄 Switch Camera
        </button>
      </div>

      <p style={{
        marginTop: '15px',
        color: '#666',
        fontSize: '12px',
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        {facingMode === 'environment' ? '📱 Using back camera' : '🤳 Using front camera'}
        <br />
        Position QR code within the green frame
      </p>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SimpleCameraQRScanner;