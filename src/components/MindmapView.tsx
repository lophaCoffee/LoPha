import React, { useState } from 'react';
import { 
  Building2, 
  Compass, 
  Waves, 
  Coffee, 
  Briefcase, 
  Award, 
  MapPin, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Sparkles,
  Droplet
} from 'lucide-react';
import { MindmapNode } from '../types/lopha';
import { LOPHA_MINDMAP_TREE } from '../data/lophaData';

interface MindmapViewProps {
  selectedNodeId: string;
  onSelectNode: (nodeId: string, node?: MindmapNode) => void;
  onShowWelcomeScreen?: () => void;
}

// 7 Distinct luxury color themes optimized for the elegant light background (#F7F2EA)
const BRANCH_THEMES: Record<string, {
  accentColor: string;
  borderColor: string;
  activeBorder: string;
  activeBg: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  cardGlow: string;
  connectorColor: string;
  tagText: string;
}> = {
  'branch-legal': {
    accentColor: '#059669',
    borderColor: 'border-l-emerald-600 border-t-emerald-200/60 border-r-emerald-200/60 border-b-emerald-200/60',
    activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
    activeBg: 'bg-emerald-50/70',
    iconBg: 'bg-emerald-100 text-emerald-700',
    iconColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100/80 border-emerald-300 text-emerald-800',
    badgeText: 'text-emerald-800',
    cardGlow: 'shadow-[0_4px_16px_rgba(5,150,105,0.12)]',
    connectorColor: '#059669',
    tagText: 'Pháp Lý & Uy Tín'
  },
  'branch-philosophy': {
    accentColor: '#D97706',
    borderColor: 'border-l-amber-600 border-t-amber-200/60 border-r-amber-200/60 border-b-amber-200/60',
    activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
    activeBg: 'bg-amber-50/70',
    iconBg: 'bg-amber-100 text-amber-700',
    iconColor: 'text-amber-700',
    badgeBg: 'bg-amber-100/80 border-amber-300 text-amber-800',
    badgeText: 'text-amber-800',
    cardGlow: 'shadow-[0_4px_16px_rgba(217,119,6,0.12)]',
    connectorColor: '#D97706',
    tagText: 'Triết Lý 10 Năm R&D'
  },
  'branch-tech': {
    accentColor: '#0284C7',
    borderColor: 'border-l-cyan-600 border-t-cyan-200/60 border-r-cyan-200/60 border-b-cyan-200/60',
    activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/20',
    activeBg: 'bg-cyan-50/70',
    iconBg: 'bg-cyan-100 text-cyan-700',
    iconColor: 'text-cyan-700',
    badgeBg: 'bg-cyan-100/80 border-cyan-300 text-cyan-800',
    badgeText: 'text-cyan-800',
    cardGlow: 'shadow-[0_4px_16px_rgba(2,132,199,0.15)]',
    connectorColor: '#0284C7',
    tagText: 'Công Nghệ Siêu Âm'
  },
  'branch-products': {
    accentColor: '#BE123C',
    borderColor: 'border-l-rose-700 border-t-rose-200/60 border-r-rose-200/60 border-b-rose-200/60',
    activeBorder: 'border-rose-600 ring-2 ring-rose-500/20',
    activeBg: 'bg-rose-50/70',
    iconBg: 'bg-rose-100 text-rose-700',
    iconColor: 'text-rose-700',
    badgeBg: 'bg-rose-100/80 border-rose-300 text-rose-800',
    badgeText: 'text-rose-800',
    cardGlow: 'shadow-[0_4px_16px_rgba(190,18,60,0.12)]',
    connectorColor: '#BE123C',
    tagText: 'Sản Phẩm & Giá'
  },
  'branch-b2b': {
    accentColor: '#7C3AED',
    borderColor: 'border-l-purple-600 border-t-purple-200/60 border-r-purple-200/60 border-b-purple-200/60',
    activeBorder: 'border-purple-500 ring-2 ring-purple-500/20',
    activeBg: 'bg-purple-50/70',
    iconBg: 'bg-purple-100 text-purple-700',
    iconColor: 'text-purple-700',
    badgeBg: 'bg-purple-100/80 border-purple-300 text-purple-800',
    badgeText: 'text-purple-800',
    cardGlow: 'shadow-[0_4px_16px_rgba(124,58,237,0.12)]',
    connectorColor: '#7C3AED',
    tagText: 'Giải Pháp B2B'
  },
  'branch-certs': {
    accentColor: '#A16207',
    borderColor: 'border-l-yellow-600 border-t-yellow-200/60 border-r-yellow-200/60 border-b-yellow-200/60',
    activeBorder: 'border-yellow-600 ring-2 ring-yellow-500/20',
    activeBg: 'bg-yellow-50/70',
    iconBg: 'bg-yellow-100 text-yellow-800',
    iconColor: 'text-yellow-800',
    badgeBg: 'bg-yellow-100/80 border-yellow-300 text-yellow-900',
    badgeText: 'text-yellow-900',
    cardGlow: 'shadow-[0_4px_16px_rgba(161,98,7,0.15)]',
    connectorColor: '#A16207',
    tagText: 'Chứng Nhận Quốc Tế'
  },
  'branch-network': {
    accentColor: '#EA580C',
    borderColor: 'border-l-orange-600 border-t-orange-200/60 border-r-orange-200/60 border-b-orange-200/60',
    activeBorder: 'border-orange-500 ring-2 ring-orange-500/20',
    activeBg: 'bg-orange-50/70',
    iconBg: 'bg-orange-100 text-orange-700',
    iconColor: 'text-orange-700',
    badgeBg: 'bg-orange-100/80 border-orange-300 text-orange-800',
    badgeText: 'text-orange-800',
    cardGlow: 'shadow-[0_4px_16px_rgba(234,88,12,0.12)]',
    connectorColor: '#EA580C',
    tagText: 'Hạ Tầng & Showroom'
  }
};

