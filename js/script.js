// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.remove('show');
        }
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            } else {
                removeError(subject);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }
});

// Helper functions
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.style.borderColor = 'red';
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    
    if (error) {
        error.remove();
    }
    
    input.style.borderColor = '';
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Toggle active class on clicked question
            question.classList.toggle('active');
            
            // Get the answer element
            const answer = question.nextElementSibling;
            
            // Toggle active class on answer
            answer.classList.toggle('active');
            
            // Close other open answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all sections that need to be animated
    const sections = document.querySelectorAll('.section');
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');

    // Observer options
    const options = {
        root: null, // use viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of the element is visible
    };

    // Create observer for sections
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, options);

    // Create observer for individual elements
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    // Start observing sections
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Add animation classes based on section type
        if (section.classList.contains('hero-section')) {
            section.classList.add('fade-up');
        } else if (section.classList.contains('services-section')) {
            section.classList.add('fade-left');
        } else if (section.classList.contains('about-section')) {
            section.classList.add('fade-right');
        } else if (section.classList.contains('portfolio-section')) {
            section.classList.add('zoom-in');
        } else if (section.classList.contains('testimonials-section')) {
            section.classList.add('fade-up');
        } else if (section.classList.contains('contact-section')) {
            section.classList.add('fade-down');
        }
    });

    // Start observing individual elements
    animateOnScroll.forEach(element => {
        elementObserver.observe(element);
    });

    // Add animation to child elements
    sections.forEach(section => {
        const headers = section.querySelectorAll('.section-header');
        const contents = section.querySelectorAll('.section-content');
        const images = section.querySelectorAll('.section-image');
        const buttons = section.querySelectorAll('.section-button');

        headers.forEach(header => elementObserver.observe(header));
        contents.forEach(content => elementObserver.observe(content));
        images.forEach(image => elementObserver.observe(image));
        buttons.forEach(button => elementObserver.observe(button));
    });
});

// Helper function to add animation delay
function addAnimationDelay(elements) {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Add animation delays to specific elements
document.addEventListener('DOMContentLoaded', () => {
    // Add delays to service cards
    addAnimationDelay(document.querySelectorAll('.service-card'));
    
    // Add delays to team members
    addAnimationDelay(document.querySelectorAll('.team-member'));
    
    // Add delays to portfolio items
    addAnimationDelay(document.querySelectorAll('.portfolio-card'));
    
    // Add delays to testimonials
    addAnimationDelay(document.querySelectorAll('.testimonial-card'));
    
    // Add delays to feature items
    addAnimationDelay(document.querySelectorAll('.feature-item'));
});

// Footer animations
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const footer = entry.target;
            footer.classList.add('animate');
            
            // Animate footer grid sections
            const gridSections = footer.querySelectorAll('.footer-grid > div');
            gridSections.forEach(section => section.classList.add('animate'));
            
            // Animate footer bottom
            const footerBottom = footer.querySelector('.footer-bottom');
            if (footerBottom) footerBottom.classList.add('animate');
            
            // Animate social links
            const socialLinks = footer.querySelector('.social-links');
            if (socialLinks) socialLinks.classList.add('animate');
            
            footerObserver.unobserve(footer);
        }
    });
}, {
    threshold: 0.2
});

// Start observing the footer
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer');
    if (footer) footerObserver.observe(footer);
}); 
