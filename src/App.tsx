import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MindmapView } from './components/MindmapView';
import { ContentDetailPane } from './components/ContentDetailPane';
import { AiAgentChat } from './components/AiAgentChat';
import { MindmapNode } from './types/lopha';
import { Network, FileText, GripVertical, Briefcase } from 'lucide-react';

export default function App() {
  // Screen state
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('root-lopha');
  
  // Mobile responsive view switcher between Mindmap (left) and Details (right)
  const [mobileActiveView, setMobileActiveView] = useState<'mindmap' | 'detail'>('mindmap');

  // AI Chat state
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatInitialPrompt, setAiChatInitialPrompt] = useState<string | undefined>(undefined);

  // Resizable Split Pane state (default 36% for left, clamped between 22% and 65%)
  const [splitRatio, setSplitRatio] = useState<number>(36);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const splitContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSelectNode = (nodeId: string, node?: MindmapNode) => {
    setSelectedNodeId(nodeId);
    // On mobile screens, automatically switch to detail view when a node is clicked
    if (window.innerWidth < 1024) {
      setMobileActiveView('detail');
    }
  };

  const handleOpenAiChatWithPrompt = (prompt?: string) => {
    setAiChatInitialPrompt(prompt);
    setIsAiChatOpen(true);
  };

  // Dragging event handlers for Split Resizer
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !splitContainerRef.current) return;
    const containerRect = splitContainerRef.current.getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;
    const newRatio = (newWidth / containerRect.width) * 100;
    // Clamp between 22% and 65%
    if (newRatio >= 22 && newRatio <= 65) {
      setSplitRatio(Math.round(newRatio * 10) / 10);
    }
  }, [isDragging]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !splitContainerRef.current || !e.touches[0]) return;
    const containerRect = splitContainerRef.current.getBoundingClientRect();
    const newWidth = e.touches[0].clientX - containerRect.left;
    const newRatio = (newWidth / containerRect.width) * 100;
    if (newRatio >= 22 && newRatio <= 65) {
      setSplitRatio(Math.round(newRatio * 10) / 10);
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col bg-[#F7F2EA] text-[#210E00] relative ${isDragging ? 'select-none' : ''}`}>
      
      {/* 1. WELCOME SCREEN (WINDOWS LOCK SCREEN WITH WATER RIPPLE PERTURBATION) */}
      {showWelcome && (
        <WelcomeScreen onEnter={() => setShowWelcome(false)} />
      )}

      <nav aria-label="Điều hướng chính" className="flex shrink-0 items-center justify-between gap-3 border-b border-[#B79372]/30 bg-[#F0E5D5] px-4 py-2 sm:px-6">
        <span className="text-sm font-bold text-[#0D1B44]">LOPHA COFFEE</span>
        <div className="flex gap-1 sm:gap-2">
          <button onClick={() => handleSelectNode('root-lopha')} aria-current={!selectedNodeId.includes('recruitment') ? 'page' : undefined} className={`rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${!selectedNodeId.includes('recruitment') ? 'bg-white text-[#773C1C]' : 'text-[#773C1C] hover:bg-white/60'}`}>Khám phá Lopha</button>
          <button onClick={() => handleSelectNode('branch-recruitment')} aria-current={selectedNodeId.includes('recruitment') ? 'page' : undefined} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${selectedNodeId.includes('recruitment') ? 'bg-[#0D1B44] text-[#F0E5D5]' : 'text-[#0D1B44] hover:bg-white/60'}`}><Briefcase className="h-4 w-4" />Tuyển dụng</button>
        </div>
      </nav>

      {/* 2. TOP MOBILE TAB SWITCHER (VISIBLE ONLY ON SCREENS < 1024px) */}
      <div className="lg:hidden flex items-center bg-[#F0E5D5] border-b border-[#B79372]/30 p-2 text-xs font-semibold shrink-0">
        <button
          onClick={() => setMobileActiveView('mindmap')}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            mobileActiveView === 'mindmap'
              ? 'bg-[#773C1C] text-white shadow font-bold'
              : 'text-[#773C1C] hover:bg-white/60'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Sơ Đồ Mindmap (8 Nhánh)</span>
        </button>

        <button
          onClick={() => setMobileActiveView('detail')}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            mobileActiveView === 'detail'
              ? 'bg-[#0D1B44] text-[#95D0E8] shadow font-bold'
              : 'text-[#0D1B44] hover:bg-white/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Chi Tiết Nội Dung</span>
        </button>
      </div>

      {/* 3. MAIN SPLIT SCREEN: TWO INDEPENDENTLY SCROLLING PANES WITH RESIZER */}
      <div
        ref={splitContainerRef}
        className="flex-1 min-h-0 flex flex-col lg:flex-row max-w-full overflow-hidden relative bg-[#F7F2EA]"
      >
        {/* LEFT COLUMN: INDEPENDENT SCROLL MINDMAP */}
        <section 
          aria-label="Sơ đồ cấu trúc thương hiệu Lopha Coffee"
          style={{ width: window.innerWidth >= 1024 ? `${splitRatio}%` : '100%' }}
          className={`h-full shrink-0 overflow-hidden flex flex-col ${
            mobileActiveView === 'mindmap' ? 'block' : 'hidden lg:block'
          }`}
        >
          <MindmapView
            selectedNodeId={selectedNodeId}
            onSelectNode={handleSelectNode}
            onShowWelcomeScreen={() => setShowWelcome(true)}
          />
        </section>

        {/* DESKTOP DRAGGABLE RESIZER BAR */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onDoubleClick={() => setSplitRatio(36)}
          title="Kéo sang trái/phải để thay đổi kích thước 2 khung. Nhấp đúp để đặt lại mặc định (36%)."
          className={`hidden lg:flex flex-col items-center justify-center w-2.5 hover:w-3.5 z-20 cursor-col-resize select-none transition-all duration-150 border-x border-[#B79372]/30 ${
            isDragging
              ? 'w-3.5 bg-[#773C1C] shadow-[0_0_15px_rgba(119,60,28,0.5)]'
              : 'bg-[#EDE5D8] hover:bg-[#B79372]/40'
          }`}
        >
          {/* Grip pill handle */}
          <div className="w-4 h-14 rounded-full bg-white border border-[#B79372]/50 flex items-center justify-center text-[#773C1C] shadow-sm hover:scale-105 transition-transform">
            <GripVertical className="w-3 h-3" />
          </div>

          {/* Floating Ratio Tooltip while dragging */}
          {isDragging && (
            <div className="absolute top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0D1B44] border border-[#B79372] text-[#F0E5D5] text-[10px] font-mono font-bold whitespace-nowrap shadow-2xl pointer-events-none">
              {splitRatio}% | {(100 - splitRatio).toFixed(1)}%
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INDEPENDENT SCROLL DETAIL PANE */}
        <section 
          aria-label="Nội dung chi tiết mục được chọn"
          style={{ width: window.innerWidth >= 1024 ? `${100 - splitRatio}%` : '100%' }}
          className={`flex-1 min-w-0 h-full overflow-hidden flex flex-col ${
            mobileActiveView === 'detail' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ContentDetailPane
            selectedNodeId={selectedNodeId}
            onNavigateToNode={handleSelectNode}
            onOpenAiChat={handleOpenAiChatWithPrompt}
          />
        </section>
      </div>

      {/* 4. AI AGENT CHAT (TRỢ LÝ CHUYÊN GIA LOPHA) */}
      <AiAgentChat
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onOpen={() => setIsAiChatOpen(true)}
        initialPrompt={aiChatInitialPrompt}
      />

    </div>
  );
}
