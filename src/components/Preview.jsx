import React, { useContext, useEffect, useRef } from 'react';
import { EditorContext } from '../context/EditorContext';

export default function Preview() {
  const { html, css, js, addLog, clearLogs } = useContext(EditorContext);
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      // Make sure message is from our iframe
      if (event.data && event.data.type === 'CONSOLE_MESSAGE') {
        addLog({
          level: event.data.level,
          args: event.data.args,
          timestamp: new Date().toISOString()
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addLog]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearLogs();
      const iframe = iframeRef.current;
      if (!iframe) return;

      const documentContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 16px; font-family: sans-serif; color: #1e293b; background: white; }
            ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            ::-webkit-scrollbar-track {
              background: transparent;
            }
            ::-webkit-scrollbar-thumb {
              background: linear-gradient(to right, rgba(59, 130, 246, 0.7), rgba(99, 102, 241, 0.9));
              border-radius: 4px;
              border: 1px solid rgba(59, 130, 246, 0.3);
            }
            ::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to right, rgba(59, 130, 246, 0.9), rgba(99, 102, 241, 1));
            }
            ${css}
          </style>
          <script>
            // Intercept console.log
            const originalConsole = {
              log: console.log,
              error: console.error,
              warn: console.warn,
              info: console.info
            };

            const sendLog = (level, ...args) => {
              const parsedArgs = args.map(arg => {
                try {
                  return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
                } catch (e) {
                  return String(arg);
                }
              });
              
              window.parent.postMessage({
                type: 'CONSOLE_MESSAGE',
                level,
                args: parsedArgs
              }, '*');
            };

            console.log = (...args) => { originalConsole.log(...args); sendLog('log', ...args); };
            console.error = (...args) => { originalConsole.error(...args); sendLog('error', ...args); };
            console.warn = (...args) => { originalConsole.warn(...args); sendLog('warn', ...args); };
            console.info = (...args) => { originalConsole.info(...args); sendLog('info', ...args); };

            window.addEventListener('error', (e) => {
              sendLog('error', e.message);
            });
          </script>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (err) {
              console.error(err.message);
            }
          </script>
        </body>
        </html>
      `;
      
      const blob = new Blob([documentContent], { type: 'text/html' });
      const currentUrl = iframe.src;
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      
      iframe.src = URL.createObjectURL(blob);
    }, 800);

    return () => clearTimeout(timeout);
  }, [html, css, js, clearLogs]);

  return (
    <div className="w-full h-full bg-white relative transition-all duration-300 hover-glow group">
      <iframe
        ref={iframeRef}
        title="preview"
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-same-origin allow-modals"
      />
    </div>
  );
}
