import BaseComponent from './BaseComponent.js';
import CardComponent from './CardComponent.js';

/**
 * Speaking Card Component
 * Specialized card for speaking engagements
 */
class SpeakingCard extends CardComponent {
    getTemplate() {
        const { title, role, organization, description, badge, link, featured } = this.data;
        
        return `
            <div class="speaking-header">
                ${badge ? `<div class="speaking-badge ${badge.type}">${badge.text}</div>` : ''}
                <h3 class="speaking-title">${title}</h3>
                <p class="speaking-role">${role}</p>
                <p class="speaking-organization">${organization}</p>
            </div>
            <div class="speaking-content">
                <p class="speaking-description">${description}</p>
                ${link ? `<a href="${link.url}" class="speaking-link" target="_blank" rel="noopener noreferrer">${link.text}</a>` : ''}
            </div>
        `;
    }
    
    getCardClasses() {
        const classes = ['speaking-card'];
        if (this.data.featured) classes.push('featured');
        return classes.join(' ');
    }
}

/**
 * Speaking Component
 * Manages the speaking engagements section
 */
class SpeakingComponent extends BaseComponent {
    static get defaultOptions() {
        return {
            gridSelector: '.speaking-grid',
            engagements: [],
            animateOnScroll: true,
            groupByType: false
        };
    }
    
    init() {
        this.grid = this.find(this.options.gridSelector);
        this.speakingCards = [];
        this.engagements = this.options.engagements.length > 0 ? this.options.engagements : this.getDefaultEngagements();
        
        super.init();
        
        if (this.options.animateOnScroll) {
            this.setupScrollAnimation();
        }
    }
    
    bindEvents() {
        this.on('card-click', this.handleEngagementClick.bind(this));
        this.on('card-link-click', this.handleEngagementLinkClick.bind(this));
    }
    
    render() {
        if (!this.grid) return;
        
        // Clear existing content
        this.grid.innerHTML = '';
        this.speakingCards = [];
        
        // Group by type if enabled
        const engagementsToRender = this.options.groupByType 
            ? this.groupEngagementsByType() 
            : this.engagements;
        
        // Create speaking cards
        engagementsToRender.forEach((engagement, index) => {
            const cardContainer = document.createElement('div');
            const speakingCard = new SpeakingCard(cardContainer, {
                data: engagement,
                clickable: !!engagement.link,
                animateOnHover: true
            });
            
            this.speakingCards.push(speakingCard);
            this.grid.appendChild(cardContainer);
            
            // Forward card events
            speakingCard.element.addEventListener('card-click', (e) => {
                this.emit('engagement-click', { engagement, index, ...e.detail });
            });
            
            speakingCard.element.addEventListener('card-link-click', (e) => {
                this.emit('engagement-link-click', { engagement, index, ...e.detail });
            });
        });
    }
    
