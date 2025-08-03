# Data Science Portfolio Website

A modern, responsive portfolio website designed specifically for data scientists to showcase their skills, projects, and expertise.

## Features

### 🎨 Design & UX
- Modern, clean aesthetic with strategic use of color and white space
- Responsive design that works seamlessly across all devices
- Dark/light mode toggle for enhanced user experience
- Smooth scrolling navigation with active section highlighting
- Professional animations and micro-interactions

### 📱 Responsive & Accessible
- Mobile-first design approach
- Touch-friendly interactions for mobile users
- Semantic HTML structure for screen readers
- Keyboard navigation support
- High contrast ratios meeting WCAG guidelines

### 🚀 Performance Optimized
- Fast loading times with optimized code
- Intersection Observer API for efficient animations
- Lazy loading support for images
- Clean, valid code following best practices

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with Custom Properties, Grid, Flexbox
- **Fonts**: Inter (primary), JetBrains Mono (code)
- **Icons**: CSS-based emoji icons for universal compatibility
- **Animations**: CSS transitions and keyframes, Intersection Observer API

## 🚀 How to Run

### Quick Start (Local Development)

**Option 1: Live Server with Hot Reload (Recommended for Development)**
```bash
cd portfolio
# Install live-server globally (one-time setup)
npm install -g live-server

# Start server with hot reload
live-server .
# Opens http://localhost:8080 automatically
# Changes to HTML/CSS/JS files will auto-refresh the browser
```

**Option 2: Python Server with Manual Refresh**
```bash
cd portfolio
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
# Refresh manually after making changes
```

**Option 3: Node.js Serve**
```bash
cd portfolio
npx serve .
# Open http://localhost:3000 in your browser
# Refresh manually after making changes
```

**Option 4: VS Code Live Server Extension (Hot Reload)**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Changes will auto-refresh in the browser

**Option 5: Direct File (No Server)**
```bash
# Simply double-click index.html
# or run: open index.html
# Note: Some features may not work without a server
```

### Deploy Online (Free)

**Netlify** (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the portfolio folder
3. Get instant live URL

**GitHub Pages**
```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
# Enable Pages in repo settings
```

## Getting Started

### Step-by-Step Setup

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Start Development Server with Hot Reload**
   ```bash
   # Recommended: Install and use live-server
   npm install -g live-server
   live-server .
   ```
   Your browser will open automatically at `http://localhost:8080` and refresh whenever you save changes.

3. **Customize Your Portfolio**
   - **Personal Info**: Edit the hero section in `index.html`
   - **Projects**: Update project cards with your own data and descriptions
   - **Skills**: Modify skill percentages and add your technologies
   - **About**: Write your professional story and background
   - **Contact**: Update email, LinkedIn, GitHub, and other social links

4. **Add Your Assets**
   - Replace `assets/images/profile.jpg` with your professional headshot
   - Add project screenshots (`assets/images/project1.jpg`, `assets/images/project2.jpg`, etc.)
   - Update the logo in `assets/images/logo.svg` if desired

5. **Test Responsiveness**
   - Use browser dev tools to test different screen sizes
   - Check that all features work on mobile devices

6. **Deploy Your Site**
   - Choose from the deployment options below
   - Test the live site thoroughly

## Customization

### Colors & Theming
Update CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
}
```

### Content Updates
- **Personal Info**: Update the hero section content
- **Projects**: Modify project cards with your data
- **Skills**: Update skill percentages and technologies
- **Contact**: Change email, LinkedIn, and GitHub links

## License

MIT License - feel free to use and modify for your own portfolio.

---

Built with ❤️ for the data science community
