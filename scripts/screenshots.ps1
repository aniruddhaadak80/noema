<#
  Screenshots the live Vercel deployment with headless Edge.
  Targets each route at desktop width, at full page height.
#>
param([string]$Base = "https://noema-atlas-dbhe1yfcb-aniruddha-adaks-projects.vercel.app")

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$out = "shots"
New-Item -ItemType Directory -Force -Path $out | Out-Null

# Route, output name, viewport, full-page flag
$shots = @(
  @{ route = "/";                     name = "home";      w = 1600; h = 1000 },
  @{ route = "/atlas";                name = "atlas";     w = 1600; h = 1100 },
  @{ route = "/circuits";             name = "circuits";  w = 1600; h = 1100 },
  @{ route = "/mind";                 name = "mind";      w = 1600; h = 1100 },
  @{ route = "/questions";            name = "questions"; w = 1600; h = 1100 },
  @{ route = "/mirror";               name = "mirror";    w = 1600; h = 1000 },
  @{ route = "/recall";               name = "recall";    w = 1600; h = 1100 },
  @{ route = "/atlas";                name = "atlas-mobile";  w = 420; h = 900 }
)

$profile = Join-Path $PWD "edge-tmp"
New-Item -ItemType Directory -Force -Path $profile | Out-Null

foreach ($s in $shots) {
  $file = Join-Path (Join-Path $PWD $out) "$($s.name).png"
  $args = @(
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--force-device-scale-factor=2",
    "--virtual-time-budget=12000",
    "--user-data-dir=`"$profile`"",
    "--window-size=$($s.w),$($s.h)",
    "--screenshot=`"$file`"",
    "$Base$($s.route)"
  )
  Write-Output "capturing $($s.name) -> $file"
  & $edge $args | Out-Null
  if (Test-Path $file) {
    $kb = [math]::Round((Get-Item $file).Length / 1KB)
    Write-Output "  ok ($kb KB)"
  } else {
    Write-Output "  FAILED"
  }
}

Remove-Item $profile -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem $out | Select-Object Name, Length
