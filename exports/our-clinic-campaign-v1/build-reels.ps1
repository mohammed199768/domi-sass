$ErrorActionPreference = "Stop"

$campaignRoot = "C:\Users\domim\Desktop\domi-sass\exports\our-clinic-campaign-v1"
$clinicDemo = "C:\Users\domim\Desktop\domi-sass\public\new-video\our-clinic-project.mp4"
$codingShort = "C:\Users\domim\Videos\Screen Recordings\Screen Recording 2026-07-27 203721.mp4"
$codingLong = "C:\Users\domim\Videos\Screen Recordings\Screen Recording 2026-07-27 204507.mp4"
$segmentRoot = Join-Path $campaignRoot "reels\segments"

New-Item -ItemType Directory -Force -Path (Join-Path $segmentRoot "reel-01"), (Join-Path $segmentRoot "reel-02") | Out-Null

function Render-StillClip {
    param([string]$InputFile, [double]$Duration, [string]$OutputFile)
    if (Test-Path -LiteralPath $OutputFile) { return }
    $frameCount = [Math]::Ceiling($Duration * 30)
    ffmpeg -y -v error -loop 1 -i $InputFile -t $Duration -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0004,1.03)':d=${frameCount}:s=1080x1920:fps=30,format=yuv420p" -an -r 30 -c:v libx264 -preset medium -crf 18 -movflags +faststart $OutputFile
    if ($LASTEXITCODE -ne 0) { throw "Still clip render failed: $InputFile" }
}

function Render-FramedImageClip {
    param([string]$InputFile, [double]$Duration, [string]$OutputFile)
    if (Test-Path -LiteralPath $OutputFile) { return }
    $frameCount = [Math]::Ceiling($Duration * 30)
    ffmpeg -y -v error -loop 1 -i $InputFile -t $Duration -filter_complex "[0:v]split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:2,eq=brightness=-0.44:saturation=0.62[bg];[fg]scale=980:1520:force_original_aspect_ratio=decrease,zoompan=z='min(zoom+0.00035,1.025)':d=${frameCount}:s=980x1520:fps=30[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p" -an -r 30 -c:v libx264 -preset medium -crf 18 -movflags +faststart $OutputFile
    if ($LASTEXITCODE -ne 0) { throw "Framed image render failed: $InputFile" }
}

function Render-FramedVideoClip {
    param([string]$InputFile, [double]$Start, [double]$SourceDuration, [double]$Speed, [string]$OutputFile)
    if (Test-Path -LiteralPath $OutputFile) { return }
    ffmpeg -y -v error -ss $Start -t $SourceDuration -i $InputFile -filter_complex "[0:v]setpts=PTS/$Speed,split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:2,eq=brightness=-0.44:saturation=0.62[bg];[fg]scale=990:1600:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p" -an -r 30 -c:v libx264 -preset medium -crf 18 -movflags +faststart $OutputFile
    if ($LASTEXITCODE -ne 0) { throw "Framed video render failed: $InputFile" }
}

