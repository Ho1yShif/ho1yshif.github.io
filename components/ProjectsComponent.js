import BaseComponent from './BaseComponent.js';
import CardComponent from './CardComponent.js';

/**
 * Project Card Component
 * Specialized card for project display
 */
class ProjectCard extends CardComponent {
    getTemplate() {
        const { title, description, image, links = [] } = this.data;
        
        return `
            <div class="project-image">
                <img src="${image}" alt="${title}" />
                <div class="project-overlay">
                    <div class="project-links">
                        ${links.map(link => 
                            `<a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">${link.text}</a>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${title}</h3>
                <p class="project-description">${description}</p>
            </div>
        `;
    }
    
    getCardClasses() {
        return 'project-card';
    }
}

/**
 * Projects Component
 * Manages the projects section with dynamic project cards
 */
class ProjectsComponent extends BaseComponent {
    static get defaultOptions() {
        return {
            gridSelector: '.projects-grid',
            projects: [],
            animateOnScroll: true,
            filterEnabled: false,
            sortEnabled: false
        };
    }
    
    init() {
        this.grid = this.find(this.options.gridSelector);
        this.projectCards = [];
        this.projects = this.options.projects.length > 0 ? this.options.projects : this.getDefaultProjects();
        
        super.init();
        
        if (this.options.animateOnScroll) {
            this.setupScrollAnimation();
        }
    }
    
    bindEvents() {
        // Listen for project card events
        this.on('card-click', this.handleProjectClick.bind(this));
        this.on('card-link-click', this.handleProjectLinkClick.bind(this));
    }
    
    render() {
        if (!this.grid) return;
        
        // Clear existing content
        this.grid.innerHTML = '';
        this.projectCards = [];
        
        // Create project cards
        this.projects.forEach((project, index) => {
            const cardContainer = document.createElement('div');
            const projectCard = new ProjectCard(cardContainer, {
                data: project,
                clickable: true,
                animateOnHover: true
            });
            
            this.projectCards.push(projectCard);
            this.grid.appendChild(cardContainer);
            
            // Forward card events
            projectCard.element.addEventListener('card-click', (e) => {
                this.emit('project-click', { project, index, ...e.detail });
            });
            
            projectCard.element.addEventListener('card-link-click', (e) => {
                this.emit('project-link-click', { project, index, ...e.detail });
            });
        });
    }
    
    getDefaultProjects() {
        return [
            {
                title: "Crash Course: Code and Programming for Beginners",
                description: "Educational video series teaching Java programming with 180K+ views, making complex programming concepts accessible to a broad audience.",
                image: "assets/images/oop-thumbnail.jpeg",
                links: [
                    { text: "Watch", url: "https://www.youtube.com/watch?v=yBFu9HxiD88&list=PLID58IQe16nFgbHGRCj5QEXKUpVIilpDN&index=28" }
                ],
                category: "education",
                featured: true
            },
            {
                title: "DataLemur",
                description: "SQL & data analytics interview practice and preparation platform for the data community.",
                image: "assets/images/datalemur.webp",
                links: [
                    { text: "Visit", url: "https://datalemur.com" }
                ],
                category: "platform"
            },
            {
                title: "Classification of Fall Out Boy Eras",
                description: "Academic research project applying machine learning techniques to classify different musical eras of Fall Out Boy, published in Rutgers academic journal.",
                image: "assets/images/fob.jpg",
                links: [
                    { text: "GitHub", url: "https://github.com/Ho1yShif/FOB_LR_public" },
                    { text: "Publication", url: "https://arestyrurj.libraries.rutgers.edu/index.php/arestyrurj/article/view/232" }
                ],
                category: "research"
            },
            {
                title: "Lua Learning",
                description: "Interactive educational game teaching Lua programming concepts, reaching 8.4M+ visits and helping developers learn programming fundamentals.",
                image: "assets/images/lua-learning.webp",
                links: [
                    { text: "Play", url: "https://www.roblox.com/games/1334669864/Lua-Learning" }
                ],
                category: "game"
            },
            {
                title: "Shakespeare GPT",
                description: "AI language model trained on Shakespeare's works to generate text in Shakespearean style, demonstrating natural language processing capabilities.",
                image: "assets/images/shakespeare.webp",
                links: [
                    { text: "GitHub", url: "https://github.com/Ho1yShif/nanogpt" }
                ],
                category: "ai"
            },
            {
                title: "New Jersey Flood Prediction",
                description: "Predictive model for flood risk assessment in New Jersey using historical weather data and geographic information systems.",
                image: "assets/images/flood-nj.jpeg",
                links: [
                    { text: "GitHub", url: "https://github.com/Ho1yShif/cgi_flood_prediction_mitigation" }
                ],
                category: "prediction"
            }
        ];
    }
    
    handleProjectClick(e) {
        console.log('Project clicked:', e.detail.project);
        // Add analytics tracking here if needed
    }
    
    handleProjectLinkClick(e) {
        console.log('Project link clicked:', e.detail.href);
        // Add analytics tracking here if needed
    }
    
    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe project cards after render
        setTimeout(() => {
            this.projectCards.forEach(card => {
                card.element.classList.add('fade-in');
                observer.observe(card.element);
            });
        }, 100);
    }
    
    /**
     * Public API methods
     */
    
    addProject(project) {
        this.projects.push(project);
        this.render();
        this.emit('project-added', { project });
    }
    
    removeProject(index) {
        if (index >= 0 && index < this.projects.length) {
            const removed = this.projects.splice(index, 1)[0];
            this.render();
            this.emit('project-removed', { project: removed, index });
        }
    }
    
    updateProject(index, updates) {
        if (index >= 0 && index < this.projects.length) {
            this.projects[index] = { ...this.projects[index], ...updates };
            this.render();
            this.emit('project-updated', { project: this.projects[index], index });
        }
    }
    
    filterProjects(filterFn) {
        const filteredProjects = this.projects.filter(filterFn);
        
        // Temporarily update projects for display
        const originalProjects = this.projects;
        this.projects = filteredProjects;
        this.render();
        this.projects = originalProjects;
        
        this.emit('projects-filtered', { filteredProjects });
    }
    
    getProjects() {
        return [...this.projects];
    }
    
    getProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category);
    }
    
    onInit() {
        this.render();
    }
}

export default ProjectsComponent;

