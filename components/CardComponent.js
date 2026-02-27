import BaseComponent from './BaseComponent.js';

/**
 * Base Card Component
 * Reusable card component for projects, appearances engagements, etc.
 */
class CardComponent extends BaseComponent {
    static get defaultOptions() {
        return {
            template: 'default',
            data: {},
            clickable: true,
            animateOnHover: true,
            lazyLoadImages: true
        };
    }
    
    constructor(container, options = {}) {
        // Create card element if container is a parent element
        const cardElement = container.classList && container.classList.contains('card') 
            ? container 
            : document.createElement('div');
            
        super(cardElement, options);
        
        this.container = container;
        this.data = this.options.data;
        
        if (cardElement !== container) {
            container.appendChild(cardElement);
        }
    }
    
    init() {
        this.render();
        super.init();
        
        if (this.options.animateOnHover) {
            this.addHoverAnimation();
        }
        
        if (this.options.lazyLoadImages) {
            this.setupLazyLoading();
        }
    }
    
    render() {
        this.element.className = `card ${this.getCardClasses()}`;
        this.element.innerHTML = this.getTemplate();
        
        // Set up accessibility
        if (this.options.clickable) {
            this.element.setAttribute('tabindex', '0');
            this.element.setAttribute('role', 'button');
        }
    }
    
    getCardClasses() {
        const classes = [`card-${this.options.template}`];
        
        if (this.data.featured) classes.push('featured');
        if (this.data.category) classes.push(`category-${this.data.category}`);
        if (this.options.clickable) classes.push('clickable');
        
        return classes.join(' ');
    }
    
    getTemplate() {
        // Override in subclasses or use template from options
        return this.options.templateFunction 
            ? this.options.templateFunction(this.data)
            : this.getDefaultTemplate();
    }
    
    getDefaultTemplate() {
        return `
            <div class="card-content">
                ${this.data.title ? `<h3 class="card-title">${this.data.title}</h3>` : ''}
                ${this.data.description ? `<p class="card-description">${this.data.description}</p>` : ''}
            </div>
        `;
    }
    
    bindEvents() {
        if (this.options.clickable) {
            this.on('click', this.handleClick.bind(this));
            this.on('keydown', this.handleKeydown.bind(this));
        }
        
        // Handle link clicks within card
        const links = this.findAll('a');
        links.forEach(link => {
            this.addEventListener(link, 'click', this.handleLinkClick.bind(this));
        });
    }
    
    handleClick(e) {
        // Don't trigger card click if clicking on a link
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        
        this.emit('card-click', { data: this.data, event: e });
        
        // Default behavior - click first link if exists
        if (this.options.clickable) {
            const primaryLink = this.find('a');
            if (primaryLink) {
                primaryLink.click();
            }
        }
    }
    
    handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleClick(e);
        }
    }
    
    handleLinkClick(e) {
        e.stopPropagation(); // Prevent card click
        this.emit('card-link-click', { 
            href: e.target.href, 
            data: this.data, 
            event: e 
        });
    }
    
    addHoverAnimation() {
        this.on('mouseenter', () => {
            this.addClass('hover');
            this.emit('card-hover-enter');
        });
        
        this.on('mouseleave', () => {
            this.removeClass('hover');
            this.emit('card-hover-leave');
        });
    }
    
    setupLazyLoading() {
        const images = this.findAll('img[data-src]');
        
        if (images.length > 0 && 'IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        }
    }
    
    /**
     * Public API methods
     */
    
    updateData(newData) {
        this.data = { ...this.data, ...newData };
        this.render();
        this.bindEvents(); // Re-bind after render
        this.emit('card-update', { data: this.data });
    }
    
    setFeatured(featured = true) {
        this.data.featured = featured;
        this.updateData({});
    }
    
    getData() {
        return { ...this.data };
    }
}

export default CardComponent;

