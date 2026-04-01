$htmlFiles = Get-ChildItem -Filter *.html
$oldPattern = '(?s)<li class="nav-item">\s*<a class="nav-link(.*?)" href="index.html">Home</a>\s*</li>'
$replacement = '<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle$1" href="#" id="homeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Home</a>
                        <ul class="dropdown-menu" aria-labelledby="homeDropdown">
                            <li><a class="dropdown-item" href="index.html">Home 1</a></li>
                            <li><a class="dropdown-item" href="home-premium.html">Home 2</a></li>
                        </ul>
                    </li>'

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $newContent = [regex]::Replace($content, $oldPattern, $replacement)

    if ($file.Name -eq 'index.html') {
        $newContent = $newContent.Replace('<a class="dropdown-item" href="index.html">Home 1</a>', '<a class="dropdown-item active bg-primary text-white" href="index.html">Home 1</a>')
    } elseif ($file.Name -eq 'home-premium.html') {
        $newContent = $newContent.Replace('<a class="dropdown-item" href="home-premium.html">Home 2</a>', '<a class="dropdown-item active bg-primary text-white" href="home-premium.html">Home 2</a>')
    }

    if ($content -cne $newContent) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
    }
}
Write-Host "Updated HTML files."
