@echo off
echo 🔧 Setting up OSINT Tools Integration...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python first.
    pause
    exit /b 1
)

echo ✅ Python found

REM Install Sherlock dependencies
echo 📦 Installing Sherlock dependencies...
cd ..\referance\sherlock
if exist requirements.txt (
    pip install -r requirements.txt
) else (
    pip install requests requests-futures colorama pandas
)

REM Install Inspector dependencies
echo 📦 Installing Inspector dependencies...
cd ..\Inspector
pip install -r requirements.txt

REM Go back to API directory
cd ..\..\snapshot-web-app\api

echo ✅ All dependencies installed successfully!
echo 🚀 You can now start the API server with: npm start
pause