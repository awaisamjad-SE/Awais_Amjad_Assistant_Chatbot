# Hostel Mess Management System

A React-based QR code management system for university hostels, optimized for both desktop and mobile devices.

## Features

- 📱 **Mobile-First Design**: Fully responsive and optimized for mobile devices
- 🔍 **QR Code Generation**: Generate QR codes for student IDs
- 📸 **QR Code Scanning**: Scan QR codes using device camera
- 🍽️ **Meal Management**: Track and manage meal selections
- 🌐 **Network Access**: Access from mobile devices on the same network

## Quick Start

### For Desktop Development
```bash
npm install
npm run dev
```

### For Mobile Access (Recommended)
```bash
npm install
npm run dev:mobile
```

### Easy Mobile Setup (Windows)
- Double-click `start-mobile.bat`, or
- Run `start-mobile.ps1` in PowerShell

## Mobile Access Instructions

1. **Start the server**: `npm run dev:mobile`
2. **Find your IP address**: 
   - Windows: `ipconfig` in Command Prompt
   - Mac/Linux: `ifconfig` in Terminal
3. **Access from mobile**: Open `http://YOUR_IP:3000` in mobile browser

Example: If your IP is `192.168.1.100`, access `http://192.168.1.100:3000`

## Mobile Optimizations

✅ **Responsive Design**: Adapts to all screen sizes  
✅ **Touch-Friendly**: Large buttons and touch targets  
✅ **Camera Integration**: QR code scanning with device camera  
✅ **Viewport Optimized**: Prevents unwanted zooming  
✅ **Fast Loading**: Optimized for mobile networks  

## Project Structure

```
src/
├── components/
│   ├── QRGenerator.jsx    # Generate QR codes
│   ├── QRScanner.jsx      # Scan QR codes
│   └── MealForm.jsx       # Meal selection form
├── App.jsx                # Main application
└── main.jsx              # Entry point
```

## Technology Stack

- **Frontend**: React 19 + Vite
- **QR Codes**: qrcode.react, html5-qrcode
- **Styling**: Inline styles (mobile-optimized)
- **Dev Server**: Vite (configured for network access)

## Network Requirements

- Both devices must be on the same WiFi network
- Port 3000 must be accessible (configurable)
- No VPN blocking local network access

## Troubleshooting

**Can't access from mobile?**
- Check both devices are on same WiFi
- Verify firewall settings
- Try different browser on mobile

**QR scanner not working?**
- Grant camera permissions
- Use HTTPS if available
- Try Chrome (Android) or Safari (iOS)

For detailed mobile setup instructions, see [MOBILE_ACCESS.md](./MOBILE_ACCESS.md)

## Development

Built with React + Vite template. For production deployment, run:
```bash
npm run build
npm run preview
```
