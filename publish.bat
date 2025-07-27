@echo off

git add --all

set MSG=%1
if "%MSG%"=="" set MSG=Added new features, such as "toLocaleString()".

git commit -m "%MSG%"

git push origin master

pause
