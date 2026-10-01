import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Layers, 
  Waves, 
  Award, 
  Coffee, 
  Briefcase, 
  ChevronRight, 
  ArrowUp,
  ShieldCheck, 
  Filter, 
  Send,
  Droplet,
  Check
} from 'lucide-react';
import { 
  LOPHA_LEGAL_INFO, 
  LOPHA_PRODUCTS, 
  LOPHA_B2B_SOLUTIONS, 
  LOPHA_CERTIFICATES, 
  LOPHA_LOCATIONS, 
  LOPHA_BRAND_COLORS 
} from '../data/lophaData';
import { CavitationSimulator } from './CavitationSimulator';
import { Footer } from './Footer';
import { RecruitmentView } from './RecruitmentView';

interface ContentDetailPaneProps {
  selectedNodeId: string;
  onNavigateToNode: (nodeId: string) => void;
  onOpenAiChat: (initialPrompt?: string) => void;
}

export const ContentDetailPane: React.FC<ContentDetailPaneProps> = ({
  selectedNodeId,
  onNavigateToNode,
  onOpenAiChat,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Automatically scroll content to top whenever a new mindmap node is clicked
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedNodeId]);

  // Local state for product filters & size selector
  const [selectedPackSizes, setSelectedPackSizes] = useState<Record<string, string>>({
    'robusta-ultrasonic': '250g',
    'arabica-ultrasonic': '250g',
    'blend-ultrasonic': '250g',
    'phin-lopha-premium': 'Hộp 01 Phin',
  });

  // B2B Quote Form state
  const [quoteForm, setQuoteForm] = useState({
    businessName: '',
    phone: '',
    businessType: 'Quán Cà Phê / Coffee Shop',
    estimatedVolume: '10 - 30 kg/tháng',
    message: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Active Certificate Modal
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const handlePackChange = (productId: string, size: string) => {
    setSelectedPackSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setQuoteForm({
        businessName: '',
        phone: '',
        businessType: 'Quán Cà Phê / Coffee Shop',
        estimatedVolume: '10 - 30 kg/tháng',
        message: ''
      });
    }, 4500);
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine section category from selectedNodeId
  const getActiveSection = () => {
    if (selectedNodeId.includes('recruitment')) return 'recruitment';
    if (selectedNodeId.includes('legal')) return 'legal';
    if (selectedNodeId.includes('philo') || selectedNodeId.includes('philosophy')) return 'philosophy';
    if (selectedNodeId.includes('tech') || selectedNodeId.includes('cavitation')) return 'tech';
    if (selectedNodeId.includes('prod') || selectedNodeId.includes('products')) return 'products';
    if (selectedNodeId.includes('b2b')) return 'b2b';
    if (selectedNodeId.includes('cert')) return 'certs';
    if (selectedNodeId.includes('net') || selectedNodeId.includes('network')) return 'network';
    return 'overview';
  };

  const activeSection = getActiveSection();

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto bg-[#F7F2EA] text-[#210E00] p-4 sm:p-6 lg:p-8 custom-scrollbar relative"
    >
      
      {/* Top Breadcrumb & Quick Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#B79372]/30">
        <div className="flex items-center gap-2 text-xs md:text-sm text-[#773C1C]">
          <span className="font-semibold cursor-pointer hover:underline text-[#773C1C]" onClick={() => onNavigateToNode('root-lopha')}>
            Lopha Coffee
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#B79372]" />
          <span className="font-bold text-[#0D1B44] capitalize bg-white/70 px-2.5 py-1 rounded-md border border-[#B79372]/30">
            {activeSection === 'overview' && 'Tổng Quan Báo Cáo Chuyên Sâu'}
            {activeSection === 'legal' && 'Hồ Sơ Pháp Lý & Năng Lực Doanh Nghiệp'}
            {activeSection === 'philosophy' && 'Định Vị, Câu Chuyện & 10 Năm R&D'}
            {activeSection === 'tech' && 'Đột Phá Công Nghệ Siêu Âm Cavitation'}
            {activeSection === 'products' && 'Danh Mục Sản Phẩm Tinh Khiết B2C'}
            {activeSection === 'b2b' && 'Giải Pháp Doanh Nghiệp B2B & HORECA'}
            {activeSection === 'certs' && 'Hệ Thống Tiêu Chuẩn Quốc Tế FDA & ISO'}
            {activeSection === 'network' && 'Hạ Tầng, Showroom & Kênh Liên Hệ'}
            {activeSection === 'recruitment' && 'Tuyển Dụng – Gia Nhập Lopha'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {activeSection !== 'recruitment' && <button
            onClick={() => onOpenAiChat(`Tóm tắt các điểm cốt lõi về ${activeSection} của Lopha Coffee`)}
            className="px-3.5 py-1.5 rounded-lg bg-[#0D1B44] text-[#F0E5D5] hover:bg-[#773C1C] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#95D0E8]" />
            <span>Hỏi AI về mục này</span>
          </button>}
        </div>
      </div>

      {/* ========================================================
          1. SECTION: OVERVIEW (ROOT)
         ======================================================== */}
      {(activeSection === 'overview' || selectedNodeId === 'root-lopha') && (
        <div className="space-y-6">
          {/* Executive Summary Card with Official Brand Logo */}
          <div className="rounded-3xl bg-gradient-to-br from-[#071333] via-[#0D1B44] to-[#210E00] text-[#F0E5D5] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-[#B79372]/40">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle_at_top_right,rgba(149,208,232,0.15),transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B79372]/20 border border-[#B79372]/40 text-[#95D0E8] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#95D0E8]" />
                  BÁO CÁO PHÂN TÍCH CHUYÊN SÂU THƯƠNG HIỆU & HỒ SƠ NĂNG LỰC
                </div>
                <span className="text-xs font-mono text-[#B79372]">MST: 0305395391</span>
              </div>

              {/* Brand Logo & Corporate Title */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 w-fit">
                  <img
                    src="/LOPHA-LOGO-3.png"
                    alt="Lopha Logo Emblem"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-[#F0E5D5] leading-tight">
                    CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ LONG PHAN
                  </h2>
                  <p className="text-xs sm:text-sm text-[#B79372] uppercase tracking-widest font-semibold mt-1">
                    Thương hiệu thương mại: LOPHA COFFEE • Thành lập từ 31/12/2007
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-[#F0E5D5]/90 max-w-3xl leading-relaxed mb-6 font-light">
                Thương hiệu <strong className="text-[#95D0E8] font-bold">Lopha Coffee</strong> thiết lập chuẩn mực mới cho ngành cà phê sạch tại Việt Nam thông qua triết lý <em>&ldquo;Sự tinh khiết nguyên bản&rdquo;</em>, tiên phong ứng dụng <strong>sóng siêu âm tần số cao Cavitation (20 - 50 kHz)</strong> làm sạch sâu cặn bẩn vi mô và nấm mốc Aflatoxin mà không dùng bất kỳ hóa chất can thiệp nào.
              </p>

              {/* 4 Pillars Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-[#B79372]/30">
                <div className="p-3.5 rounded-2xl bg-[#03091c]/80 border border-[#B79372]/30">
                  <span className="block text-2xl sm:text-3xl font-bold text-[#B79372] font-serif">17+ Năm</span>
                  <span className="text-[11px] text-[#F0E5D5]/80">Nền tảng vận hành uy tín (2007 - 2024)</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#03091c]/80 border border-[#B79372]/30">
                  <span className="block text-2xl sm:text-3xl font-bold text-[#95D0E8] font-serif">10 Năm</span>
                  <span className="text-[11px] text-[#F0E5D5]/80">Hành trình R&D chuẩn hóa (6 - 3 - 1)</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#03091c]/80 border border-[#B79372]/30">
                  <span className="block text-2xl sm:text-3xl font-bold text-[#B79372] font-serif">20-50 kHz</span>
                  <span className="text-[11px] text-[#F0E5D5]/80">Tần số siêu âm Cavitation bóc nấm mốc</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#03091c]/80 border border-[#B79372]/30">
                  <span className="block text-2xl sm:text-3xl font-bold text-[#95D0E8] font-serif">6 Chuẩn</span>
                  <span className="text-[11px] text-[#F0E5D5]/80">FDA Hoa Kỳ, ISO 22000, HACCP, ISO 9001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation Cards across the 7 modules */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bold text-[#773C1C] font-serif flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#B79372]" />
                8 Mục Khám Phá Lopha Coffee
              </h3>
              <span className="text-xs text-[#773C1C]/70">Nhấp thẻ để xem mục tương ứng</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { id: 'branch-legal', title: '1. Pháp Lý & Năng Lực', desc: 'MST 0305395391, 11 lần ĐKKD, ĐDPL Phan Văn Quế', icon: Building2 },
                { id: 'branch-philosophy', title: '2. Triết Lý & R&D 10 Năm', desc: 'Tinh khiết nguyên bản, lộ trình 6-3-1, 3 giá trị cốt lõi', icon: Clock },
                { id: 'branch-tech', title: '3. Công Nghệ Siêu Âm USP', desc: 'Cavitation 20-50kHz, bóc tách Aflatoxin vi mô', icon: Waves },
                { id: 'branch-products', title: '4. Sản Phẩm B2C & Bảng Giá', desc: 'Robusta, Arabica, Blend & Phin cao cấp niêm yết', icon: Coffee },
                { id: 'branch-b2b', title: '5. Giải Pháp B2B & HORECA', desc: 'Quán cafe, khách sạn, văn phòng & OEM Lâm Đồng', icon: Briefcase },
                { id: 'branch-certs', title: '6. Chứng Nhận FDA & ISO', desc: 'FDA Mỹ, HACCP, ISO 22000, 9001, 14005, ATVSTP', icon: Award },
                { id: 'branch-network', title: '7. Hạ Tầng & Showroom', desc: 'HQ Bình Thạnh, Nhà máy Lâm Đồng, Showrooms Q1, Q2, HN', icon: MapPin },
                { id: 'branch-recruitment', title: '8. Tuyển Dụng', desc: 'Sales tư vấn khách hàng & Marketing hỗ trợ dự án', icon: Briefcase },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateToNode(item.id)}
                  className="p-4 rounded-2xl bg-white border border-[#B79372]/30 hover:border-[#773C1C] hover:shadow-lg transition-all cursor-pointer group flex items-start gap-3.5"
                >
                  <div className="p-2.5 rounded-xl bg-[#0D1B44] text-[#95D0E8] group-hover:bg-[#773C1C] transition-colors shrink-0 shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#0D1B44] group-hover:text-[#773C1C] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#210E00]/70 mt-1 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Visual Identity Standards Table */}
          <div className="rounded-2xl bg-white p-6 border border-[#B79372]/30 shadow-sm">
            <h3 className="text-base font-bold text-[#773C1C] font-serif mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B79372]" />
              Bộ Quy Chuẩn Nhận Diện Thương Hiệu (Brand Color Palette)
            </h3>
            <p className="text-xs text-[#210E00]/80 mb-4">
              Mã màu kỹ thuật và hướng dẫn phân tầng (Layer Hierarchy) áp dụng trên website Lopha Coffee:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {LOPHA_BRAND_COLORS.map((c) => (
                <div key={c.name} className="p-3 rounded-xl border border-[#B79372]/30 bg-[#FBF8F3] flex flex-col justify-between shadow-xs">
                  <div
                    className="w-full h-11 rounded-lg mb-2 shadow-inner border border-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#0D1B44] truncate">{c.name}</h5>
                    <p className="text-[11px] font-mono text-[#773C1C] font-semibold">{c.hex}</p>
                    <p className="text-[10px] text-[#210E00]/70 mt-1 leading-snug line-clamp-2">{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. SECTION: LEGAL & CORPORATE DOSSIER
         ======================================================== */}
      {activeSection === 'legal' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#B79372]/40 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#B79372]/30 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#773C1C]">
                  Hồ Sơ Năng Lực & Căn Cứ Pháp Lý
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-[#0D1B44] mt-1">
                  Thông Tin Doanh Nghiệp Xác Thực
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Đang Hoạt Động (MST 0305395391)
              </span>
            </div>

            {/* Official Data Table */}
            <div className="overflow-x-auto rounded-xl border border-[#B79372]/30">
              <table className="w-full text-xs md:text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-[#0D1B44] text-[#F0E5D5]">
                    <th className="p-3.5 font-semibold w-1/4">Hạng mục thông tin</th>
                    <th className="p-3.5 font-semibold w-2/5">Chi tiết dữ liệu xác thực</th>
                    <th className="p-3.5 font-semibold">Ý nghĩa chiến lược trên Website</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B79372]/20">
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Tên doanh nghiệp đầy đủ</td>
                    <td className="p-3.5 font-semibold text-[#0D1B44]">{LOPHA_LEGAL_INFO.companyFullName}</td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Khẳng định tư cách pháp nhân chính thức tại Footer và Hồ sơ năng lực</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Tên quốc tế</td>
                    <td className="p-3.5 font-mono font-medium text-[#0D1B44]">{LOPHA_LEGAL_INFO.internationalName}</td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Tối ưu hóa đa ngôn ngữ (EN/VI) và phục vụ xuất khẩu B2B</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Thương hiệu thương mại</td>
                    <td className="p-3.5 font-bold text-[#773C1C] font-serif text-base">{LOPHA_LEGAL_INFO.brandName}</td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Nhận diện cốt lõi cho toàn bộ hệ thống sản phẩm, chiến dịch UI/UX</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Mã số thuế (MST)</td>
                    <td className="p-3.5 font-mono font-bold text-[#0D1B44]">{LOPHA_LEGAL_INFO.taxCode}</td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Minh bạch năng lực thuế, phục vụ tích hợp công cụ tra cứu hóa đơn điện tử VAT</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Thời gian thành lập</td>
                    <td className="p-3.5 font-semibold text-[#0D1B44]">{LOPHA_LEGAL_INFO.establishedDate} ({LOPHA_LEGAL_INFO.registrationChanges})</td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Chứng minh bề dày kinh nghiệm hơn 17 năm hoạt động trên thị trường</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Người đại diện pháp luật</td>
                    <td className="p-3.5 font-bold text-[#0D1B44]">{LOPHA_LEGAL_INFO.legalRepresentative}</td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Xác lập uy tín pháp lý trong các hợp đồng hợp tác, gia công và đại lý</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Trụ sở chính</td>
                    <td className="p-3.5 text-[#0D1B44]">{LOPHA_LEGAL_INFO.headquarters}</td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Điểm kết nối giao dịch tài chính, quản trị thương mại và điều hành doanh nghiệp</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Cơ sở nhà máy</td>
                    <td className="p-3.5 text-[#0D1B44]">{LOPHA_LEGAL_INFO.factory}</td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Khẳng định năng lực tự chủ sản xuất và chế biến tại vùng nguyên liệu Tây Nguyên</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Mạng lưới trải nghiệm</td>
                    <td className="p-3.5 text-xs text-[#0D1B44] space-y-1">
                      {LOPHA_LEGAL_INFO.showrooms.map((s, idx) => (
                        <div key={idx}>• {s.address}</div>
                      ))}
                    </td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Điểm dừng chân trải nghiệm sản phẩm thực tế, tăng độ phủ uy tín cho thương hiệu</td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[#773C1C]">Kênh liên hệ chính thức</td>
                    <td className="p-3.5 text-xs text-[#0D1B44]">
                      <div>Hotline: <strong>{LOPHA_LEGAL_INFO.hotline}</strong></div>
                      <div>Email: {LOPHA_LEGAL_INFO.email}</div>
                    </td>
                    <td className="p-3.5 text-xs text-[#210E00]/80">Tích hợp công cụ Call-To-Action (CTA) và hệ thống chăm sóc khách hàng tự động</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Operational Split Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#0D1B44] text-[#F0E5D5] p-6 border border-[#B79372]/30 shadow-md">
              <div className="flex items-center gap-2 mb-2 text-[#95D0E8]">
                <Building2 className="w-5 h-5" />
                <h4 className="font-bold text-sm uppercase">1. Trung Tâm Điều Hành Hành Chính - Thương Mại</h4>
              </div>
              <p className="text-xs text-[#F0E5D5]/90 leading-relaxed mb-3">
                Đặt tại số <strong>207C Nguyễn Xí, Phường Bình Thạnh, TP. Hồ Chí Minh</strong>. Đóng vai trò là đầu mối quản trị tài chính, điều hành chuỗi cung ứng, thương mại điện tử, xúc tiến xuất khẩu và ký kết hợp đồng đại lý.
              </p>
              <div className="text-[11px] p-3 rounded-xl bg-[#071333] border border-[#B79372]/20 text-[#B79372]">
                ✓ Thuận tiện giao dịch với các ngân hàng, sàn thương mại điện tử & đối tác B2B.
              </div>
            </div>

            <div className="rounded-2xl bg-[#773C1C] text-[#F0E5D5] p-6 border border-[#B79372]/40 shadow-md">
              <div className="flex items-center gap-2 mb-2 text-[#F0E5D5]">
                <FactoryIcon className="w-5 h-5 text-[#95D0E8]" />
                <h4 className="font-bold text-sm uppercase">2. Cơ Sở Sản Xuất Chế Biến Lâm Đồng</h4>
              </div>
              <p className="text-xs text-[#F0E5D5]/90 leading-relaxed mb-3">
                Đặt tại <strong>Tổ 5, Phường Đông Gia Nghĩa, Tỉnh Lâm Đồng</strong>. Nằm ngay tâm điểm thủ phủ nguyên liệu cà phê Tây Nguyên, cho phép Lopha kiểm soát tuyệt đối chất lượng hạt tươi từ vườn hái và ứng dụng trực tiếp bể siêu âm Cavitation.
              </p>
              <div className="text-[11px] p-3 rounded-xl bg-[#210E00] border border-[#B79372]/30 text-[#F0E5D5]">
                ✓ Tự chủ 100% dây chuyền siêu âm vi mô, sấy nhiệt thấp & rang mộc khép kín.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. SECTION: PHILOSOPHY & 10-YEAR R&D (6 - 3 - 1)
         ======================================================== */}
      {activeSection === 'philosophy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#B79372]/40 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#773C1C]">
              Định Vị Thương Hiệu & Khởi Nguồn Cảm Hứng
            </span>
            <h3 className="text-2xl font-bold font-serif text-[#0D1B44] mt-1 mb-4">
              &ldquo;Sự Tinh Khiết Nguyên Bản&rdquo; - Không Phải Đích Đến, Mà Là Cách Bắt Đầu
            </h3>

            <div className="prose prose-sm text-[#210E00]/80 space-y-3 leading-relaxed">
              <p>
                Lopha Coffee xác định vị thế cạnh tranh trên thị trường thông qua triết lý <strong>&ldquo;Sự tinh khiết nguyên bản&rdquo;</strong>, loại bỏ hoàn toàn tư duy thương mại ngắn hạn để hướng tới việc thiết lập một chuẩn mực mới cho thưởng thức cà phê sạch tại Việt Nam.
              </p>
              <p>
                Hành trình thương hiệu bắt nguồn từ nỗi trăn trở thực tế khi chứng kiến hàng triệu người tiêu dùng Việt hàng ngày phải tiêu thụ những ly cà phê lẫn tạp chất, pha trộn đậu nành, bắp rang cháy khét cùng hương liệu nhân tạo và hóa chất bảo quản độc hại.
              </p>
              <div className="p-4 rounded-2xl bg-[#F0E5D5] border-l-4 border-[#773C1C] my-4 text-[#773C1C] italic font-serif">
                &ldquo;Bước ngoặt chiến lược xuất hiện khi nhà sáng lập có cơ duyên thưởng thức hương vị của những cây cà phê phát triển hoàn toàn tự nhiên tại vùng đất đỏ Tây Nguyên, không chịu sự can thiệp của phân bón hóa học hay thuốc bảo vệ thực vật. Hương vị thuần khiết, dịu nhẹ, sáng rõ và hậu vị ngọt lành tự nhiên từ trải nghiệm đó đã trở thành động lực cốt lõi để Lopha khởi xướng hành trình 10 năm nghiên cứu và tìm lại giá trị nguyên bản của hạt cà phê.&rdquo;
              </div>
            </div>
          </div>

          {/* 10-Year R&D Visual Timeline (6 - 3 - 1) */}
          <div className="rounded-3xl bg-[#0D1B44] text-[#F0E5D5] p-6 sm:p-8 border border-[#B79372]/40 shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-[#95D0E8]">
              <Clock className="w-5 h-5" />
              <h4 className="text-base md:text-lg font-bold font-serif uppercase tracking-wider">
                Hành Trình 10 Năm Nghiên Cứu & Phát Triển (Lộ Trình 6 - 3 - 1)
              </h4>
            </div>
            <p className="text-xs text-[#F0E5D5]/80 mb-6">
              Hành trình một thập kỷ R&D của Lopha Coffee được cấu trúc chặt chẽ qua 3 giai đoạn tiến hóa công nghệ và quy trình khép kín:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {/* Stage 1: 6 Years */}
              <div className="p-5 rounded-2xl bg-[#071333] border border-[#B79372]/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-extrabold text-[#95D0E8] font-serif">06 NĂM</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#95D0E8]/20 text-[#95D0E8] font-mono">Giai đoạn 1</span>
                  </div>
                  <h5 className="text-sm font-bold text-[#F0E5D5] mb-2 font-serif">
                    Nghiên Cứu Công Nghệ Làm Sạch Chuyên Sâu
                  </h5>
                  <p className="text-xs text-[#F0E5D5]/70 leading-relaxed">
                    Tập trung nghiên cứu và thử nghiệm hàng loạt phương pháp xử lý vật lý vi mô khắt khe, chính thức lựa chọn <strong>sóng siêu âm tần số cao 20 kHz - 50 kHz</strong> làm giải pháp xử lý triệt để cặn bẩn và vi nấm mốc.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#B79372]/20 text-[11px] text-[#B79372]">
                  ✓ Kiểm nghiệm hàng ngàn mẫu vi sinh vật lý
                </div>
              </div>

              {/* Stage 2: 3 Years */}
              <div className="p-5 rounded-2xl bg-[#071333] border border-[#B79372]/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-extrabold text-[#B79372] font-serif">03 NĂM</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#B79372]/20 text-[#B79372] font-mono">Giai đoạn 2</span>
                  </div>
                  <h5 className="text-sm font-bold text-[#F0E5D5] mb-2 font-serif">
                    Hoàn Thiện Quy Trình & Profile Rang Mộc
                  </h5>
                  <p className="text-xs text-[#F0E5D5]/70 leading-relaxed">
                    Tối ưu hóa các thông số kỹ thuật nghiêm ngặt từ nhiệt độ sấy, độ ẩm hạt đến profile rang mộc chuyên biệt, đảm bảo hạt cà phê giữ trọn lớp dầu tự nhiên quý giá mà không bị biến tính hay mất mùi.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#B79372]/20 text-[11px] text-[#95D0E8]">
                  ✓ Bảo toàn 100% tinh dầu thơm nguyên bản
                </div>
              </div>

              {/* Stage 3: 1 Year */}
              <div className="p-5 rounded-2xl bg-[#071333] border border-[#B79372]/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-extrabold text-[#F0E5D5] font-serif">01 NĂM</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 text-[#F0E5D5] font-mono">Giai đoạn 3</span>
                  </div>
                  <h5 className="text-sm font-bold text-[#F0E5D5] mb-2 font-serif">
                    Chuẩn Hóa Sơ Chế Tại Vùng Trồng Lâm Đồng
                  </h5>
                  <p className="text-xs text-[#F0E5D5]/70 leading-relaxed">
                    Dành trọn vẹn 1 năm để chuẩn hóa phương pháp thu hái trái chín 100% và sơ chế ngay tại vùng trồng Lâm Đồng, bảo đảm tính tinh khiết được kiểm soát đồng bộ ngay từ mắt xích nông nghiệp đầu tiên.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#B79372]/20 text-[11px] text-[#B79372]">
                  ✓ Liên kết trực tiếp hộ nông dân chuẩn sinh thái
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Values Cards */}
          <div>
            <h4 className="text-base font-bold text-[#773C1C] font-serif mb-3">
              3 Giá Trị Nền Tảng Cấu Thành Nhân Cách Thương Hiệu Lopha
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-[#B79372]/30 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#F0E5D5] flex items-center justify-center text-[#773C1C] font-serif font-black text-base mb-3">
                  01
                </div>
                <h5 className="text-base font-bold text-[#0D1B44] mb-2 font-serif">
                  THUẦN KHIẾT (Pure)
                </h5>
                <p className="text-xs text-[#210E00]/80 leading-relaxed">
                  Cam kết 100% sản phẩm nguyên chất, không pha trộn đậu nành hay bắp rang, tuyệt đối không sử dụng hương liệu nhân tạo, phụ gia tạo màu hay hóa chất tẩy rửa.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#B79372]/30 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#F0E5D5] flex items-center justify-center text-[#773C1C] font-serif font-black text-base mb-3">
                  02
                </div>
                <h5 className="text-base font-bold text-[#0D1B44] mb-2 font-serif">
                  TRUNG THỰC (Authentic)
                </h5>
                <p className="text-xs text-[#210E00]/80 leading-relaxed">
                  Đòi hỏi sự minh bạch tuyệt đối về nguồn gốc vùng trồng, thông số kỹ thuật rang xay và các hồ sơ kiểm định chất lượng quốc tế (FDA, HACCP, ISO 22000).
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#B79372]/30 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#F0E5D5] flex items-center justify-center text-[#773C1C] font-serif font-black text-base mb-3">
                  03
                </div>
                <h5 className="text-base font-bold text-[#0D1B44] mb-2 font-serif">
                  BẢN NGUYÊN (Original)
                </h5>
                <p className="text-xs text-[#210E00]/80 leading-relaxed">
                  Tôn trọng cá tính tự nhiên của từng thổ nhưỡng và giống hạt, để hương vị cà phê cất lên tiếng nói chân thật nhất mà không bị che đậy bởi phụ gia.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. SECTION: ULTRASONIC CAVITATION TECHNOLOGY (USP)
         ======================================================== */}
      {activeSection === 'tech' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#B79372]/40 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#773C1C]">
              Điểm Khác Biệt Cốt Lõi (Unique Selling Proposition)
            </span>
            <h3 className="text-2xl font-bold font-serif text-[#0D1B44] mt-1 mb-3">
              Đột Phá Công Nghệ Sóng Siêu Âm Tần Số Cao Cavitation
            </h3>
            <p className="text-xs md:text-sm text-[#210E00]/80 leading-relaxed">
              Quy trình làm sạch siêu âm tại nhà máy Long Phan vận hành dựa trên hiện tượng <strong>Cavitation (tạo bọt khí vi mô)</strong> trong môi trường nước tinh khiết. Khi hệ thống phát ra các chùm sóng siêu âm tần số cao từ <strong>20 kHz đến 50 kHz</strong> lan truyền qua nước, hàng triệu bọt khí kích thước siêu nhỏ liên tục được hình thành và sụp vỡ liên tục.
            </p>
          </div>

          {/* Interactive Cavitation Simulator */}
          <CavitationSimulator />

          {/* Deep Comparison Table: Ultrasound vs Traditional Wash */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#B79372]/40 shadow-sm">
            <h4 className="text-base font-bold text-[#0D1B44] font-serif mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#773C1C]" />
              Bảng So Sánh Chuyên Sâu: Cà Phê Siêu Âm vs Cà Phê Rửa Truyền Thống
            </h4>

            <div className="overflow-x-auto rounded-xl border border-[#B79372]/30">
              <table className="w-full text-xs md:text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-[#0D1B44] text-[#F0E5D5]">
                    <th className="p-3.5 font-semibold">Tiêu chí phân tích</th>
                    <th className="p-3.5 font-semibold bg-[#773C1C] text-white">Công Nghệ Siêu Âm Cavitation (Lopha)</th>
                    <th className="p-3.5 font-semibold">Phương Pháp Rửa Nước Truyền Thống</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B79372]/20">
                  <tr className="hover:bg-[#F0E5D5]/30">
                    <td className="p-3.5 font-bold text-[#773C1C]">Phạm vi làm sạch</td>
                    <td className="p-3.5 font-bold text-green-700 bg-green-50/50">
                      Làm sạch sâu cấp độ vi mô, len lỏi vào các rãnh kẽ hạt nhỏ nhất
                    </td>
                    <td className="p-3.5 text-red-700 bg-red-50/30">
                      Chỉ rửa trôi đất cát thô bám trên bề mặt vỏ ngoài
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30">
                    <td className="p-3.5 font-bold text-[#773C1C]">Xử lý bào tử nấm mốc (Aflatoxin)</td>
                    <td className="p-3.5 font-bold text-green-700 bg-green-50/50">
                      Đánh tan và cuốn trôi hoàn toàn bào tử nấm mốc và vi khuẩn
                    </td>
                    <td className="p-3.5 text-red-700 bg-red-50/30">
                      Bào tử nấm mốc vẫn bám chặt trong các kẽ vi mô
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F0E5D5]/30">
                    <td className="p-3.5 font-bold text-[#773C1C]">Tác động lên tế bào hạt</td>
                    <td className="p-3.5 font-bold text-green-700 bg-green-50/50">
                      Bảo toàn nguyên vẹn cấu trúc màng tế bào & lớp dầu thơm quý giá
                    </td>
                    <td className="p-3.5 text-[#210E00]/70">
                      Ngâm nước lâu có thể làm hạt bị ủng nước hoặc lên men không kiểm soát
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          5. SECTION: PRODUCTS & PRICING (B2C)
         ======================================================== */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#B79372]/40 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#773C1C]">
                  Bán Lẻ B2C & Bảng Giá Niêm Yết Chính Hãng
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#0D1B44]">
                  Bộ Sưu Tập Cà Phê Tinh Khiết Siêu Âm
                </h3>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#0D1B44] text-[#95D0E8] text-xs font-bold font-mono">
                100% Rang Mộc Siêu Âm
              </span>
            </div>

            <p className="text-xs md:text-sm text-[#210E00]/80 mb-6">
              Mọi dòng sản phẩm bán lẻ đều trải qua quy trình siêu âm làm sạch sâu tại nhà máy Lâm Đồng và được phân định rõ ràng theo tính chất hạt nguyên bản cũng như phương thức pha chế.
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LOPHA_PRODUCTS.map((prod) => {
                const currentSize = selectedPackSizes[prod.id] || prod.packOptions[0].size;
                const currentOpt = prod.packOptions.find(o => o.size === currentSize) || prod.packOptions[0];

                return (
                  <div
                    key={prod.id}
                    className="rounded-3xl border border-[#B79372]/40 bg-[#FBF8F3] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative h-52 overflow-hidden bg-[#0D1B44]">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full bg-[#0D1B44]/90 text-[#F0E5D5] text-[11px] font-semibold border border-[#B79372]/50 shadow">
                            {prod.tag}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <span className="px-2.5 py-1 rounded-lg bg-[#95D0E8] text-[#0D1B44] text-[10px] font-bold">
                            {prod.format}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <h4 className="text-lg font-bold font-serif text-[#0D1B44] mb-1">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-[#773C1C] italic mb-3">
                          {prod.flavorProfile}
                        </p>
                        <p className="text-xs text-[#210E00]/80 leading-relaxed mb-4">
                          {prod.description}
                        </p>

                        {/* Tasting Scores */}
                        <div className="space-y-1.5 mb-4 p-3.5 rounded-2xl bg-white border border-[#B79372]/20">
                          {prod.characteristics.map(c => (
                            <div key={c.label} className="flex items-center justify-between text-[11px]">
                              <span className="text-[#773C1C] font-medium">{c.label}</span>
                              <div className="flex items-center gap-2 w-1/2">
                                <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#B79372] to-[#773C1C] rounded-full"
                                    style={{ width: `${c.score}%` }}
                                  />
                                </div>
                                <span className="font-mono text-[10px] text-[#0D1B44] font-bold w-6 text-right">
                                  {c.score}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Pack Option Selector */}
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#B79372]/30">
                          <span className="text-xs text-[#773C1C] font-semibold">Quy cách:</span>
                          <div className="flex items-center gap-1.5">
                            {prod.packOptions.map((opt) => (
                              <button
                                key={opt.size}
                                onClick={() => handlePackChange(prod.id, opt.size)}
                                className={`px-3 py-1 text-xs rounded-xl font-semibold transition-all ${
                                  currentSize === opt.size
                                    ? 'bg-[#0D1B44] text-[#95D0E8] border border-[#95D0E8]'
                                    : 'bg-white text-[#0D1B44] border border-[#B79372]/40 hover:border-[#773C1C]'
                                }`}
                              >
                                {opt.size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action Footer */}
                    <div className="p-5 bg-white border-t border-[#B79372]/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#773C1C] block uppercase font-medium">Đơn giá niêm yết:</span>
                        <span className="text-lg font-bold font-serif text-[#0D1B44]">
                          {currentOpt.formattedPrice}
                        </span>
                      </div>
                      <button
                        onClick={() => onOpenAiChat(`Tư vấn cho tôi về ${prod.name} gói ${currentOpt.size} (${currentOpt.formattedPrice}) và cách đặt hàng nhanh`)}
                        className="px-4 py-2.5 rounded-xl bg-[#773C1C] hover:bg-[#0D1B44] text-[#F0E5D5] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Coffee className="w-3.5 h-3.5 text-[#95D0E8]" />
                        <span>Đặt Mua / Tư Vấn</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          6. SECTION: B2B COMMERCIAL SOLUTIONS & OEM
         ======================================================== */}
      {activeSection === 'b2b' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#B79372]/40 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#773C1C]">
              Kênh Đối Tác Thương Mại & HORECA
            </span>
            <h3 className="text-2xl font-bold font-serif text-[#0D1B44] mt-1 mb-3">
              Gói Giải Pháp Chuyên Biệt Dành Cho Doanh Nghiệp
            </h3>
            <p className="text-xs md:text-sm text-[#210E00]/80 leading-relaxed mb-6">
              Bên cạnh mảng bán lẻ B2C, cấu trúc kinh doanh của Lopha Coffee chú trọng phát triển mảng giải pháp doanh nghiệp B2B và kênh HORECA. Doanh nghiệp thiết lập các gói giải pháp chuyên biệt dành cho bốn nhóm đối tượng chính bao gồm Quán cà phê, Nhà hàng, Khách sạn và Văn phòng làm việc, kết hợp năng lực gia công OEM/Private Labeling tại nhà máy Lâm Đồng.
            </p>

            {/* 4 Solutions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {LOPHA_B2B_SOLUTIONS.map((sol) => (
                <div key={sol.id} className="p-6 rounded-2xl border border-[#B79372]/40 bg-[#FBF8F3] flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#0D1B44] text-[#95D0E8] font-semibold mb-2 inline-block">
                      {sol.target}
                    </span>
                    <h4 className="text-base font-bold font-serif text-[#0D1B44] mb-1">
                      {sol.title}
                    </h4>
                    <p className="text-xs text-[#773C1C] italic mb-3">
                      {sol.subtitle}
                    </p>

                    <div className="space-y-2 mb-4">
                      <strong className="text-xs text-[#0D1B44] block">Cam kết chất lượng:</strong>
                      {sol.commitments.map((c, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#210E00]/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 pt-3 border-t border-[#B79372]/30 flex items-center justify-between">
                    <span className="text-[11px] text-[#773C1C]">
                      Sản phẩm: <strong>{sol.recommendedProducts[0]}</strong>
                    </span>
                    <button
                      onClick={() => {
                        setQuoteForm(prev => ({ ...prev, businessType: sol.title }));
                        const formEl = document.getElementById('b2b-quote-anchor');
                        formEl?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0D1B44] text-[#F0E5D5] hover:bg-[#773C1C] text-xs font-semibold transition-colors"
                    >
                      Nhận Báo Giá
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* B2B Quote Inquiry Form */}
            <div id="b2b-quote-anchor" className="rounded-3xl bg-[#0D1B44] text-[#F0E5D5] p-6 sm:p-8 border border-[#B79372]/40 shadow-xl">
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-6">
                  <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#F0E5D5] mb-2">
                    Đăng Ký Nhận Mẫu Thử & Báo Giá Sỉ Doanh Nghiệp
                  </h4>
                  <p className="text-xs text-[#95D0E8]">
                    Hệ thống sẽ chuyển thông tin trực tiếp về bộ phận kinh doanh Công ty Long Phan để phản hồi trong 2 giờ làm việc.
                  </p>
                </div>

                {quoteSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-900/80 border border-emerald-500 text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h5 className="font-bold text-base text-white">Yêu Cầu Đã Được Tiếp Nhận Thành Công!</h5>
                    <p className="text-xs text-emerald-200">
                      Chuyên viên phụ trách B2B của Lopha Coffee sẽ liên hệ số điện thoại <strong>{quoteForm.phone || 'của bạn'}</strong> để gửi Sample Kit và bảng chiết khấu chi tiết.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs text-[#B79372] mb-1 font-medium">Tên Đơn Vị / Công Ty / Chuỗi Quán</label>
                        <input
                          type="text"
                          required
                          value={quoteForm.businessName}
                          onChange={e => setQuoteForm({ ...quoteForm, businessName: e.target.value })}
                          placeholder="VD: The Coffee House, Khách sạn Mường Thanh..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#071333] border border-[#B79372]/30 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#95D0E8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#B79372] mb-1 font-medium">Số Điện Thoại Liên Hệ</label>
                        <input
                          type="tel"
                          required
                          value={quoteForm.phone}
                          onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          placeholder="VD: 0909 123 456 (Anh Tuấn)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#071333] border border-[#B79372]/30 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#95D0E8]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs text-[#B79372] mb-1 font-medium">Gói Giải Pháp Quan Tâm</label>
                        <select
                          value={quoteForm.businessType}
                          onChange={e => setQuoteForm({ ...quoteForm, businessType: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#071333] border border-[#B79372]/30 text-xs text-white focus:outline-none focus:border-[#95D0E8]"
                        >
                          <option>Quán Cà Phê / Coffee Shop</option>
                          <option>Khách Sạn & Resort (HORECA)</option>
                          <option>Văn Phòng Doanh Nghiệp</option>
                          <option>Gia Công OEM & Nhãn Riêng</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-[#B79372] mb-1 font-medium">Sản Lượng Dự Kiến / Tháng</label>
                        <select
                          value={quoteForm.estimatedVolume}
                          onChange={e => setQuoteForm({ ...quoteForm, estimatedVolume: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#071333] border border-[#B79372]/30 text-xs text-white focus:outline-none focus:border-[#95D0E8]"
                        >
                          <option>Dưới 10 kg/tháng</option>
                          <option>10 - 30 kg/tháng</option>
                          <option>30 - 100 kg/tháng</option>
                          <option>Trên 100 kg/tháng (Gia công sỉ)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#B79372] mb-1 font-medium">Ghi Chú Yêu Cầu Riêng (Gu vị, địa chỉ nhận mẫu...)</label>
                      <textarea
                        rows={2}
                        value={quoteForm.message}
                        onChange={e => setQuoteForm({ ...quoteForm, message: e.target.value })}
                        placeholder="VD: Cần mẫu thử 500g Robusta rang vừa cho quán tại Quận 1..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#071333] border border-[#B79372]/30 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#95D0E8]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#B79372] to-[#773C1C] hover:brightness-110 text-[#0D1B44] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                      <Send className="w-4 h-4 text-[#0D1B44]" />
                      <span>GỬI YÊU CẦU BÁO GIÁ & NHẬN SAMPLE KIT MIỄN PHÍ</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          7. SECTION: CERTIFICATIONS & STANDARDS
         ======================================================== */}
      {activeSection === 'certs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#B79372]/40 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#773C1C]">
              Bảo Chứng Quốc Tế & An Toàn Vệ Sinh Thực Phẩm
            </span>
            <h3 className="text-2xl font-bold font-serif text-[#0D1B44] mt-1 mb-3">
              Hệ Thống Tiêu Chuẩn Chất Lượng Đạt Chuẩn Xuất Khẩu
            </h3>
            <p className="text-xs md:text-sm text-[#210E00]/80 leading-relaxed mb-6">
              Các chứng nhận quốc tế từ FDA Hoa Kỳ, HACCP, ISO 22000, ISO 9001 và ISO 14005 là minh chứng đanh thép cho năng lực quản lý chuỗi cung ứng khép kín từ nông trại Lâm Đồng đến tách cà phê thành phẩm của Công ty Long Phan.
            </p>

            {/* Cert Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LOPHA_CERTIFICATES.map((cert) => (
                <div
                  key={cert.code}
                  onClick={() => setActiveCert(cert.code)}
                  className="p-5 rounded-2xl border border-[#B79372]/40 bg-[#FBF8F3] hover:border-[#0D1B44] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-black font-serif text-[#773C1C] group-hover:text-[#0D1B44] transition-colors">
                        {cert.code}
                      </span>
                      <Award className="w-5 h-5 text-[#95D0E8]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#0D1B44] mb-1 leading-snug">
                      {cert.name}
                    </h4>
                    <p className="text-[11px] text-[#773C1C] font-semibold mb-2">
                      Cấp bởi: {cert.issuer}
                    </p>
                    <p className="text-xs text-[#210E00]/80 leading-relaxed line-clamp-3">
                      {cert.scope}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#B79372]/30 flex items-center justify-between text-xs text-[#773C1C] font-semibold">
                    <span>Xem chi tiết hồ sơ</span>
                    <ChevronRight className="w-4 h-4 text-[#B79372] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Detail Modal / Drawer */}
          {activeCert && (
            <div className="p-6 rounded-3xl bg-[#0D1B44] text-[#F0E5D5] border border-[#95D0E8]/50 shadow-2xl relative animate-in fade-in duration-300">
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 text-xs px-3 py-1 rounded-lg bg-[#773C1C] text-[#F0E5D5] hover:bg-[#B79372]"
              >
                Đóng
              </button>
              {(() => {
                const c = LOPHA_CERTIFICATES.find(item => item.code === activeCert);
                if (!c) return null;
                return (
                  <div>
                    <div className="flex items-center gap-2 text-[#95D0E8] mb-1">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-xs font-mono font-bold tracking-widest uppercase">HỒ SƠ BẢO CHỨNG CHẤT LƯỢNG</span>
                    </div>
                    <h4 className="text-xl font-bold font-serif text-[#F0E5D5] mb-2">{c.name} ({c.code})</h4>
                    <p className="text-xs text-[#B79372] mb-3">Tổ chức cấp: {c.issuer}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-[#071333] border border-[#B79372]/30">
                        <strong className="text-[#95D0E8] block mb-1">Phạm vi bảo chứng:</strong>
                        <p className="text-[#F0E5D5]/90 leading-relaxed">{c.scope}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#071333] border border-[#B79372]/30">
                        <strong className="text-[#B79372] block mb-1">Ý nghĩa chiến lược B2B & Xuất khẩu:</strong>
                        <p className="text-[#F0E5D5]/90 leading-relaxed">{c.strategicValue}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          8. SECTION: INFRASTRUCTURE, SHOWROOMS & NETWORK
         ======================================================== */}
      {activeSection === 'network' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#B79372]/40 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#773C1C]">
              Hệ Thống Mạng Lưới Hạ Tầng Nam - Bắc
            </span>
            <h3 className="text-2xl font-bold font-serif text-[#0D1B44] mt-1 mb-3">
              Cơ Sở Nhà Máy, Trụ Sở & Showroom Trải Nghiệm
            </h3>
            <p className="text-xs md:text-sm text-[#210E00]/80 leading-relaxed mb-6">
              Mạng lưới cơ sở hạ tầng được quy hoạch chiến lược giữa trung tâm điều hành TP.HCM, nhà máy chế biến tại Lâm Đồng và hệ thống showroom tại các vị trí đắc địa ở Hà Nội và TP.HCM.
            </p>

            {/* Locations List */}
            <div className="space-y-4">
              {LOPHA_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="p-5 sm:p-6 rounded-2xl border border-[#B79372]/40 bg-[#FBF8F3] hover:border-[#773C1C] transition-all flex flex-col md:flex-row items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-2xl bg-[#0D1B44] text-[#95D0E8] shrink-0 mt-1 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-bold font-serif text-[#0D1B44]">
                          {loc.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#773C1C]/10 text-[#773C1C] font-semibold border border-[#773C1C]/30">
                          {loc.type === 'hq' ? 'Trụ sở chính' : loc.type === 'factory' ? 'Nhà máy chế biến' : 'Showroom'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#773C1C] mb-2 flex items-center gap-1">
                        <span>Địa chỉ:</span> {loc.address}
                      </p>
                      <p className="text-xs text-[#210E00]/80 leading-relaxed mb-2">
                        {loc.role}
                      </p>
                      <p className="text-[11px] text-[#210E00]/60 italic">
                        {loc.strategicValue}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center gap-2 shrink-0 w-full md:w-auto">
                    <a
                      href={`tel:${loc.phone || '1900636529'}`}
                      className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-[#0D1B44] text-[#F0E5D5] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#773C1C] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#95D0E8]" />
                      <span>{loc.phone || '1900 636529'}</span>
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-white border border-[#B79372]/40 text-[#773C1C] text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[#773C1C] transition-colors"
                    >
                      <span>Chỉ đường</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'recruitment' && <RecruitmentView selectedNodeId={selectedNodeId} />}

      {/* Embedded Footer inside independent right scrollable pane */}
      <div className="mt-12 -mx-4 sm:-mx-6 lg:-mx-8 border-t border-[#B79372]/30">
        <Footer onNavigateToNode={onNavigateToNode} />
      </div>

      {/* Floating Scroll to Top button inside detail pane */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-20 z-30 w-10 h-10 rounded-full bg-[#0D1B44] text-[#F0E5D5] border border-[#B79372]/50 shadow-xl flex items-center justify-center hover:bg-[#773C1C] transition-all opacity-85 hover:opacity-100 hover:scale-105"
        title="Cuộn lên đầu trang chi tiết"
      >
        <ArrowUp className="w-4 h-4 text-[#95D0E8]" />
      </button>

    </div>
  );
};

function FactoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </svg>
  );
}
