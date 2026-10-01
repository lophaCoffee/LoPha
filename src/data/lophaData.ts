import { LegalEntityInfo, ProductItem, B2BSolution, CertificateItem, LocationItem, MindmapNode } from '../types/lopha';

export const LOPHA_LEGAL_INFO: LegalEntityInfo = {
  companyFullName: 'CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ LONG PHAN',
  internationalName: 'LONG PHAN PRODUCE - TRADING - SERVICES CO.,LTD',
  brandName: 'LOPHA COFFEE',
  taxCode: '0305395391',
  establishedDate: '31/12/2007',
  registrationChanges: 'Đăng ký thay đổi lần thứ 11 ngày 18/10/2024 (Bề dày hơn 17 năm)',
  legalRepresentative: 'PHAN VĂN QUẾ',
  headquarters: '207C Nguyễn Xí, Phường Bình Thạnh, TP. Hồ Chí Minh',
  factory: 'Tổ 5, Phường Đông Gia Nghĩa, Tỉnh Lâm Đồng, Việt Nam',
  showrooms: [
    { name: 'Showroom Trung tâm Quận 1', address: '128A Hai Bà Trưng, P. Đa Kao, Quận 1, TP.HCM' },
    { name: 'Showroom Thảo Điền Quận 2', address: '59 Xa lộ Hà Nội, P. Thảo Điền, Quận 2, TP.HCM' },
    { name: 'Showroom Thủ Đô Hà Nội', address: 'Số 6 Lê Thánh Tông, Q. Hoàn Kiếm, Hà Nội' }
  ],
  hotline: '1900 636529',
  email: 'info@lophacoffee.com / quephan@longphanvn.com'
};

