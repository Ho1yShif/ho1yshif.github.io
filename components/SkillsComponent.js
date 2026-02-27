import BaseComponent from './BaseComponent.js';

/**
 * Skill Category Component
 * Individual skill category card
 */
class SkillCategory extends BaseComponent {
    constructor(container, options = {}) {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category-card';
        
        super(categoryElement, options);
        
        this.container = container;
        this.category = this.options.category;
        
        container.appendChild(categoryElement);
    }
    
    static get defaultOptions() {
        return {
            category: {},
            animateOnHover: true
        };
    }
    
    init() {
        this.render();
        super.init();
        
        if (this.options.animateOnHover) {
            this.addHoverAnimation();
        }
    }
    
    render() {
        const { title, skills } = this.category;
        
        this.element.innerHTML = `
            <h4 class="category-title">${title}</h4>
            <div class="category-skills-text">
                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
    }
    
    bindEvents() {
        const skillTags = this.findAll('.skill-tag');
        skillTags.forEach(tag => {
            this.addEventListener(tag, 'click', this.handleSkillClick.bind(this));
        });
    }
    
    handleSkillClick(e) {
        const skill = e.target.textContent;
        this.emit('skill-click', { 
            skill, 
            category: this.category.title,
            element: e.target 
        });
        
        // Add click animation
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
    
    addHoverAnimation() {
        this.on('mouseenter', () => {
            this.addClass('hover');
        });
        
        this.on('mouseleave', () => {
            this.removeClass('hover');
        });
    }
    
    /**
     * Public API methods
     */
    
    addSkill(skill) {
        this.category.skills.push(skill);
        this.render();
        this.bindEvents();
        this.emit('skill-added', { skill, category: this.category.title });
    }
    
    removeSkill(skill) {
        const index = this.category.skills.indexOf(skill);
        if (index > -1) {
            this.category.skills.splice(index, 1);
            this.render();
            this.bindEvents();
            this.emit('skill-removed', { skill, category: this.category.title });
        }
    }
    
    getSkills() {
        return [...this.category.skills];
    }
    
    updateCategory(updates) {
        this.category = { ...this.category, ...updates };
        this.render();
        this.bindEvents();
        this.emit('category-updated', { category: this.category });
    }
}

/**
 * Skills Component  
 * Manages the skills section with skill categories
 */
class SkillsComponent extends BaseComponent {
    static get defaultOptions() {
        return {
            gridSelector: '.skills-categories-grid',
            categories: [],
            animateOnScroll: true,
            searchEnabled: false,
            filterEnabled: false
        };
    }
    
    init() {
        this.grid = this.find(this.options.gridSelector);
        this.categoryComponents = [];
        this.categories = this.options.categories.length > 0 ? this.options.categories : this.getDefaultCategories();
        
        super.init();
        
        if (this.options.animateOnScroll) {
            this.setupScrollAnimation();
        }
        
        if (this.options.searchEnabled) {
            this.setupSearch();
        }
    }
    
    bindEvents() {
        this.on('skill-click', this.handleSkillClick.bind(this));
        this.on('category-updated', this.handleCategoryUpdate.bind(this));
    }
    
    render() {
        if (!this.grid) return;
        
        // Clear existing content
        this.grid.innerHTML = '';
        this.categoryComponents = [];
        
        // Create skill category components
        this.categories.forEach((category, index) => {
            const categoryComponent = new SkillCategory(this.grid, {
                category,
                animateOnHover: true
            });
            
            this.categoryComponents.push(categoryComponent);
            
            // Forward category events
            categoryComponent.element.addEventListener('skill-click', (e) => {
                this.emit('skill-click', { category, index, ...e.detail });
            });
            
            categoryComponent.element.addEventListener('skill-added', (e) => {
                this.emit('skill-added', { category, index, ...e.detail });
            });
            
            categoryComponent.element.addEventListener('skill-removed', (e) => {
                this.emit('skill-removed', { category, index, ...e.detail });
            });
        });
    }
    
    getDefaultCategories() {
        return [
            {
                title: "Domains",
                skills: [
                    "Data science",
                    "Data analytics", 
                    "Data engineering",
                    "Developer relations",
                    "Product management",
                    "Technical writing"
                ]
            },
            {
                title: "Programming",
                skills: [
                    "Python",
                    "AI",
                    "Machine Learning",
                    "ETL/ELT",
                    "OOP",
                    "Linux terminal",
                    "TypeScript",
                    "R",
                    "Java",
                    "Lua"
                ]
            },
            {
                title: "Data platforms",
                skills: [
                    "Snowflake",
                    "Redshift",
                    "Databricks", 
                    "BigQuery",
                    "dbt"
                ]
            },
            {
                title: "Business intelligence",
                skills: [
                    "Excel",
                    "Looker",
                    "Tableau",
                    "Sigma",
                    "A/B testing"
                ]
            },
            {
                title: "Cloud",
                skills: [
                    "GCP",
                    "AWS",
                    "Azure",
                    "Git",
                    "GitHub",
                    "GitHub Actions",
                    "CI/CD",
                    "DevOps",
                    "DataOps"
                ]
            },
            {
                title: "Mathematics",
                skills: [
                    "Statistics",
                    "A/B Testing",
                    "Linear algebra",
                    "Time series"
                ]
            },
            {
                title: "Documentation",
                skills: [
                    "Jira",
                    "Confluence",
                    "Docusaurus",
                    "ReadMe"
                ]
            },
            {
                title: "Developer relations",
                skills: [
                    "Product management",
                    "UX design",
                    "Marketing",
                    "Content creation",
                    "Community building",
                    "Event planning",
                ]
            },
            {
                title: "Interests",
                skills: [
                    "Cooking & baking",
                    "Travel",
                    "Reading",
                    "Music",
                    "Podcasting",
                    "Voice acting",
                    "Audio engineering"
                ]
            }
        ];
    }
    
    handleSkillClick(e) {
        const { skill, category } = e.detail;
        console.log(`Skill clicked: ${skill} in ${category}`);
        
        // Could implement skill filtering or search here
        this.emit('skill-selected', { skill, category });
    }
    
    handleCategoryUpdate(e) {
        console.log('Category updated:', e.detail.category);
    }
    
    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        setTimeout(() => {
            this.categoryComponents.forEach(component => {
                component.element.classList.add('fade-in');
                observer.observe(component.element);
            });
        }, 100);
    }
    
    setupSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'skills-search';
        searchContainer.innerHTML = `
            <input type="text" placeholder="Search skills..." class="skills-search-input" />
            <button class="skills-search-clear" type="button">Clear</button>
        `;
        
        this.element.insertBefore(searchContainer, this.grid);
        
        const searchInput = searchContainer.querySelector('.skills-search-input');
        const clearButton = searchContainer.querySelector('.skills-search-clear');
        
        this.addEventListener(searchInput, 'input', this.handleSearch.bind(this));
        this.addEventListener(clearButton, 'click', this.clearSearch.bind(this));
    }
    
    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        
        this.categoryComponents.forEach(component => {
            const categoryMatches = component.category.title.toLowerCase().includes(query);
            const skillMatches = component.category.skills.some(skill => 
                skill.toLowerCase().includes(query)
            );
            
            if (query === '' || categoryMatches || skillMatches) {
                component.show();
                
                // Highlight matching skills
                const skillTags = component.findAll('.skill-tag');
                skillTags.forEach(tag => {
                    const skill = tag.textContent.toLowerCase();
                    if (query && skill.includes(query)) {
                        tag.classList.add('highlighted');
                    } else {
                        tag.classList.remove('highlighted');
                    }
                });
            } else {
                component.hide();
            }
        });
        
        this.emit('skills-search', { query });
    }
    
    clearSearch() {
        const searchInput = this.find('.skills-search-input');
        if (searchInput) {
            searchInput.value = '';
            this.handleSearch({ target: searchInput });
        }
    }
    
    /**
     * Public API methods
     */
    
    addCategory(category) {
        this.categories.push(category);
        this.render();
        this.emit('category-added', { category });
    }
    
    removeCategory(index) {
        if (index >= 0 && index < this.categories.length) {
            const removed = this.categories.splice(index, 1)[0];
            this.render();
            this.emit('category-removed', { category: removed, index });
        }
    }
    
    updateCategory(index, updates) {
        if (index >= 0 && index < this.categories.length) {
            this.categories[index] = { ...this.categories[index], ...updates };
            this.render();
            this.emit('category-updated', { category: this.categories[index], index });
        }
    }
    
    getCategories() {
        return [...this.categories];
    }
    
    getCategoryByTitle(title) {
        return this.categories.find(category => 
            category.title.toLowerCase() === title.toLowerCase()
        );
    }
    
    getAllSkills() {
        return this.categories.reduce((allSkills, category) => {
            return allSkills.concat(category.skills);
        }, []);
    }
    
    searchSkills(query) {
        const results = [];
        this.categories.forEach(category => {
            const matchingSkills = category.skills.filter(skill =>
                skill.toLowerCase().includes(query.toLowerCase())
            );
            if (matchingSkills.length > 0) {
                results.push({
                    category: category.title,
                    skills: matchingSkills
                });
            }
        });
        return results;
    }
    
    onInit() {
        this.render();
    }
}

export default SkillsComponent;

