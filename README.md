# Live Code Studio 🚀

A modern, high-performance, browser-based Live Code Editor built with React, Vite, and Tailwind CSS. This application allows developers to write HTML, CSS, and JavaScript in real-time within an isolated, sandboxed environment, offering immediate visual feedback and a professional-grade editor experience.

## ✨ Features

- **Three Dedicated Editors**: Separate HTML, CSS, and JavaScript interface panes powered by Monaco Editor (the exact engine behind VS Code).
- **Real-Time Live Preview**: An intelligent, safe `iframe` sandbox that automatically debounces and renders cross-dependent code seamlessly.
- **Console Interception**: Never miss a bug! All `console.log` calls and native errors are dynamically captured from the sandbox and logged into a custom Terminal GUI.
- **Premium Aesthetics**: Features custom Framer Motion page reveals, glassmorphism UI elements, dark/light theme switching, and stunning typing interaction glows.
- **Responsive & Resizable Layout**: Powered by React Resizable Panels, freely drag horizontal and vertical dividers to configure your perfect workspace.
- **Export Functionality**: A one-click download feature leveraging `JSZip` to package your entire runtime into a clean `index.html` structure.

## 🛠️ Tech Stack

- **Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom Vanilla CSS Macros
- **Editor Engine**: Monaco Editor (`@monaco-editor/react`)
- **Animations**: Framer Motion
- **Iconography**: Lucide React
- **Packaging Utilities**: JSZip & FileSaver.js

## 🚀 Getting Started

If you want to clone and run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/mohanteja781112/live-code-editor.git
   ```

2. Navigate into the root folder:
   ```bash
   cd live-code-editor
   ```

3. Install the node dependencies:
   ```bash
   npm install
   ```

4. Start the lightning-fast Vite development server:
   ```bash
   npm run dev
   ```

## 👨‍💻 Author

Created by [Mohanteja](https://github.com/mohanteja781112)
