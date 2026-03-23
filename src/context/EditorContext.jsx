import React, { createContext, useState, useEffect, useCallback } from 'react';

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [html, setHtml] = useState(localStorage.getItem('code-editor-html') || '<h1>Hello World</h1>\n<p>Welcome to your live editor.</p>');
  const [css, setCss] = useState(localStorage.getItem('code-editor-css') || 'h1 {\n  color: #3b82f6;\n  font-family: sans-serif;\n}');
  const [js, setJs] = useState(localStorage.getItem('code-editor-js') || 'console.log("Editor initialized!");');
  const [theme, setTheme] = useState(localStorage.getItem('code-editor-theme') || 'dark');
  const [consoleLogs, setConsoleLogs] = useState([]);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('code-editor-theme', theme);
  }, [theme]);

  // Auto-save code
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('code-editor-html', html);
      localStorage.setItem('code-editor-css', css);
      localStorage.setItem('code-editor-js', js);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const clearStorage = useCallback(() => {
    if (confirm("Are you sure you want to reset all code?")) {
      setHtml('');
      setCss('');
      setJs('');
      setConsoleLogs([]);
    }
  }, []);
  
  const addLog = useCallback((logItem) => {
    setConsoleLogs(prev => [...prev, logItem]);
  }, []);
  
  const clearLogs = useCallback(() => {
    setConsoleLogs([]);
  }, []);

  return (
    <EditorContext.Provider value={{
      html, setHtml,
      css, setCss,
      js, setJs,
      theme, toggleTheme,
      consoleLogs, addLog, clearLogs,
      clearStorage
    }}>
      {children}
    </EditorContext.Provider>
  );
};
