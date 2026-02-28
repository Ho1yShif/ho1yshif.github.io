// Experience Data
const ExperiencesData = [
  {
    organization: "Render",
    role: "Founding Developer Relations Engineer",
    from_date: "Dec 2025",
    to_date: "Present",
    description: "● Spearheaded Render's first-ever AI conference, the AI Coding Summit, alongside sponsors like Google DeepMind and Cloudflare"
  },
  {
    organization: "Saturdata",
    role: "Podcast Host",
    from_date: "Jan 2025",
    to_date: "Present",
    description: "● Write, plan, record, market, and manage [Saturdata](https://saturdata.github.io/), the data community podcast."
  },
  {
    organization: "Torpedo Software LLC",
    role: "Educational Curriculum Designer",
    from_date: "Jan 2023",
    to_date: "Present",
    description:
      `● Designing curriculum and writing lessons for <a href="https://www.roblox.com/games/1334669864/Lua-Learning" target="_blank" rel="noopener noreferrer">Lua Learning</a>, an award-winning Roblox game with 9M+ visits and 150K+ monthly active users`,
  },
  {
    organization: "LinkedIn",
    role: "Content Creator",
    from_date: "Jun 2022",
    to_date: "Present",
    description: "● Build a community of 13K+ followers, generating thousands of impressions per post, including a [viral post](https://www.linkedin.com/posts/shifra-isaacs_today-an-interviewer-finally-asked-the-question-activity-6995474652022067200-e1Et) that garnered 500K+ impressions\n● Share data insights and offer perspectives on recruiting and the tech industry to spark meaningful conversations\n● Use humor to demystify complex data and engineering topics, making them accessible and relatable to a broader audience\n● Craft content that informs, entertains, and offers a unique perspective on the intersection of technology and daily life"
  },
  {
    organization: "Ascend.io",
    role: "Founding Developer Relations Advocate",
    from_date: "Mar 2025",
    to_date: "Dec 2025",
    description:
      `● Wrote 100+ docs to launch a new documentation site, improving product readiness and onboarding
● Automated release notes pipeline with Python, AI, and GitHub Actions, reducing manual work by 90%
● Led GTM strategy with data evangelists and creators to drive launch awareness and team engagement`,
  },
  {
    organization: "Sigma Computing",
    role: "Data Analyst & Technical Support Engineer",
    from_date: "May 2024",
    to_date: "Mar 2025",
    description:
      `● Developed Snowflake SQL dashboard to identify improvement areas in customer satisfaction (CSAT)
● Led CSAT analysis to improve satisfaction scores while accommodating a 50% rise in chat volume
● Built data application to streamline billing updates across RevOps, Finance, and Sales organizations
● Wrote external documentation for embedding applications using TypeScript, APIs, and authentication
● Analyzed impact of CSAT on retention metrics to evaluate Support's role in shaping customer strategy
● Collaborated cross-functionally with engineering and customer success to investigate the relationship between CSAT and retention metrics, driving actionable insights to improve customer retention
● Forecasted the impact of in-house AI tools on chat coverage to inform support workflow decisions
● Built a data application to replace PTO scheduling in ADP, streamlining workflows and enhancing data visibility
● Ensured 96% CSAT and <1 minute response time while consulting on data models and infrastructure`,
  },
  {
    organization: "Podium Education",
    role: "Data Programming Team Lead",
    from_date: "May 2023",
    to_date: "Aug 2023",
    description:
      `● Facilitated classroom instruction to college students, teaching introductory SQL, Tableau, and Python for practical data science
● Graded weekly coding assignments and final projects for a diverse cohort of 60+ students, demonstrating strong organizational skills
● Provided personalized one-on-one guidance during office hours to address individual learning needs`,
  },
  {
    organization: "Annalect",
    role: "Data Scientist",
    from_date: "Jan 2023",
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
    organization: "Crash Course",
    role: "Technical Script Writer",
    from_date: "Nov 2022",
    to_date: "Nov 2023",
    description:
      `● Authored 9 episodes of the <a href="https://www.youtube.com/watch?v=yBFu9HxiD88&list=PLID58IQe16nFgbHGRCj5QEXKUpVIilpDN&index=29" target="_blank" rel="noopener noreferrer">Crash Course: Code and Programming for Beginners</a> series, amassing 135K+ views and 10K+ hours of watch time on YouTube`,
  },
  {
    organization: "DataLemur",
    role: "Technical Writer & Product Manager",
    from_date: "Aug 2022",
    to_date: "Jan 2023",
    description:
      `● Supported author Nick Singh's data science platform and achieved 100K+ users within 10 months
● Documented, tested, and improved 200+ SQL and mathematics problems, solutions, and hints
● Instituted metadata tagging system and SQL style conventions to standardize the platform`,
  },
  {
    organization: "JPMorgan Chase & Co.",
    role: "AI & Data Science Summer Analyst",
    from_date: "Jun 2022",
    to_date: "Aug 2022",
    description:
      `● Leveraged XGBoost algorithm in Python to improve wallet estimation regression model by 94.1%
● Won 2022 Housing Affordability Challenge among 140 interns by implementing PCA and projecting HPI
● Conducted literature review to research machine learning methods and strategies for wallet estimation`,
  },
  {
    organization: "Prose",
    role: "Growth Data Analyst Intern",
    from_date: "Jan 2022",
    to_date: "May 2022",
    description:
      `● Built last-click attribution model in BigQuery to track $40M annual marketing spend across channels
● Automated Looker dashboard based on attribution model to report WoW and MoM channel metrics
● Tested gift products to determine their impact on customer churn and drive stakeholder decisions`,
  },

  {
    organization: "Cross River Bank",
    role: "Data Technology Analyst Intern",
    from_date: "Jun 2021",
    to_date: "Aug 2021",
    description:
      `● Created Capacity Planning Model to streamline project costing for the entire IT department
● Developed multinomial logistic regression model for loan classification in Python
● Presented accomplishments throughout summer internship to CEO and C-Level managers`,
  }
];

