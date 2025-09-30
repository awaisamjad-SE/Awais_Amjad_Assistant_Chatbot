import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#007bff',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const logoStyle = {
    color: 'white',
    fontSize: window.innerWidth > 768 ? '24px' : '20px',
    fontWeight: 'bold',
    textDecoration: 'none',
    margin: '0'
  };

  const navLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: window.innerWidth > 768 ? '30px' : '15px',
    flexWrap: 'wrap'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    fontSize: window.innerWidth > 768 ? '16px' : '14px',
    fontWeight: '500'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontWeight: 'bold'
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          🏠 Hostel Mess Management
        </Link>
        
        <ul style={navLinksStyle}>
          <li>
            <Link 
              to="/" 
              style={isActive('/') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              🏠 Home
            </Link>
          </li>
          
          <li>
            <Link 
              to="/generate-qr" 
              style={isActive('/generate-qr') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/generate-qr')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/generate-qr')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              📱 Generate QR
            </Link>
          </li>
          
          <li>
            <Link 
              to="/scan-qr" 
              style={isActive('/scan-qr') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/scan-qr')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/scan-qr')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              📸 Scan QR
            </Link>
          </li>
          
          <li>
            <Link 
              to="/meal-selection" 
              style={isActive('/meal-selection') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/meal-selection')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/meal-selection')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              🍽️ Meal Selection
            </Link>
          </li>
          
          <li>
            <Link 
              to="/meal-history" 
              style={isActive('/meal-history') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/meal-history')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/meal-history')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              📋 Meal History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;