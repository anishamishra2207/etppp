// Filter functionality for products
function filterCollection(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter products
    products.forEach(product => {
        if (category === 'all') {
            product.style.display = 'flex';
            product.style.animation = 'fadeInUp 0.5s ease';
        } else {
            if (product.getAttribute('data-category') === category) {
                product.style.display = 'flex';
                product.style.animation = 'fadeInUp 0.5s ease';
            } else {
                product.style.display = 'none';
            }
        }
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert(`Thank you for subscribing with ${email}! You will receive exclusive offers soon.`);
            this.querySelector('input[type="email"]').value = '';
        }
    });
}

// Add to cart functionality
const addButtons = document.querySelectorAll('.add-btn');
addButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.closest('.product-card').querySelector('h3').textContent;
        const price = this.closest('.product-card').querySelector('.price').textContent;
        alert(`Added to cart:\n${productName}\n${price}`);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
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
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentPage();
    initializeAnalytics();
});

// Google Analytics tracking
function initializeAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }

    // Track button clicks
    const buttons = document.querySelectorAll('.cta-button, .add-btn, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    button_text: this.textContent,
                    button_class: this.className
                });
            }
        });
    });

    // Track form submissions
    const forms = document.querySelectorAll('form, .newsletter-form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    form_type: 'newsletter'
                });
            }
        });
    });
}

// Mobile menu toggle (if you want to add a mobile menu later)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Track when user scrolls to 50%, 75%, and 100%
        if (typeof gtag !== 'undefined') {
            if (maxScroll >= 50 && maxScroll < 75) {
                gtag('event', 'scroll_depth', { depth: '50%' });
            } else if (maxScroll >= 75 && maxScroll < 100) {
                gtag('event', 'scroll_depth', { depth: '75%' });
            } else if (maxScroll >= 100) {
                gtag('event', 'scroll_depth', { depth: '100%' });
            }
        }
    }
});

// Track external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'external_link_click', {
                link_url: this.href,
                link_text: this.textContent
            });
        }
    });
});

// Add animation on scroll
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

// Observe elements for animation
document.querySelectorAll('.collection-card, .product-card, .feature, .team-member').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

console.log('Ethnic Wear Collections website loaded successfully!');
console.log('Analytics tracking initialized. Replace G-XXXXXXXXXX with your actual Google Analytics ID.');