// Typing effect roles
const TypingRoles = ['DevRel', 'Data Scientist', 'Technical Writer', 'Educator'];

// Link type → tooltip text (used by renderProjects and renderAppearances)
const LINK_TOOLTIPS = {
  github:      'github',
  website:     'visit',
  publication: 'publication',
  linkedin:    'linkedin',
  youtube:     'youtube',
  spotify:     'spotify',
  roblox:      'roblox'
};

// Portfolio items — projects (type: 'project') and appearances (type: 'appearance')
const PortfolioData = [
  // ── Projects ──────────────────────────────────────────────────────────────
  {
    type: 'project',
    title: 'Crash Course: Code and Programming for Beginners',
    description: 'Educational video series teaching Java programming with 180K+ views, making complex programming concepts accessible to a broad audience.',
    image: 'assets/images/projects/oop-thumbnail.jpeg',
    links: [
      { type: 'youtube', url: 'https://www.youtube.com/watch?v=yBFu9HxiD88&list=PLID58IQe16nFgbHGRCj5QEXKUpVIilpDN&index=28' }
    ]
  },
  {
    type: 'project',
    title: 'Wrapped for LinkedIn',
    description: "Wrapped for LinkedIn transforms your LinkedIn activity into an engaging, visual story inspired by Spotify Wrapped. Discover your most impactful posts, understand who's engaging with your content, and check out your year in review.",
    image: 'assets/images/projects/wrapped.png',
    links: [
      { type: 'website', url: 'https://wrappedforlinkedin.onrender.com/' },
      { type: 'github',  url: 'https://github.com/render-examples/wrapped-for-linkedin' }
    ]
  },
  {
    type: 'project',
    title: 'Trender',
    description: 'Trender is a distributed analytics platform that tracks trending GitHub repositories across Python, TypeScript/Next.js, Go, and the Render ecosystem. Uses Render Workflows for parallel processing and a 3-layer data pipeline (Raw → Staging → Analytics) for high-performance analytics.',
    image: 'assets/images/projects/trender.png',
    links: [
      { type: 'website', url: 'https://trender.onrender.com/' },
      { type: 'github',  url: 'https://github.com/render-examples/trender' }
    ]
  },
  {
    type: 'project',
    title: 'DataLemur',
    description: 'SQL & data analytics interview practice and preparation platform for the data community.',
    image: 'assets/images/projects/datalemur.webp',
    links: [
      { type: 'website', url: 'https://datalemur.com' }
    ]
  },
  {
    type: 'project',
    title: 'Classification of Fall Out Boy Eras',
    description: 'Academic research project applying machine learning techniques to classify different musical eras of Fall Out Boy, published in Rutgers academic journal.',
    image: 'assets/images/projects/fob.jpg',
    links: [
      { type: 'github',      url: 'https://github.com/Ho1yShif/FOB_LR_public' },
      { type: 'publication', url: 'https://arestyrurj.libraries.rutgers.edu/index.php/arestyrurj/article/view/232' }
    ]
  },
  {
    type: 'project',
    title: 'Lua Learning',
    description: 'Interactive educational game teaching Lua programming concepts, reaching 8.4M+ visits and helping developers learn programming fundamentals.',
    image: 'assets/images/projects/lua-learning.webp',
    links: [
      { type: 'roblox', url: 'https://www.roblox.com/games/1334669864/Lua-Learning' }
    ]
  },
  {
    type: 'project',
    title: 'New Jersey Flood Prediction',
    description: 'Predictive model for flood risk assessment in New Jersey using historical weather data and geographic information systems.',
    image: 'assets/images/projects/flood-nj.jpeg',
    links: [
      { type: 'github', url: 'https://github.com/Ho1yShif/cgi_flood_prediction_mitigation' }
    ]
  },

  // ── Appearances ───────────────────────────────────────────────────────────
  {
    type: 'appearance',
    badge: 'podcast',
    title: 'Saturdata',
    organization: 'Saturdata',
    role: 'Co-host',
    description: 'Co-hosted the community podcast humanizing the data world for the next generation.',
    links: [
      { type: 'youtube',  url: 'https://www.youtube.com/watch?v=lWFpcwcSmQg&themeRefresh=1' },
      { type: 'spotify',  url: 'https://open.spotify.com/episode/0D3BaBiRxY4hAAGB1IITfQ?si=a6a09d5af2ea4da9' },
      { type: 'linkedin', url: 'https://www.linkedin.com/company/saturdata/' },
      { type: 'website', url: 'https://saturdata.github.io/' },
    ]
  },
  {
    type: 'appearance',
    badge: 'conference',
    title: 'AI Coding Summit',
    role: 'Workshop speaker',
    organization: 'GitNation',
    description: "Led a hands-on workshop deploying a real-time voice agent to the cloud using LiveKit and Render, covering architecture, environment configuration, debugging, and scaling.",
    links: []
  },
  {
    type: 'appearance',
    badge: 'finance',
    title: 'AI in Finance Forum',
    role: 'Featured speaker',
    organization: 'CFO Leadership',
    description: "Led a fireside chat exploring the role of the CFO as an AI leader—someone who doesn't need to build models but does need to lead transformation. Attendees gained clarity on building credibility, spotting opportunities, and bringing their teams along for the AI journey.",
    links: []
  },
  {
    type: 'appearance',
    badge: 'dei',
    title: 'Women in Data Boston',
    role: 'Featured speaker',
    organization: 'Sigma Computing',
    description: 'Delivered keynote on data leadership and women in tech, resulting in all data leader prospects moving forward in the marketing funnel.',
    links: []
  },
  {
    type: 'appearance',
    badge: 'podcast',
    title: 'Data Science for Finance Professionals',
    role: 'Podcast guest',
    organization: 'FP&A Today',
    description: 'Explored how data science transforms financial analysis and strategic decision-making, highlighting practical applications and the critical role of data-driven insights in modern corporate finance.',
    links: [
      { type: 'youtube', url: 'https://www.youtube.com/watch?v=lWFpcwcSmQg&themeRefresh=1' },
      { type: 'spotify', url: 'https://open.spotify.com/episode/0D3BaBiRxY4hAAGB1IITfQ?si=a6a09d5af2ea4da9' }
    ]
  },
  {
    type: 'appearance',
    badge: 'podcast',
    title: 'How to Pivot to a Career in Tech',
    role: 'Podcast guest',
    organization: 'Ready Set Do',
    description: 'Shared the journey from music to data and how to pivot to a career in tech in general, emphasizing the importance of practical applications and identifying the most impactful skills to learn.',
    links: [
      { type: 'youtube', url: 'https://youtu.be/JtF8b7k8nO8?si=Vhj1iO7c9itUbx_3' },
      { type: 'spotify', url: 'https://readysetdo.xyz/episodes/how-to-pivot-to-a-career-in-te' }
    ]
  },
  {
    type: 'appearance',
    badge: 'education',
    title: 'Mastering Science Communication',
    role: 'Science communicator',
    organization: 'Midwest Big Data Hub',
    description: 'Shared insider tips and strategies for effective science communication, focusing on translating complex technical concepts for diverse audiences.',
    links: []
  },
  {
    type: 'appearance',
    badge: 'education',
    title: 'Computer Science Career Pathways',
    role: 'Panelist',
    organization: 'Carlmont High School',
    description: 'Participated in career panel for AP Computer Science students alongside Meta engineers, sharing insights on industry pathways, daily responsibilities in tech roles, and practical advice for transitioning from academics to professional software development.',
    links: []
  },
  {
    type: 'appearance',
    badge: 'education',
    title: 'CS Education & AP Exam Success',
    role: 'Educational advisor',
    organization: 'BayCSC',
    description: 'Delivered comprehensive workshop on computer science education pathways and AP exam preparation strategies, providing Bay Area students with practical study techniques, career guidance, and industry insights to maximize academic and professional success.',
    links: []
  }
];

