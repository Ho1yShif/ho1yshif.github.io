// Experience data is now loaded from experience-data.js

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeSidebar();
    initializeIDETabs();
    initializeMobileSidebar();
    initializeScrollObserver();
    initializeAnimations();
    initializeResumeDownload();
    initializeExperience();
    initializeKeyboardNavigation();
    initializeTypingEffect();
}

// ===== SIDEBAR =====
function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll('.tree-child[data-section]');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            setActiveSidebarItem(sectionId);
            setActiveTab(sectionId);

            // Close sidebar on mobile
            if (window.innerWidth < 1024) {
                closeMobileSidebar();
            }
        });
    });
}

function setActiveSidebarItem(sectionId) {
    document.querySelectorAll('.tree-child').forEach(item => {
        item.classList.remove('active');
    });
    const active = document.querySelector(`.tree-child[data-section="${sectionId}"]`);
    if (active) active.classList.add('active');
}

// ===== FOLDER TOGGLE =====
function toggleFolder(folderId) {
    const children = document.getElementById(folderId);
    if (!children) return;

    const chevronId = folderId.replace('-folder', '-chevron');
    const chevron = document.getElementById(chevronId);

    children.classList.toggle('open');
    if (chevron) {
        chevron.classList.toggle('open');
    }
}

// ===== TAB BAR =====
function initializeIDETabs() {
    const tabs = document.querySelectorAll('.ide-tab[data-section]');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            setActiveTab(sectionId);
            setActiveSidebarItem(sectionId);
        });
    });
}

function setActiveTab(sectionId) {
    document.querySelectorAll('.ide-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const active = document.querySelector(`.ide-tab[data-section="${sectionId}"]`);
    if (active) {
        active.classList.add('active');
        // Scroll tab into view in the tab bar
        active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
}

// ===== SCROLL TO SECTION =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const content = document.getElementById('main-content');
    if (section && content) {
        const offsetTop = section.offsetTop;
        content.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

// ===== INTERSECTION OBSERVER (sync active state on scroll) =====
function initializeScrollObserver() {
    const content = document.getElementById('main-content');
    if (!content) return;

    const sections = document.querySelectorAll('section[id]');
    const sectionIds = Array.from(sections).map(s => s.id);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (id && sectionIds.includes(id)) {
                        setActiveSidebarItem(id);
                        setActiveTab(id);

                        // Update mobile header title
                        const mobileTitle = document.querySelector('.mobile-header-title');
                        if (mobileTitle) {
                            mobileTitle.textContent = `shifra_db / ${id}.sql`;
                        }
                    }
                }
            });
        },
        {
            root: content,
            threshold: 0.35,
        }
    );

    sections.forEach(section => observer.observe(section));
}

// ===== MOBILE SIDEBAR =====
function initializeMobileSidebar() {
    const hamburger = document.getElementById('mobile-hamburger');
    const sidebar = document.getElementById('ide-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (sidebar.classList.contains('open')) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            closeMobileSidebar();
        });
    }
}

function openMobileSidebar() {
    const sidebar = document.getElementById('ide-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('ide-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
        root: document.getElementById('main-content'),
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.value-item, .episode-card, .experience-card');
    elementsToObserve.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const el = document.getElementById('typed-role');
    if (!el) return;

    const roles = ['DevRel', 'Data Scientist', 'Technical Writer', 'Educator'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 80;
    const deleteSpeed = 45;
    const pauseAfterType = 1800;
    const pauseAfterDelete = 400;

    function tick() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            el.textContent = currentRole.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(tick, pauseAfterType);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            el.textContent = currentRole.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(tick, pauseAfterDelete);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    tick();
}

// ===== NOTIFICATION =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;

    const colors = {
        success: '#23bb7d',
        error:   '#c93200',
        info:    '#1f2227'
    };

    const textColors = {
        success: '#060709',
        error:   '#dadee5',
        info:    '#dadee5'
    };

    notification.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        padding: 0.75rem 1.25rem;
        border-radius: 0.375rem;
        color: ${textColors[type] || textColors.info};
        font-weight: 600;
        z-index: 10000;
        max-width: 360px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        background: ${colors[type] || colors.info};
        border: 1px solid #1f2227;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 50);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== KEYBOARD NAVIGATION =====
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            const sectionMap = {
                '1': 'home',
                '2': 'about',
                '3': 'experience',
                '4': 'projects',
                '5': 'speaking',
                '6': 'skills',
            };
            const sectionId = sectionMap[e.key];
            if (sectionId) {
                e.preventDefault();
                scrollToSection(sectionId);
                setActiveSidebarItem(sectionId);
                setActiveTab(sectionId);
            }
        }

        if (e.key === 'Escape') {
            closeMobileSidebar();
        }
    });
}

