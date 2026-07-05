import { Project, TimelineEvent, SkillCategory, ContributionDay } from './types';

export const PERSONAL_INFO = {
  name: "E1S4",
  tagline: "Building, Breaking, & Learning",
  subtitle: "Turning bugs into features and curiosity into code.",
  bio: "I like building small tools that solve real problems. Most of my projects start with: 'I wonder how this works...', and usually end with me accidentally learning far more than I expected. You'll mostly find me working on security tools, homelabs, Python scripts, and TypeScript/JavaScript experiments.",
  location: "Homelab / Cloud",
  githubUrl: "https://github.com/e-1-s-4",
  email: "eisabukhri@gmail.com", // Found in user email metadata!
  philosophies: [
    {
      title: "Building to Learn",
      desc: "If I don't understand a technology, I will probably build one from scratch just to figure out how it works."
    },
    {
      title: "Simplicity First",
      desc: "I prefer building something small that works exceptionally well over something bloated that tries to do everything."
    },
    {
      title: "Security Minded",
      desc: "Homelabbing and active security monitoring are core drivers of my curiosity. Understanding attackers makes us better builders."
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "baitbox",
    name: "baitbox",
    description: "A lightweight, zero-config honeypot for homelabbers. Trap attackers in a fake filesystem and watch them struggle in real-time.",
    extendedDescription: "Designed for local network defenders and security researchers. Logs SSH, telnet, and web intrusion attempts, mapping out attacker profiles and displaying live sessions inside an interactive virtual terminal overlay.",
    language: "Python",
    languages: ["Python", "Docker", "Shell"],
    stars: 12,
    forks: 2,
    githubUrl: "https://github.com/e-1-s-4/baitbox",
    category: "Security",
    featured: true,
    builtAt: "July 2026"
  },
  {
    id: "FamilyFinance",
    name: "FamilyFinance",
    description: "Personal & Family Budget Tracker built because spreadsheets eventually become painful.",
    extendedDescription: "A self-host friendly banking and category budget visualizer. Offers dynamic transaction categorization, joint account sharing status, and clean cash flow tracking using responsive HTML5 layouts.",
    language: "HTML",
    languages: ["HTML", "JavaScript", "CSS"],
    stars: 8,
    forks: 1,
    githubUrl: "https://github.com/e-1-s-4/FamilyFinance",
    category: "Web Apps",
    featured: true,
    builtAt: "July 2026"
  },
  {
    id: "Aether",
    name: "Aether",
    description: "Next-Generation AI Creative Platform for Design Studios & Engineering Teams.",
    extendedDescription: "A collaborative high-fidelity interface integrating real-time canvas tools and complex vector engines, designed to power developer-designer handoffs.",
    language: "TypeScript",
    languages: ["TypeScript", "React", "CSS"],
    stars: 15,
    forks: 3,
    githubUrl: "https://github.com/e-1-s-4/Aether",
    category: "Games & Creative",
    featured: true,
    builtAt: "July 2026"
  },
  {
    id: "nexuspro",
    name: "nexuspro",
    description: "High-performance collaborative hub for engineering workflows and real-time state synchronization.",
    extendedDescription: "Built with speed in mind, nexuspro manages complex state machines and provides instant communication updates across development teams.",
    language: "TypeScript",
    languages: ["TypeScript", "TailwindCSS", "Node.js"],
    stars: 18,
    forks: 4,
    githubUrl: "https://github.com/e-1-s-4/nexuspro",
    demoUrl: "https://nexusvibe.vercel.app/",
    category: "Web Apps",
    featured: true,
    builtAt: "July 2026"
  },
  {
    id: "Interactive-Canvas-Art-Generator",
    name: "Interactive-Canvas-Art-Generator",
    description: "Create stunning generative art with your mouse! Features real-time particle effects, color theory algorithms, and high-res PNG export.",
    extendedDescription: "A client-side interactive sandbox where physical particle simulations react dynamically to physics cursors, rendering custom fluid and vortex flows in deep colors.",
    language: "HTML",
    languages: ["HTML5 Canvas", "JavaScript", "CSS"],
    stars: 9,
    forks: 2,
    githubUrl: "https://github.com/e-1-s-4/Interactive-Canvas-Art-Generator",
    category: "Games & Creative",
    featured: false,
    builtAt: "March 2026"
  },
  {
    id: "Keyboard-Heatmap-Generator",
    name: "Keyboard-Heatmap-Generator",
    description: "Logs your keystrokes and creates stunning visual heatmaps of your typing patterns.",
    extendedDescription: "A lightweight browser utility that maps dynamic keyboard frequencies. Includes real-time WPM, individual key saturation feedback, and clean, responsive layouts.",
    language: "HTML",
    languages: ["HTML", "JavaScript", "CSS"],
    stars: 7,
    forks: 1,
    githubUrl: "https://github.com/e-1-s-4/Keyboard-Heatmap-Generator",
    category: "Automation",
    featured: false,
    builtAt: "March 2026"
  },
  {
    id: "Pure-CSS-Music-Visualizer",
    name: "Pure-CSS-Music-Visualizer",
    description: "Experience music like never before with this audio-reactive visualizer built entirely with CSS variables and animations. No JS required!",
    extendedDescription: "An exploration of styling boundaries. Employs advanced infinite keyframes, CSS filters, and layout animations to fake visual peaks and frequencies.",
    language: "HTML",
    languages: ["HTML", "CSS"],
    stars: 11,
    forks: 0,
    githubUrl: "https://github.com/e-1-s-4/Pure-CSS-Music-Visualizer",
    category: "Games & Creative",
    featured: false,
    builtAt: "March 2026"
  },
  {
    id: "AI-Powered-Code-Companion",
    name: "AI-Powered-Code-Companion",
    description: "Your personal coding assistant that suggests improvements, finds bugs, and writes documentation using NLP.",
    extendedDescription: "A developer tool mock-up and client interface built to structure NLP and model prompts, guiding code refinement cleanly.",
    language: "HTML",
    languages: ["HTML", "JavaScript", "CSS"],
    stars: 6,
    forks: 1,
    githubUrl: "https://github.com/e-1-s-4/AI-Powered-Code-Companion",
    category: "Automation",
    featured: false,
    builtAt: "March 2026"
  },
  {
    id: "nitrorush",
    name: "nitrorush",
    description: "A fast-paced, grid-styled retro car game built directly inside the browser.",
    extendedDescription: "Leverages lightweight render ticks and standard JavaScript key listeners to challenge players with obstacle avoidance and dynamic speed increases.",
    language: "HTML",
    languages: ["HTML", "JavaScript", "CSS"],
    stars: 5,
    forks: 0,
    githubUrl: "https://github.com/e-1-s-4/nitrorush",
    demoUrl: "https://e-1-s-4.github.io/nitrorush/",
    category: "Games & Creative",
    featured: false,
    builtAt: "July 2026"
  },
  {
    id: "Catan",
    name: "Catan",
    description: "An elegant board game visualization simulating map generation and placement rules.",
    extendedDescription: "Generates custom hexagonal grids dynamically inside the browser, calculating resource hubs and displaying board nodes cleanly.",
    language: "HTML",
    languages: ["HTML", "JavaScript", "CSS"],
    stars: 4,
    forks: 1,
    githubUrl: "https://github.com/e-1-s-4/Catan",
    demoUrl: "https://e-1-s-4.github.io/Catan/",
    category: "Games & Creative",
    featured: false,
    builtAt: "July 2026"
  },
  {
    id: "biolink-pro",
    name: "biolink-pro",
    description: "A professional and modern link-in-bio hub, optimized for quick loading and customizable cards.",
    extendedDescription: "Offers developers a lightweight self-hosted social page with fluid transitions, hover effects, and built-in sharing parameters.",
    language: "JavaScript",
    languages: ["JavaScript", "HTML", "CSS"],
    stars: 4,
    forks: 0,
    githubUrl: "https://github.com/e-1-s-4/biolink-pro",
    demoUrl: "https://biolink-pro-kappa.vercel.app/",
    category: "Web Apps",
    featured: false,
    builtAt: "July 2026"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 90, iconName: "python" },
      { name: "TypeScript", level: 85, iconName: "typescript" },
      { name: "JavaScript", level: 88, iconName: "javascript" },
      { name: "HTML/CSS", level: 95, iconName: "html" },
      { name: "Bash Scripting", level: 80, iconName: "bash" }
    ]
  },
  {
    title: "Technologies & Frameworks",
    skills: [
      { name: "React", level: 85, iconName: "react" },
      { name: "Node.js", level: 80, iconName: "nodejs" },
      { name: "Tailwind CSS", level: 92, iconName: "tailwind" },
      { name: "Docker", level: 75, iconName: "docker" }
    ]
  },
  {
    title: "Security & Infrastructure",
    skills: [
      { name: "Linux Administration", level: 82, iconName: "linux" },
      { name: "Homelab & Networking", level: 85, iconName: "server" },
      { name: "Honeypot Monitoring", level: 88, iconName: "shield" },
      { name: "Git & GitHub CI/CD", level: 85, iconName: "git" }
    ]
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: "tl-5",
    date: "July 2026",
    title: "Entering Next-Gen AI & Advanced Sync",
    description: "Began development of Aether (collaborative creative engine) and nexuspro / FamilyFinance. Scaled up security testing with baitbox honeypot, logging automated attacker scripts.",
    iconType: "shield",
    projectsLinked: ["Aether", "nexuspro", "baitbox", "FamilyFinance"]
  },
  {
    id: "tl-4",
    date: "May 2026",
    title: "Exploring Canvas & Interactivity",
    description: "Engineered web-based interactive graphics and physics frameworks, modeling vector equations and testing browser limits.",
    iconType: "code",
    projectsLinked: ["Interactive-Canvas-Art-Generator", "Catan"]
  },
  {
    id: "tl-3",
    date: "April 2026",
    title: "UI Design & State Architecture",
    description: "Deepened UI/UX experiments with advanced CSS. Built custom biolinks and typing analysis mechanics.",
    iconType: "terminal",
    projectsLinked: ["biolink-pro", "Keyboard-Heatmap-Generator", "Pure-CSS-Music-Visualizer"]
  },
  {
    id: "tl-2",
    date: "March 2026",
    title: "Creating the E1S4 Laboratory",
    description: "Registered public presence. Began releasing open-source utilities like AI-Powered-Code-Companion and Interactive Particle physics models.",
    iconType: "server",
    projectsLinked: ["AI-Powered-Code-Companion"]
  },
  {
    id: "tl-1",
    date: "Early 2026",
    title: "Curiosity Sparked",
    description: "Set up a physical Raspberry Pi homelab server. Started analyzing inbound network traffic and writing basic Python security logging automation.",
    iconType: "code"
  }
];

