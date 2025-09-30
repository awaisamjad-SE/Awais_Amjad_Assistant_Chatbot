# Mobile Access Instructions

## How to Access the Hostel Mess App on Mobile Devices

### Prerequisites
- Your computer and mobile device must be connected to the same WiFi network
- Node.js installed on your computer

### Steps to Run the Application

1. **Start the Development Server**
   ```bash
   npm run dev:mobile
   ```
   or
   ```bash
   npm run dev
   ```

2. **Find Your Computer's IP Address**
   
   **On Windows:**
   - Open Command Prompt (cmd)
   - Type: `ipconfig`
   - Look for "IPv4 Address" under your active network connection
   - Example: `192.168.1.100`

   **On Mac/Linux:**
   - Open Terminal
   - Type: `ifconfig` or `ip addr show`
   - Look for your local IP address
   - Example: `192.168.1.100`

3. **Access from Mobile Device**
   - Open your mobile browser (Chrome, Safari, etc.)
   - Enter the URL: `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

### Features Optimized for Mobile
- ✅ Touch-friendly interface
- ✅ Responsive design that adapts to mobile screens
- ✅ Proper viewport settings for mobile browsers
- ✅ QR code size adjusts based on screen size
- ✅ Large, easy-to-tap buttons and inputs
- ✅ Prevents unwanted zooming on input focus

### Troubleshooting

**Can't Access from Mobile?**
1. Make sure both devices are on the same WiFi network
2. Check if Windows Firewall is blocking the connection
3. Try using a different port by modifying `vite.config.js`
4. Ensure the development server is running

**App Not Loading Properly?**
1. Clear your mobile browser cache
2. Try refreshing the page
3. Check the browser console for errors

**QR Scanner Not Working?**
1. Make sure your mobile browser has camera permissions
2. Use HTTPS if possible (some browsers require secure context for camera access)
3. Try using Chrome on Android or Safari on iOS

### Network Requirements
- Both devices must be on the same local network
- Port 3000 must be accessible (configurable in vite.config.js)
- No VPN should be blocking local network access

### Security Note
This setup is intended for local development only. Do not expose this server to the internet without proper security measures.