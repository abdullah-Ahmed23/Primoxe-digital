/**
 * _utils.js
 * Utility functions used across the application
 */

// Debounce function for scroll/resize events
export function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Throttle function for frequent events
export function throttle(func, limit = 100) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        const context = this;
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

// Check if element is in viewport
export function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= -offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
    );
}

// Smooth scroll to element
export function smoothScrollTo(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Get all siblings of an element
export function getSiblings(element) {
    return Array.from(element.parentNode.children).filter(child => child !== element);
}

// Toggle class on element
export function toggleClass(element, className) {
    element.classList.toggle(className);
}

// Add class to element
export function addClass(element, className) {
    element.classList.add(className);
}

// Remove class from element
export function removeClass(element, className) {
    element.classList.remove(className);
}

// Check if element has class
export function hasClass(element, className) {
    return element.classList.contains(className);
}

// Get scroll position
export function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Lazy load images
export function lazyLoadImages(selector = 'img[data-src]') {
    const images = document.querySelectorAll(selector);

    if ('IntersectionObserver' in window) {
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

        images.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Format phone numbers
export function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

// Validate email
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Get URL parameter
export function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Generate unique ID
export function generateUniqueId(prefix = 'id') {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
}

// Check if element exists
export function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

// Wait for element to exist
export function waitForElement(selector, callback, timeout = 5000) {
    const startTime = Date.now();

    function checkElement() {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else if (Date.now() - startTime < timeout) {
            setTimeout(checkElement, 100);
        }
    }

    checkElement();
}

// Get viewport dimensions
export function getViewportDimensions() {
    return {
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}

// Check if mobile device
export function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check if touch device
export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// Get current breakpoints
export function getCurrentBreakpoint(breakpoints = { sm: 576, md: 768, lg: 992, xl: 1200 }) {
    const viewportWidth = getViewportDimensions().width;
    let currentBreakpoint = 'xs';

    for (const [name, width] of Object.entries(breakpoints).sort((a, b) => b[1] - a[1])) {
        if (viewportWidth >= width) {
            currentBreakpoint = name;
            break;
        }
    }

    return currentBreakpoint;
}

// Deep merge objects
export function deepMerge(target, source) {
    const output = { ...target };
    if (typeof source !== 'object' || source === null) {
        return output;
    }

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null) {
                output[key] = deepMerge(output[key] || {}, source[key]);
            } else {
                output[key] = source[key];
            }
        }
    }
    return output;
}

// Format currency
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Capitalize first letter
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Truncate text
export function truncateText(text, length, suffix = '...') {
    if (text.length <= length) {
        return text;
    }
    return text.substring(0, length) + suffix;
}

// Get random number in range
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shuffle array
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check if element is visible
export function isVisible(element) {
    return !!element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

// Get all elements that match selector
export function getAllElements(selector) {
    return Array.from(document.querySelectorAll(selector));
}

// Add event listener with options
export function addEventListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
}

// Remove event listener
export function removeEventListener(element, event, handler, options = {}) {
    element.removeEventListener(event, handler, options);
}

// Dispatch custom event
export function dispatchEvent(element, eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
        detail,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(event);
}

// Get cookie value
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Set cookie
export function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Delete cookie
export function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Check if cookie exists
export function cookieExists(name) {
    return getCookie(name) !== undefined;
}

// Get localStorage item
export function getLocalStorageItem(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return null;
    }
}

// Set localStorage item
export function setLocalStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        return false;
    }
}

// Remove localStorage item
export function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
}

// Check if localStorage item exists
export function localStorageItemExists(key) {
    return localStorage.getItem(key) !== null;
}

// Get sessionStorage item
export function getSessionStorageItem(key) {
    try {
        return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
        return null;
    }
}

// Set sessionStorage item
export function setSessionStorageItem(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        return false;
    }
}

// Remove sessionStorage item
export function removeSessionStorageItem(key) {
    sessionStorage.removeItem(key);
}

// Check if sessionStorage item exists
export function sessionStorageItemExists(key) {
    return sessionStorage.getItem(key) !== null;
}