    getDefaultEngagements() {
        return [
            {
                title: "AI in Finance Forum",
                role: "Featured speaker",
                organization: "CFO Leadership",
                description: "Fireside chat exploring the role of the CFO as an AI leader—someone who doesn't need to build models but does need to lead transformation. Attendees gain clarity on building credibility, spotting opportunities, and bringing their teams along for the AI journey.",
                badge: { text: "Finance", type: "finance" },
                featured: true,
                category: "conference"
            },
            {
                title: "Women in Data Boston",
                role: "Featured speaker", 
                organization: "Sigma Computing & Women in Data community",
                description: "Delivered keynote on data leadership and women in tech, resulting in all data leader prospects moving forward in the marketing funnel.",
                badge: { text: "DEI", type: "diversity" },
                category: "conference"
            },
            {
                title: "Data Science for Finance Professionals",
                role: "Podcast guest",
                organization: "FP&A Today",
                description: "Explored how data science transforms financial analysis and strategic decision-making, highlighting practical applications and the critical role of data-driven insights in modern corporate finance.",
                badge: { text: "Podcast", type: "podcast" },
                link: { text: "Listen", url: "https://www.youtube.com/watch?v=lWFpcwcSmQg&themeRefresh=1" },
                category: "podcast"
            },
            {
                title: "How to Pivot to a Career in Tech",
                role: "Podcast guest",
                organization: "Ready Set Do", 
                description: "Shared the journey from music to data and how to pivot to a career in tech in general, emphasizing the importance of practical applications and identifying the most impactful skills to learn.",
                badge: { text: "Podcast", type: "podcast" },
                link: { text: "Listen", url: "https://readysetdo.xyz/episodes/how-to-pivot-to-a-career-in-te" },
                category: "podcast"
            },
            {
                title: "Mastering Science Communication",
                role: "Science communicator",
                organization: "Midwest Big Data Hub",
                description: "Shared insider tips and strategies for effective science communication, focusing on translating complex technical concepts for diverse audiences.",
                badge: { text: "Education", type: "education" },
                category: "workshop"
            },
            {
                title: "Computer Science Career Pathways",
                role: "Industry panelist",
                organization: "Carlmont High School",
                description: "Participated in career panel for AP Computer Science students alongside Meta engineers, sharing insights on industry pathways, daily responsibilities in tech roles, and practical advice for transitioning from academics to professional software development.",
                badge: { text: "Education", type: "education" },
                category: "panel"
            },
            {
                title: "CS Education & AP Exam Success",
                role: "Educational advisor",
                organization: "Bay Area Computer Science Council",
                description: "Delivered comprehensive workshop on computer science education pathways and AP exam preparation strategies, providing Bay Area students with practical study techniques, career guidance, and industry insights to maximize academic and professional success.",
                badge: { text: "Education", type: "education" },
                category: "workshop"
            }
        ];
    }
    
    groupEngagementsByType() {
        const grouped = this.engagements.reduce((acc, engagement) => {
            const type = engagement.category || 'other';
            if (!acc[type]) acc[type] = [];
            acc[type].push(engagement);
            return acc;
        }, {});
        
        // Flatten back to array with type headers
        const result = [];
        Object.entries(grouped).forEach(([type, engagements]) => {
            result.push({ type: 'header', title: type.charAt(0).toUpperCase() + type.slice(1) });
            result.push(...engagements);
        });
        
        return result;
    }
    
    handleEngagementClick(e) {
        const { engagement } = e.detail;
        console.log('Speaking engagement clicked:', engagement);
        
        // Default behavior - navigate to link if available
        if (engagement.link) {
            window.open(engagement.link.url, '_blank', 'noopener,noreferrer');
        }
    }
    
    handleEngagementLinkClick(e) {
        console.log('Speaking engagement link clicked:', e.detail.href);
        // Add analytics tracking here if needed
    }
    
    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        setTimeout(() => {
            this.speakingCards.forEach(card => {
                card.element.classList.add('fade-in');
                observer.observe(card.element);
            });
        }, 100);
    }
    
    /**
     * Public API methods
     */
    
    addEngagement(engagement) {
        this.engagements.push(engagement);
        this.render();
        this.emit('engagement-added', { engagement });
    }
    
    removeEngagement(index) {
        if (index >= 0 && index < this.engagements.length) {
            const removed = this.engagements.splice(index, 1)[0];
            this.render();
            this.emit('engagement-removed', { engagement: removed, index });
        }
    }
    
    updateEngagement(index, updates) {
        if (index >= 0 && index < this.engagements.length) {
            this.engagements[index] = { ...this.engagements[index], ...updates };
            this.render();
            this.emit('engagement-updated', { engagement: this.engagements[index], index });
        }
    }
    
    filterEngagements(filterFn) {
        const filteredEngagements = this.engagements.filter(filterFn);
        
        const originalEngagements = this.engagements;
        this.engagements = filteredEngagements;
        this.render();
        this.engagements = originalEngagements;
        
        this.emit('engagements-filtered', { filteredEngagements });
    }
    
    getEngagements() {
        return [...this.engagements];
    }
    
    getEngagementsByCategory(category) {
        return this.engagements.filter(engagement => engagement.category === category);
    }
    
    getFeaturedEngagements() {
        return this.engagements.filter(engagement => engagement.featured);
    }
    
    onInit() {
        this.render();
    }
}

export default SpeakingComponent;
