param([string]$Page = "atlas")
$env:BASE = "http://localhost:3111"
$p = Start-Process -FilePath "node" -ArgumentList "node_modules\next\dist\bin\next","dev","-p","3111" -WorkingDirectory (Get-Location).Path -PassThru -RedirectStandardOutput "dev.log" -RedirectStandardError "dev.err"
$ok = $false
for ($i = 0; $i -lt 60; $i++) {
  Start-Sleep -Seconds 2
  try { $r = Invoke-WebRequest -Uri "http://localhost:3111/$Page" -UseBasicParsing -TimeoutSec 25; if ($r.StatusCode -eq 200) { $ok = $true; break } } catch {}
}
if (-not $ok) {
  Write-Output "server never came up"
  Get-Content dev.log, dev.err -ErrorAction SilentlyContinue | Select-Object -Last 30
  try { $p.Kill() } catch {}
  exit 1
}
Write-Output "server up on 3111"
node scripts\render-brain.cjs
try { $p.Kill() } catch {}