const DEFAULT_THEME = {
  accentColor: '#773C1C',
  borderColor: 'border-l-[#773C1C] border-t-stone-200 border-r-stone-200 border-b-stone-200',
  activeBorder: 'border-[#773C1C] ring-2 ring-[#773C1C]/20',
  activeBg: 'bg-[#F0E5D5]',
  iconBg: 'bg-[#F0E5D5] text-[#773C1C]',
  iconColor: 'text-[#773C1C]',
  badgeBg: 'bg-stone-100 border-stone-300 text-stone-800',
  badgeText: 'text-stone-800',
  cardGlow: 'shadow-[0_4px_16px_rgba(119,60,28,0.12)]',
  connectorColor: '#773C1C',
  tagText: 'Chi Tiết'
};

export const MindmapView: React.FC<MindmapViewProps> = ({
  selectedNodeId,
  onSelectNode,
  onShowWelcomeScreen
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'branch-legal': true,
    'branch-philosophy': true,
    'branch-tech': true,
    'branch-products': true,
    'branch-b2b': true,
    'branch-certs': true,
    'branch-network': true,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    if (LOPHA_MINDMAP_TREE.children) {
      LOPHA_MINDMAP_TREE.children.forEach(child => {
        allExpanded[child.id] = true;
      });
    }
    setExpandedNodes(allExpanded);
  };

  const collapseAll = () => {
    setExpandedNodes({});
  };

  const getCategoryIcon = (category: string, theme: typeof DEFAULT_THEME) => {
    switch (category) {
      case 'legal':
        return <Building2 className="w-4 h-4" />;
      case 'philosophy':
        return <Compass className="w-4 h-4" />;
      case 'tech':
        return <Waves className="w-4 h-4 animate-pulse" />;
      case 'products':
        return <Coffee className="w-4 h-4" />;
      case 'b2b':
        return <Briefcase className="w-4 h-4" />;
      case 'certs':
        return <Award className="w-4 h-4" />;
      case 'network':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const matchesSearch = (node: MindmapNode): boolean => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchThis = node.label.toLowerCase().includes(q) || node.shortDesc.toLowerCase().includes(q);
    const matchChild = node.children ? node.children.some(c => matchesSearch(c)) : false;
    return matchThis || matchChild;
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#F7F2EA] text-[#210E00] select-none border-r border-[#B79372]/30 overflow-hidden font-['Outfit',sans-serif]"
    >
      {/* Sticky Top Header Bar (Matching Light Luxury Aesthetic) */}
      <div className="p-3.5 border-b border-[#B79372]/30 bg-[#F2ECE1]/95 backdrop-blur-md flex flex-col gap-2.5 shrink-0 z-10 shadow-xs">
        
        {/* Brand Header Line & Water Lockscreen Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src="/LOPHA-LOGO-1.png"
              alt="Lopha Coffee"
              className="h-8 w-auto object-contain drop-shadow-xs"
            />
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#773C1C]/10 text-[#773C1C] text-[10px] font-bold font-mono">
              EST. 2007
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onShowWelcomeScreen && (
              <button
                onClick={onShowWelcomeScreen}
                title="Mở lại màn hình chờ Windows với hiệu ứng gợn sóng nước"
                className="px-2.5 py-1.5 rounded-xl bg-white border border-[#B79372]/50 hover:border-[#0284C7] text-xs font-semibold text-[#0D1B44] flex items-center gap-1.5 transition-all shadow-xs hover:shadow"
              >
                <Droplet className="w-3.5 h-3.5 text-[#0284C7]" />
                <span className="hidden md:inline">Màn hình chờ</span>
              </button>
            )}

            <button
              onClick={expandAll}
              title="Mở rộng tất cả các nhánh"
              className="p-1.5 rounded-xl bg-white border border-[#B79372]/40 hover:border-[#773C1C] text-xs text-stone-700 hover:text-[#773C1C] shadow-xs"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={collapseAll}
              title="Thu gọn tất cả"
              className="p-1.5 rounded-xl bg-white border border-[#B79372]/40 hover:border-[#773C1C] text-xs text-stone-700 hover:text-[#773C1C] shadow-xs"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Search Input on Light Theme */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#773C1C]" />
          <input
            type="text"
            placeholder="Tìm nhánh: FDA, Cavitation, Robusta, 2007..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-white border border-[#B79372]/40 text-[#210E00] placeholder-stone-400 focus:outline-none focus:border-[#0284C7] shadow-inner transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-stone-500 hover:text-black font-semibold"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* INDEPENDENT SCROLL VIEW: Tree Nodes Container */}
      <div 
        tabIndex={0}
        aria-label="Cây sơ đồ mindmap cuộn độc lập"
        className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar overscroll-contain focus:outline-none"
      >
        
        {/* Central Root Node (LOPHA Brand Hub) */}
        <div
          onClick={() => onSelectNode(LOPHA_MINDMAP_TREE.id, LOPHA_MINDMAP_TREE)}
          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group shadow-md ${
            selectedNodeId === LOPHA_MINDMAP_TREE.id
              ? 'border-[#773C1C] bg-white ring-2 ring-[#773C1C]/25 shadow-lg'
              : 'border-[#B79372]/50 bg-white hover:border-[#773C1C] hover:shadow-md'
          }`}
        >
          {/* Subtle gold ribbon top-right */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
            <div className="bg-[#773C1C] text-white text-[8px] font-bold py-0.5 text-center transform rotate-45 translate-x-4 translate-y-2 uppercase shadow-xs">
              Root
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Logo Emblem */}
            <div className="w-12 h-12 rounded-xl bg-[#0D1B44] border border-[#B79372]/40 p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
              <img
                src="/LOPHA-LOGO-3.png"
                alt="Lopha Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-black text-[#0D1B44] tracking-wide truncate font-serif">
                  {LOPHA_MINDMAP_TREE.label}
                </span>
              </div>
              <p className="text-[11px] text-[#773C1C] truncate mt-0.5 font-medium">
                {LOPHA_MINDMAP_TREE.shortDesc}
              </p>
            </div>

            {selectedNodeId === LOPHA_MINDMAP_TREE.id && (
              <CheckCircle2 className="w-5 h-5 text-[#773C1C] shrink-0 animate-pulse" />
            )}
          </div>
        </div>

        {/* 7 First-Level Branches with Distinct Multi-Color Themes */}
        <div className="space-y-2.5 relative pl-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-cyan-500 before:via-rose-600 before:to-orange-500">
          {LOPHA_MINDMAP_TREE.children?.filter(matchesSearch).map((branch, branchIndex) => {
            const isExpanded = !!expandedNodes[branch.id];
            const isSelected = selectedNodeId === branch.id;
            const hasChildren = branch.children && branch.children.length > 0;
            const theme = BRANCH_THEMES[branch.id] || DEFAULT_THEME;

            return (
              <div key={branch.id} className="relative group/branch">
                {/* Horizontal branch connector tick */}
                <div 
                  className="absolute -left-3.5 top-6 w-3.5 h-[2px] transition-colors"
                  style={{ backgroundColor: theme.connectorColor }}
                />

                {/* Primary Branch Node Card */}
                <div
                  onClick={() => {
                    toggleExpand(branch.id);
                    onSelectNode(branch.id, branch);
                  }}
                  className={`p-3.5 rounded-2xl border-l-4 border transition-all cursor-pointer relative bg-white ${
                    isSelected
                      ? `${theme.activeBorder} ${theme.activeBg} ${theme.cardGlow}`
                      : `${theme.borderColor} hover:shadow-md hover:translate-x-0.5`
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Expand/Collapse Caret */}
                    {hasChildren && (
                      <button
                        onClick={(e) => toggleExpand(branch.id, e)}
                        className="mt-0.5 p-0.5 rounded text-stone-500 hover:text-black transition-transform"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-stone-700" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-stone-700" />
                        )}
                      </button>
                    )}

                    {/* Category Icon */}
                    <div className={`p-1.5 rounded-xl ${theme.iconBg} shrink-0 mt-0.5 shadow-xs`}>
                      {getCategoryIcon(branch.category, theme)}
                    </div>

                    {/* Branch Label & Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-xs md:text-sm font-bold tracking-tight text-[#0D1B44] truncate font-['Outfit']">
                          {branchIndex + 1}. {branch.label}
                        </span>
                        {branch.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold shrink-0 border ${theme.badgeBg}`}>
                            {branch.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1 line-clamp-1 leading-snug">
                        {branch.shortDesc}
                      </p>
                    </div>

                    {isSelected && (
                      <div 
                        className="w-2.5 h-2.5 rounded-full shrink-0 mt-2 animate-ping"
                        style={{ backgroundColor: theme.accentColor }}
                      />
                    )}
                  </div>
                </div>

                {/* Sub-Nodes (Child Nodes) */}
                {isExpanded && hasChildren && (
                  <div className="mt-2 ml-5 space-y-1.5 relative pl-3.5 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-stone-300">
                    {branch.children?.filter(matchesSearch).map((child) => {
                      const isChildSelected = selectedNodeId === child.id;

                      return (
                        <div
                          key={child.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectNode(child.id, child);
                          }}
                          className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer relative flex items-start gap-2.5 ${
                            isChildSelected
                              ? `bg-white border-2 shadow-sm font-semibold`
                              : `bg-white/70 border-stone-200/80 text-stone-700 hover:bg-white hover:border-stone-400 hover:shadow-xs`
                          }`}
                          style={{
                            borderColor: isChildSelected ? theme.accentColor : undefined
                          }}
                        >
                          {/* Connector Tick */}
                          <div 
                            className="absolute -left-3.5 top-4 w-3.5 h-[1.5px]"
                            style={{ backgroundColor: theme.connectorColor, opacity: 0.7 }}
                          />

                          <div 
                            className="w-2 h-2 rounded-full mt-1.5 shrink-0" 
                            style={{ backgroundColor: isChildSelected ? theme.accentColor : '#a8a29e' }}
                          />
                          
                          <div className="flex-1 min-w-0">
                            <p 
                              className={`text-[12px] truncate font-['Space_Grotesk'] ${
                                isChildSelected ? 'font-bold text-[#0D1B44]' : 'text-stone-800'
                              }`}
                            >
                              {child.label}
                            </p>
                            <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">
                              {child.shortDesc}
                            </p>
                          </div>

                          {isChildSelected && (
                            <span 
                              className="text-[9px] px-2 py-0.5 rounded-md font-bold shrink-0 border"
                              style={{
                                backgroundColor: `${theme.accentColor}15`,
                                color: theme.accentColor,
                                borderColor: `${theme.accentColor}40`
                              }}
                            >
                              Đang xem
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mindmap Footer Info */}
      <div className="p-3 border-t border-[#B79372]/30 bg-[#F2ECE1] text-[11px] text-stone-600 flex items-center justify-between shrink-0 shadow-xs">
        <span className="flex items-center gap-1.5 text-[#773C1C] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
          Cuộn độc lập • Nhấp nhánh để xem chi tiết
        </span>
        <span className="text-stone-500 font-mono text-[10px]">
          7 Nhánh • 21 Mục
        </span>
      </div>
    </div>
  );
};