export const LOPHA_PRODUCTS: ProductItem[] = [
  {
    id: 'robusta-ultrasonic',
    name: 'Cà phê Tinh Khiết 100% Robusta Siêu Âm',
    format: 'Hạt rang mộc / Bột rang xay',
    packOptions: [
      { size: '250g', price: 139000, formattedPrice: '139.000 VNĐ' },
      { size: '500g', price: 270000, formattedPrice: '270.000 VNĐ' }
    ],
    flavorProfile: 'Vị đắng đậm đà, thể chất dày (heavy body), thơm hương mộc tự nhiên, hậu vị ngọt kéo dài không gắt.',
    targetAudience: 'Dành cho người yêu thích gu cà phê truyền thống mạnh mẽ, tỉnh táo tập trung cao độ.',
    characteristics: [
      { label: 'Độ đậm (Body)', score: 95 },
      { label: 'Hương thơm (Aroma)', score: 85 },
      { label: 'Độ chua (Acidity)', score: 15 },
      { label: 'Hậu vị ngọt (Aftertaste)', score: 88 }
    ],
    description: 'Tuyển chọn từ những trái cà phê Robusta chín mọng trên độ cao lý tưởng tại Lâm Đồng. Trải qua công nghệ sóng siêu âm Cavitation tần số cao để loại bỏ hoàn toàn cặn bẩn và vi nấm mốc, rang mộc giữ trọn lớp dầu quý giá.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    tag: 'Best-Seller Truyền Thống'
  },
  {
    id: 'arabica-ultrasonic',
    name: 'Cà phê Tinh Khiết 100% Arabica Siêu Âm',
    format: 'Hạt rang mộc / Bột rang xay',
    packOptions: [
      { size: '250g', price: 175000, formattedPrice: '175.000 VNĐ' },
      { size: '500g', price: 340000, formattedPrice: '340.000 VNĐ' }
    ],
    flavorProfile: 'Hương thơm hoa quả trong trẻo, vị chua thanh tao tự nhiên, thể chất mượt mà, hậu vị ngọt mật ong tinh tế.',
    targetAudience: 'Phù hợp gu cà phê hiện đại, tinh tế, người sành thưởng thức Pour-over, Espresso, Cold Brew.',
    characteristics: [
      { label: 'Độ đậm (Body)', score: 70 },
      { label: 'Hương thơm (Aroma)', score: 98 },
      { label: 'Độ chua (Acidity)', score: 75 },
      { label: 'Hậu vị ngọt (Aftertaste)', score: 95 }
    ],
    description: '100% hạt Arabica thượng hạng vùng Cầu Đất - Lâm Đồng. Sóng siêu âm bóc tách vi mô giúp giải phóng trọn vẹn tầng hương hoa quả và cam chanh đặc trưng, không còn cảm giác khét hay chát gắt.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    tag: 'Thượng Hạng Specialty'
  },
  {
    id: 'blend-ultrasonic',
    name: 'Cà phê Tinh Khiết Mix Robusta & Arabica',
    format: 'Hạt rang mộc / Bột rang xay',
    packOptions: [
      { size: '250g', price: 149000, formattedPrice: '149.000 VNĐ' },
      { size: '500g', price: 285000, formattedPrice: '285.000 VNĐ' }
    ],
    flavorProfile: 'Sự kết hợp hoàn hảo giữa độ đậm đằm, dày dặn của Robusta và tầng hương thơm thanh thoát, quyến rũ của Arabica.',
    targetAudience: 'Gu cà phê cân bằng đỉnh cao, thích hợp cho cả pha phin truyền thống và máy espresso gia đình/văn phòng.',
    characteristics: [
      { label: 'Độ đậm (Body)', score: 85 },
      { label: 'Hương thơm (Aroma)', score: 92 },
      { label: 'Độ chua (Acidity)', score: 45 },
      { label: 'Hậu vị ngọt (Aftertaste)', score: 90 }
    ],
    description: 'Tỷ lệ phối trộn độc quyền do các chuyên gia R&D Lopha nghiên cứu suốt 3 năm. Hạt sau khi siêu âm được rang riêng theo từng profile nhiệt độ tối ưu rồi mới phối trộn để đạt độ tròn vị tuyệt đối.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop',
    tag: 'Cân Bằng Hoàn Hảo'
  },
  {
    id: 'phin-lopha-premium',
    name: 'Phin Cà Phê LOPHA Cao Cấp',
    format: 'Phụ kiện pha chế thủ công cao cấp',
    packOptions: [
      { size: 'Hộp 01 Phin', price: 100000, formattedPrice: '100.000 VNĐ' }
    ],
    flavorProfile: 'Chất liệu hợp kim cao cấp đạt chuẩn an toàn thực phẩm, lỗ đục vi mô tinh xảo giúp chiết xuất đều đặn từng giọt cà phê tinh khiết.',
    targetAudience: 'Người yêu thích nghệ thuật pha phin truyền thống của người Việt với thiết kế tối giản, đẳng cấp.',
    characteristics: [
      { label: 'Độ bền vật liệu', score: 100 },
      { label: 'Độ đồng đều chiết xuất', score: 98 },
      { label: 'Thẩm mỹ thiết kế', score: 96 },
      { label: 'Tiện dụng vệ sinh', score: 95 }
    ],
    description: 'Thiết kế phin nhôm Anodize cao cấp chịu nhiệt, dập nổi logo Lopha Coffee sang trọng. Tối ưu hóa lưu lượng dòng chảy để giọt cà phê chiết xuất trọn vẹn tinh dầu mà không bị nghẹt hay chảy quá nhanh.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
    tag: 'Phụ Kiện Chính Hãng'
  }
];

