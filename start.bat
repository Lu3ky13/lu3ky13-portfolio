@echo off
cd /d "%~dp0"
echo.
echo  ========================================
echo   Lu3ky13 3D Portfolio
echo   Open: http://localhost:8080
echo  ========================================
echo.
start http://localhost:8080/
python -m http.server 8080
