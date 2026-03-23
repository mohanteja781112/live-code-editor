import React, { useContext, useRef, useEffect } from 'react';
import { EditorContext } from '../context/EditorContext';
import { Terminal, Ban } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Console() {
  const { consoleLogs, clearLogs } = useContext(EditorContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  return (
    <div className="flex flex-col h-full w-full bg-editor border-t-2 border-slate-200 dark:border-slate-800 z-10 transition-all duration-300 hover-glow">
      <div className="flex items-center justify-between px-4 py-2 border-b border-panel-border glass-panel">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Terminal size={16} />
          <span className="text-xs font-bold tracking-wider font-mono uppercase">Console Output</span>
        </div>
        <button 
          onClick={clearLogs}
          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 transition-colors"
          title="Clear console"
        >
          <Ban size={14} />
        </button>
      </div>
      
      <div className="flex-grow overflow-auto p-2 font-mono text-sm custom-scrollbar bg-white dark:bg-[#1e1e1e]">
        {consoleLogs.length === 0 ? (
          <div className="text-slate-400 dark:text-slate-500 italic text-xs h-full flex mt-2 justify-center">
            No logs to display
          </div>
        ) : (
          <div className="flex flex-col">
            {consoleLogs.map((log, i) => (
              <div 
                key={i} 
                className={cn(
                  "py-1 px-2 border-b border-slate-100 dark:border-slate-800/50 flex gap-2 last:border-0",
                  log.level === 'error' ? 'text-red-500 bg-red-50 dark:bg-red-900/10' : 
                  log.level === 'warn' ? 'text-orange-500 bg-orange-50 dark:bg-orange-900/10' : 
                  'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                )}
              >
                <span className="text-slate-400 dark:text-slate-500 text-xs select-none">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' })}
                </span>
                <span className="whitespace-pre-wrap flex-1">{log.args.join(' ')}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
}
