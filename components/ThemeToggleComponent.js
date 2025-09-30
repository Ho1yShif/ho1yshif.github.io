import BaseComponent from './BaseComponent.js';

/**
 * Theme Toggle Component
 * Handles dark/light mode switching with persistence and icons
 */
class ThemeToggleComponent extends BaseComponent {
    static get defaultOptions() {
        return {
            iconSelector: '.theme-icon',
            storageKey: 'theme',
            defaultTheme: 'light',
            themes: ['light', 'dark'],
            sunIcon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                <path d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8l1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" stroke-width="2"/>
            </svg>`,
            moonIcon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
            </svg>`
        };
    }
    
    init() {
        this.iconElement = this.find(this.options.iconSelector);
        this.currentTheme = this.getSavedTheme() || this.options.defaultTheme;
        
        super.init();
        
        // Apply initial theme
        this.applyTheme(this.currentTheme);
    }
    
    bindEvents() {
        this.on('click', this.toggle.bind(this));
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.addEventListener(mediaQuery, 'change', this.handleSystemThemeChange.bind(this));
        }
        
        // Listen for keyboard shortcuts
        this.addEventListener(document, 'keydown', this.handleKeydown.bind(this));
    }
    
    toggle() {
        const currentIndex = this.options.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.options.themes.length;
        const newTheme = this.options.themes[nextIndex];
        
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        if (!this.options.themes.includes(theme)) {
            console.warn(`Theme "${theme}" is not supported. Available themes:`, this.options.themes);
            return;
        }
        
        const previousTheme = this.currentTheme;
        this.currentTheme = theme;
        
        this.applyTheme(theme);
        this.saveTheme(theme);
        this.updateIcon(theme);
        
        this.emit('theme-change', { 
            theme, 
            previousTheme,
            isDark: theme === 'dark'
        });
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Add theme class to body for additional styling hooks
        document.body.className = document.body.className
            .replace(/theme-\w+/g, '') + ` theme-${theme}`;
            
        // Update navbar background to match new theme
        this.updateNavbarBackground();
    }
    
    updateIcon(theme) {
        if (!this.iconElement) return;
        
        const iconMap = {
            'light': this.options.moonIcon,
            'dark': this.options.sunIcon
        };
        
        this.iconElement.innerHTML = iconMap[theme] || this.options.moonIcon;
    }
    
    saveTheme(theme) {
        try {
            localStorage.setItem(this.options.storageKey, theme);
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }
    
    getSavedTheme() {
        try {
            return localStorage.getItem(this.options.storageKey);
        } catch (error) {
            console.warn('Could not read theme from localStorage:', error);
            return null;
        }
    }
    
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    handleSystemThemeChange(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!this.getSavedTheme()) {
            const systemTheme = e.matches ? 'dark' : 'light';
            this.setTheme(systemTheme);
        }
    }
    
    handleKeydown(e) {
        // Ctrl/Cmd + Shift + T to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            this.toggle();
        }
    }
    
    updateNavbarBackground() {
        // Trigger navbar background update if navigation component exists
        const navbar = document.getElementById('navbar');
        if (navbar && window.updateNavbarBackground) {
            window.updateNavbarBackground();
        }
    }
    
    /**
     * Public API methods
     */
    
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    isDarkMode() {
        return this.currentTheme === 'dark';
    }
    
    isLightMode() {
        return this.currentTheme === 'light';
    }
    
    resetToSystem() {
        const systemTheme = this.getSystemTheme();
        this.setTheme(systemTheme);
        
        // Clear saved preference
        try {
            localStorage.removeItem(this.options.storageKey);
        } catch (error) {
            console.warn('Could not clear theme from localStorage:', error);
        }
    }
    
    onInit() {
        // Add ARIA attributes for accessibility
        this.setAttribute('aria-label', 'Toggle dark mode');
        this.setAttribute('role', 'switch');
        this.setAttribute('aria-checked', this.currentTheme === 'dark' ? 'true' : 'false');
    }
    
    onOptionsUpdate() {
        // Re-apply current theme with new options
        this.applyTheme(this.currentTheme);
    }
}

export default ThemeToggleComponent;
