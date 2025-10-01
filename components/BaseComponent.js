/**
 * Base Component class for all reusable components
 * Provides common functionality like event handling, DOM manipulation, and lifecycle methods
 */
class BaseComponent {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.options = { ...this.constructor.defaultOptions, ...options };
        this.eventListeners = [];
        this.initialized = false;
        
        if (this.element) {
            this.init();
        }
    }
    
    static get defaultOptions() {
        return {};
    }
    
    /**
     * Initialize the component - override in subclasses
     */
    init() {
        this.bindEvents();
        this.initialized = true;
        this.onInit();
    }
    
    /**
     * Hook called after initialization - override in subclasses
     */
    onInit() {}
    
    /**
     * Bind events - override in subclasses
     */
    bindEvents() {}
    
    /**
     * Add event listener with automatic cleanup tracking
     */
    addEventListener(element, event, handler, options) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (target) {
            target.addEventListener(event, handler, options);
            this.eventListeners.push({ target, event, handler, options });
        }
    }
    
    /**
     * Add event listener to component's main element
     */
    on(event, handler, options) {
        this.addEventListener(this.element, event, handler, options);
    }
    
    /**
     * Emit custom event from component
     */
    emit(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail: { component: this, ...detail },
            bubbles: true,
            cancelable: true
        });
        this.element.dispatchEvent(event);
    }
    
    /**
     * Find elements within component
     */
    find(selector) {
        return this.element.querySelector(selector);
    }
    
    /**
     * Find all elements within component
     */
    findAll(selector) {
        return this.element.querySelectorAll(selector);
    }
    
    /**
     * Add CSS class to component element
     */
    addClass(className) {
        this.element.classList.add(className);
        return this;
    }
    
    /**
     * Remove CSS class from component element
     */
    removeClass(className) {
        this.element.classList.remove(className);
        return this;
    }
    
    /**
     * Toggle CSS class on component element
     */
    toggleClass(className) {
        this.element.classList.toggle(className);
        return this;
    }
    
    /**
     * Check if component element has CSS class
     */
    hasClass(className) {
        return this.element.classList.contains(className);
    }
    
    /**
     * Set attribute on component element
     */
    setAttribute(name, value) {
        this.element.setAttribute(name, value);
        return this;
    }
    
    /**
     * Get attribute from component element
     */
    getAttribute(name) {
        return this.element.getAttribute(name);
    }
    
    /**
     * Show component
     */
    show() {
        this.element.style.display = '';
        this.removeClass('hidden');
        return this;
    }
    
    /**
     * Hide component
     */
    hide() {
        this.addClass('hidden');
        return this;
    }
    
    /**
     * Destroy component and clean up event listeners
     */
    destroy() {
        this.onDestroy();
        
        // Remove all event listeners
        this.eventListeners.forEach(({ target, event, handler, options }) => {
            target.removeEventListener(event, handler, options);
        });
        this.eventListeners = [];
        
        // Remove from DOM if specified
        if (this.options.removeOnDestroy) {
            this.element.remove();
        }
        
        this.initialized = false;
    }
    
    /**
     * Hook called before destruction - override in subclasses
     */
    onDestroy() {}
    
    /**
     * Update component options
     */
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.onOptionsUpdate();
    }
    
    /**
     * Hook called after options update - override in subclasses
     */
    onOptionsUpdate() {}
}

export default BaseComponent;

