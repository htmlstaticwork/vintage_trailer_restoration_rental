import os
import glob
import re

html_files = glob.glob('*.html')

# Regex to match the Home link item exactly
home_pattern = re.compile(r'<li class="nav-item">\s*<a class="nav-link(.*?)" href="index.html">Home</a>\s*</li>', re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    replacement = r'''<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle\1" href="#" id="homeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Home</a>
                        <ul class="dropdown-menu" aria-labelledby="homeDropdown">
                            <li><a class="dropdown-item" href="index.html">Home 1</a></li>
                            <li><a class="dropdown-item" href="home-premium.html">Home 2</a></li>
                        </ul>
                    </li>'''

    new_content = home_pattern.sub(replacement, content)

    # Make the specific dropdown items active so they are highlighted
    if file == 'index.html':
        new_content = new_content.replace('<a class="dropdown-item" href="index.html">Home 1</a>', '<a class="dropdown-item active bg-primary text-white" href="index.html">Home 1</a>')
    elif file == 'home-premium.html':
        new_content = new_content.replace('<a class="dropdown-item" href="home-premium.html">Home 2</a>', '<a class="dropdown-item active bg-primary text-white" href="home-premium.html">Home 2</a>')

    if content != new_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)

print(f"Updated HTML files for navigational dropdown.")
