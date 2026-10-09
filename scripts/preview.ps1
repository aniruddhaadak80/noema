param([int]$Port = 3147, [switch]$SkipBuild)
$env:BASE = "http://127.0.0.1:$Port"

if (-not $SkipBuild) {
  Write-Output "building..."
  # Redirect to a log file rather than piping through Select-Object: a
  # truncating pipeline closes early and kills the build partway through.
  npm run build *> build.log
  if ($LASTEXITCODE -ne 0) {
    Write-Output "BUILD FAILED"
    Get-Content build.log | Select-Object -Last 30
    exit 1
  }
  Write-Output "build ok"
}

# Refuse to run if the port is already held — a stale server will happily
# answer 200 for a completely different application.
$held = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($held) {
  Write-Output "port $Port already listening (pid $($held.OwningProcess)); aborting"
  exit 2
}

$p = Start-Process -FilePath "node" `
  -ArgumentList "node_modules\next\dist\bin\next","start","-p","$Port" `
  -WorkingDirectory (Get-Location).Path -PassThru `
  -RedirectStandardOutput "dev.log" -RedirectStandardError "dev.err"

$ok = $false
for ($i = 0; $i -lt 45; $i++) {
  Start-Sleep -Seconds 1
  try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/atlas" -UseBasicParsing -TimeoutSec 20
    if ($r.StatusCode -eq 200 -and $r.Content -match "Noema") { $ok = $true; break }
  } catch {}
}

if (-not $ok) {
  Write-Output "server never came up (or served the wrong app)"
  Get-Content dev.log, dev.err -ErrorAction SilentlyContinue | Select-Object -Last 30
  try { $p.Kill() } catch {}
  exit 1
}

Write-Output "server up on $Port, identity verified"
node scripts/render-brain.cjs
try { $p.Kill() } catch {}