export const LOPHA_B2B_SOLUTIONS: B2BSolution[] = [
  {
    id: 'b2b-cafe',
    title: 'Gói Giải Pháp Quán Cà Phê & Chuỗi F&B',
    subtitle: 'Đồng bộ chất lượng - Định vị menu sạch - Tối ưu biên lợi nhuận',
    target: 'Chuỗi Coffee Shop, Quán Specialty, Cafe Take-away cao cấp',
    commitments: [
      'Chất lượng hạt siêu âm đồng nhất 100% giữa tất cả các lô hàng',
      'Hỗ trợ chuyên gia cupping và tinh chỉnh profile rang riêng biệt cho phong cách của quán',
      'Cung cấp chứng nhận an toàn thực phẩm FDA & ISO phục vụ truyền thông menu sạch',
      'Chính sách giá sỉ ưu đãi theo sản lượng hàng tháng với chiết khấu linh hoạt'
    ],
    keyFeatures: [
      'Nguồn cung ứng ổn định trực tiếp từ nhà máy Lâm Đồng',
      'Miễn phí thử mẫu hạt (Sample Kit) cho barista trưởng',
      'Hỗ trợ đào tạo chuẩn hóa kỹ thuật pha chế & bảo quản',
      'Giao hàng nhanh hỏa tốc tại TP.HCM và Hà Nội'
    ],
    recommendedProducts: ['100% Robusta Siêu Âm', 'Mix Robusta & Arabica', 'Profile rang riêng theo yêu cầu']
  },
  {
    id: 'b2b-restaurant-hotel',
    title: 'Gói Giải Pháp Khách Sạn & Nhà Hàng Cao Cấp (HORECA)',
    subtitle: 'Chuẩn mực quốc tế FDA - Nâng tầm trải nghiệm ẩm thực cho du khách',
    target: 'Khách sạn 4-5 sao, Resort nghỉ dưỡng, Trung tâm hội nghị, Nhà hàng Fine Dining',
    commitments: [
      'Đầy đủ trọn bộ hồ sơ kiểm định quốc tế FDA Hoa Kỳ, ISO 22000, ISO 9001 và HACCP',
      'Đáp ứng tiêu chuẩn khắt khe nhất của du khách quốc tế và các đoàn ngoại giao',
      'Cung cấp đa dạng định dạng: Hạt pha máy tự động, túi lọc tiện lợi, cà phê phin cao cấp',
      'Hỗ trợ in ấn thông tin thương hiệu đồng hành trên bao bì sang trọng'
    ],
    keyFeatures: [
      'Hạt siêu âm không gây say, không kích ứng dạ dày khi dùng cùng bữa sáng buffet',
      'Tư vấn thiết lập quầy Coffee Lounge cao cấp tiêu chuẩn boutique',
      'Chính sách công nợ linh hoạt cho doanh nghiệp lữ hành và khách sạn',
      'Dịch vụ bảo dưỡng máy pha định kỳ miễn phí cho đối tác chiến lược'
    ],
    recommendedProducts: ['100% Arabica Siêu Âm', 'Mix Robusta & Arabica', 'Phin LOPHA cao cấp mạ nhôm']
  },
  {
    id: 'b2b-office',
    title: 'Gói Giải Pháp Doanh Nghiệp & Văn Phòng Làm Việc',
    subtitle: 'Cà phê sạch bảo vệ sức khỏe nhân sự - Khơi nguồn năng lượng sáng tạo',
    target: 'Văn phòng tập đoàn, Công ty công nghệ, Ngân hàng, Cơ quan ban ngành',
    commitments: [
      'Cà phê siêu âm loại bỏ 100% độc tố nấm mốc - giữ sự tỉnh táo an nhiên cả ngày',
      'Gói tài trợ / cho mượn máy pha cà phê tự động một chạm cao cấp',
      'Giao hạt định kỳ hàng tuần, không để văn phòng thiếu hụt cà phê',
      'Xuất đầy đủ hóa đơn điện tử VAT minh bạch chi phí tiếp khách và phúc lợi'
    ],
    keyFeatures: [
      'Bảo trì, vệ sinh máy pha định kỳ 2 tuần/lần bởi kỹ thuật viên Lopha',
      'Đa dạng hương vị phù hợp khẩu vị cả sếp lẫn nhân viên',
      'Tặng kèm phin pha cao cấp cho phòng tiếp khách VIP',
      'Dùng thử 14 ngày miễn phí không cam kết'
    ],
    recommendedProducts: ['Mix Robusta & Arabica', '100% Robusta Siêu Âm', 'Máy pha tự động Ý']
  },
  {
    id: 'b2b-oem',
    title: 'Gia Công OEM & Nhãn Hiệu Riêng (Private Labeling)',
    subtitle: 'Năng lực sản xuất khép kín tại Lâm Đồng - Sở hữu công nghệ siêu âm độc quyền',
    target: 'Các thương hiệu bán lẻ, Chuỗi siêu thị, Doanh nghiệp xuất khẩu cà phê',
    commitments: [
      'Ứng dụng công nghệ làm sạch sóng siêu âm Cavitation độc quyền của Long Phan',
      'Tùy biến bao bì, tem nhãn, quy cách đóng gói theo nhận diện thương hiệu của đối tác',
      'Đạt chuẩn xuất khẩu sang các thị trường khó tính: Hoa Kỳ, EU, Nhật Bản, Hàn Quốc',
      'Bảo mật tuyệt đối công thức và hợp đồng sở hữu trí tuệ'
    ],
    keyFeatures: [
      'Năng lực chế biến nhà máy công suất lớn tại Tổ 5, P. Đông Gia Nghĩa, Lâm Đồng',
      'Kiểm soát nghiêm ngặt từ khâu thu hái, siêu âm, sấy kiểm soát độ ẩm đến đóng gói',
      'Hỗ trợ làm thủ tục hải quan và hồ sơ công bố chất lượng trọn gói',
      'Thời gian sản xuất mẫu nhanh chóng từ 3-5 ngày làm việc'
    ],
    recommendedProducts: ['Hạt cà phê siêu âm thô xuất khẩu', 'Thành phẩm đóng gói nhãn riêng', 'Cà phê túi lọc OEM']
  }
];

