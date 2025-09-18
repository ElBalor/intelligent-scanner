@echo off
echo Setting up Intelligent Scanner Application...
echo.

echo ========================================
echo STEP 1: Installing Python Dependencies
echo ========================================
cd backend
echo Creating Python virtual environment...
python -m venv venv
echo Activating virtual environment...
call venv\Scripts\activate
echo Installing Python packages...
pip install -r requirements.txt
echo Python dependencies installed successfully!
cd ..

echo.
echo ========================================
echo STEP 2: Installing Node.js Dependencies
echo ========================================
cd frontend
echo Installing Node.js packages...
npm install
echo Node.js dependencies installed successfully!
cd ..

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo To start the application:
echo 1. Run start-both.bat to start both backend and frontend
echo 2. Or run start-backend.bat and start-frontend.bat separately
echo.
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit...
pause
