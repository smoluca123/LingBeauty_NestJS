@echo off
echo ===============================================
echo  Downloading Vietnamese Province Data
echo ===============================================
echo.

echo [1/2] Downloading V1 data (Before 07/2025)...
curl -o src/modules/provinces/data/provinces-v1.json "https://provinces.open-api.vn/api/v1/?depth=3"
echo V1 data downloaded successfully!
echo.

echo [2/2] Downloading V2 data (After 07/2025)...
curl -o src/modules/provinces/data/provinces-v2.json "https://provinces.open-api.vn/api/v2/?depth=2"
echo V2 data downloaded successfully!
echo.

echo ===============================================
echo  Download Complete!
echo ===============================================
echo.
echo Next steps:
echo 1. Check the downloaded JSON files in src/modules/provinces/data/
echo 2. Restart your NestJS server
echo 3. Test the API endpoints:
echo    - GET http://localhost:3001/provinces/v1
echo    - GET http://localhost:3001/provinces/v2
echo.
pause
