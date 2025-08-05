// Experience Data
const ExperienceData = [
    {
        organization: "Ascend.io",
        role: "Founding Developer Relations Advocate",
        from_date: "March 2025",
        to_date: "Present",
        description:
          `● Wrote 100+ docs to launch a new documentation site, improving product readiness and onboarding
● Automated release notes pipeline with Python, AI, and GitHub Actions, reducing manual work by 90%
● Led GTM strategy with data evangelists and creators to drive launch awareness and team engagement`,

    },
    {
        organization: "Sigma Computing",
        role: "Data Analyst & Technical Support Engineer",
        from_date: "May 2024",
        to_date: "March 2025",
        description:
          `● Developed Snowflake SQL dashboard to identify improvement areas in customer satisfaction (CSAT)
● Led CSAT analysis to improve satisfaction scores while accommodating a 50% rise in chat volume
● Built data application to streamline billing updates across RevOps, Finance, and Sales organizations
● Wrote external documentation for embedding applications using TypeScript, APIs, and authentication
● Analyzed impact of CSAT on retention metrics to evaluate Support’s role in shaping customer strategy
● Collaborated cross-functionally with engineering and customer success to investigate the relationship between CSAT and retention metrics, driving actionable insights to improve customer retention
● Forecasted the impact of in-house AI tools on chat coverage to inform support workflow decisions
● Built a data application to replace PTO scheduling in ADP, streamlining workflows and enhancing data visibility
● Ensured 96% CSAT and <1 minute response time while consulting on data models and infrastructure`,

    },
    {
        organization: "Annalect | Client: Nissan",
        role: "Data Scientist",
        from_date: "January 2023",
        to_date: "May 2024",
        description:
          `● Achieved $750K savings by developing methodology to diagnose and QA discrepancies in CPM pricing
● Facilitated million-dollar marketing pitches through efficient data ETL, securing high-value contracts
● Leveraged logistic regression machine learning modeling to build custom Nissan marketing audiences
● Automated first-party Nissan sales data load using Python, achieving a 92% reduction in lead time
● Owned and leveraging B2B data with 250M rows in Redshift, delivering targeted marketing audiences
● Led Confluence documentation of new processes and maintenance of existing datasets and scripts
● Desiged Tableau dashboards to track MoM Nissan model market demographics and uncover insights
● Managed client expectations, translating business needs into data solutions that drive team decisions`,

    },
    {
        organization: "Crash Course: Code and Programming for Beginners",
        role: "Technical Script Writer",
        from_date: "November 2022",
        to_date: "November 2023",
        description:
          `● Authored 9 episodes of the <a href="https://www.youtube.com/watch?v=yBFu9HxiD88&list=PLID58IQe16nFgbHGRCj5QEXKUpVIilpDN&index=29" target="_blank" rel="noopener noreferrer">Crash Course series</a>, amassing 135K+ views and 10K+ hours of watch time on YouTube`,

    },
    {
        organization: "Torpedo Software LLC",
        role: "Educational Curriculum Designer",
        from_date: "January 2023",
        to_date: "Present",
        description:
          `● Designing curriculum and writing lessons for <a href="https://www.roblox.com/games/1334669864/Lua-Learning" target="_blank" rel="noopener noreferrer">Lua Learning</a>, an award-winning Roblox game with 7.7M+ visits and 115K monthly active users`,

    },
    {
        organization: "DataLemur.com",
        role: "Technical Writer & Product Manager",
        from_date: "August 2022",
        to_date: "January 2023",
        description:
          `● Supported author Nick Singh's data science platform and achieved 100K+ users within 10 months
● Documented, tested, and improved 200+ SQL and mathematics problems, solutions, and hints
● Instituted metadata tagging system and SQL style conventions to standardize the platform`,

    },
    {
        organization: "JPMorgan Chase & Co.",
        role: "AI & Data Science Summer Analyst",
        from_date: "June 2022",
        to_date: "August 2022",
        description:
          `● Leveraged XGBoost algorithm in Python to improve wallet estimation regression model by 94.1%
● Won 2022 Housing Affordability Challenge among 140 interns by implementing PCA and projecting HPI
● Conducted literature review to research machine learning methods and strategies for wallet estimation`,

    },
    {
        organization: "Prose",
        role: "Growth Data Analyst Intern",
        from_date: "January 2022",
        to_date: "May 2022",
        description:
          `● Built last-click attribution model in BigQuery to track $40M annual marketing spend across channels
● Automated Looker dashboard based on attribution model to report WoW and MoM channel metrics
● Tested gift products to determine their impact on customer churn and drive stakeholder decisions`,

    },
    {
        organization: "Podium Education",
        role: "Data Programming Team Lead",
        from_date: "May 2023",
        to_date: "August 2023",
        description:
          `● Facilitated classroom instruction to college students, teaching introductory SQL, Tableau, and Python for practical data science
● Graded weekly coding assignments and final projects for a diverse cohort of 60+ students, demonstrating strong organizational skills
● Provided personalized one-on-one guidance during office hours to address individual learning needs`,

    },
    {
        organization: "Cross River Bank",
        role: "Data Technology Analyst Intern",
        from_date: "June 2021",
        to_date: "August 2021",
        description:
          `● Created Capacity Planning Model to streamline project costing for the entire IT department
● Developed multinomial logistic regression model for loan classification in Python
● Presented accomplishments throughout summer internship to CEO and C-Level managers`,

    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeThemeToggle();
    initializeAnimations();
    initializeTopSkillsAnimation();

    initializeContactForm();
    initializeSmoothScrolling();
    initializeResumeDownload();
    initializeExperience();
    updateCopyrightYear();
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Named function for navbar background updates
    function updateNavbarBackground() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Navbar background on scroll
    window.addEventListener('scroll', updateNavbarBackground);
    
    // Make the function available globally so theme toggle can call it
    window.updateNavbarBackground = updateNavbarBackground;
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Update navbar background to match new theme
        if (window.updateNavbarBackground) {
            window.updateNavbarBackground();
        }
    });
}

