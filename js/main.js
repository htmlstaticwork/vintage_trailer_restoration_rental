document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const updateThemeIcon = (theme) => {
        if (!themeToggle) return;
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="bi bi-sun"></i>' 
            : '<i class="bi bi-moon"></i>';
    };

    // Initialize theme state from localStorage or attribute
    const currentTheme = localStorage.getItem('theme') || (body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            if (newTheme === 'dark') {
                body.setAttribute('data-theme', 'dark');
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.removeAttribute('data-theme');
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
            updateThemeIcon(newTheme);
        });
    }

    // RTL Switcher Logic
    const rtlToggle = document.getElementById('rtl-toggle');
    const updateRtlIcon = (isRtl) => {
        if (!rtlToggle) return;
        // Optional: change icon based on state if desired
    };

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRtl = body.getAttribute('dir') === 'rtl';
            if (isRtl) {
                body.removeAttribute('dir');
                localStorage.setItem('dir', 'ltr');
            } else {
                body.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
            }
        });
    }

    // Check for saved dir
    if (localStorage.getItem('dir') === 'rtl') {
        body.setAttribute('dir', 'rtl');
    }

    // Sticky Header and Scroll-to-Top Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        // Navbar shadow
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
        
        // Scroll-to-Top visibility
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    });

    // Dynamic Active Menu Highlighting
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
    
    // Clear hardcoded active states from synced header
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Exact match or homepage resolution
        if (link.href === currentLocation || (currentLocation.endsWith('/') && link.href.endsWith('index.html'))) {
            link.classList.add('active');
            
            // Highlight parent dropdown if active link is a dropdown item
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
                if (parentToggle) {
                    parentToggle.classList.add('active');
                }
            }
        }
    });

    // Before/After Slider Interaction
    const baSliders = document.querySelectorAll('.ba-slider');
    baSliders.forEach(baSlider => {
        const afterImg = baSlider.querySelector('.ba-after');
        const handle = baSlider.querySelector('.ba-handle');
        
        let isDragging = false;

        const moveSlider = (x) => {
            const rect = baSlider.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            if (pos < 0) pos = 0;
            if (pos > 100) pos = 100;
            
            if (afterImg) afterImg.style.width = pos + "%";
            if (handle) handle.style.left = pos + "%";
        };

        baSlider.addEventListener('mousedown', (e) => {
            isDragging = true;
            moveSlider(e.pageX);
        });
        
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            moveSlider(e.pageX);
        });

        baSlider.addEventListener('touchstart', (e) => {
            isDragging = true;
            moveSlider(e.touches[0].pageX);
        });
        
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            moveSlider(e.touches[0].pageX);
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .card').forEach(el => observer.observe(el));
});
