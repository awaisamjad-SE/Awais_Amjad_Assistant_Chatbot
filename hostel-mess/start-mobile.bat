@echo off
echo Starting Hostel Mess Management App for Mobile Access...
echo.

echo Finding your computer's IP address...
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%i
    set ip=!ip: =!
    if not "!ip!"=="" (
        echo Your IP Address: !ip!
        echo.
        echo Access the app from your mobile device using:
        echo http://!ip!:3000
        echo.
        goto :found
    )
)

:found
echo Starting development server...
echo Press Ctrl+C to stop the server
echo.

npm run dev:mobile