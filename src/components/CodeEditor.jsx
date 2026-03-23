import React, { useContext, useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { EditorContext } from '../context/EditorContext';
import { FileCode2, FileJson, FileType2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function CodeEditor({ language }) {
  const { html, setHtml, css, setCss, js, setJs, theme } = useContext(EditorContext);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  let value = '';
  let onChange = null;
  let icon = null;
  let title = '';
  let colorClass = '';

  switch(language) {
    case 'html':
      value = html;
      onChange = setHtml;
      icon = <FileCode2 size={16} className="text-orange-500" />;
      title = "HTML";
      colorClass = "border-t-2 border-t-orange-500";
      break;
    case 'css':
      value = css;
      onChange = setCss;
      icon = <FileType2 size={16} className="text-blue-500" />;
      title = "CSS";
      colorClass = "border-t-2 border-t-transparent";
      break;
    case 'javascript':
      value = js;
      onChange = setJs;
      icon = <FileJson size={16} className="text-yellow-400" />;
      title = "JavaScript";
      colorClass = "border-t-2 border-t-transparent";
      break;
  }

  const handleEditorChange = (val) => {
    onChange(val || '');
    
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col h-full w-full bg-editor text-foreground transition-all duration-300",
        isTyping ? "typing-active" : "hover-glow group"
      )}
    >
      <div className={cn("flex items-center justify-between px-4 py-2 border-b border-panel-border glass-panel transition-colors", 
        !isTyping ? "group-hover:border-t-blue-400" : "", colorClass)}>
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-bold tracking-wider font-mono uppercase text-slate-600 dark:text-slate-300">{title}</span>
        </div>
      </div>
      <div className="flex-grow w-full relative bg-white dark:bg-[#1e1e1e]">
        <Editor
          height="100%"
          language={language}
          theme={editorTheme}
          value={value}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            lineNumbersMinChars: 3,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            formatOnPaste: true,
            scrollbar: {
              verticalScrollbarSize: 8,
              verticalSliderSize: 8,
              horizontalScrollbarSize: 8,
              horizontalSliderSize: 8,
            }
          }}
          loading={
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          }
        />
      </div>
    </motion.div>
  );
}
