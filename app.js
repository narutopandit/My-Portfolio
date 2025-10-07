// Manish Kumar Portfolio - Enhanced JavaScript with Beautiful Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");
    
    const EMAIL_CONFIG = {
        serviceID: 'YOUR_SERVICE_ID',
        templateID: 'YOUR_TEMPLATE_ID',
        publicKey: 'YOUR_PUBLIC_KEY'
    };

    // DOM Elements
    const loadingScreen = document.getElementById('loadingScreen');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    
    // Contact Form Elements
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Animation and Interaction State
    let isScrolling = false;
    let scrollTimeout;
    let lastScrollTop = 0;

    // ========================================
    // LOADING SCREEN & PAGE INITIALIZATION
    // ========================================
    
    function initializeApp() {
        // Ensure loading screen is visible initially
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.classList.remove('hidden');
        }
        
        // Hide body content initially
        document.body.style.overflow = 'hidden';
        
        // Hide loading screen with smooth transition after content is ready
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            document.body.classList.add('loaded');
            document.body.style.overflow = 'auto';
            
            // Trigger initial animations
            setTimeout(() => {
                initializeScrollAnimations();
                updateScrollProgress();
            }, 300);
        }, 1200);
    }

    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================
    
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = index * 100;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Special animations for different elements
                        if (entry.target.classList.contains('service-card')) {
                            animateServiceCard(entry.target);
                        } else if (entry.target.classList.contains('project-card')) {
                            animateProjectCard(entry.target);
                        } else if (entry.target.classList.contains('skill-category')) {
                            animateSkillCategory(entry.target);
                        }
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.fade-in-section');
        animatedElements.forEach(el => observer.observe(el));
    }

    // ========================================
    // SPECIALIZED ANIMATIONS
    // ========================================
    
    function animateServiceCard(card) {
        const skillGroups = card.querySelectorAll('.skill-group');
        skillGroups.forEach((skill, index) => {
            setTimeout(() => {
                skill.style.transform = 'translateX(0)';
                skill.style.opacity = '1';
            }, index * 150);
        });
    }

    function animateProjectCard(card) {
        const overlay = card.querySelector('.project-overlay');
        const icon = card.querySelector('.placeholder-icon');
        
        setTimeout(() => {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }
        }, 200);
    }

    function animateSkillCategory(category) {
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px) scale(0.9)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 80);
        });
    }

    // ========================================
    // NAVIGATION & MOBILE MENU
    // ========================================
    
    function initializeNavigation() {
        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add staggered animation to nav links
            if (navMenu.classList.contains('active')) {
                navLinks.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Close mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Smooth scroll with offset
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    smoothScrollTo(offsetTop, 1000);
                }
            });
        });
    }

    // ========================================
    // SMOOTH SCROLLING UTILITIES
    // ========================================
    
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animationScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animationScroll);
            }
        }
        
        requestAnimationFrame(animationScroll);
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // ========================================
    // SCROLL EFFECTS & PROGRESS BAR
    // ========================================
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;

        // Update progress bar
        updateScrollProgress(scrollProgress);
        
        // Update navbar appearance
        updateNavbarOnScroll(scrollTop);
        
        // Update active navigation link
        updateActiveNavLink();
        
        // Parallax effect for hero section
        applyParallaxEffect(scrollTop);
        
        lastScrollTop = scrollTop;
    }

    function updateScrollProgress(progress = null) {
        if (progress === null) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            progress = (scrollTop / scrollHeight) * 100;
        }
        
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${Math.min(progress, 100)}%`;
        }
    }

    function updateNavbarOnScroll(scrollTop) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function applyParallaxEffect(scrollTop) {
        const hero = document.querySelector('.hero');
        if (hero && scrollTop < window.innerHeight) {
            const parallaxSpeed = 0.5;
            const yPos = scrollTop * parallaxSpeed;
            hero.style.transform = `translateY(${yPos}px)`;
        }
    }

    // ========================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ========================================
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // ========================================
    // INTERACTIVE ELEMENTS & HOVER EFFECTS
    // ========================================
    
    function initializeInteractiveElements() {
        // Enhanced button interactions
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
            
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });
        });

        // Service card ripple effects
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', createRippleEffect);
            
            // Hover animations for skill groups
            const skillGroups = card.querySelectorAll('.skill-group');
            skillGroups.forEach((skill, index) => {
                skill.style.transitionDelay = `${index * 50}ms`;
            });
        });

        // Project card interactions
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const overlay = card.querySelector('.project-overlay');
                const icon = card.querySelector('.placeholder-icon');
                
                if (overlay) {
                    overlay.style.transform = 'scale(1) rotate(0deg)';
                    overlay.style.opacity = '1';
                }
                
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const overlay = card.querySelector('.project-overlay');
                const icon = card.querySelector('.placeholder-icon');
                
                if (overlay) {
                    overlay.style.transform = 'scale(0.8) rotate(-5deg)';
                    overlay.style.opacity = '0';
                }
                
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });

        // Skill item animations
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ========================================
    // RIPPLE EFFECT FOR CARDS
    // ========================================
    
    function createRippleEffect(event) {
        const card = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 212, 170, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ========================================
    // CLOCK FUNCTIONALITY
    // ========================================
    
    function initializeClock() {
        function updateClock() {
            const now = new Date();
            const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
            
            const hours = istTime.getHours().toString().padStart(2, '0');
            const minutes = istTime.getMinutes().toString().padStart(2, '0');
            const seconds = istTime.getSeconds().toString().padStart(2, '0');
            
            const timeString = `${hours}:${minutes}:${seconds}`;
            const clockElement = document.getElementById('clock');
            
            if (clockElement) {
                // Add subtle animation on time change
                if (clockElement.textContent !== timeString) {
                    clockElement.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        clockElement.style.transform = 'scale(1)';
                    }, 150);
                }
                clockElement.textContent = timeString;
            }
        }

        updateClock();
        setInterval(updateClock, 1000);
    }

    // ========================================
    // CONTACT FORM FUNCTIONALITY
    // ========================================
    
    function initializeContactForm() {
        // Form validation
        function validateForm() {
            let isValid = true;
            
            messageError.classList.remove('show');
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
            
            if (!messageInput.value.trim()) {
                messageError.classList.add('show');
                messageInput.focus();
                
                // Add shake animation to form
                contactForm.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
                
                isValid = false;
            }
            
            return isValid;
        }

        // Enhanced loading state with animations
        function showLoadingState() {
            submitBtn.disabled = true;
            btnText.classList.add('hide');
            btnLoader.classList.remove('hidden');
            btnLoader.classList.add('show');
            
            // Add loading pulse to form
            contactForm.style.opacity = '0.7';
            contactForm.style.pointerEvents = 'none';
        }

        function hideLoadingState() {
            submitBtn.disabled = false;
            btnText.classList.remove('hide');
            btnLoader.classList.add('hidden');
            btnLoader.classList.remove('show');
            
            contactForm.style.opacity = '1';
            contactForm.style.pointerEvents = 'all';
        }

        // Animated feedback messages
        function showSuccessMessage() {
            successMessage.classList.remove('hidden');
            successMessage.classList.add('show');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                successMessage.classList.add('hidden');
                successMessage.classList.remove('show');
            }, 5000);
        }

        function showErrorMessage() {
            errorMessage.classList.remove('hidden');
            errorMessage.classList.add('show');
            
            setTimeout(() => {
                errorMessage.classList.add('hidden');
                errorMessage.classList.remove('show');
            }, 5000);
        }

        // Send email function
        async function sendEmail(formData) {
            const templateParams = {
                from_name: formData.name || 'Anonymous',
                from_email: formData.email || 'No email provided',
                message: formData.message,
                to_email: 'narutopandit220@gmail.com',
                subject: `New message from ${formData.name || 'Anonymous'} - Portfolio Contact Form`
            };

            return emailjs.send(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, templateParams);
        }

        // Form submission handler
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) return;
            
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            showLoadingState();
            
            try {
                // Simulate email sending for demo
                if (EMAIL_CONFIG.serviceID === 'YOUR_SERVICE_ID') {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    console.log('Contact form submitted:', formData);
                    showSuccessMessage();
                    contactForm.reset();
                    
                    // Reset form animations
                    const inputLines = contactForm.querySelectorAll('.input-line');
                    inputLines.forEach(line => {
                        line.style.transform = 'scaleX(0)';
                    });
                } else {
                    await sendEmail(formData);
                    showSuccessMessage();
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Error sending email:', error);
                showErrorMessage();
            } finally {
                hideLoadingState();
            }
        });

        // Real-time validation and animations
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('focus', function() {
                const inputLine = this.parentNode.querySelector('.input-line');
                if (inputLine) {
                    inputLine.style.transform = 'scaleX(1)';
                }
            });
            
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    const inputLine = this.parentNode.querySelector('.input-line');
                    if (inputLine) {
                        inputLine.style.transform = 'scaleX(0)';
                    }
                }
            });
            
            input.addEventListener('input', function() {
                if (this === messageInput && this.value.trim()) {
                    messageError.classList.remove('show');
                }
            });
        });
    }

    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================
    
    function optimizeScrollPerformance() {
        // Throttled scroll handler
        function throttledScrollHandler() {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    handleScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }

        // Debounced resize handler
        function debouncedResizeHandler() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                handleResize();
            }, 250);
        }

        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        window.addEventListener('resize', debouncedResizeHandler, { passive: true });
    }

    function handleResize() {
        // Recalculate positions and animations on resize
        updateScrollProgress();
        updateActiveNavLink();
    }

    // ========================================
    // KEYBOARD NAVIGATION & ACCESSIBILITY
    // ========================================
    
    function initializeAccessibility() {
        // Keyboard navigation for interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .project-card, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Focus management for mobile menu
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
                
                // Focus first nav link when menu opens
                if (navMenu.classList.contains('active')) {
                    setTimeout(() => {
                        const firstNavLink = navMenu.querySelector('.nav-link');
                        if (firstNavLink) firstNavLink.focus();
                    }, 100);
                }
            }
        });
    }

    // ========================================
    // EASTER EGGS & SPECIAL INTERACTIONS
    // ========================================
    
    function initializeEasterEggs() {
        // Konami code or special key combinations
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.length === konamiSequence.length && 
                konamiCode.every((key, index) => key === konamiSequence[index])) {
                activateEasterEgg();
                konamiCode = [];
            }
        });

        function activateEasterEgg() {
            // Add rainbow animation to name
            const nameElement = document.querySelector('.name');
            if (nameElement) {
                nameElement.style.background = 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)';
                nameElement.style.backgroundSize = '400% 400%';
                nameElement.style.animation = 'rainbow 2s ease infinite';
                nameElement.style.backgroundClip = 'text';
                nameElement.style.webkitBackgroundClip = 'text';
                nameElement.style.webkitTextFillColor = 'transparent';
                
                setTimeout(() => {
                    nameElement.style.background = '';
                    nameElement.style.animation = '';
                    nameElement.style.backgroundClip = '';
                    nameElement.style.webkitBackgroundClip = '';
                    nameElement.style.webkitTextFillColor = '';
                }, 5000);
            }
            
            console.log('🎉 Easter egg activated! You found the secret animation!');
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    
    function initialize() {
        initializeApp();
        initializeNavigation();
        initializeClock();
        initializeContactForm();
        initializeInteractiveElements();
        optimizeScrollPerformance();
        initializeAccessibility();
        initializeEasterEggs();
        
        // Initial calls
        updateScrollProgress();
        updateActiveNavLink();
        
        console.log(`
        🚀 Manish Kumar's Portfolio Loaded Successfully!
        
        ✨ Features:
        • Beautiful scroll animations
        • Smooth transitions and micro-interactions
        • Mobile-responsive design
        • Contact form with EmailJS integration
        • Performance optimized
        • Accessible keyboard navigation
        • Hidden easter eggs
        
        📧 Contact Form Setup:
        Replace EmailJS configuration in EMAIL_CONFIG object
        
        Connect with Manish:
        • LinkedIn: https://www.linkedin.com/in/manish-kumar-4b6bb6359/
        • GitHub: https://github.com/narutopandit
        • Instagram: https://www.instagram.com/manish__pandatt/
        `);
    }

    // Start the application
    initialize();

    // Add CSS for additional animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Enhanced focus styles */
        .btn:focus-visible,
        .nav-link:focus-visible,
        .form-input:focus-visible {
            outline: 2px solid #00d4aa;
            outline-offset: 2px;
        }
        
        /* Loading animation for form inputs */
        .form-input:focus {
            box-shadow: 0 0 0 1px #00d4aa;
        }
    `;
    document.head.appendChild(additionalStyles);
});

// Show loading screen immediately when script starts
(function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('hidden');
    }
    document.body.style.overflow = 'hidden';
})();

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Random number generator for animations
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Console styling for welcome message
const consoleStyles = {
    title: 'color: #00d4aa; font-size: 18px; font-weight: bold;',
    success: 'color: #00d4aa; font-weight: bold;',
    info: 'color: #a0a0a0;',
    warning: 'color: #feca57; font-weight: bold;'
};

// Performance monitoring
if (typeof window !== 'undefined' && window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.getEntriesByType('navigation')[0];
            console.log(`%c⚡ Page Load Performance:`, consoleStyles.title);
            console.log(`%c• DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`, consoleStyles.info);
            console.log(`%c• Total Load Time: ${Math.round(perfData.loadEventEnd - perfData.navigationStart)}ms`, consoleStyles.info);
        }, 1000);
    });
}