// All data is loaded from data.js

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Capture the deep-link target before the scroll observer overwrites the hash.
    const initialHash = window.location.hash;
    renderAbout();
    renderProjects();
    renderAppearances();
    renderSkills();
    renderAcknowledgements();
    initializeSidebar();
    initializeIDETabs();
    initializeMobileSidebar();
    initializeScrollObserver();
    initializeAnimations();
    initializeResumeDownload();
    initializeExperience();
    initializeKeyboardNavigation();
    initializeTypingEffect();
    initializeHashNavigation(initialHash);
}

// ===== URL HASH (anchor links) =====
// Update the address bar without adding a history entry or triggering a native jump.
function setHash(sectionId) {
    if (!sectionId) return;
    const newHash = `#${sectionId}`;
    if (window.location.hash === newHash) return;
    history.replaceState(null, '', newHash);
}

// Navigate to a section referenced by a URL hash (deep-linking + back/forward).
function navigateToHash(hash, behavior = 'smooth') {
    const sectionId = (hash || '').replace('#', '');
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (!section) return;
    scrollToSection(sectionId, behavior);
    setActiveSidebarItem(sectionId);
    setActiveTab(sectionId);
    setHash(sectionId);
}

function initializeHashNavigation(initialHash) {
    // Deep-link on initial load. Jump instantly so the page lands in place.
    if (initialHash) {
        // Delay a tick so dynamically rendered sections have their final height.
        requestAnimationFrame(() => navigateToHash(initialHash, 'auto'));
    }
    // Respond to back/forward navigation.
    window.addEventListener('hashchange', () => navigateToHash(window.location.hash, 'smooth'));
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
            setHash(sectionId);

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
            setHash(sectionId);
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
// Track the in-flight custom scroll so a new navigation cancels the previous one.
let activeScrollRaf = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// easeInOutCubic — slow start, quick middle, gentle settle for a polished feel.
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollToSection(sectionId, behavior = 'smooth') {
    const section = document.getElementById(sectionId);
    const content = document.getElementById('main-content');
    if (!section || !content) return;

    const targetTop = Math.max(0, section.offsetTop - 32);

    // Cancel any animation already running so rapid clicks don't fight.
    if (activeScrollRaf !== null) {
        cancelAnimationFrame(activeScrollRaf);
        activeScrollRaf = null;
    }

    // Instant jump for deep-links and when the user prefers reduced motion.
    if (behavior === 'auto' || prefersReducedMotion) {
        content.scrollTo({ top: targetTop });
        return;
    }

    const startTop = content.scrollTop;
    const distance = targetTop - startTop;
    if (distance === 0) return;

    // Duration scales with distance (capped) so short and long hops both feel right.
    const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.6));
    let startTime = null;

    function step(now) {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        content.scrollTop = startTop + distance * easeInOutCubic(progress);
        if (progress < 1) {
            activeScrollRaf = requestAnimationFrame(step);
        } else {
            activeScrollRaf = null;
        }
    }

    activeScrollRaf = requestAnimationFrame(step);
}

// ===== SCROLL OBSERVER (sync active state on scroll) =====
function initializeScrollObserver() {
    const content = document.getElementById('main-content');
    if (!content) return;

    const sections = Array.from(document.querySelectorAll('section[id]'));
    let rafId = null;
    let hashTimer = null;

    function getActiveSection() {
        const triggerPoint = content.scrollTop + content.clientHeight * 0.3;
        let active = sections[0];
        for (const section of sections) {
            if (section.offsetTop <= triggerPoint) active = section;
        }
        return active;
    }

    function updateActiveSection() {
        const active = getActiveSection();
        if (!active) return;
        const id = active.id;
        setActiveSidebarItem(id);
        setActiveTab(id);
        const mobileTitle = document.querySelector('.mobile-header-title');
        if (mobileTitle) mobileTitle.textContent = `shifra_db / ${id}.sql`;

        // Defer the address-bar update until scrolling settles. Writing the hash
        // on every scroll frame janks the scroll and trips Safari's
        // history.replaceState rate limit.
        clearTimeout(hashTimer);
        hashTimer = setTimeout(() => setHash(id), 120);
    }

    // Throttle to one update per frame so the scroll stays smooth.
    function onScroll() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            rafId = null;
            updateActiveSection();
        });
    }

    content.addEventListener('scroll', onScroll, { passive: true });
    updateActiveSection();
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

    const roles = TypingRoles;
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

