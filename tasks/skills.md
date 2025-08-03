# Skills Section Implementation Prompt

## Objective
Create a comprehensive skills section for Shifra Williams' portfolio that showcases technical expertise across multiple domains using professional icons and modern web design patterns.

## Current Context
- The portfolio is a single-page application with sections: About, Experience, Projects, Skills, Connect
- Current tech stack: HTML5, CSS3 (CSS Custom Properties), Vanilla JavaScript
- Design system uses:
  - Primary color: #3b82f6 (blue)
  - Secondary color: #10b981 (green) 
  - Accent color: #f59e0b (amber)
  - Font: Inter (primary), JetBrains Mono (code)
  - Dark/light theme support via `[data-theme="dark"]`
  - CSS variables for consistent theming
- Existing skills section is partially implemented (lines 293-515 in index.html)
- Navigation includes skills link (`#skills`)

## Requirements

### 1. Skills Organization
Create a skills section with the following structure:

#### Professional Domains (Hero Section)
- **Data Science**: Advanced analytics, machine learning, statistical modeling
- **Data Analytics**: Business intelligence, data visualization, insights generation  
- **Data Engineering**: ETL/ELT pipelines, data architecture, cloud platforms
- **Developer Relations**: Technical advocacy, community building, content creation
- **Technical Writing**: Documentation, tutorials, educational content
- **Education**: Curriculum development, instructional design, knowledge transfer

#### Technical Skills Categories
**Programming Languages:**
- Python (primary expertise)
- R (statistical computing)
- SQL (database querying)
- Java (enterprise applications)
- Lua (scripting/game development)

**Data Tools & Frameworks:**
- Pandas (data manipulation)
- NumPy (numerical computing)
- PyTorch (machine learning)
- Snowflake (cloud data platform)
- BigQuery (data warehouse)
- MySQL (relational database)

**Analytics & Business Intelligence:**
- Tableau (data visualization)
- Looker (business intelligence)
- Excel (spreadsheet analysis)
- A/B Testing (experimentation)

**Cloud & Collaboration:**
- AWS S3 CLI (cloud storage)
- Git (version control)
- GitHub (code collaboration)
- Linux (operating systems)
- Jira (project management)
- Confluence (documentation)

**Data Engineering:**
- ETL/ELT (data pipeline processes)

### 2. Design Requirements

#### Visual Design
- **Layout**: Grid-based responsive design that works on mobile, tablet, desktop
- **Core Skills Animation**: Move the existing animated core skills section to the right side of the skills section
- **Icons**: Use professional SVG icons for each technology (prefer official brand icons when available)
  - **Core Skills**: Larger animated icons (existing size)
  - **Other Skills**: Smaller static icons for comprehensive skill listing
- **Color Scheme**: Integrate with existing design system colors
- **Typography**: Consistent with site typography (Inter font family)
- **Spacing**: Follow existing spacing patterns (2rem, 1.5rem, 1rem increments)

#### User Experience
- **Responsive**: Mobile-first design that scales appropriately
- **Accessibility**: Proper ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized SVG icons, efficient CSS
- **Hover States**: Interactive feedback on skill items
- **Theme Support**: Full dark/light theme compatibility

#### Technical Implementation
- **HTML Structure**: Semantic HTML5 with proper heading hierarchy
- **Layout Structure**: Two-column layout with comprehensive skills list on the left and animated core skills on the right
- **CSS**: Use existing CSS custom properties and design patterns
- **JavaScript**: Minimal JS for interactions (if needed)
- **Icons**: Inline SVG icons with proper accessibility attributes
  - Core skills: Larger animated icons (maintain existing animation)
  - Other skills: Smaller static icons for clean, organized display
- **Grid System**: CSS Grid and Flexbox for responsive layouts

### 3. Content Strategy

#### Skill Proficiency Indication
- Use visual hierarchy to indicate expertise levels
- Primary skills (Python, SQL, Technical Writing) should be prominently featured
- Group related technologies logically
- Include brief descriptions for domain areas

#### Professional Context
- Connect skills to real-world applications mentioned in experience/projects
- Emphasize cross-functional capabilities (technical + communication)
- Highlight unique combination of data science + developer relations expertise

### 4. Implementation Specifications

#### File Structure
- Update `index.html` to include complete skills section
- Add necessary CSS to `styles.css` following existing patterns
- Ensure integration with existing navigation and theme system

#### Code Quality
- Follow existing code style and formatting
- Use semantic HTML elements
- Implement proper CSS organization (follow existing structure)
- Include comments for complex sections
- Validate HTML and CSS

#### Integration Points
- Skills section should be accessible via navigation link `#skills`
- Maintain visual consistency with other sections
- Ensure smooth scrolling and proper scroll-padding-top
- Test with both light and dark themes

### 5. Success Criteria
- [ ] All listed skills are represented with appropriate icons
- [ ] Responsive design works across all device sizes
- [ ] Dark/light theme support is complete
- [ ] Accessibility standards are met (WCAG 2.1 AA)
- [ ] Visual hierarchy clearly communicates expertise levels
- [ ] Integration with existing design system is seamless
- [ ] Performance impact is minimal
- [ ] Code follows existing patterns and standards

## Skills List Reference

**Programming Languages:**
- Python
- R  
- SQL
- Java
- Lua

**Data Tools:**
- Pandas
- NumPy
- PyTorch
- Snowflake
- BigQuery
- MySQL

**Analytics & BI:**
- Tableau
- Looker
- Excel
- A/B Testing

**Cloud & Collaboration:**
- AWS S3 CLI
- Git
- GitHub
- Linux
- Jira
- Confluence

**Process/Methodology:**
- ETL/ELT

## Additional Notes
- The portfolio currently has some skills implemented but needs completion according to this specification
- Focus on creating a section that reinforces Shifra's unique positioning as a data scientist transitioning to developer relations
- Consider the target audience: potential employers, collaborators, and community members in the data/dev space
- Ensure the skills section tells a cohesive story about technical breadth and communication expertise