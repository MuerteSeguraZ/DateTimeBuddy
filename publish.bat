@echo off

git add --all

set MSG=%1
if "%MSG%"=="" set MSG=More week management.

git commit -m "%MSG%"

git push origin master

pause
