// script.js
// Main JavaScript file for Primoxe Digital website
// Combines all interactive functionality across all pages

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. GLOBAL FUNCTIONALITY (used on all pages)
    // =============================================

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';

            // Disable body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking a link
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // 2. ANIMATIONS
    // =============================================

    // Fade-in Animations on Scroll
    function setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in, .delay-1, .delay-2, .delay-3, .delay-4, .delay-5, .delay-6, .delay-7');

        // Set initial opacity to 0 for fade-in elements
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });

        const checkVisibility = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight - 100) {
                    // Add delay class if it exists
                    if (element.classList.contains('delay-1')) {
                        setTimeout(() => element.style.opacity = '1', 200);
                    } else if (element.classList.contains('delay-2')) {
                        setTimeout(() => element.style.opacity = '1', 400);
                    } else if (element.classList.contains('delay-3')) {
                        setTimeout(() => element.style.opacity = '1', 600);
                    } else if (element.classList.contains('delay-4')) {
                        setTimeout(() => element.style.opacity = '1', 800);
                    } else if (element.classList.contains('delay-5')) {
                        setTimeout(() => element.style.opacity = '1', 1000);
                    } else if (element.classList.contains('delay-6')) {
                        setTimeout(() => element.style.opacity = '1', 1200);
                    } else if (element.classList.contains('delay-7')) {
                        setTimeout(() => element.style.opacity = '1', 1400);
                    } else {
                        element.style.opacity = '1';
                    }
                }
            });
        };

        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
    }

    // Card Hover Effects
    function setupCardHoverEffects() {
        const cards = document.querySelectorAll('.card-hover');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // =============================================
    // 3. FAQ ACCORDION (faq.html)
    // =============================================
    function setupFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        if (faqQuestions.length > 0) {
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const isActive = question.classList.contains('active');
                    const answer = question.nextElementSibling;
                    const icon = question.querySelector('i.fa-chevron-down, i.fa-chevron-up');

                    // Close all other FAQ items in the same category
                    const category = question.closest('.faq-category');
                    if (category) {
                        category.querySelectorAll('.faq-question').forEach(q => {
                            if (q !== question) {
                                q.classList.remove('active');
                                q.nextElementSibling.classList.remove('active');
                                const otherIcon = q.querySelector('i.fa-chevron-down, i.fa-chevron-up');
                                if (otherIcon) {
                                    otherIcon.classList.remove('fa-chevron-up');
                                    otherIcon.classList.add('fa-chevron-down');
                                }
                            }
                        });
                    }

                    // Toggle current item
                    if (!isActive) {
                        question.classList.add('active');
                        answer.classList.add('active');
                        if (icon) {
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        }
                    } else {
                        question.classList.remove('active');
                        answer.classList.remove('active');
                        if (icon) {
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    }
                });
            });

            // FAQ Search functionality
            const faqSearch = document.getElementById('faqSearch');
            if (faqSearch) {
                faqSearch.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    const faqItems = document.querySelectorAll('.faq-item');

                    faqItems.forEach(item => {
                        const question = item.querySelector('.faq-question').textContent.toLowerCase();
                        const answer = item.querySelector('.faq-answer') ? item.querySelector('.faq-answer').textContent.toLowerCase() : '';

                        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            }
        }
    }

    // =============================================
    // 4. CONTACT FORM (contact.html)
    // =============================================
    function setupContactForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            const successMessage = document.querySelector('.form-success-message');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;

                // Clear previous errors
                document.querySelectorAll('.error-message').forEach(el => {
                    el.textContent = '';
                });

                // Validate required fields
                const requiredFields = form.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        const errorMessage = field.closest('.form-group').querySelector('.error-message');
                        if (errorMessage) {
                            errorMessage.textContent = 'This field is required';
                        }
                    }
                });

                // Validate email format
                const email = document.getElementById('email');
                if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                    isValid = false;
                    const emailGroup = email.closest('.form-group');
                    if (emailGroup) {
                        const errorMessage = emailGroup.querySelector('.error-message');
                        if (errorMessage) {
                            errorMessage.textContent = 'Please enter a valid email address';
                        }
                    }
                }

                // Validate reCAPTCHA if present
                if (typeof grecaptcha !== 'undefined') {
                    const recaptchaResponse = grecaptcha.getResponse();
                    if (!recaptchaResponse) {
                        isValid = false;
                        let recaptchaError = document.querySelector('.g-recaptcha + .error-message');
                        if (!recaptchaError) {
                            recaptchaError = document.createElement('div');
                            recaptchaError.className = 'error-message';
                            recaptchaError.textContent = 'Please complete the reCAPTCHA';
                            form.querySelector('.g-recaptcha').after(recaptchaError);
                        }
                    }
                }

                if (isValid) {
                    // Simulate form submission
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                    form.reset();
                    if (typeof grecaptcha !== 'undefined') {
                        grecaptcha.reset();
                    }

                    // Scroll to success message
                    if (successMessage) {
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }

                    // In a real implementation, you would send the form data to your server here
                    /*
                    fetch('your-server-endpoint', {
                        method: 'POST',
                        body: new FormData(form)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (successMessage) successMessage.style.display = 'block';
                        form.reset();
                        if (typeof grecaptcha !== 'undefined') {
                            grecaptcha.reset();
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                    */
                }
            });
        }
    }

    // =============================================
    // 5. STATS COUNTER (about.html)
    // =============================================
    function setupStatsCounter() {
        const stats = document.querySelectorAll('.stat-number[data-count]');
        if (stats.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const stat = entry.target;
                        const countTo = parseInt(stat.getAttribute('data-count'));
                        const duration = 2000; // 2 seconds
                        const start = 0;
                        const increment = countTo / (duration / 16); // 60fps

                        let current = start;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= countTo) {
                                current = countTo;
                                clearInterval(timer);
                            }
                            stat.textContent = Math.floor(current);
                        }, 16);
                    }
                });
            }, { threshold: 0.5 });

            stats.forEach(stat => {
                observer.observe(stat);
            });
        }
    }

    // =============================================
    // 6. INITIALIZE ALL FUNCTIONALITY
    // =============================================

    // Set up all global functionality
    setupScrollAnimations();
    setupCardHoverEffects();

    // Set up page-specific functionality based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage.includes('faq')) {
        setupFAQAccordion();
    }

    if (currentPage.includes('contact')) {
        setupContactForm();
    }

    if (currentPage.includes('about')) {
        setupStatsCounter();
    }

    // =============================================
    // 7. UTILITY FUNCTIONS
    // =============================================

    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    // Throttle function for resize events
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    // =============================================
    // 8. RESPONSIVE ADJUSTMENTS
    // =============================================

    // Handle window resize events
    window.addEventListener('resize', debounce(function() {
        // You can add responsive adjustments here
    }, 250));

    // =============================================
    // 9. PERFORMANCE OPTIMIZATIONS
    // =============================================

    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        // The browser will handle lazy loading automatically
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyLoadImages = document.querySelectorAll('img[data-src]');
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyLoadImages.forEach(img => {
            imgObserver.observe(img);
        });
    }
});
