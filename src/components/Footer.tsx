import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  Coffee, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { LOPHA_LEGAL_INFO, LOPHA_CERTIFICATES } from '../data/lophaData';

interface FooterProps {
  onNavigateToNode: (nodeId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToNode }) => {
  return (
    <footer className="bg-[#050e26] text-[#F0E5D5] border-t-2 border-[#B79372]/40 pt-12 pb-8">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Corporate Legal Identity & Official Logo */}
          <div className="space-y-4">
            <div className="space-y-2">
              <img
                src="/LOPHA-LOGO-1.png"
                alt="Lopha Coffee Logo"
                className="h-12 w-auto object-contain drop-shadow"
              />
              <span className="block text-xs text-[#95D0E8] tracking-widest uppercase font-semibold">
                Sự Tinh Khiết Nguyên Bản • Est. 2007
              </span>
            </div>

            <p className="text-xs text-[#F0E5D5]/80 leading-relaxed">
              Trực thuộc <strong>{LOPHA_LEGAL_INFO.companyFullName}</strong>. Tiên phong ứng dụng công nghệ làm sạch sóng siêu âm Cavitation tần số cao 20 - 50 kHz.
            </p>

            <div className="p-3.5 rounded-xl bg-[#08153d] border border-[#B79372]/30 text-xs space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#B79372]">Mã số thuế:</span>
                <strong className="text-[#95D0E8] font-mono text-sm">{LOPHA_LEGAL_INFO.taxCode}</strong>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#B79372]">Thành lập:</span>
                <span className="text-white font-medium">31/12/2007 (Đổi lần 11)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#B79372]">Đại diện pháp luật:</span>
                <span className="text-white font-bold">{LOPHA_LEGAL_INFO.legalRepresentative}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Infrastructure & Production Factory */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#95D0E8] font-serif flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#B79372]" />
              Cơ Sở & Trụ Sở Vận Hành
            </h4>

            <div className="space-y-3 text-xs text-[#F0E5D5]/90">
              <div className="p-3 rounded-lg bg-[#08153d]/60 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-[#B79372] font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Trụ sở chính (TP.HCM):</span>
                </div>
                <p className="text-[#F0E5D5]/80 pl-5">{LOPHA_LEGAL_INFO.headquarters}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#08153d]/60 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-[#95D0E8] font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Nhà máy chế biến Lâm Đồng:</span>
                </div>
                <p className="text-[#F0E5D5]/80 pl-5">{LOPHA_LEGAL_INFO.factory}</p>
              </div>
            </div>

            <div className="pt-1">
              <span className="text-[11px] text-[#B79372] font-semibold block mb-1">Hệ thống Showroom Nam - Bắc:</span>
              <ul className="text-[11px] text-[#F0E5D5]/70 space-y-1">
                {LOPHA_LEGAL_INFO.showrooms.map((s, idx) => (
                  <li key={idx}>• {s.name}: {s.address}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#95D0E8] font-serif flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-[#B79372]" />
              Hạng Mục Chuyên Sâu
            </h4>

            <ul className="space-y-2 text-xs">
              {[
                { id: 'branch-legal', label: 'Hồ sơ pháp lý & năng lực 17+ năm' },
                { id: 'branch-philosophy', label: 'Hành trình 10 năm R&D (Lộ trình 6-3-1)' },
                { id: 'branch-tech', label: 'Công nghệ sóng siêu âm Cavitation' },
                { id: 'branch-products', label: 'Cà phê 100% Robusta & Arabica' },
                { id: 'branch-b2b', label: 'Giải pháp quán cafe & HORECA' },
                { id: 'branch-certs', label: 'Bộ chứng nhận FDA & ISO' },
                { id: 'branch-network', label: 'Mạng lưới Showroom & Liên hệ' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigateToNode(item.id)}
                    className="text-[#F0E5D5]/80 hover:text-[#95D0E8] flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#B79372] group-hover:translate-x-0.5 transition-transform" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Certifications & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#95D0E8] font-serif flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#B79372]" />
              Tiêu Chuẩn & Hotline Hỗ Trợ
            </h4>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {LOPHA_CERTIFICATES.map(c => (
                <span
                  key={c.code}
                  className="px-2.5 py-1 rounded text-[11px] bg-[#08153d] border border-[#B79372]/40 text-[#95D0E8] font-bold"
                >
                  {c.code}
                </span>
              ))}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#08153d]/60 border border-white/5">
                <Phone className="w-4 h-4 text-[#95D0E8]" />
                <div>
                  <span className="text-[10px] text-[#B79372] block">Hotline tổng đài tư vấn:</span>
                  <a href={`tel:${LOPHA_LEGAL_INFO.hotline}`} className="text-sm font-bold text-white font-mono hover:text-[#95D0E8]">
                    {LOPHA_LEGAL_INFO.hotline}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#08153d]/60 border border-white/5">
                <Mail className="w-4 h-4 text-[#B79372]" />
                <div>
                  <span className="text-[10px] text-[#B79372] block">Email chính thức:</span>
                  <span className="text-xs text-white truncate block">{LOPHA_LEGAL_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="tel:1900636529"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B79372] to-[#773C1C] hover:brightness-110 text-[#0D1B44] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Phone className="w-3.5 h-3.5 text-[#0D1B44]" />
                <span>GỌI TƯ VẤN NGAY 1900 636529</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#B79372]/20 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#B79372]/80">
          <div>
            © 2007 - 2026 {LOPHA_LEGAL_INFO.companyFullName}. Bảo lưu mọi quyền.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#95D0E8]">Chứng nhận: FDA • HACCP • ISO 22000 • ISO 9001 • ISO 14005</span>
            <span className="hidden sm:inline">Thủ phủ cà phê Lâm Đồng, Việt Nam</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