// Skills Data
const SkillsData = [
  { category: 'Domains', tags: ['Data science', 'Data analytics', 'Data engineering', 'Developer relations', 'Product management', 'Technical writing'] },
  { category: 'Programming', tags: ['Python', 'AI', 'Machine Learning', 'ETL/ELT', 'OOP', 'Linux terminal', 'JavaScript', 'R', 'Java', 'Lua'] },
  { category: 'Data platforms', tags: ['Snowflake', 'Redshift', 'Databricks', 'BigQuery', 'dbt'] },
  { category: 'Business intelligence', tags: ['Excel', 'Looker', 'Tableau', 'Sigma', 'A/B testing'] },
  { category: 'Cloud', tags: ['GCP', 'AWS', 'Azure', 'Git', 'GitHub', 'GitHub Actions', 'CI/CD', 'DevOps', 'DataOps'] },
  { category: 'Product', tags: ['Product management', 'UI/UX design', 'Figma', 'Roadmapping', 'User research'] },
  { category: 'Developer relations', tags: ['Marketing', 'Social media', 'Community building', 'Public speaking', 'Demos'] },
  { category: 'Mathematics', tags: ['Statistics', 'A/B Testing', 'Linear algebra', 'Time series'] },
  { category: 'Documentation', tags: ['Linear', 'Jira', 'Confluence', 'Docusaurus', 'Mintlify'] },
  { category: 'Interests', tags: ['Cooking & baking', 'Travel', 'Reading', 'Music', 'Podcasting', 'Voice acting', 'Audio engineering'] }
];

// Acknowledgements Data
const AcknowledgementsData = [
  { name: 'Rachel Cappell', url: 'https://www.linkedin.com/in/rachel-cappell-cpa-a154474/' },
  { name: 'Zack Williams', url: 'https://www.boatbomber.com/' },
  { name: 'Nick Singh', url: 'https://www.linkedin.com/in/nick-singh-tech/' },
  { name: 'Constant Dugast', url: 'https://www.linkedin.com/in/constant-dugast-887b15a4/' },
  { name: 'Brian Risk', url: 'https://www.linkedin.com/in/brianrisk/' }
];
