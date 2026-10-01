import React, { useState } from 'react';
import { 
  Building2, 
  Waves, 
  Coffee, 
  Briefcase, 
  Award, 
  MapPin, 
  Phone, 
  Bot, 
  RotateCcw,
  Sparkles,
  Menu,
  X,
  Droplet
} from 'lucide-react';
import { LOPHA_LEGAL_INFO } from '../data/lophaData';

interface NavbarProps {
  selectedNodeId: string;
  onNavigateToNode: (nodeId: string) => void;
  onShowWelcomeScreen: () => void;
  onOpenAiChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedNodeId,
  onNavigateToNode,
  onShowWelcomeScreen,
  onOpenAiChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'root-lopha', label: 'Tổng Quan', icon: Sparkles },
    { id: 'branch-legal', label: 'Hồ Sơ Pháp Lý', icon: Building2 },
    { id: 'branch-philosophy', label: '10 Năm R&D', icon: Coffee },
    { id: 'branch-tech', label: 'Công Nghệ Siêu Âm', icon: Waves },
    { id: 'branch-products', label: 'Sản Phẩm & Giá', icon: Coffee },
    { id: 'branch-b2b', label: 'Giải Pháp B2B', icon: Briefcase },
    { id: 'branch-certs', label: 'Chứng Nhận FDA/ISO', icon: Award },
    { id: 'branch-network', label: 'Showroom & Hạ Tầng', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#071233]/95 backdrop-blur-md border-b border-[#B79372]/30 text-[#F0E5D5] shadow-lg">
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 md:gap-4">
        
        {/* Left: Official Brand Logo LOPHA-LOGO-1.png */}
        <div 
          onClick={() => onNavigateToNode('root-lopha')}
          className="flex items-center gap-3 cursor-pointer group shrink-0 py-1"
        >
          {/* Logo Image */}
          <div className="flex items-center gap-2">
            <img
              src="/LOPHA-LOGO-1.png"
              alt="Lopha Coffee Logo"
              className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-300 drop-shadow"
              onError={(e) => {
                // If image fails, show fallback logo badge
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="hidden sm:block">
              <span className="block text-[10px] text-[#95D0E8] font-mono tracking-wider font-semibold">
                LONG PHAN CO., LTD • EST. 2007
              </span>
            </div>
          </div>
        </div>

        {/* Center: Navigation Bar Tabs */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = selectedNodeId === item.id || selectedNodeId.startsWith(item.id.replace('branch-', ''));
            return (
              <button
                key={item.id}
                onClick={() => onNavigateToNode(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#12285e] text-[#95D0E8] border border-[#95D0E8]/50 shadow-sm'
                    : 'text-[#F0E5D5]/80 hover:text-[#F0E5D5] hover:bg-white/5'
                }`}
              >
                <item.icon className="w-3.5 h-3.5 text-[#B79372]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Windows Water Ripple Screen Trigger */}
          <button
            onClick={onShowWelcomeScreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B79372]/40 bg-[#0D1B44] hover:border-[#95D0E8] text-xs text-[#F0E5D5] transition-all group shadow-sm"
            title="Mở màn hình chờ Windows với hiệu ứng gợn sóng nước"
          >
            <Droplet className="w-3.5 h-3.5 text-[#95D0E8] group-hover:animate-bounce" />
            <span className="hidden md:inline font-medium">Màn hình chờ</span>
          </button>

          {/* AI Chat Launcher button */}
          <button
            onClick={onOpenAiChat}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#B79372] via-[#773C1C] to-[#0D1B44] hover:brightness-110 text-[#F0E5D5] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#95D0E8]/60 shadow-md"
          >
            <Bot className="w-4 h-4 text-[#95D0E8]" />
            <span className="font-semibold hidden sm:inline">Hỏi AI Lopha</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Hotline Quick Link */}
          <a
            href={`tel:${LOPHA_LEGAL_INFO.hotline}`}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D1B44] border border-[#95D0E8]/40 text-[#95D0E8] text-xs font-bold hover:bg-[#95D0E8] hover:text-[#0D1B44] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1900 636529</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#B79372] hover:text-[#F0E5D5] hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071333] border-b border-[#B79372]/30 p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateToNode(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-xs font-medium text-[#F0E5D5] hover:bg-white/10 flex items-center gap-2 border border-white/5"
              >
                <item.icon className="w-4 h-4 text-[#95D0E8] shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#B79372]/20 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onShowWelcomeScreen();
                setMobileMenuOpen(false);
              }}
              className="text-[#95D0E8] flex items-center gap-1 font-semibold"
            >
              <Droplet className="w-3.5 h-3.5" />
              <span>Màn hình chờ Windows</span>
            </button>
            <a href="tel:1900636529" className="text-[#B79372] font-bold">
              Hotline: 1900 636529
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