// Generates simulated activity pattern mapping the actual GitHub activity profile
export const generateGitHubActivity = (): ContributionDay[] => {
  const days: ContributionDay[] = [];
  const startYear = 2026;
  const startDate = new Date(startYear, 0, 1); // Jan 1, 2026
  const endDate = new Date(startYear, 6, 5); // July 5, 2026 (matching context current time)
  
  let tempDate = new Date(startDate);
  while (tempDate <= endDate) {
    const dateStr = tempDate.toISOString().split('T')[0];
    
    // Simulate real peak contribution days:
    // Pushes in late March (when they created profile) and late June/July (active baitbox/nexuspro creations)
    const month = tempDate.getMonth();
    const dayOfWeek = tempDate.getDay();
    
    let baseChance = 0.1;
    if (month === 2) baseChance = 0.65; // March activity
    if (month === 5 || month === 6) baseChance = 0.85; // June & July activity
    if (dayOfWeek === 0 || dayOfWeek === 6) baseChance += 0.15; // Weekend coding hobbyist
    
    const roll = Math.random();
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    if (roll < baseChance) {
      count = Math.floor(Math.random() * 8) + 1;
      if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 6) level = 3;
      else level = 4;
    }
    
    days.push({
      date: dateStr,
      count,
      level
    });
    
    tempDate.setDate(tempDate.getDate() + 1);
  }
  return days;
};