export const LOPHA_CERTIFICATES: CertificateItem[] = [
  {
    code: 'FDA',
    name: 'Chứng Nhận Cục Quản Lý Thực Phẩm & Dược Phẩm Hoa Kỳ',
    issuer: 'Food and Drug Administration (Hoa Kỳ)',
    scope: 'Bảo chứng an toàn thực phẩm cấp độ toàn cầu, đủ điều kiện lưu hành và xuất khẩu vào thị trường Mỹ.',
    strategicValue: 'Xóa bỏ rào cản kỹ thuật xuất khẩu, khẳng định chất lượng tuyệt đối cho đối tác thương mại.',
    icon: 'ShieldCheck'
  },
  {
    code: 'HACCP',
    name: 'Hệ Thống Phân Tích Mối Nguy & Điểm Kiểm Soát Tới Hạn',
    issuer: 'Tổ chức Đánh giá An toàn Thực phẩm Quốc tế',
    scope: 'Xác nhận hệ thống quản lý mối nguy hại sinh học, hóa học và vật lý trong toàn bộ chuỗi sản xuất.',
    strategicValue: 'Cam kết quy trình sản xuất không có rủi ro nhiễm khuẩn và tạp chất độc hại.',
    icon: 'Award'
  },
  {
    code: 'ISO 22000',
    name: 'Hệ Thống Quản Lý An Toàn Thực Phẩm Toàn Diện',
    issuer: 'Tổ chức Chuẩn hóa Quốc tế (ISO)',
    scope: 'Quản lý toàn diện chuỗi cung ứng thực phẩm từ khâu nông trại Lâm Đồng đến tách cà phê thành phẩm.',
    strategicValue: 'Bảo chứng an toàn thực phẩm xuyên suốt chuỗi giá trị nông nghiệp khép kín.',
    icon: 'CheckCircle2'
  },
  {
    code: 'ISO 9001',
    name: 'Hệ Thống Quản Lý Chất Lượng Vận Hành Doanh Nghiệp',
    issuer: 'Tổ chức Chuẩn hóa Quốc tế (ISO)',
    scope: 'Chứng nhận năng lực điều hành, quản trị chất lượng sản xuất và dịch vụ khách hàng chuẩn quốc tế.',
    strategicValue: 'Khẳng định sự chuyên nghiệp, chuẩn hóa và ổn định của Công ty Long Phan hơn 17 năm qua.',
    icon: 'FileCheck'
  },
  {
    code: 'ISO 14005',
    name: 'Hệ Thống Quản Lý Môi Trường Doanh Nghiệp Bền Vững',
    issuer: 'Tổ chức Chuẩn hóa Quốc tế (ISO)',
    scope: 'Đánh giá tác động môi trường, tối ưu hóa năng lượng và cam kết phát triển nông nghiệp xanh bền vững.',
    strategicValue: 'Khẳng định tinh thần trách nhiệm xã hội và mô hình sản xuất sinh thái thân thiện.',
    icon: 'Leaf'
  },
  {
    code: 'CN-ATVSTP',
    name: 'Giấy Chứng Nhận Cơ Sở Đủ Điều Kiện ATVSTP Việt Nam',
    issuer: 'Cơ quan Quản lý An toàn Thực phẩm Việt Nam',
    scope: 'Đảm bảo 100% điều kiện pháp lý về an toàn vệ sinh thực phẩm khi lưu hành và phân phối nội địa.',
    strategicValue: 'Cơ sở pháp lý nền tảng bắt buộc để phân phối vào hệ thống bán lẻ và chuỗi siêu thị.',
    icon: 'BadgeCheck'
  }
];

