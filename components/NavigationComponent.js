import BaseComponent from './BaseComponent.js';

/**
 * Navigation Component
 * Handles mobile menu toggle, scroll effects, and active link tracking
 */
class NavigationComponent extends BaseComponent {
    static get defaultOptions() {
        return {
            mobileMenuSelector: '#mobile-menu',
            navMenuSelector: '#nav-menu',
            navLinksSelector: '.nav-link',
            scrollThreshold: 50,
            sectionOffset: 100,
            enableSmoothScroll: true
        };
    }
    
    init() {
        this.mobileMenuButton = document.querySelector(this.options.mobileMenuSelector);
        this.navMenu = document.querySelector(this.options.navMenuSelector);
        this.navLinks = document.querySelectorAll(this.options.navLinksSelector);
        this.sections = document.querySelectorAll('section[id]');
        
        super.init();
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuButton) {
            this.addEventListener(this.mobileMenuButton, 'click', this.toggleMobileMenu.bind(this));
        }
        
        // Close mobile menu when clicking on nav links
        this.navLinks.forEach(link => {
            this.addEventListener(link, 'click', this.closeMobileMenu.bind(this));
            
            // Add smooth scrolling if enabled
            if (this.options.enableSmoothScroll) {
                this.addEventListener(link, 'click', this.handleSmoothScroll.bind(this));
            }
        });
        
        // Scroll event handlers
        this.addEventListener(window, 'scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Escape key to close mobile menu
        this.addEventListener(document, 'keydown', this.handleKeydown.bind(this));
    }
    
    toggleMobileMenu() {
        if (this.mobileMenuButton && this.navMenu) {
            this.mobileMenuButton.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = this.navMenu.classList.contains('active');
            this.mobileMenuButton.setAttribute('aria-expanded', isExpanded);
            
            this.emit('mobile-menu-toggle', { isOpen: isExpanded });
        }
    }
    
    closeMobileMenu() {
        if (this.mobileMenuButton && this.navMenu) {
            this.mobileMenuButton.classList.remove('active');
            this.navMenu.classList.remove('active');
            this.mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            this.emit('mobile-menu-close');
        }
    }
    
    handleSmoothScroll(e) {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    handleScroll() {
        this.updateNavbarBackground();
        this.updateActiveNavLink();
    }
    
    updateNavbarBackground() {
        const shouldAddScrolled = window.scrollY > this.options.scrollThreshold;
        
        if (shouldAddScrolled) {
            this.addClass('scrolled');
        } else {
            this.removeClass('scrolled');
        }
        
        this.emit('navbar-scroll', { scrolled: shouldAddScrolled, scrollY: window.scrollY });
    }
    
    updateActiveNavLink() {
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - this.options.sectionOffset;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active states
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        this.emit('active-section-change', { section: currentSection });
    }
    
    handleKeydown(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
            this.closeMobileMenu();
        }
        
        // Alt + number keys for section navigation
        if (e.altKey && this.options.enableSmoothScroll) {
            const sectionMap = {
                '1': 'home',
                '2': 'about', 
                '3': 'experience',
                '4': 'projects',
                '5': 'appearances',
                '6': 'podcast',
                '7': 'skills',
                '8': 'connect'
            };
            
            const sectionId = sectionMap[e.key];
            if (sectionId) {
                e.preventDefault();
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }
    
    // Utility method for throttling scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    /**
     * Public API methods
     */
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    setActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    isMenuOpen() {
        return this.navMenu && this.navMenu.classList.contains('active');
    }
}

export default NavigationComponent;

