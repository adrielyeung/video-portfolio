// Smooth scrolling and active link highlighting
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Video filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const videoCards = document.querySelectorAll('.video-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        // Filter videos
        videoCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                // Add fade-in animation
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    });
});

// Initialize video cards with opacity
videoCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transition = 'opacity 0.3s ease';
});

// Contact form submission
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailto = `mailto:adrielcityexplorer@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    alert(`Thank you ${name}! Your email client should open to send the message.`);

    form.reset();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Run on page load
window.addEventListener('DOMContentLoaded', highlightCurrentPage);

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and testimonial cards for animation
document.querySelectorAll('.service-card, .testimonial-card, .video-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (if you add a hamburger menu in the future)
function setupMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    // Check if mobile menu needs setup
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        navMenu.style.display = 'none';
    }
}

window.addEventListener('resize', setupMobileMenu);
window.addEventListener('load', setupMobileMenu);

// Add active state on scroll
window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Add scroll to top button functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
window.addEventListener('load', createScrollToTopButton);

// Console message
console.log('🎬 Welcome to VideoStudio Portfolio! Let\'s create something amazing.');

// Showreel: autoplay muted on load and size to native video dimensions (scaled by CSS max-width)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('showreel');
    const container = document.querySelector('.showreel-container');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    if (!video) return;

    // Ensure muted autoplay behavior
    video.muted = true;
    video.playsInline = true;

    // No native sizing here — CSS handles responsive 16:9 sizing via `aspect-ratio`.

    // Attempt to play (muted autoplay is allowed in modern browsers)
    const tryPlay = async () => {
        try { await video.play(); } catch (e) { /* autoplay prevented */ }
    };
    tryPlay();

    // Wire up controls if present
    function updatePlayIcon() {
        if (!playPauseBtn) return;
        const icon = playPauseBtn.querySelector('i');
        if (video.paused) {
            icon.className = 'fas fa-play';
            playPauseBtn.setAttribute('aria-label', 'Play');
            playPauseBtn.title = 'Play';
        } else {
            icon.className = 'fas fa-pause';
            playPauseBtn.setAttribute('aria-label', 'Pause');
            playPauseBtn.title = 'Pause';
        }
    }

    function updateMuteIcon() {
        if (!muteBtn) return;
        const icon = muteBtn.querySelector('i');
        if (video.muted || video.volume === 0) {
            icon.className = 'fas fa-volume-mute';
            muteBtn.setAttribute('aria-label', 'Unmute');
            muteBtn.title = 'Unmute';
        } else {
            icon.className = 'fas fa-volume-up';
            muteBtn.setAttribute('aria-label', 'Mute');
            muteBtn.title = 'Mute';
        }
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) video.play(); else video.pause();
            updatePlayIcon();
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            updateMuteIcon();
        });
    }

    video.addEventListener('play', updatePlayIcon);
    video.addEventListener('pause', updatePlayIcon);
    video.addEventListener('volumechange', updateMuteIcon);

    updatePlayIcon();
    updateMuteIcon();

    // Auto-hide controls after 3s of inactivity; show on mouse/pointer activity
    let hideTimeout = null;
    const HIDE_DELAY = 3000;

    function showControls() {
        if (container) container.classList.remove('controls-hidden');
        resetHideTimer();
    }

    function hideControls() {
        if (container) container.classList.add('controls-hidden');
    }

    function resetHideTimer() {
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            // Only hide when video is playing to avoid hiding while paused if desired
            hideControls();
        }, HIDE_DELAY);
    }

    // Event listeners to show controls on interaction
    if (container) {
        container.addEventListener('mousemove', showControls);
        container.addEventListener('pointermove', showControls);
        container.addEventListener('touchstart', showControls);
        container.addEventListener('mouseenter', showControls);
        container.addEventListener('mouseleave', () => {
            // show controls when leaving container (so user can access) or hide immediately
            hideControls();
        });

        // Prevent controls from hiding while interacting with them
        const controls = container.querySelector('.video-controls');
        if (controls) {
            controls.addEventListener('mousemove', showControls);
            controls.addEventListener('click', showControls);
            controls.addEventListener('touchstart', showControls);
        }

        // Initialize: show controls briefly then hide
        showControls();
    }
});