export const LOPHA_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-hq',
    type: 'hq',
    name: 'Trụ Sở Chính - Công Ty Long Phan',
    address: '207C Nguyễn Xí, Phường Bình Thạnh, TP. Hồ Chí Minh',
    role: 'Trung tâm điều hành hành chính - thương mại, quản lý tài chính, phát triển thị trường và giao dịch hợp đồng B2B.',
    strategicValue: 'Đầu mối kết nối pháp lý, làm việc với đối tác tài chính và phân phối toàn quốc.',
    phone: '1900 636529'
  },
  {
    id: 'loc-factory',
    type: 'factory',
    name: 'Cơ Sở Nhà Máy Sản Xuất & Chế Biến Lâm Đồng',
    address: 'Tổ 5, Phường Đông Gia Nghĩa, Tỉnh Lâm Đồng, Việt Nam',
    role: 'Nhà máy chế biến trực tiếp, hệ thống bể siêu âm Cavitation công suất lớn, máy sấy kiểm soát độ ẩm và xưởng rang mộc.',
    strategicValue: 'Tiếp cận trực tiếp vùng nguyên liệu Tây Nguyên, kiểm soát nguồn hạt tươi và tự chủ công nghệ sản xuất.',
    phone: '0903 123 456'
  },
  {
    id: 'loc-sr1',
    type: 'showroom',
    name: 'Showroom Trải Nghiệm Trung Tâm Quận 1',
    address: '128A Hai Bà Trưng, P. Đa Kao, Quận 1, TP.HCM',
    role: 'Không gian thử nếm (Cupping Room), trưng bày sản phẩm bán lẻ và tiếp đón đối tác ngoại giao, khách du lịch.',
    strategicValue: 'Tọa lạc tại tuyến phố tài chính sầm uất bậc nhất Sài Gòn, nâng tầm nhận diện thương hiệu cao cấp.',
    phone: '1900 636529'
  },
  {
    id: 'loc-sr2',
    type: 'showroom',
    name: 'Showroom Trải Nghiệm Thảo Điền Quận 2',
    address: '59 Xa lộ Hà Nội, P. Thảo Điền, Quận 2, TP.HCM',
    role: 'Điểm trải nghiệm cà phê sạch phục vụ cộng đồng chuyên gia quốc tế và cư dân cao cấp khu đô thị sáng tạo.',
    strategicValue: 'Tiếp cận phân khúc khách hàng tinh tế, yêu chuộng lối sống xanh và chú trọng sức khỏe.',
    phone: '1900 636529'
  },
  {
    id: 'loc-sr3',
    type: 'showroom',
    name: 'Showroom Trải Nghiệm Thủ Đô Hà Nội',
    address: 'Số 6 Lê Thánh Tông, Q. Hoàn Kiếm, TP. Hà Nội',
    role: 'Chi nhánh đại diện miền Bắc, tiếp đón các tập đoàn, cơ quan trung ương và đối tác xuất khẩu tại Hà Nội.',
    strategicValue: 'Vị trí đắc địa ngay trung tâm Hoàn Kiếm, bảo đảm độ phủ uy tín thương hiệu trên phạm vi toàn quốc.',
    phone: '1900 636529'
  }
];