function Join-Reel {
    param([string]$SegmentDirectory, [string]$BaseOutput)
    $listPath = Join-Path ([System.IO.Path]::GetDirectoryName($BaseOutput)) (([System.IO.Path]::GetFileNameWithoutExtension($BaseOutput)) + "-concat.txt")
    $concatLines = Get-ChildItem -LiteralPath $SegmentDirectory -Filter "*.mp4" | Sort-Object Name | ForEach-Object { "file '$($_.FullName.Replace("'", "''"))'" }
    [System.IO.File]::WriteAllLines($listPath, [string[]]$concatLines, [System.Text.UTF8Encoding]::new($false))
    ffmpeg -y -v error -f concat -safe 0 -i $listPath -c copy $BaseOutput
    if ($LASTEXITCODE -ne 0) { throw "Concat failed: $SegmentDirectory" }
}

$graphics = Join-Path $campaignRoot "graphics\renders"
$screens = Join-Path $campaignRoot "assets\screens"
$reelOne = Join-Path $segmentRoot "reel-01"
$reelTwo = Join-Path $segmentRoot "reel-02"

# Reel 01 — From message to connected care
Render-StillClip (Join-Path $graphics "01.png") 2.8 (Join-Path $reelOne "01.mp4")
Render-StillClip (Join-Path $graphics "02.png") 2.6 (Join-Path $reelOne "02.mp4")
Render-FramedVideoClip $codingShort 0 4.56 2.4 (Join-Path $reelOne "03.mp4")
Render-FramedVideoClip $codingLong 0 9.2 4.0 (Join-Path $reelOne "04.mp4")
Render-FramedVideoClip $clinicDemo 0 2.93 1.0 (Join-Path $reelOne "05.mp4")
Render-FramedImageClip (Join-Path $screens "public-home-wide.webp") 2.4 (Join-Path $reelOne "06.mp4")
Render-FramedImageClip (Join-Path $screens "care-services-wide.webp") 2.3 (Join-Path $reelOne "07.mp4")
Render-FramedImageClip (Join-Path $screens "booking-journey-wide.webp") 2.8 (Join-Path $reelOne "08.mp4")
Render-FramedImageClip (Join-Path $screens "admin-overview-wide.webp") 2.5 (Join-Path $reelOne "09.mp4")
Render-FramedImageClip (Join-Path $screens "clinical-follow-up-wide.webp") 2.2 (Join-Path $reelOne "10.mp4")
Render-StillClip (Join-Path $graphics "05.png") 3.2 (Join-Path $reelOne "11.mp4")

# Reel 02 — How the platform works
Render-StillClip (Join-Path $graphics "03.png") 2.5 (Join-Path $reelTwo "01.mp4")
Render-FramedImageClip (Join-Path $screens "public-home-wide.webp") 2.2 (Join-Path $reelTwo "02.mp4")
Render-FramedImageClip (Join-Path $screens "care-services-wide.webp") 2.0 (Join-Path $reelTwo "03.mp4")
Render-FramedImageClip (Join-Path $screens "booking-journey-wide.webp") 2.4 (Join-Path $reelTwo "04.mp4")
Render-FramedImageClip (Join-Path $screens "patient-tools-wide.webp") 2.2 (Join-Path $reelTwo "05.mp4")
Render-FramedImageClip (Join-Path $screens "guide-bot-wide.webp") 2.0 (Join-Path $reelTwo "06.mp4")
Render-FramedImageClip (Join-Path $screens "patient-mobile-wide.webp") 2.0 (Join-Path $reelTwo "07.mp4")
Render-FramedVideoClip $codingLong 5 8 4.0 (Join-Path $reelTwo "08.mp4")
Render-FramedImageClip (Join-Path $screens "admin-overview-wide.webp") 2.4 (Join-Path $reelTwo "09.mp4")
Render-FramedImageClip (Join-Path $screens "clinical-follow-up-wide.webp") 2.1 (Join-Path $reelTwo "10.mp4")
Render-FramedImageClip (Join-Path $screens "reports-wide.webp") 2.1 (Join-Path $reelTwo "11.mp4")
Render-StillClip (Join-Path $graphics "04.png") 2.8 (Join-Path $reelTwo "12.mp4")
Render-StillClip (Join-Path $graphics "05.png") 2.8 (Join-Path $reelTwo "13.mp4")

$baseOne = Join-Path $campaignRoot "reels\reel-01-base.mp4"
$baseTwo = Join-Path $campaignRoot "reels\reel-02-base.mp4"
Join-Reel $reelOne $baseOne
Join-Reel $reelTwo $baseTwo

ffmpeg -y -v error -i $baseOne -vf "ass='C\:/Users/domim/Desktop/domi-sass/exports/our-clinic-campaign-v1/reels/reel-01-captions.ass'" -an -c:v libx264 -preset medium -crf 18 -movflags +faststart (Join-Path $campaignRoot "reels\our-clinic-reel-01-message-to-platform.mp4")
if ($LASTEXITCODE -ne 0) { throw "Reel 01 subtitle render failed." }
ffmpeg -y -v error -i $baseTwo -vf "ass='C\:/Users/domim/Desktop/domi-sass/exports/our-clinic-campaign-v1/reels/reel-02-captions.ass'" -an -c:v libx264 -preset medium -crf 18 -movflags +faststart (Join-Path $campaignRoot "reels\our-clinic-reel-02-how-it-works.mp4")
if ($LASTEXITCODE -ne 0) { throw "Reel 02 subtitle render failed." }

Write-Output "Our Clinic reels rendered successfully."
