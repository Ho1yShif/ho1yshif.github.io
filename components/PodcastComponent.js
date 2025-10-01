import BaseComponent from './BaseComponent.js';
import CardComponent from './CardComponent.js';

/**
 * Episode Card Component
 * Specialized card for podcast episodes
 */
class EpisodeCard extends CardComponent {
    getTemplate() {
        const { title, description, image, links = [] } = this.data;
        
        return `
            <div class="episode-image">
                <img src="${image}" alt="${title} episode thumbnail" />
            </div>
            <div class="episode-content">
                <h5 class="episode-title">${title}</h5>
                <p class="episode-description">${description}</p>
                <div class="episode-links">
                    ${links.map(link => `
                        <a href="${link.url}" class="episode-link ${link.platform}" target="_blank" rel="noopener noreferrer">
                            ${this.getPlatformIcon(link.platform)}
                            ${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    getPlatformIcon(platform) {
        const icons = {
            youtube: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>`,
            spotify: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>`
        };
        
        return icons[platform] || '';
    }
    
    getCardClasses() {
        return 'episode-card';
    }
}

/**
 * Platform Link Component
 * Individual platform link component
 */
class PlatformLink extends BaseComponent {
    constructor(element, options = {}) {
        super(element, options);
        this.platform = options.platform;
        this.url = options.url;
    }
    
    static get defaultOptions() {
        return {
            trackClicks: true
        };
    }
    
    bindEvents() {
        this.on('click', this.handleClick.bind(this));
    }
    
    handleClick(e) {
        if (this.options.trackClicks) {
            this.emit('platform-click', { 
                platform: this.platform, 
                url: this.url 
            });
        }
    }
}

/**
 * Podcast Component
 * Manages the podcast section with episode cards and platform links
 */
class PodcastComponent extends BaseComponent {
    static get defaultOptions() {
        return {
            episodesGridSelector: '.episodes-grid',
            platformLinksSelector: '.platform-links',
            supportLinksSelector: '.support-links',
            episodes: [],
            platforms: [],
            supportOptions: [],
            animateOnScroll: true
        };
    }
    
    init() {
        this.episodesGrid = this.find(this.options.episodesGridSelector);
        this.platformLinks = this.find(this.options.platformLinksSelector);
        this.supportLinks = this.find(this.options.supportLinksSelector);
        
        this.episodeCards = [];
        this.platformComponents = [];
        this.supportComponents = [];
        
        this.episodes = this.options.episodes.length > 0 ? this.options.episodes : this.getDefaultEpisodes();
        this.platforms = this.options.platforms.length > 0 ? this.options.platforms : this.getDefaultPlatforms();
        this.supportOptions = this.options.supportOptions.length > 0 ? this.options.supportOptions : this.getDefaultSupportOptions();
        
        super.init();
        
        if (this.options.animateOnScroll) {
            this.setupScrollAnimation();
        }
    }
    
    bindEvents() {
        this.on('card-click', this.handleEpisodeClick.bind(this));
        this.on('card-link-click', this.handleEpisodeLinkClick.bind(this));
        this.on('platform-click', this.handlePlatformClick.bind(this));
    }
    
    render() {
        this.renderEpisodes();
        this.renderPlatformLinks();
        this.renderSupportLinks();
    }
    
    renderEpisodes() {
        if (!this.episodesGrid) return;
        
        this.episodesGrid.innerHTML = '';
        this.episodeCards = [];
        
        this.episodes.forEach((episode, index) => {
            const cardContainer = document.createElement('div');
            const episodeCard = new EpisodeCard(cardContainer, {
                data: episode,
                clickable: true,
                animateOnHover: true
            });
            
            this.episodeCards.push(episodeCard);
            this.episodesGrid.appendChild(cardContainer);
            
            // Forward card events
            episodeCard.element.addEventListener('card-click', (e) => {
                this.emit('episode-click', { episode, index, ...e.detail });
            });
            
            episodeCard.element.addEventListener('card-link-click', (e) => {
                this.emit('episode-link-click', { episode, index, ...e.detail });
            });
        });
    }
    
    renderPlatformLinks() {
        if (!this.platformLinks) return;
        
        this.platformLinks.innerHTML = '';
        this.platformComponents = [];
        
        this.platforms.forEach(platform => {
            const linkElement = document.createElement('a');
            linkElement.href = platform.url;
            linkElement.className = `platform-link ${platform.name}`;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.innerHTML = `
                ${this.getPlatformIcon(platform.name)}
                ${platform.displayName}
            `;
            
            const platformComponent = new PlatformLink(linkElement, {
                platform: platform.name,
                url: platform.url
            });
            
            this.platformComponents.push(platformComponent);
            this.platformLinks.appendChild(linkElement);
            
            // Forward platform events
            platformComponent.element.addEventListener('platform-click', (e) => {
                this.emit('platform-click', { platform: platform.name, ...e.detail });
            });
        });
    }
    
    renderSupportLinks() {
        if (!this.supportLinks) return;
        
        this.supportLinks.innerHTML = '';
        this.supportComponents = [];
        
        this.supportOptions.forEach(support => {
            const linkElement = document.createElement('a');
            linkElement.href = support.url;
            linkElement.className = `support-btn ${support.name}`;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.innerHTML = `
                <img src="${support.icon}" alt="${support.displayName}" width="${support.iconWidth || 20}" height="${support.iconHeight || 20}" />
                ${support.displayName}
            `;
            
            const supportComponent = new PlatformLink(linkElement, {
                platform: support.name,
                url: support.url
            });
            
            this.supportComponents.push(supportComponent);
            this.supportLinks.appendChild(linkElement);
        });
    }
    
    getPlatformIcon(platform) {
        const icons = {
            spotify: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>`,
            youtube: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>`,
            website: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>
                <path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
            </svg>`
        };
        
        return icons[platform] || '';
    }
    
    getDefaultEpisodes() {
        return [
            {
                title: "Day in the life of a data engineer",
                description: "Join hosts Sam and Shifra as they explore the realities of data roles. Sam discusses a day in the life of a data engineer. From the glamorous perceptions to the day-to-day challenges, they discuss the skills, stakeholders, and the importance of understanding the \"why\" behind data projects.",
                image: "assets/images/episodes/ditl-data-eng.png",
                links: [
                    { platform: "youtube", url: "https://www.youtube.com/watch?v=HI0jUmXiEgQ" },
                    { platform: "spotify", url: "https://open.spotify.com/episode/5zxJxAz57GOWCqieeiuZzf?si=6a094e38dec3408f" }
                ]
            },
            {
                title: "Data interviews: The good, the bad, and the hilarious",
                description: "If we didn't get the job, at least we got a story out of it! Join Sam and Shifra as they break down the most popular interview questions, the wildest interview stories, and the benefits of the Zumba council. Maybe the real interviews were the friends we made along the way?",
                image: "assets/images/episodes/interviews-2.png",
                links: [
                    { platform: "youtube", url: "https://youtu.be/_EB-kWDrjtM?si=PyleFbgITf8u9dS6" },
                    { platform: "spotify", url: "https://open.spotify.com/episode/6q8cO5iCVqc3X279SY2fyQ?si=4da281179e484786" }
                ]
            },
            {
                title: "Unlocking opportunities: the power of LinkedIn networking with Sai Bysani",
                description: "Sai Bysani shares the LinkedIn strategy that transformed his career. Learn practical tips for content creation, comment strategies, and why starting where you are beats waiting for perfection.",
                image: "assets/images/episodes/sai.png",
                links: [
                    { platform: "youtube", url: "https://www.youtube.com/watch?v=Xt559oTBuMk" },
                    { platform: "spotify", url: "https://open.spotify.com/episode/1TxKPQNad3KX26RdF8aZtd?si=b9a5999af7c54f3b" }
                ]
            }
        ];
    }
    
    getDefaultPlatforms() {
        return [
            {
                name: "spotify",
                displayName: "Spotify",
                url: "https://open.spotify.com/episode/59Ji4HMwEV4CzxkOvACQgX?si=ad9f91b9cd4e448e"
            },
            {
                name: "youtube", 
                displayName: "YouTube",
                url: "https://www.youtube.com/@SaturdataPod"
            },
            {
                name: "website",
                displayName: "Website", 
                url: "https://saturdata.github.io"
            }
        ];
    }
    
    getDefaultSupportOptions() {
        return [
            {
                name: "coffee",
                displayName: "Buy me a coffee", 
                url: "https://buymeacoffee.com/saturdatapod",
                icon: "assets/images/coffee.png",
                iconWidth: 15,
                iconHeight: 20
            }
        ];
    }
    
    handleEpisodeClick(e) {
        const { episode } = e.detail;
        console.log('Episode clicked:', episode);
        
        // Default behavior - click first link
        if (episode.links && episode.links.length > 0) {
            window.open(episode.links[0].url, '_blank', 'noopener,noreferrer');
        }
    }
    
    handleEpisodeLinkClick(e) {
        console.log('Episode link clicked:', e.detail.href);
    }
    
    handlePlatformClick(e) {
        console.log('Platform clicked:', e.detail.platform);
    }
    
    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        setTimeout(() => {
            this.episodeCards.forEach(card => {
                card.element.classList.add('fade-in');
                observer.observe(card.element);
            });
        }, 100);
    }
    
    /**
     * Public API methods
     */
    
    addEpisode(episode) {
        this.episodes.unshift(episode); // Add to beginning
        this.renderEpisodes();
        this.emit('episode-added', { episode });
    }
    
    removeEpisode(index) {
        if (index >= 0 && index < this.episodes.length) {
            const removed = this.episodes.splice(index, 1)[0];
            this.renderEpisodes();
            this.emit('episode-removed', { episode: removed, index });
        }
    }
    
    getEpisodes() {
        return [...this.episodes];
    }
    
    getPlatforms() {
        return [...this.platforms];
    }
    
    onInit() {
        this.render();
    }
}

export default PodcastComponent;

