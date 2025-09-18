@echo off
echo Fixing TypeScript configuration...
echo.

echo ========================================
echo STEP 1: Clean and reinstall dependencies
echo ========================================
cd frontend
echo Removing node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo Installing fresh dependencies...
npm install

echo.
echo ========================================
echo STEP 2: TypeScript configuration check
echo ========================================
echo Checking TypeScript configuration...
npx tsc --noEmit

echo.
echo ========================================
echo FIX COMPLETE!
echo ========================================
echo.
echo TypeScript errors should now be resolved.
echo You can now run the application with start-both.bat
echo.
pause