function updateThemeIcon(theme, iconElement) {
    const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
        <path d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8l1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" stroke-width="2"/>
    </svg>`;
    const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
    </svg>`;
    iconElement.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger top skills animations when about section is visible
                if (entry.target.id === 'about') {
                    animateTopSkills();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll('section, .project-card, .value-item, .tech-item, .top-skill-item');
    elementsToObserve.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Top skills animation
function initializeTopSkillsAnimation() {
    const topSkillsItems = document.querySelectorAll('.top-skill-item');
    
    // Reset initial state
    topSkillsItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
}

function animateTopSkills() {
    const topSkillsItems = document.querySelectorAll('.top-skill-item');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    topSkillsItems.forEach((item, index) => {
        // Instant appearance without transitions
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'none';
    });
}



// Contact form functionality
// Contact form functionality - Updated for icon-only layout
function initializeContactForm() {
    // Contact form has been removed in favor of direct contact icons
    // Add any analytics tracking for icon clicks if needed
    const contactIcons = document.querySelectorAll('.contact-icon-link');
    
    contactIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Optional: Track contact method usage
            const href = this.getAttribute('href');
            console.log('Contact method used:', href);
            
            // Add subtle click animation
            this.style.transform = 'translateY(-3px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    const getBackgroundColor = (type) => {
        switch(type) {
            case 'success': return '#10b981;';
            case 'error': return '#ef4444;';
            case 'info': return '#3b82f6;';
            default: return '#6b7280;';
        }
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        background: ${getBackgroundColor(type)}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Typing animation for hero section
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Particle animation for background (optional)
function createParticleAnimation() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Alt + number keys for section navigation
        if (e.altKey) {
            const sectionMap = {
                '1': 'home',
                '2': 'about',
                '3': 'experience',
                '4': 'projects',
                '5': 'skills',
                '6': 'connect'
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
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenu = document.getElementById('nav-menu');
            
            if (navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Optional features
    optimizeImages();
    initializeKeyboardNavigation();
    
    // Initialize particle animation if performance allows
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        createParticleAnimation();
    }
});

// Accessibility improvements
function improveAccessibility() {
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You could implement error reporting here
});

// Resume download functionality
function initializeResumeDownload() {
    const resumeButton = document.getElementById('resume-download');
    
    if (resumeButton) {
        resumeButton.addEventListener('click', function(e) {
            e.preventDefault();
            downloadResumeFromGoogleDrive();
        });
    }
}

function downloadResumeFromGoogleDrive() {
    // Google Drive sharing URL
    const googleDriveShareUrl = 'https://docs.google.com/document/d/1KBnF9S5ot0XMx3fBoncZMl690q3BDPhMZGImKiMNIPQ/edit?usp=sharing';
    
    // Extract the file ID from the Google Drive URL
    const fileId = extractGoogleDriveFileId(googleDriveShareUrl);
    
    if (fileId) {
        // Convert to direct download URL for PDF export
        const downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
        
        // Show loading notification
        showNotification('Preparing resume download...', 'info');
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Shifra_Williams_Resume.pdf';
        link.target = '_blank';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success notification after a brief delay
        setTimeout(() => {
            showNotification('Resume download started!', 'success');
        }, 1000);
    } else {
        showNotification('Error: Unable to process resume download.', 'error');
    }
}

function extractGoogleDriveFileId(url) {
    // Extract file ID from various Google Drive URL formats
    const patterns = [
        /\/document\/d\/([a-zA-Z0-9-_]+)/,
        /id=([a-zA-Z0-9-_]+)/,
        /\/file\/d\/([a-zA-Z0-9-_]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    
    return null;
}

// Dynamic copyright year update
function updateCopyrightYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

// Experience section functionality
function initializeExperience() {
    generateExperienceCards();
    setupExperienceInteractions();
}

function generateExperienceCards() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    
    const experienceHTML = ExperienceData.map((exp, index) => `
        <div class="experience-card" data-index="${index}" role="button" tabindex="0" 
             aria-expanded="false" aria-controls="exp-content-${index}">
            <div class="experience-header">
                <div class="experience-meta">
                    <div class="experience-title">
                        <h3>${exp.organization}</h3>
                        <h4>${exp.role}</h4>
                    </div>
                    <div class="experience-dates">
                        <span class="date-full">${exp.from_date} - ${exp.to_date}</span>
                        <span class="date-mobile">${formatDateForMobile(exp.from_date)} - ${formatDateForMobile(exp.to_date)}</span>
                    </div>
                </div>
                <div class="expand-indicator">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 2L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="experience-content" id="exp-content-${index}">
                <div class="experience-description">${exp.description}</div>
            </div>
        </div>
    `).join('');
    
    timeline.innerHTML = experienceHTML;
}

function formatDateForMobile(dateString) {
    // Convert long month names to short abbreviations for mobile
    const monthMap = {
        'January': 'Jan',
        'February': 'Feb',
        'March': 'Mar',
        'April': 'Apr',
        'May': 'May',
        'June': 'Jun',
        'July': 'Jul',
        'August': 'Aug',
        'September': 'Sep',
        'October': 'Oct',
        'November': 'Nov',
        'December': 'Dec'
    };
    
    let formatted = dateString;
    for (const [full, short] of Object.entries(monthMap)) {
        formatted = formatted.replace(full, short);
    }
    
    return formatted;
}

function setupExperienceInteractions() {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach(card => {
        card.addEventListener('click', toggleExperienceCard);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleExperienceCard.call(card, e);
            }
        });
    });
}

function toggleExperienceCard() {
    const card = this;
    const isExpanded = card.classList.contains('expanded');
    
    // Optional: Close other cards (accordion behavior)
    // document.querySelectorAll('.experience-card.expanded').forEach(otherCard => {
    //     if (otherCard !== card) {
    //         otherCard.classList.remove('expanded');
    //         otherCard.setAttribute('aria-expanded', 'false');
    //     }
    // });
    
    // Toggle current card
    card.classList.toggle('expanded');
    card.setAttribute('aria-expanded', !isExpanded);
}

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}