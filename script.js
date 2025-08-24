// Global Variables
let currentLanguage = 'ar';
let currentTheme = 'light';
let isMobileMenuOpen = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupAnimations();
    setupScrollEffects();
    setupInteractiveElements();
    setupCounterAnimations();
    setupParticleEffects();
    setupTiltEffects();
    setupMouseEffects();
    setupHeroGlow();
});

// Initialize Application
function initializeApp() {
    // Set initial language
    updateTranslatableElements(currentLanguage);
    
    // Set initial theme
    document.body.setAttribute('data-theme', currentTheme);
    
    // Initialize header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Initialize smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Initialize intersection observer for animations
    setupIntersectionObserver();
    
    // Initialize background animations
    setupBackgroundAnimations();
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Mouse movement effects
    document.addEventListener('mousemove', handleMouseMovement);
    
    // Feature card interactions
    setupFeatureCardInteractions();
    
    // Button hover effects
    setupButtonEffects();
}

// Language Toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    
    // Update HTML attributes
    document.documentElement.setAttribute('lang', currentLanguage);
    document.documentElement.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
    
    // Update all translatable elements
    updateTranslatableElements(currentLanguage);
    
    // Update language toggle button
    const langToggle = document.querySelector('.language-toggle span');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'ar' ? 'English' : 'العربية';
    }
    
    // Update navigation links
    updateNavigationLinks();
    
    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Update Translatable Elements
function updateTranslatableElements(language) {
    const translatableElements = document.querySelectorAll('[data-ar][data-en]');
    
    translatableElements.forEach(element => {
        const text = language === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
        if (text) {
            element.textContent = text;
        }
    });

    // Update placeholders
    const inputs = document.querySelectorAll('input[data-ar-placeholder][data-en-placeholder]');
    inputs.forEach(input => {
        const placeholder = language === 'ar' ? input.getAttribute('data-ar-placeholder') : input.getAttribute('data-en-placeholder');
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
}

// Update Navigation Links
function updateNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    const linkTexts = {
        ar: ['الرئيسية', 'المميزات', 'حول', 'اتصل بنا'],
        en: ['Home', 'Features', 'About', 'Contact']
    };
    
    navLinks.forEach((link, index) => {
        const span = link.querySelector('span');
        if (span) {
            span.textContent = linkTexts[currentLanguage][index];
        }
    });
}

// Theme Toggle
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
    
    if (mobileBtn) {
        mobileBtn.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileBtn.querySelectorAll('span');
        if (isMobileMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

// Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector('.modern-header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.modern-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.modern-header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Setup Animations
function setupAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .contact-item, .stat, .stat-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Setup Scroll Effects
function setupScrollEffects() {
    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        const shapes = document.querySelectorAll('.floatingElements');
        
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Setup Interactive Elements
function setupInteractiveElements() {
    // Interactive demo card effects
    const interactiveDemo = document.querySelector('.interactive-demo');
    if (interactiveDemo) {
        interactiveDemo.addEventListener('mousemove', (e) => {
            const rect = interactiveDemo.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            interactiveDemo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        interactiveDemo.addEventListener('mouseleave', () => {
            interactiveDemo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }
}

// Setup Counter Animations
function setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Setup Particle Effects
function setupParticleEffects() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        particle.addEventListener('mouseenter', () => {
            particle.style.transform = 'scale(1.5) rotate(180deg)';
            particle.style.opacity = '0.8';
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.style.transform = 'scale(1) rotate(0deg)';
            particle.style.opacity = '0.3';
        });
    });
}

// Setup Tilt Effects
function setupTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Setup Mouse Effects
function setupMouseEffects() {
    const particles = document.querySelectorAll('.particle');
    const shapes = document.querySelectorAll('.floatingElements');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = 1 + (index * 0.1);
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const x = (mouseX - 0.5) * speed * 10;
            const y = (mouseY - 0.5) * speed * 10;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Setup Background Animations
function setupBackgroundAnimations() {
    // Add random movement to particles
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + Math.random() * 2000);
    });
}

// Setup Feature Card Interactions
function setupFeatureCardInteractions() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click animation
            card.style.transform = 'scale(0.95)';
    setTimeout(() => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
            
            // Show notification
            const title = card.querySelector('.feature-title').textContent;
            showNotification(`${title} - ${currentLanguage === 'ar' ? 'ميزة رائعة!' : 'Amazing feature!'}`, 'success');
        });
    });
}

