# PowerShell script to start the Hostel Mess app for mobile access

Write-Host "Starting Hostel Mess Management App for Mobile Access..." -ForegroundColor Green
Write-Host ""

# Get IP Address
Write-Host "Finding your computer's IP address..." -ForegroundColor Yellow
$ipConfig = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" -or $_.IPAddress -like "172.*" }

if ($ipConfig) {
    $ip = $ipConfig[0].IPAddress
    Write-Host "Your IP Address: $ip" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Access the app from your mobile device using:" -ForegroundColor Green
    Write-Host "http://$ip:3000" -ForegroundColor White -BackgroundColor DarkBlue
    Write-Host ""
} else {
    Write-Host "Could not automatically detect IP address." -ForegroundColor Red
    Write-Host "Please run 'ipconfig' manually to find your IP address." -ForegroundColor Red
    Write-Host ""
}

Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the development server
npm run dev:mobile