export const LOPHA_BRAND_COLORS = [
  {
    name: 'White Chocolate',
    hex: '#F0E5D5',
    rgb: '240, 229, 213',
    cmyk: 'C:5, M:8, Y:15, K:0',
    usage: 'Màu nền sáng chủ đạo (Primary Light Background), thẻ nội dung, khoảng trắng thư thái.'
  },
  {
    name: 'Chamoisee',
    hex: '#B79372',
    rgb: '183, 147, 114',
    cmyk: 'C:28, M:41, Y:58, K:3',
    usage: 'Màu phụ trợ, khung viền card, đường phân tách tinh xảo, trạng thái hover của nút bấm.'
  },
  {
    name: 'Sepia',
    hex: '#773C1C',
    rgb: '119, 60, 28',
    cmyk: 'C:34, M:76, Y:97, K:38',
    usage: 'Màu điểm nhấn thương hiệu (Brand Accent), tiêu đề phụ, icon nghệ thuật, tông màu cà phê ấm.'
  },
  {
    name: 'Oxford Blue',
    hex: '#0D1B44',
    rgb: '13, 27, 68',
    cmyk: 'C:100, M:92, Y:39, K:48',
    usage: 'Màu nền tối cao cấp (Dark Background), Footer, Navigation Bar cố định, Màn hình chào.'
  },
  {
    name: 'Cornflower',
    hex: '#95D0E8',
    rgb: '149, 208, 232',
    cmyk: 'C:39, M:4, Y:4, K:0',
    usage: 'Màu nhấn công nghệ (Tech Highlight), biểu tượng sóng siêu âm, bọt khí Cavitation, badge tính năng đột phá.'
  },
  {
    name: 'Root Beer',
    hex: '#210E00',
    rgb: '33, 14, 0',
    cmyk: 'C:60, M:70, Y:74, K:81',
    usage: 'Màu văn bản chính (Body Text) trên nền sáng, độ tương phản hoàn hảo theo chuẩn Accessibility.'
  }
];

