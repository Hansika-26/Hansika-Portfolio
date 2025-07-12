// Portfolio JavaScript

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Global variables
let currentRoleIndex = 0;
const roles = ['Full Stack Developer', 'UI/UX Designer', 'Software Engineer', 'Undergraduate Student'];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functions
function initializeApp() {
    handleHeaderScroll();
    startTypingAnimation();
    handleMobileMenu();
    handleSmoothScrolling();
    initializeContactForm();
    animateSkillBars();
    initializeObserver();
    initializeEnhancedAnimations();
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            header.classList.remove('bg-transparent');
            header.classList.add('bg-white/95');
        } else {
            header.classList.remove('header-scrolled');
            header.classList.add('bg-transparent');
            header.classList.remove('bg-white/95');
        }
    });
}

// Typing animation for hero section
function startTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    
    function typeRole() {
        if (typingElement) {
            typingElement.textContent = roles[currentRoleIndex];
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        }
    }
    
    // Start the animation
    typeRole();
    setInterval(typeRole, 3000);
}

// Mobile menu toggle
function handleMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Smooth scrolling for navigation links
function handleSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to section helper function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
}

function handleContactFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Send email using EmailJS
    emailjs.send('service_8sjy76x', 'template_d2eei15', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully!', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(function() {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation-triangle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                observer.unobserve(skillBar);
            }
        });
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize Intersection Observer for animations
function initializeObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Download CV function
function downloadCV() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = './Kaumini Hansika - cv.pdf';
    link.download = 'Kaumini_Hansika_CV.pdf';
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    showNotification('CV download started!', 'success');
}

// Download certificate function
function downloadCertificate(filename) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `./certifications/${filename}`;
    link.download = filename;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    showNotification('Certificate download started!', 'success');
}

// Theme toggle (optional feature)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Save preference
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Utility function to debounce events
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

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ======================================== 
//          ENHANCED ANIMATIONS             
// ======================================== 

// Particle System for Background
function createParticleSystem() {
    const hero = document.getElementById('home');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-accent/20 rounded-full animate-particle-float';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        hero.appendChild(particle);
    }
}

// Advanced Intersection Observer for staggered animations
function initializeAdvancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // Special animations for different sections
                    if (entry.target.classList.contains('skill-card')) {
                        animateSkillCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('timeline-item')) {
                        animateTimelineItem(entry.target);
                    }
                    
                    if (entry.target.classList.contains('project-card')) {
                        animateProjectCard(entry.target);
                    }
                    
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Skill card animation
function animateSkillCard(card) {
    const progressBars = card.querySelectorAll('[data-progress]');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
            
            // Add number counting animation
            const percentText = bar.parentElement.querySelector('.skill-percent');
            if (percentText) {
                countUp(percentText, 0, parseInt(progress), 1000);
            }
        }, index * 200);
    });
}

// Timeline item animation
function animateTimelineItem(item) {
    item.style.transform = 'translateY(0) scale(1)';
    item.style.opacity = '1';
    
    // Animate timeline dot
    const dot = item.querySelector('.timeline-dot');
    if (dot) {
        setTimeout(() => {
            dot.classList.add('animate-pulse-gentle');
        }, 300);
    }
}

// Project card animation
function animateProjectCard(card) {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.opacity = '1';
    
    // Animate project tags
    const tags = card.querySelectorAll('.project-tag');
    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.classList.add('animate-slide-in-stagger');
        }, index * 100);
    });
}

// Number counting animation
function countUp(element, start, end, duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    function update() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Parallax effect for background elements
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Mouse tracking animation for cards
function initializeMouseTracking() {
    const cards = document.querySelectorAll('.glass-card, .project-card, .skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// Magnetic effect for buttons
function initializeMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Text animation on scroll
function initializeTextAnimations() {
    const textElements = document.querySelectorAll('.animate-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                entry.target.textContent = '';
                
                [...text].forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.animationDelay = `${index * 50}ms`;
                    span.classList.add('animate-text-reveal');
                    entry.target.appendChild(span);
                });
            }
        });
    });
    
    textElements.forEach(el => observer.observe(el));
}

// Floating action button animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.classList.add('animate-float');
    });
}

// Smooth reveal animation for sections
function initializeSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                
                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-slide-up');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => observer.observe(section));
}

// Advanced typing effect with multiple words
function advancedTypingEffect(element, words, typeSpeed = 100, deleteSpeed = 50, delayBetweenWords = 2000) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (!isDeleting) {
            element.textContent = currentWord.slice(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, delayBetweenWords);
            }
        } else {
            element.textContent = currentWord.slice(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        
        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(type, speed);
    }
    
    type();
}

// Initialize all enhanced animations
function initializeEnhancedAnimations() {
    // Add particle system
    createParticleSystem();
    
    // Initialize advanced animations
    initializeAdvancedAnimations();
    
    // Initialize parallax
    initializeParallax();
    
    // Initialize mouse tracking
    initializeMouseTracking();
    
    // Initialize magnetic buttons
    initializeMagneticButtons();
    
    // Initialize text animations
    initializeTextAnimations();
    
    // Initialize floating elements
    initializeFloatingElements();
    
    // Initialize section reveals
    initializeSectionReveals();
    
    // Enhanced typing effect for hero
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const roles = ['Full Stack Developer', 'UI/UX Designer', 'Software Engineer', 'Creative Innovator'];
        advancedTypingEffect(typingElement, roles);
    }
}

// Initialize when page is loaded
window.addEventListener('load', function() {
    // Additional initialization after full page load
    initLazyLoading();
    loadTheme();
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments if needed
    console.log('Window resized');
}, 250));

// Export functions for global access
window.scrollToSection = scrollToSection;
window.downloadCV = downloadCV;
window.downloadCertificate = downloadCertificate;
window.toggleTheme = toggleTheme;

// Add magnetic button class to buttons after DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Add magnetic effect to all buttons
    const buttons = document.querySelectorAll('button, .btn-animate');
    buttons.forEach(button => {
        button.classList.add('btn-magnetic');
    });
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all animation elements
    document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right').forEach(el => {
        fadeObserver.observe(el);
    });
    
    // Add progress bar animations when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate progress bars
                    const progressBars = entry.target.querySelectorAll('[style*="width"]');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.transition = 'width 2s ease-in-out';
                            bar.style.width = bar.style.width; // Trigger animation
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
});
