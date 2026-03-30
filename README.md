# 🌐 Portfolio_OS // Cyberpunk Analytics Terminal

## 🚀 Overview
Standard resumes often fail to capture the multidimensional nature of technical data projects. **Portfolio_OS** is a custom-built, high-performance digital terminal designed to translate complex HR analytics, predictive modeling, and automation engineering into clear, tactile visual narratives.

Engineered with **Next.js, Tailwind CSS, and Framer Motion**, this centralized hub serves a dual purpose: it acts as a comprehensive archive for my data science initiatives while functioning as a live technical demonstration of modern frontend architecture and UI/UX design.

---

## ✨ System Architecture & Features
* **Data-Driven UI Engine:** Project details, technical stacks, and layouts are rendered dynamically from a lightweight, centralized JSON architecture, ensuring rapid rendering and seamless scalability without database overhead.
* **Tactile Cyberpunk Aesthetic:** Built with a dark-mode native design system featuring custom hex-based neon glows (`pulse-cyan`, `text-neon-orange`), deep abyss gradients, and high-contrast typography to maintain visual engagement.
* **Fluid Interactivity:** Utilizes Framer Motion for seamless page transitions and dynamic component mounting, combined with advanced Tailwind hover states to create a responsive, software-like experience.
* **Mobile-First Responsiveness:** Implements custom React hooks to manage touch states, scroll-linked transparency, and flawless vertical scaling across all device viewports.

---

## 🛠️ Tech Stack
* **Core Framework:** Next.js (React)
* **Styling Engine:** Tailwind CSS 
* **Animation & Physics:** Framer Motion
* **Data Layer:** Pure JSON Architecture
* **Deployment Infrastructure:** Vercel 

---

## ⚙️ Initialization Protocol
To boot the terminal in a local development environment:

1. Clone this repository to your local machine.
2. Install the necessary dependencies: `npm install`
3. Ignite the development server: `npm run dev`
4. Access the local mainframe at `http://localhost:3001`

> **System Note on Ports:** > The development server is explicitly configured to run on port `3001` to prevent conflicts with other standard local applications. If you wish to revert this to the standard `3000`, simply modify the `"dev"` script inside the `package.json` file (e.g., change `"dev": "next dev -p 3001"` to `"dev": "next dev"`).