export const LOPHA_MINDMAP_TREE: MindmapNode = {
  id: 'root-lopha',
  label: 'HỆ THỐNG THƯƠNG HIỆU LOPHA COFFEE',
  shortDesc: 'Công ty TNHH Sản xuất - Thương mại - Dịch vụ Long Phan (2007)',
  category: 'root',
  badge: 'Trung Tâm',
  children: [
    {
      id: 'branch-legal',
      label: 'Hồ Sơ Pháp Lý & Năng Lực Doanh Nghiệp',
      shortDesc: 'Minh bạch pháp nhân 17+ năm, MST 0305395391, đại diện Phan Văn Quế',
      category: 'legal',
      badge: 'Pháp Lý',
      children: [
        {
          id: 'legal-profile',
          label: 'Tư Cách Pháp Nhân & 11 Lần Thay Đổi ĐKKD',
          shortDesc: 'Thành lập 31/12/2007, thay đổi lần 11 ngày 18/10/2024, ĐDPL Phan Văn Quế',
          category: 'legal'
        },
        {
          id: 'legal-tax',
          label: 'Mã Số Thuế 0305395391 & Xuất VAT',
          shortDesc: 'Minh bạch năng lực thuế, tích hợp tra cứu hóa đơn điện tử cho doanh nghiệp',
          category: 'legal'
        },
        {
          id: 'legal-model',
          label: 'Mô Hình Vận Hành Phân Định Chiến Lược',
          shortDesc: 'Trụ sở điều hành Nguyễn Xí (TP.HCM) song hành Nhà máy Lâm Đồng',
          category: 'legal'
        }
      ]
    },
    {
      id: 'branch-philosophy',
      label: 'Định Vị, Câu Chuyện & Hành Trình 10 Năm R&D',
      shortDesc: 'Triết lý Tinh Khiết Nguyên Bản, lộ trình 6-3-1 & 3 Giá trị cốt lõi',
      category: 'philosophy',
      badge: 'Triết Lý',
      children: [
        {
          id: 'philo-story',
          label: 'Khởi Nguồn Nỗi Trăn Cà Phê Tạp & Bước Ngoặt',
          shortDesc: 'Từ trăn trở cà phê bắp đậu, phẩm màu đến khoảnh khắc nếm vị hạt tự nhiên Tây Nguyên',
          category: 'philosophy'
        },
        {
          id: 'philo-rd-timeline',
          label: 'Hành Trình 10 Năm R&D (Lộ Trình 6 - 3 - 1)',
          shortDesc: '6 năm nghiên cứu sóng siêu âm, 3 năm hoàn thiện rang mộc, 1 năm chuẩn hóa sơ chế Lâm Đồng',
          category: 'philosophy'
        },
        {
          id: 'philo-core-values',
          label: '3 Giá Trị Cốt Lõi: Thuần Khiết - Trung Thực - Bản Nguyên',
          shortDesc: '100% nguyên chất, minh bạch hồ sơ kiểm định và tôn trọng tính bản địa của giống hạt',
          category: 'philosophy'
        }
      ]
    },
    {
      id: 'branch-tech',
      label: 'Đột Phá Công Nghệ Sóng Siêu Âm Cavitation',
      shortDesc: 'Hiện tượng Cavitation 20-50 kHz, bóc tách vi mô cặn bẩn & Aflatoxin',
      category: 'tech',
      badge: 'Công Nghệ USP',
      children: [
        {
          id: 'tech-cavitation',
          label: 'Cơ Chế Bọt Khí Vi Mô Cavitation (20 - 50 kHz)',
          shortDesc: 'Hàng triệu bọt khí vi mô hình thành và sụp vỡ tạo xung lực đánh tan cặn bẩn trong rãnh hạt',
          category: 'tech'
        },
        {
          id: 'tech-comparison',
          label: 'So Sánh: Siêu Âm Cavitation vs Rửa Thường',
          shortDesc: 'Rửa nước thường chỉ sạch vỏ ngoài; Siêu âm sạch sâu Aflatoxin & thuốc BVTV',
          category: 'tech'
        },
        {
          id: 'tech-benefits',
          label: 'Lợi Ích Kép: Vị Giác Thanh Trong & Bảo Vệ Sức Khỏe',
          shortDesc: 'Không còn khét gắt, triệt tiêu say cà phê do nấm mốc, an tâm không kích ứng dạ dày',
          category: 'tech'
        }
      ]
    },
    {
      id: 'branch-products',
      label: 'Danh Mục Sản Phẩm Tinh Khiết B2C & Bảng Giá',
      shortDesc: 'Robusta, Arabica, Phối trộn Mix và Phin nhôm cao cấp Lopha',
      category: 'products',
      badge: 'Sản Phẩm',
      children: [
        {
          id: 'prod-robusta',
          label: '100% Robusta Siêu Âm (139k/250g - 270k/500g)',
          shortDesc: 'Vị đắng đậm đà, thể chất dày, hương mộc truyền thống',
          category: 'products'
        },
        {
          id: 'prod-arabica',
          label: '100% Arabica Siêu Âm (175k/250g - 340k/500g)',
          shortDesc: 'Hương hoa quả trong trẻo, chua thanh tao, hậu ngọt nhẹ',
          category: 'products'
        },
        {
          id: 'prod-mix',
          label: 'Mix Robusta & Arabica (149k/250g - 285k/500g)',
          shortDesc: 'Hòa quyện cân bằng giữa độ đậm và hương thơm',
          category: 'products'
        },
        {
          id: 'prod-phin',
          label: 'Phin Cà Phê LOPHA Cao Cấp (100k/phin)',
          shortDesc: 'Thiết kế nhôm cao cấp sang trọng tôn vinh cà phê phin truyền thống',
          category: 'products'
        }
      ]
    },
    {
      id: 'branch-b2b',
      label: 'Giải Pháp Thương Mại B2B & HORECA',
      shortDesc: 'Gói Quán Cafe, Khách Sạn, Văn Phòng & Gia Công OEM/Private Label',
      category: 'b2b',
      badge: 'B2B HORECA',
      children: [
        {
          id: 'b2b-packages',
          label: '4 Gói Giải Pháp Chuyên Biệt (Cafe, Nhà Hàng, Khách Sạn, Văn Phòng)',
          shortDesc: 'Profile rang độc quyền, đồng nhất chất lượng lô và tài trợ máy pha',
          category: 'b2b'
        },
        {
          id: 'b2b-oem-sub',
          label: 'Năng Lực Gia Công OEM & Private Labeling',
          shortDesc: 'Ứng dụng bể siêu âm độc quyền Lâm Đồng cho các nhãn hàng đối tác',
          category: 'b2b'
        },
        {
          id: 'b2b-quote-form',
          label: 'Biểu Mẫu Báo Giá Sỉ & Đăng Ký Nhận Mẫu Thử',
          shortDesc: 'Quy trình thu thập thông tin tự động chuyển giao bộ phận kinh doanh Long Phan',
          category: 'b2b'
        }
      ]
    },
    {
      id: 'branch-certs',
      label: 'Hệ Thống Tiêu Chuẩn & Chứng Nhận Quốc Tế',
      shortDesc: 'FDA Hoa Kỳ, HACCP, ISO 22000, ISO 9001, ISO 14005, CN-ATVSTP',
      category: 'certs',
      badge: 'Chứng Nhận',
      children: [
        {
          id: 'cert-fda',
          label: 'Chứng Nhận FDA Hoa Kỳ & Xuất Khẩu Toàn Cầu',
          shortDesc: 'Bảo chứng an toàn thực phẩm cấp độ toàn cầu',
          category: 'certs'
        },
        {
          id: 'cert-iso-haccp',
          label: 'Bộ 3 Tiêu Chuẩn: ISO 22000, ISO 9001, HACCP',
          shortDesc: 'Kiểm soát mối nguy và quản trị chất lượng toàn diện',
          category: 'certs'
        },
        {
          id: 'cert-iso14005-atvstp',
          label: 'ISO 14005 (Môi Trường) & CN-ATVSTP Việt Nam',
          shortDesc: 'Phát triển nông nghiệp xanh bền vững và đầy đủ pháp lý lưu hành',
          category: 'certs'
        }
      ]
    },
    {
      id: 'branch-network',
      label: 'Mạng Lưới Hạ Tầng, Showroom & Liên Hệ',
      shortDesc: 'Trụ sở Nguyễn Xí, Nhà máy Lâm Đồng, Showroom Nam - Bắc & Hotline 1900 636529',
      category: 'network',
      badge: 'Mạng Lưới',
      children: [
        {
          id: 'net-hq-factory',
          label: 'Trụ Sở Nguyễn Xí & Nhà Máy Tổ 5 Đông Gia Nghĩa',
          shortDesc: 'Đầu mối quản trị TP.HCM song hành thủ phủ chế biến Lâm Đồng',
          category: 'network'
        },
        {
          id: 'net-showrooms',
          label: 'Hệ Thống Showroom (Q1, Thảo Điền Q2 & Hoàn Kiếm Hà Nội)',
          shortDesc: 'Điểm dừng chân trải nghiệm sản phẩm thực tế, cupping và tư vấn trực tiếp',
          category: 'network'
        },
        {
          id: 'net-channels',
          label: 'Kênh Liên Hệ Chính Thức & Hỗ Trợ 24/7',
          shortDesc: 'Hotline 1900 636529, email info@lophacoffee.com / quephan@longphanvn.com',
          category: 'network'
        }
      ]
    },
    {
      id: 'branch-recruitment',
      label: 'Tuyển Dụng – Gia Nhập Lopha',
      shortDesc: 'Cơ hội Sales tư vấn khách hàng và Marketing hỗ trợ dự án',
      category: 'recruitment',
      badge: 'Tuyển Dụng',
      children: [
        {
          id: 'recruitment-sales',
          label: 'Sales – Tư Vấn Khách Hàng',
          shortDesc: 'Gọi điện tìm hiểu khách hàng có quán chưa, nhu cầu cà phê và gợi ý dùng thử Lopha',
          category: 'recruitment'
        },
        {
          id: 'recruitment-marketing',
          label: 'Marketing – Hỗ Trợ Dự Án',
          shortDesc: 'Hỗ trợ bộ phận Marketing lên kế hoạch và triển khai các dự án',
          category: 'recruitment'
        }
      ]
    }
  ]
};
