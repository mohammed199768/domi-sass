@echo off
REM ============================================================
REM  DOMINASE - Promo Film Finishing Script
REM  720x1280 -> 1080x1920 @ 24fps + music bed
REM  Cost: 0 credits. Runs entirely on your machine.
REM ============================================================
REM
REM  BEFORE RUNNING:
REM  1. Install ffmpeg if you don't have it:
REM        winget install Gyan.FFmpeg
REM     (then close and reopen this terminal)
REM
REM  2. Download these two files from the Freepik project
REM     "DOMINASE-Campaign" and put them in THIS folder:
REM        film_raw.mp4    <- DOMINASE-Promo-Film-Silent-v1
REM        score_raw.mp3   <- the 30s ambient score
REM
REM  3. Double-click this file.
REM ============================================================

setlocal
cd /d "%~dp0"

if not exist "film_raw.mp4" (
  echo [ERROR] film_raw.mp4 not found in this folder.
  pause
  exit /b 1
)
if not exist "score_raw.mp3" (
  echo [ERROR] score_raw.mp3 not found in this folder.
  pause
  exit /b 1
)

echo.
echo === Step 1/2: upscaling to 1080x1920 @ 24fps and muxing score ===
echo.

ffmpeg -y ^
  -i "film_raw.mp4" ^
  -i "score_raw.mp3" ^
  -filter_complex "[0:v]scale=1080:1920:flags=lanczos,fps=24,format=yuv420p[v];[1:a]afade=t=in:st=0:d=1.5,afade=t=out:st=28.5:d=1.5,volume=0.85[a]" ^
  -map "[v]" -map "[a]" ^
  -c:v libx264 -crf 16 -preset slow ^
  -c:a aac -b:a 192k -ar 48000 ^
  -shortest ^
  -movflags +faststart ^
  "DOMINASE-Promo-Film-Final.mp4"

if errorlevel 1 (
  echo.
  echo [ERROR] ffmpeg failed. Check that ffmpeg is installed and on PATH.
  pause
  exit /b 1
)

echo.
echo === Step 2/2: also exporting a silent 1080x1920 master ===
echo.

ffmpeg -y ^
  -i "film_raw.mp4" ^
  -vf "scale=1080:1920:flags=lanczos,fps=24,format=yuv420p" ^
  -an ^
  -c:v libx264 -crf 16 -preset slow ^
  -movflags +faststart ^
  "DOMINASE-Promo-Film-Silent-1080.mp4"

echo.
echo ============================================================
echo  DONE.
echo    DOMINASE-Promo-Film-Final.mp4        (with music)
echo    DOMINASE-Promo-Film-Silent-1080.mp4  (silent master)
echo.
echo  Both are 1080x1920, 24fps, 30 seconds.
echo  Drop your Arabic typography and CTA onto the lower third,
echo  and the logo into the final two seconds.
echo ============================================================
echo.
pause