// Setup Button Effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        // Ripple click effect
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Handle Mouse Movement
function handleMouseMovement(e) {
    const particles = document.querySelectorAll('.particle');
    const shapes = document.querySelectorAll('.floatingElements');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = 1 + (index * 0.1);
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const x = (mouseX - 0.5) * speed * 10;
        const y = (mouseY - 0.5) * speed * 10;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Setup Intersection Observer
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                }
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-card, .contact-item, .stat, .stat-card, .about-image');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Translation Modal Functions
function openTranslationModal() {
    const modal = document.getElementById('translationModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Initialize camera
        initializeCamera();
        
        // Add entrance animation
        modal.style.animation = 'fadeIn 0.3s ease-out';
    }
}

function closeTranslationModal() {
    const modal = document.getElementById('translationModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Stop camera
        stopCamera();
    }
}

// Camera Functions
function initializeCamera() {
    const video = document.getElementById('camera');
    if (video && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
                showNotification('خطأ في الوصول للكاميرا', 'error');
            });
    }
}

function stopCamera() {
    const video = document.getElementById('camera');
    if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
}

function startTranslation() {
    const translationText = document.getElementById('translationText');
    if (translationText) {
        // Simulate translation process
        translationText.textContent = currentLanguage === 'ar' ? 'جاري الترجمة...' : 'Translating...';
        
        // Add loading animation
        translationText.style.animation = 'pulse 1s ease-in-out infinite';
        
        setTimeout(() => {
            // Simulate translation result
            const sampleTranslations = {
                ar: ['مرحباً', 'كيف حالك؟', 'شكراً لك', 'أهلاً وسهلاً', 'أنا سعيد بلقائك'],
                en: ['Hello', 'How are you?', 'Thank you', 'Welcome', 'Nice to meet you']
            };
            
            const randomTranslation = sampleTranslations[currentLanguage][Math.floor(Math.random() * sampleTranslations[currentLanguage].length)];
            translationText.textContent = randomTranslation;
            translationText.style.animation = 'none';
            
            showNotification(
                currentLanguage === 'ar' ? 'تمت الترجمة بنجاح!' : 'Translation completed successfully!',
                'success'
            );
        }, 2000);
    }
}

// Form Submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    if (name && email && message) {
        // Simulate form submission with loading
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = currentLanguage === 'ar' ? '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...' : '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification(
                currentLanguage === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!',
                'success'
            );
            
            // Reset form
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    } else {
        showNotification(
            currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
            'error'
        );
    }
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('translationModal');
        if (modal && modal.classList.contains('show')) {
            closeTranslationModal();
        }
    }
    
    // Toggle mobile menu with Enter key
    if (e.key === 'Enter' && e.target.classList.contains('mobile-menu-btn')) {
        toggleMobileMenu();
    }
    
    // Open translation modal with Ctrl/Cmd + T
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        openTranslationModal();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-medium);
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        box-shadow: var(--shadow-heavy);
        background: ${getNotificationColor(type)};
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function getNotificationColor(type) {
    const colors = {
        success: 'var(--bright-green)',
        error: '#f44336',
        warning: 'var(--orange)',
        info: 'var(--primary-blue)'
    };
    return colors[type] || colors.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Utility Functions
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

// Enhanced scroll handling with debounce
const debouncedScrollHandler = debounce(handleHeaderScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button or notification
    showNotification(
        currentLanguage === 'ar' ? 'يمكنك تثبيت التطبيق الآن!' : 'You can install the app now!',
        'info'
    );
});

// Export functions for global access
window.toggleLanguage = toggleLanguage;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.openTranslationModal = openTranslationModal;
window.closeTranslationModal = closeTranslationModal;
window.startTranslation = startTranslation;
window.scrollToSection = scrollToSection;

function setupHeroGlow() {
    const hero = document.querySelector('.hero-container');
    const glow = document.querySelector('.hero-container .cursor-glow');
    if (!hero || !glow) return;
    hero.addEventListener('mousemove', (e)=>{
        const rect = hero.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        glow.style.setProperty('--mx', mx + 'px');
        glow.style.setProperty('--my', my + 'px');
    });
    hero.addEventListener('mouseleave', ()=>{
        glow.style.setProperty('--mx', '-999px');
        glow.style.setProperty('--my', '-999px');
    });
}
// initialize hero glow
setupHeroGlow();


