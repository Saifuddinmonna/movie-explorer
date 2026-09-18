# 🎬 MovieExplorer

A responsive, modern single-page Movie & TV Show exploration web application crafted with **React 19**, **JavaScript (ES6+)**, and **Tailwind CSS**, consuming live data from the public **TVMaze REST API**.

![MovieExplorer Banner](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80)

---

## 👨‍💻 Developer Information

- **Developer:** Saifuddin Ahammed Monna
- **GitHub:** [@Saifuddinmonna](https://github.com/Saifuddinmonna)
- **Portfolio / Profile:** [https://github.com/Saifuddinmonna](https://github.com/Saifuddinmonna)
- **Role:** Frontend Developer

---

## 📌 Project Overview

**MovieExplorer** is an interactive movie discovery platform designed and developed to provide a seamless browsing experience. Users can search across hundreds of television series, explore curated genres, check live ratings, and read full synopses inside an intuitive details modal.

### Key Highlights
- **Live Search with Debounce:** Optimizes requests to TVMaze API while typing to prevent unnecessary re-renders and network spam.
- **Genre & Category Filtering:** Interactive genre pills for one-click exploration.
- **Detailed Modal View:** Safe HTML parsing for summaries, schedule, network country, language, and runtime breakdown.
- **Mobile-First Responsive Layout:** Smooth fluid grid rendering from mobile screens up to wide desktops.

---

## 🛠️ Built With

- **React 19** (Functional Components, Hooks: `useState`, `useEffect`, `useMemo`)
- **JavaScript (ES6+)**
- **Vite** (Next Generation Frontend Tooling)
- **Tailwind CSS** (Modern utility-first styling)
- **Lucide Icons**
- **TVMaze REST API**
  - Public Show Catalog: `https://api.tvmaze.com/shows`
  - Show Search Endpoint: `https://api.tvmaze.com/search/shows?q=:query`

---

## 🎯 Features Implemented

### 1. Header & Navigation
- Custom brand logo with sleek dark theme palette.
- Navigation links (`Home`, `Browse Shows`, `About`) with responsive active states.
- Quick action button (`[ Movies ]`) directly anchoring to the movie search view.
- Fully functional mobile hamburger drawer.

### 2. Hero Section
- Cinematic banner with dark gradient overlays.
- Highlighted headlines with call-to-action (`[ Explore Now ]`).
- Quick search preset tags for fast testing.

### 3. Movie Listing & Search Engine
- Debounced search bar with automatic reset.
- Genre selection buttons (`Action`, `Drama`, `Comedy`, `Sci-Fi`, etc.).
- Custom movie cards with fallback handling for missing poster assets.
- Live badges for show status (`Running` / `Ended`) and IMDb-style ratings.

### 4. Movie Details Modal
- High-resolution poster and backdrop display.
- Safely sanitized synopsis/overview text.
- Metadata chips: Rating, Release Year, Language, Runtime, Network, and Airing Days.
- Multiple exit triggers: Top close icon, bottom `[ ❌ Close ]` button, background backdrop click, and keyboard `Esc` key.

---

## 📂 Project Structure

```
movie-explorer/
├── index.html                  # HTML entry point
├── package.json                # Project dependencies & npm scripts
├── vite.config.js              # Vite build setup
├── README.md                   # Project documentation
└── src/
    ├── main.jsx                # React root bootstrap
    ├── App.jsx                 # Application state & page routing logic
    ├── index.css               # Global Tailwind directives & scrollbar styles
    ├── services/
    │   └── tvMazeApi.js        # API endpoints & data transformation utilities
    └── components/
        ├── Navbar.jsx          # Top navigation bar
        ├── HeroBanner.jsx      # Cinematic hero header
        ├── SearchBar.jsx       # Search input & genre filter controls
        ├── MovieCard.jsx       # Individual show card
        ├── MovieModal.jsx      # Comprehensive show details dialog
        ├── BangladeshiSpotlight.jsx # Curated regional spotlight
        ├── AboutSection.jsx    # Architecture overview & checklist
        └── Footer.jsx          # Footer with developer credits
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [Git](https://git-scm.com/)

### 1. Clone the repository
```bash
git clone https://github.com/Saifuddinmonna/movie-explorer.git
cd movie-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to view the running app.

### 4. Build for production
```bash
npm run build
```

---

## 🌐 Deployment (Netlify)

This project is optimized for deployment on Netlify or Vercel.

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

---

## 📝 License

This project is licensed under the MIT License - feel free to use it for educational and portfolio demonstration.
