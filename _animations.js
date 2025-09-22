/**
 * _animations.js
 * Animation-related functions and effects
 */

import { debounce, isInViewport, getAllElements } from './_utils.js';

// Initialize all animations
export function initAnimations() {
    setupScrollAnimations();
    setupCardHoverEffects();
    setupTextAnimations();
    setupParallaxEffects();
}

// Scroll-triggered fade-in animations
export function setupScrollAnimations() {
    const fadeElements = getAllElements('.fade-in, .delay-1, .delay-2, .delay-3, .delay-4, .delay-5, .delay-6, .delay-7');

    // Set initial opacity to 0 for fade-in elements
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const checkVisibility = debounce(() => {
        fadeElements.forEach(element => {
            if (isInViewport(element, 100)) {
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
    }, 50);

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);
}

// Card hover effects
export function setupCardHoverEffects() {
    const cards = getAllElements('.card-hover');
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

// Text typing animation
export function setupTextAnimations() {
    const typingElements = getAllElements('.typing-animation');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    });
}

// Parallax effects
export function setupParallaxEffects() {
    const parallaxElements = getAllElements('.parallax');

    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    window.addEventListener('scroll', debounce(updateParallax, 10));
    window.addEventListener('resize', debounce(updateParallax, 10));
    updateParallax(); // Initial call
}

// Button pulse animation
export function setupButtonPulse() {
    const pulseButtons = getAllElements('.btn-pulse');

    pulseButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 0.3s ease-in-out';
        });

        button.addEventListener('animationend', () => {
            button.style.animation = '';
        });
    });
}

// Floating animation
export function setupFloatingAnimations() {
    const floatingElements = getAllElements('.floating');

    floatingElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });
}

// Rotate on hover
export function setupRotateAnimations() {
    const rotateElements = getAllElements('.rotate-hover');

    rotateElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'rotate 0.6s linear';
        });

        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    });
}

// Stats counter animation
export function setupStatsCounter() {
    const stats = getAllElements('.stat-number[data-count]');
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

// FAQ Accordion
export function setupFAQAccordion() {
    const faqQuestions = getAllElements('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isActive = question.classList.contains('active');
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i.fa-chevron-down, i.fa-chevron-up');

                // Close all other FAQ items in the same category
                const category = question.closest('.faq-category');
                if (category) {
                    const otherQuestions = category.querySelectorAll('.faq-question');
                    otherQuestions.forEach(q => {
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
    }
}

// Form animations
export function setupFormAnimations() {
    const formGroups = getAllElements('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (input) {
            input.addEventListener('focus', () => {
                group.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            });

            input.addEventListener('blur', () => {
                group.style.boxShadow = 'none';
            });
        }
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);
