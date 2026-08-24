$ErrorActionPreference = "Stop"

$campaignRoot = "C:\Users\domim\Desktop\domi-sass\exports\qasr-campaign-v2"
$demoVideo = "C:\Users\domim\Videos\qaer-alfrah.mp4"
$codingShort = "C:\Users\domim\Videos\Screen Recordings\Screen Recording 2026-07-27 203721.mp4"
$codingLong = "C:\Users\domim\Videos\Screen Recordings\Screen Recording 2026-07-27 204507.mp4"
$segmentRoot = Join-Path $campaignRoot "reels\segments"

New-Item -ItemType Directory -Force -Path (Join-Path $segmentRoot "reel-01"), (Join-Path $segmentRoot "reel-02") | Out-Null

function Render-StillClip {
    param([string]$InputFile, [double]$Duration, [string]$OutputFile)
    $frameCount = [Math]::Ceiling($Duration * 30)
    ffmpeg -y -v error -loop 1 -i $InputFile -t $Duration -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.00045,1.035)':d=${frameCount}:s=1080x1920:fps=30,format=yuv420p" -an -c:v libx264 -preset medium -crf 18 -movflags +faststart $OutputFile
    if ($LASTEXITCODE -ne 0) { throw "Still clip render failed: $InputFile" }
}

function Render-FramedImageClip {
    param([string]$InputFile, [double]$Duration, [string]$OutputFile)
    $frameCount = [Math]::Ceiling($Duration * 30)
    ffmpeg -y -v error -loop 1 -i $InputFile -t $Duration -filter_complex "[0:v]split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=28:2,eq=brightness=-0.35:saturation=0.65[bg];[fg]scale=960:1540:force_original_aspect_ratio=decrease,zoompan=z='min(zoom+0.00035,1.025)':d=${frameCount}:s=960x1540:fps=30[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p" -an -c:v libx264 -preset medium -crf 18 -movflags +faststart $OutputFile
    if ($LASTEXITCODE -ne 0) { throw "Framed image render failed: $InputFile" }
}

function Render-FramedVideoClip {
    param([string]$InputFile, [double]$Start, [double]$SourceDuration, [double]$Speed, [string]$OutputFile)
    ffmpeg -y -v error -ss $Start -t $SourceDuration -i $InputFile -filter_complex "[0:v]setpts=PTS/$Speed,split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:2,eq=brightness=-0.42:saturation=0.60[bg];[fg]scale=990:1600:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p" -an -r 30 -c:v libx264 -preset medium -crf 18 -movflags +faststart $OutputFile
    if ($LASTEXITCODE -ne 0) { throw "Framed video render failed: $InputFile" }
}

$graphics = Join-Path $campaignRoot "graphics\renders"
$screens = Join-Path $campaignRoot "assets\screens"
$reelOne = Join-Path $segmentRoot "reel-01"
$reelTwo = Join-Path $segmentRoot "reel-02"

# Reel 01 — From message to platform
Render-StillClip (Join-Path $graphics "01.png") 2.8 (Join-Path $reelOne "01.mp4")
Render-StillClip (Join-Path $graphics "02.png") 2.5 (Join-Path $reelOne "02.mp4")
Render-FramedVideoClip $codingShort 0 4.56 2.4 (Join-Path $reelOne "03.mp4")
Render-FramedVideoClip $codingLong 0 9.2 4.0 (Join-Path $reelOne "04.mp4")
Render-FramedVideoClip $demoVideo 0 4.16 1.6 (Join-Path $reelOne "05.mp4")
Render-FramedVideoClip $demoVideo 10 6.72 2.4 (Join-Path $reelOne "06.mp4")
Render-FramedVideoClip $demoVideo 30 8.4 3.0 (Join-Path $reelOne "07.mp4")
Render-FramedVideoClip $demoVideo 99.5 9.9 3.3 (Join-Path $reelOne "08.mp4")
Render-StillClip (Join-Path $graphics "04.png") 2.8 (Join-Path $reelOne "09.mp4")
Render-StillClip (Join-Path $graphics "05.png") 3.2 (Join-Path $reelOne "10.mp4")

# Reel 02 — How the platform works
Render-StillClip (Join-Path $graphics "03.png") 2.7 (Join-Path $reelTwo "01.mp4")
Render-FramedVideoClip $demoVideo 0 4.48 1.6 (Join-Path $reelTwo "02.mp4")
Render-FramedVideoClip $demoVideo 10 6.72 2.4 (Join-Path $reelTwo "03.mp4")
Render-FramedVideoClip $demoVideo 99.5 9.9 3.3 (Join-Path $reelTwo "04.mp4")
Render-FramedVideoClip $codingShort 0 4.56 2.07 (Join-Path $reelTwo "05.mp4")
Render-StillClip (Join-Path $graphics "04.png") 3.5 (Join-Path $reelTwo "06.mp4")
Render-FramedVideoClip $demoVideo 4 6 2.4 (Join-Path $reelTwo "07.mp4")
Render-FramedImageClip (Join-Path $screens "qaser-alfarah1.png") 2.7 (Join-Path $reelTwo "08.mp4")
Render-StillClip (Join-Path $graphics "05.png") 3.2 (Join-Path $reelTwo "09.mp4")

ffmpeg -y -v error -f concat -safe 0 -i (Join-Path $campaignRoot "reels\reel-01-concat.txt") -c copy (Join-Path $campaignRoot "reels\reel-01-base.mp4")
ffmpeg -y -v error -f concat -safe 0 -i (Join-Path $campaignRoot "reels\reel-02-concat.txt") -c copy (Join-Path $campaignRoot "reels\reel-02-base.mp4")

ffmpeg -y -v error -i (Join-Path $campaignRoot "reels\reel-01-base.mp4") -vf "ass='C\:/Users/domim/Desktop/domi-sass/exports/qasr-campaign-v2/reels/reel-01-captions.ass'" -an -c:v libx264 -preset medium -crf 18 -movflags +faststart (Join-Path $campaignRoot "reels\qasr-alfarah-reel-01-message-to-platform.mp4")
ffmpeg -y -v error -i (Join-Path $campaignRoot "reels\reel-02-base.mp4") -vf "ass='C\:/Users/domim/Desktop/domi-sass/exports/qasr-campaign-v2/reels/reel-02-captions.ass'" -an -c:v libx264 -preset medium -crf 18 -movflags +faststart (Join-Path $campaignRoot "reels\qasr-alfarah-reel-02-how-it-works.mp4")

Write-Output "Reels rendered successfully."
