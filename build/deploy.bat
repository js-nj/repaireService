@ECHO OFF
set name=%1
echo "---- deploy start ----"
echo "---- delete file start ----"
if exist "%name%" (
    rd "%name%" /s /q
)
echo "---- delete file complete ----"
echo "---- add file start ----"
md "%name%"
md "%name%\classes"
echo > "%name%\classes\readme"
md "%name%\lib"
echo > "%name%\lib\readme"
echo > "%name%\EMAP_APP"
md "%name%\config"
md "%name%\web"
md "%name%\web\dist"
md "%name%\web\static"
XCOPY ".\dist" "%name%\web\dist" /e
XCOPY ".\static" "%name%\web\static" /e
copy ".\EMAP_APP" "%name%"
copy ".\index.html" "%name%\web"
echo "---- add file complete ----"
rem if exist "app_info.xml" (
rem     echo "---- app_info has ----"
rem     copy "app_info.xml" "%name%"
rem     echo "---- app_info copyed ----"
rem ) else (
rem     echo "error:there is a missing app_info.xml in the root directory! please put app_info.xml in the root directory and then execute the package"
rem     rd "%name%" /s /q
rem     exit
rem )
rem if exist "permission.xml" (
rem     echo "---- permission has ----"
rem     copy "permission.xml" "%name%\config"
rem     echo "---- permission copyed ----"
rem ) else (
rem     echo "error:there is a missing permission.xml in the root directory! please put permission.xml in the root directory and then execute the package"
rem     rd "%name%" /s /q
rem     exit
rem )
echo "---- deploy complete ----"
echo "---- zip start ----"
set src="%cd%\%name%\"
set tar="%cd%\%name%.zip"
cscript ".\build\zip.vbs" "%tar%" "%src%"
rd "%name%" /s /q
echo "---- zip complete ----"
