# Shifra Williams' Portfolio Website

Welcome to Shifra Williams' portfolio website — styled as a database IDE (think DBeaver/pgAdmin/VS Code) to match the data engineering aesthetic.

## Quickstart

To run this website locally:

1. **Clone the repository and navigate to the project folder**
   ```bash
   git clone https://github.com/Ho1yShif/ho1yshif.github.io.git
   cd ho1yshif.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The website will automatically open in your browser at `http://localhost:3000` with hot reload enabled.

## Design

The site uses a **database IDE aesthetic** — sections are SQL "files", navigation is a database explorer tree, and the color scheme is a dark OKLCH palette with cyan accents and syntax-highlighted elements.

- **Sidebar** — database explorer tree with `.sql` file names for each section
- **Tab bar** — open tabs per section, active tab follows scroll
- **Status bar** — shows `shifra_db · Connected · Live` at the bottom
- **Hero** — SQL query block with syntax highlighting and blinking cursor
- **Dark IDE palette** — OKLCH color variables throughout; no light/dark toggle

## Features

### Design & UX
- Database IDE aesthetic inspired by DBeaver/pgAdmin/VS Code
- Dark OKLCH palette with cyan primary (`oklch(0.7 0.15 160)`) and syntax-colored accents
- Sidebar explorer with collapsible tree items, active state tracking
- Tab bar with `.sql` filenames that syncs with scroll position
- SQL query block in hero with blinking cursor animation
- Smooth scroll within the IDE content pane (no page scroll)
- Status bar footer with connection info

### Responsive & Accessible
- Sidebar collapses to hamburger overlay on mobile (< 1024px)
- Semantic HTML with ARIA attributes
- Keyboard navigation (Alt+1–8 for section jumps, Escape to close sidebar)
- JetBrains Mono used throughout for monospace elements

## Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with OKLCH Custom Properties, Grid, Flexbox
- **Fonts**: Inter (body), JetBrains Mono (UI/code elements)
- **Icons**: Inline SVG
- **Animations**: CSS keyframes (cursor blink, fade-in), Intersection Observer API

## License

MIT License — feel free to use and modify for your own portfolio.

---

Built with ❤️ for the data science community
