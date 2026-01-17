@echo off
echo Restoring working version from backup...
echo.

copy backup-working-version\index.html index.html
copy backup-working-version\styles.css styles.css  
copy backup-working-version\script.js script.js
copy backup-working-version\README.md README.md

echo.
echo ✅ Backup restored successfully!
echo.
echo Files restored:
echo - index.html
echo - styles.css
echo - script.js
echo - README.md
echo.
echo You can now open index.html to see the working version.
pause