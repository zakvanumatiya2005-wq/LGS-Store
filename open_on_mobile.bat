@echo off
title DukaanOS Mobile Server
cd /d "%~dp0"
echo ========================================================
echo   🏪 DukaanOS Mobile Connection Server
echo ========================================================
echo.
echo   Apne Mobile Phone ke Chrome / Safari browser me 
echo   ye link daalein:
echo.
echo   👉 http://192.168.0.125:8080
echo.
echo ========================================================
echo   (Zaroori: Mobile aur Computer ek hi Wi-Fi par hone chahiye)
echo ========================================================
echo.
if exist "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe" (
  "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe" server.js
) else (
  powershell -ExecutionPolicy Bypass -File .\serve.ps1
)
pause
