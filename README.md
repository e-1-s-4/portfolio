# E1S4 Personal Portfolio Hub

A modern, production-ready, highly interactive personal portfolio website built using **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, based entirely on the GitHub profile of developer **[E1S4](https://github.com/e-1-s-4)**.

All included projects, technologies, philosophies, and timeline milestones are strictly authenticated and pulled from E1S4's actual GitHub profile scans (featuring homelab security tools, budgeting web apps, and generative canvas sandbox engines).

---

## Key Interactive Features

1. **Generative Physics Canvas Art**: An interactive particles simulator recreating the **Interactive-Canvas-Art-Generator** project. Drag your cursor inside the stage to trigger gravity vortex fields.
2. **Keystroke Heatmap Logger**: An interactive virtual keyboard recreation of the **Keyboard-Heatmap-Generator** project. Capture hardware typing frequencies dynamically to map key densities.
3. **CSS-Reactive Audio Visualizer**: A pure-CSS bar visualizer recreation of the **Pure-CSS-Music-Visualizer** project that hooks vertical height variables to simulated ambient tracks.
4. **Command Palette (`Ctrl + K`)**: A custom glassmorphic search dashboard that triggers on keyboard shortcuts to jump across sections or explore matching public repositories.
5. **Simulated Homelab Terminal Outbox**: The contact form processes direct inputs, saving them to `localStorage` and outputting incoming log entries in a live console shell layout.

---

## Technical Stack

- **Framework**: React 18+ with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion` from `motion/react`)
- **Icons**: Lucide React

---

## Installation & Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Boot the local development server**:
   ```bash
   npm run dev
   ```

3. **Build compiled assets for production**:
   ```bash
   npm run build
   ```

4. **Preview the production bundle locally**:
   ```bash
   npm run preview
   ```

---

## Deployment Instructions

### Deploying to Vercel

1. **Install Vercel CLI** (or connect your GitHub repository to Vercel's automated dashboard):
   ```bash
   npm install -g vercel
   ```

2. **Run Vercel Deployment**:
   ```bash
   vercel
   ```

3. **Production Release**:
   ```bash
   vercel --prod
   ```

---

## Project Structure

```text
/src
 ├── App.tsx                    # Main Page structure and navigation transitions
 ├── main.tsx                   # Client entrypoint
 ├── index.css                  # Global Tailwind CSS configurations & web fonts
 ├── types.ts                   # Types declarations
 ├── data.ts                    # Factual profile data for E1S4
 └── /components
      ├── ActivityGraph.tsx     # Custom interactive contribution grid
      ├── CanvasArt.tsx         # Generative particle vector engine
      ├── CommandPalette.tsx    # Floating navigation prompt (Ctrl+K)
      ├── ContactForm.tsx       # Message inputs & terminal outbox log
      ├── KeyboardHeatmap.tsx   # Hardware keyboard typing frequencies analyzer
      ├── MusicVisualizer.tsx   # CSS variable reactive visualizer
      ├── ProjectCard.tsx       # Dynamic project presentation cards
      └── ThemeContext.tsx      # Dark / Light visual toggle and hooks
```