// ===== RESUME DOWNLOAD =====
function initializeResumeDownload() {
    ['resume-download', 'sidebar-resume-download'].forEach(function(id) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                downloadResumeFromGoogleDrive();
            });
        }
    });
}

function downloadResumeFromGoogleDrive() {
    const googleDriveShareUrl = 'https://docs.google.com/document/d/1KBnF9S5ot0XMx3fBoncZMl690q3BDPhMZGImKiMNIPQ/edit?usp=sharing';
    const fileId = extractGoogleDriveFileId(googleDriveShareUrl);

    if (fileId) {
        const downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
        showNotification('Preparing resume download...', 'info');

        fetch(downloadUrl)
            .then(response => {
                if (!response.ok) throw new Error('Download failed');
                return response.blob();
            })
            .then(blob => {
                const objectUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = objectUrl;
                link.download = 'Shifra_Williams_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(objectUrl);
                showNotification('Resume download started!', 'success');
            })
            .catch(() => {
                showNotification('Error: Unable to download resume.', 'error');
            });
    } else {
        showNotification('Error: Unable to process resume download.', 'error');
    }
}

function extractGoogleDriveFileId(url) {
    const patterns = [
        /\/document\/d\/([a-zA-Z0-9-_]+)/,
        /id=([a-zA-Z0-9-_]+)/,
        /\/file\/d\/([a-zA-Z0-9-_]+)/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

// ===== EXPERIENCE SECTION =====
function initializeExperience() {
    generateExperienceCards();
    setupExperienceInteractions();
    setupExperienceResizeHandler();
}

function generateExperienceCards() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    const experienceHTML = ExperienceData.map((exp, index) => `
        <div class="experience-card${exp.logo ? ' has-logo' : ''}" data-index="${index}" role="button" tabindex="0"
             aria-expanded="false" aria-controls="exp-content-${index}">
            ${exp.logo ? `<img src="${exp.logo}" class="experience-logo" alt="${exp.organization} logo">` : ''}
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
            </div>
            <div class="experience-content" id="exp-content-${index}">
                <div class="experience-description">${exp.description.split('\n').map(line => `<div class="experience-bullet">${line}</div>`).join('')}</div>
            </div>
        </div>
    `).join('');

    timeline.innerHTML = experienceHTML;
}

function formatDateForMobile(dateString) {
    const monthMap = {
        'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
        'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
        'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
    };
    let formatted = dateString;
    for (const [full, short] of Object.entries(monthMap)) {
        formatted = formatted.replace(full, short);
    }
    return formatted;
}

function setupExperienceInteractions() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    timeline.addEventListener('click', function(e) {
        if (e.target.closest('a')) return;
        const card = e.target.closest('.experience-card');
        if (card) toggleExperienceCard.call(card, e);
    });

    timeline.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const card = e.target.closest('.experience-card');
            if (card) {
                e.preventDefault();
                toggleExperienceCard.call(card, e);
            }
        }
    });
}

function toggleExperienceCard() {
    const card = this;
    const isExpanded = card.classList.contains('expanded');
    const content = card.querySelector('.experience-content');

    if (!isExpanded) {
        content.style.maxHeight = 'none';
        content.style.paddingTop = '1.25rem';
        content.style.paddingBottom = '1.25rem';
        content.style.overflow = 'hidden';
        content.offsetHeight;
        const actualHeight = content.scrollHeight;
        const bufferHeight = actualHeight + 15;

        content.style.maxHeight = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        content.offsetHeight;

        requestAnimationFrame(() => {
            content.style.maxHeight = `${bufferHeight}px`;
            content.style.paddingTop = '1.25rem';
            content.style.paddingBottom = '1.25rem';
        });

        card.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
    } else {
        const currentHeight = content.scrollHeight;
        content.style.maxHeight = `${currentHeight}px`;
        content.offsetHeight; // force reflow so browser has a from-value
        requestAnimationFrame(() => {
            content.style.maxHeight = '0';
            content.style.paddingTop = '0';
            content.style.paddingBottom = '0';
        });
        card.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
    }
}

function setupExperienceResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            recalculateExpandedCards();
        }, 150);
    });
}

function recalculateExpandedCards() {
    document.querySelectorAll('.experience-card.expanded').forEach(card => {
        const content = card.querySelector('.experience-content');
        content.style.maxHeight = 'none';
        content.style.paddingTop = '1.25rem';
        content.style.paddingBottom = '1.25rem';
        content.offsetHeight;
        const actualHeight = content.scrollHeight;
        content.style.maxHeight = `${actualHeight + 15}px`;
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});
