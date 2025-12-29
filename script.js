document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple fade-in on scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    // FIXED: Target the utility class directly so all sections appear
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // --- Dynamic Navigation Menu ---
    // Create the menu overlay element dynamically so we don't have to edit every HTML file
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    navOverlay.innerHTML = `
        <div class="nav-close">&times;</div>
        <nav class="overlay-menu">
            <a href="index.html">Home</a>
            <a href="our-story.html">Our Story</a>
        <a href="immersions.html" style="color: var(--accent-sage);">Immersions</a>
        <a href="accommodations.html">Spaces</a>
        <a href="journal.html">Journal</a>
            <a href="contact.html">Contact</a>
        </nav>
    `;
    document.body.appendChild(navOverlay);

    const toggleBtn = document.querySelector('.nav-toggle');
    const closeBtn = navOverlay.querySelector('.nav-close');
    const menuLinks = navOverlay.querySelectorAll('a');

    function toggleMenu() {
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Contact Form Handling ---
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulating form submission
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                // Replace form with success message
                this.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <h3 style="font-size: 2rem; color: var(--accent-sage); margin-bottom: 1rem;">Thank You</h3>
                        <p>Your message has been received.</p>
                        <p>We will guide you to your sanctuary soon.</p>
                        <br>
                        <p style="font-size: 0.9rem; opacity: 0.7;">(Redirecting to home...)</p>
                    </div>
                `;

                // Redirect after a moment
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 4000);
            }, 1500);
        });
    }
});
