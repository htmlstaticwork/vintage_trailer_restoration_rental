$pwd = (Get-Location).Path
$indexContent = [System.IO.File]::ReadAllText("$pwd\index.html")

$headerMatch = [regex]::Match($indexContent, '(?s)<header[\s>].*?</header>')
$footerMatch = [regex]::Match($indexContent, '(?s)<footer[\s>].*?</footer>')

if ($headerMatch.Success -and $footerMatch.Success) {
    $headerText = $headerMatch.Value
    $footerText = $footerMatch.Value
    
    $htmlFiles = Get-ChildItem -Filter *.html | Where-Object { $_.Name -ne 'index.html' }
    
    $count = 0
    foreach ($file in $htmlFiles) {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        
        $newContent = [regex]::Replace($content, '(?s)<header[\s>].*?</header>', $headerText)
        $newContent = [regex]::Replace($newContent, '(?s)<footer[\s>].*?</footer>', $footerText)
        
        if ($content -cne $newContent) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            $count++
        }
    }
    Write-Host "Successfully updated header and footer in $count files."
} else {
    Write-Host "Failed to find header or footer in index.html"
}
