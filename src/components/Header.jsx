import React, { useContext } from 'react';
import { EditorContext } from '../context/EditorContext';
import { Sun, Moon, Download, Trash2, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function Header() {
  const { theme, toggleTheme, html, css, js, clearStorage } = useContext(EditorContext);

  const handleDownload = () => {
    const zip = new JSZip();
    
    // Create the full HTML file integrating CSS and JS
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Code Export</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
    <script>
${js}
    </script>
</body>
</html>`;

    zip.file("index.html", fullHtml);
    zip.file("style.css", css);
    zip.file("script.js", js);
    zip.file("snippet.html", html);

    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, "live-code-export.zip");
    });
  };

  return (
    <header className="h-14 flex items-center justify-between px-6 glass-panel border-b border-panel-border z-10 relative">
      <div className="flex items-center gap-2">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="p-2 bg-blue-500/10 text-blue-500 rounded-lg backdrop-blur-md border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
        >
          <Code2 size={24} />
        </motion.div>
        <h1 className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-purple-400">CodeStudio</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearStorage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium transition-colors text-red-500"
          title="Reset Code"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Reset</span>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium transition-colors"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Export</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
      </div>
    </header>
  );
}
