import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { motion } from 'framer-motion';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import Console from './components/Console';

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 dark:bg-[#0a0f1d] text-slate-900 dark:text-slate-50 overflow-hidden font-sans animated-bg relative">
      <Header />
       
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-grow w-full h-[calc(100vh-3.5rem)] relative p-2 md:p-3 overflow-hidden z-10"
      >
        <PanelGroup autoSaveId="ide-layout" direction="horizontal" className="h-full w-full rounded-lg overflow-hidden glass-panel shadow-2xl border border-slate-200 dark:border-slate-800 flex">
          
          {/* Left Panel: Editors */}
          <Panel defaultSize={45} minSize={20} className="flex flex-col">
            <PanelGroup autoSaveId="ide-editors" direction="vertical" className="w-full">
              <Panel defaultSize={33} minSize={10}>
                <CodeEditor language="html" />
              </Panel>
              
              <PanelResizeHandle className="h-1.5 bg-slate-200 dark:bg-slate-800/50 hover:bg-blue-500 transition-colors w-full cursor-row-resize z-20" />
              
              <Panel defaultSize={33} minSize={10}>
                <CodeEditor language="css" />
              </Panel>
              
              <PanelResizeHandle className="h-1.5 bg-slate-200 dark:bg-slate-800/50 hover:bg-blue-500 transition-colors w-full cursor-row-resize z-20" />
              
              <Panel defaultSize={34} minSize={10}>
                <CodeEditor language="javascript" />
              </Panel>
            </PanelGroup>
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-blue-500/70 shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:bg-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all h-full cursor-col-resize relative z-20" />
          
          {/* Right Panel: Preview + Console */}
          <Panel defaultSize={55} minSize={20} className="flex flex-col">
            <PanelGroup autoSaveId="ide-preview" direction="vertical" className="w-full flex">
              <Panel defaultSize={70} minSize={20} className="relative z-0 bg-white">
                <Preview />
              </Panel>
              
              <PanelResizeHandle className="h-1 bg-blue-500/70 shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:bg-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all w-full cursor-row-resize z-20 relative" />
              
              <Panel defaultSize={30} minSize={10} className="flex flex-col z-10">
                <Console />
              </Panel>
            </PanelGroup>
          </Panel>
          
        </PanelGroup>
      </motion.div>
    </div>
  );
}

export default App;
