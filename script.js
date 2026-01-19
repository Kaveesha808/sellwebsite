// Navigation Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Video Player
const videoPlaceholder = document.getElementById('videoPlaceholder');
const videoPlayer = document.getElementById('videoPlayer');
const playButton = document.getElementById('playButton');

if (videoPlaceholder && videoPlayer && playButton) {
    playButton.addEventListener('click', () => {
        videoPlaceholder.style.display = 'none';
        videoPlayer.style.display = 'block';
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 100;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle internal page anchors
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active Navigation Link Based on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && 
            window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href && href.includes(currentSection)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--danger)';
                
                // Add error message
                let errorMsg = field.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = 'color: var(--danger); font-size: 14px; margin-top: 5px;';
                    errorMsg.textContent = 'This field is required';
                    field.parentNode.appendChild(errorMsg);
                }
            } else {
                field.style.borderColor = '';
                
                // Remove error message
                const errorMsg = field.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});

// Countdown Timer (for special offers)
function createCountdownTimer() {
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown-timer';
    countdownElement.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: var(--gradient);
        color: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        z-index: 99;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease;
    `;
    
    countdownElement.innerHTML = `
        <h4 style="margin-bottom: 10px;">🎉 Special Offer!</h4>
        <p style="margin-bottom: 15px; font-size: 14px;">Limited time discount ends in:</p>
        <div class="countdown" style="display: flex; gap: 10px; justify-content: center;">
            <div class="time-unit">
                <div class="time-value" id="countdown-hours">24</div>
                <div class="time-label">Hours</div>
            </div>
            <div class="time-unit">
                <div class="time-value" id="countdown-minutes">59</div>
                <div class="time-label">Minutes</div>
            </div>
            <div class="time-unit">
                <div class="time-value" id="countdown-seconds">59</div>
                <div class="time-label">Seconds</div>
            </div>
        </div>
        <button class="btn btn-primary" style="margin-top: 15px; width: 100%; padding: 10px;" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i> Close
        </button>
    `;
    
    document.body.appendChild(countdownElement);
    
    // Start countdown
    let hours = 24;
    let minutes = 59;
    let seconds = 59;
    
    const countdownInterval = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            
            if (minutes < 0) {
                minutes = 59;
                hours--;
                
                if (hours < 0) {
                    clearInterval(countdownInterval);
                    countdownElement.innerHTML = '<p>Offer expired!</p>';
                    return;
                }
            }
        }
        
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Initialize countdown timer after page load
window.addEventListener('load', () => {
    // Uncomment to show countdown timer
    // createCountdownTimer();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .scroll-to-top:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
    `;
    document.head.appendChild(style);
});

// Newsletter Form
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput && emailInput.value) {
            // Here you would typically send this to your backend
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
});

// Cookie Consent
function checkCookieConsent() {
    if (!localStorage.getItem('cookies_accepted')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--glass-dark);
            backdrop-filter: blur(20px);
            padding: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        `;
        
        cookieBanner.innerHTML = `
            <div style="flex: 1;">
                <p style="margin: 0; color: rgba(255, 255, 255, 0.8);">
                    We use cookies to improve your experience. By continuing to use our site, 
                    you accept our use of cookies.
                </p>
            </div>
            <div style="display: flex; gap: 15px;">
                <button class="btn btn-outline" id="cookieReject" style="padding: 10px 20px;">
                    <i class="fas fa-times"></i> Reject
                </button>
                <button class="btn btn-primary" id="cookieAccept" style="padding: 10px 20px;">
                    <i class="fas fa-check"></i> Accept
                </button>
            </div>
        `;
        
        document.body.appendChild(cookieBanner);
        
        document.getElementById('cookieAccept').addEventListener('click', () => {
            localStorage.setItem('cookies_accepted', 'true');
            cookieBanner.remove();
        });
        
        document.getElementById('cookieReject').addEventListener('click', () => {
            cookieBanner.remove();
        });
    }
}

// Check cookie consent on page load
document.addEventListener('DOMContentLoaded', checkCookieConsent);

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});