// ===== KEYBOARD NAVIGATION =====
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            const sectionMap = {
                '1': 'home',
                '2': 'about',
                '3': 'experience',
                '4': 'projects',
                '5': 'appearances',
                '6': 'skills',
            };
            const sectionId = sectionMap[e.key];
            if (sectionId) {
                e.preventDefault();
                scrollToSection(sectionId);
                setActiveSidebarItem(sectionId);
                setActiveTab(sectionId);
                setHash(sectionId);
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
    const downloadUrl = 'https://docs.google.com/document/d/1KBnF9S5ot0XMx3fBoncZMl690q3BDPhMZGImKiMNIPQ/export?format=pdf';
    const spinner = document.getElementById('resume-spinner');
    if (!spinner.hidden) return;

    spinner.hidden = false;
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
            link.click();
            setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
        })
        .catch(() => {
            // If the fetch fails, let the browser download the file directly.
            window.location.href = downloadUrl;
        })
        .finally(() => {
            spinner.hidden = true;
        });
}

// ===== EXPERIENCE SECTION =====
function initializeExperience() {
    generateExperienceCards();
    setupExperienceInteractions();
}

function parseMarkdownLinks(text) {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function generateExperienceCards() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    const experienceHTML = ExperiencesData.map((exp, index) => `
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
                <div class="experience-content-inner">
                    <div class="experience-description">${exp.description.split('\n').map(line => `<div class="experience-bullet">${parseMarkdownLinks(line)}</div>`).join('')}</div>
                </div>
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
    card.classList.toggle('expanded');
    card.setAttribute('aria-expanded', String(!isExpanded));
}

// ===== RENDER FUNCTIONS =====

const _ICONS = {
    github:      `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" stroke-width="2"/></svg>`,
    website:     `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2"/><polyline points="15,3 21,3 21,9" stroke="currentColor" stroke-width="2"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2"/></svg>`,
    publication: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/><polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/></svg>`,
    linkedin:    `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" stroke-width="2"/><rect x="2" y="9" width="4" height="12" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="2"/></svg>`,
    youtube:     `<img src="assets/images/logos/youtube.png" height="16" alt="YouTube" style="display:block;width:auto;" />`,
    spotify:     `<img src="assets/images/logos/spotify.png" height="16" alt="Spotify" style="display:block;width:auto;" />`,
    roblox:      `<img src="assets/images/logos/roblox.png" height="16" alt="Roblox" style="display:block;width:auto;" />`
};

function renderLinks(links) {
    return links.map(link => `
        <a href="${link.url}" class="project-icon-link" target="_blank" rel="noopener noreferrer" data-tooltip="${LINK_TOOLTIPS[link.type] || link.type}">
            ${_ICONS[link.type] || ''}
        </a>
    `).join('');
}

// Load the about text. Each line is a paragraph.
async function renderAbout() {
    const container = document.getElementById('about-text');
    if (!container) return;

    try {
        const response = await fetch('content/about.txt');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        container.replaceChildren(...text.split('\n').filter(line => line.trim()).map(line => {
            const p = document.createElement('p');
            p.className = 'about-intro';
            p.textContent = line.trim();
            return p;
        }));
    } catch (error) {
        console.error('Could not load about text:', error);
    }
}

function renderProjects() {
    const container = document.getElementById('projects-list');
    if (!container) return;

    container.innerHTML = PortfolioData.filter(i => i.type === 'project').map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" />
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-icon-links">
                    ${renderLinks(project.links)}
                </div>
            </div>
        </div>
    `).join('');
}

function renderAppearances() {
    const container = document.getElementById('appearances-list');
    if (!container) return;

    container.innerHTML = PortfolioData.filter(i => i.type === 'appearance').map(item => `
        <div class="appearances-card">
            <div class="appearances-header">
                <div class="appearances-badge" data-badge="${item.badge}">${item.badge}</div>
                <h3 class="appearances-title">${item.title}</h3>

                <p class="appearances-organization">${item.organization}</p>
            </div>
            <div class="appearances-content">
                <p class="appearances-description">${item.description}</p>
                ${item.links.length ? `
                <div class="project-icon-links">
                    ${renderLinks(item.links)}
                </div>` : ''}
            </div>
        </div>
    `).join('');
}

function renderSkills() {
    const container = document.getElementById('skills-table-body');
    if (!container) return;

    container.innerHTML = SkillsData.map((row, i) => `
        <div class="skills-result-row">
            <span class="result-row-num">${i + 1}</span>
            <span class="skills-row-category">${row.category}</span>
            <div class="skills-row-tags">
                ${row.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderAcknowledgements() {
    const container = document.getElementById('ack-table-body');
    if (!container) return;

    container.innerHTML = AcknowledgementsData.map((person, i) => `
        <div class="ack-result-row">
            <span class="result-row-num">${i + 1}</span>
            <a href="${person.url}" class="ack-result-name" target="_blank" rel="noopener noreferrer">${person.name}</a>
        </div>
    `).join('');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});
