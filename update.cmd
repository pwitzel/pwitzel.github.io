@echo off
echo Commit message:
set /p message=
echo.

git pull

git add .
git commit -m "%message%"
git push

echo.
echo Updated repository. Changes made
pause
