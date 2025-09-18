@echo off
echo Starting Intelligent Scanner Application...
echo.
echo Starting Backend...
start "Backend" cmd /k "cd backend && python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt && python main.py"
echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul
echo.
echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm install && npm run dev"
echo.
echo Both services are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause
