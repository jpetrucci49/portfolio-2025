# Joseph Petrucci 2025 React Portfolio

## Overview

This is my personal portfolio website, designed to showcase my web development expertise and projects. Built with **React**, **TypeScript**, and **Tailwind CSS**, it features a responsive, modern interface with interactive components, such as a skills section with categorized technologies and smooth animations. The portfolio highlights my professional experience, technical skills, and passion for creating high-quality web applications, targeting front-end and full-stack development roles.

## Features

- **Interactive Skills Section**: Categorized display of technologies (Frontend, Backend, Databases, Tools) with smooth toggle animations.
- **About Page**: Features a timeline of career milestones with `framer-motion` animations and ARIA attributes for accessibility, detailing over 8 years of experience.
- **Projects Page**: Showcases featured projects (Silent Auction App, Upromise Email Campaign, Portfolio Website) alongside dynamically fetched GitHub repositories using the GitHub API. Includes interactive modals with `react-modal`, accessibility enhancements, and `framer-motion` animations.
- **Responsive Design**: Optimized for mobile and desktop using Tailwind CSS with a consistent design language (`--color-primary`, `container`, `shadow-md`).
- **Professional About Me**: Concise overview of my full-stack development journey, from Boston roots to General Assembly graduate.

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS, framer-motion, react-modal
- **Build Tools**: Vite, npm
- **Version Control**: Git, GitHub
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Installation

1. Clone the repository:
   "git clone https://github.com/jpetrucci49/portfolio-2025.git jpetrucci-2025-portfolio"
2. Navigate to the project directory:
   "cd jpetrucci-2025-portfolio"
3. Install dependencies:
   "npm install"
4. Start the development server:
   "npm run dev"
5. Open http://localhost:5173 in your browser.

## Technical Approach

My development philosophy centers on crafting clean, maintainable code with a focus on user experience and performance. I leverage **React** and **TypeScript** to build robust, type-safe single-page applications, using **Tailwind CSS** for responsive, modern styling. My work emphasizes modular components, agile collaboration, and adherence to best practices, ensuring scalable and accessible web solutions.

## Key Projects

- **Silent Auction App**: A React-based SPA with real-time bid updates via socket.io, Node.js, Express.js, and MongoDB, styled with Tailwind CSS.
- **Upromise Email Campaign**: Modernized email campaign rebuilt with React and Tailwind CSS, featuring dynamic content rendering.
- **Portfolio Website**: This portfolio, built with React, TypeScript, and Tailwind CSS, showcasing interactive skills toggles and responsive design.

## Project Structure

├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # React components (Skills.tsx, About.tsx, Projects.tsx, etc.)
│   ├── index.css          # Global Tailwind CSS styles
│   └── main.tsx           # Entry point
├── .env                   # Environment variables (e.g., GitHub token)
├── .prettierrc            # Prettier configuration
├── vite.config.ts         # Vite configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation

## Contributing

This is a personal portfolio, but feedback is appreciated! Open an issue for suggestions or contact me at joseph.petrucci49@gmail.com.

## License

This project is for personal use and not licensed for public distribution.

## Contact

- **Email**: Joseph.Petrucci49@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/joseph-petrucci
- **GitHub**: https://github.com/jpetrucci49

---

Built with dedication to showcase my web development journey!