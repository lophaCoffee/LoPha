import { LOPHA_LEGAL_INFO, LOPHA_PRODUCTS, LOPHA_B2B_SOLUTIONS, LOPHA_CERTIFICATES, LOPHA_LOCATIONS } from '../data/lophaData';

export const LOPHA_AI_SYSTEM_PROMPT = `
Bạn là Trợ lý Ảo Chuyên Gia Thương Hiệu Cao Cấp của LOPHA COFFEE (thuộc CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ LONG PHAN).
Mục tiêu của bạn là đại diện cho Lopha Coffee, giải đáp tường tận, chính xác, lịch sự và chuyên nghiệp mọi câu hỏi của khách hàng B2C và đối tác B2B.

DƯỚI ĐÂY LÀ TOÀN BỘ CĂN CỨ DỮ LIỆU XÁC THỰC CỦA THƯƠNG HIỆU:
1. HỒ SƠ PHÁP LÝ & DOANH NGHIỆP:
- Tên công ty: CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ LONG PHAN
- Tên quốc tế: LONG PHAN PRODUCE - TRADING - SERVICES CO.,LTD
- Thương hiệu: LOPHA COFFEE
- Mã số thuế: 0305395391 (hỗ trợ xuất hóa đơn điện tử VAT)
- Thời gian thành lập: 31/12/2007 (Đăng ký thay đổi lần thứ 11 ngày 18/10/2024 - hơn 17 năm bề dày kinh nghiệm)
- Đại diện pháp luật: Ông PHAN VĂN QUẾ
- Trụ sở chính: 207C Nguyễn Xí, Phường Bình Thạnh, TP. Hồ Chí Minh
- Cơ sở nhà máy chế biến: Tổ 5, Phường Đông Gia Nghĩa, Tỉnh Lâm Đồng, Việt Nam (nằm tại thủ phủ cà phê Tây Nguyên)
- Hệ thống showroom trải nghiệm:
  + 128A Hai Bà Trưng, P. Đa Kao, Quận 1, TP.HCM
  + 59 Xa lộ Hà Nội, P. Thảo Điền, Quận 2, TP.HCM
  + Số 6 Lê Thánh Tông, Q. Hoàn Kiếm, TP. Hà Nội
- Hotline chính thức: 1900 636529 | Email: info@lophacoffee.com / quephan@longphanvn.com

2. TRIẾT LÝ THƯƠNG HIỆU & HÀNH TRÌNH 10 NĂM R&D (6 - 3 - 1):
- Thông điệp cốt lõi: "Tinh khiết không phải đích đến. Đó là cách chúng tôi bắt đầu mọi thứ."
- Định vị: "Sự tinh khiết nguyên bản", xóa bỏ trăn trở về cà phê bắp đậu, hóa chất và hương liệu công nghiệp.
- Hành trình 10 năm nghiên cứu & chuẩn hóa:
  + 6 năm đầu: Nghiên cứu công nghệ làm sạch chuyên sâu, ứng dụng sóng siêu âm tần số cao 20 - 50 kHz.
  + 3 năm tiếp theo: Hoàn thiện quy trình sản xuất, thông số sấy và profile rang mộc giữ trọn lớp dầu tự nhiên.
  + 1 năm trọn vẹn: Chuẩn hóa quy trình sơ chế trái chín tại vùng trồng Lâm Đồng.
- 3 Giá trị cốt lõi:
  + Thuần khiết: 100% nguyên chất, không đậu nành, không bắp rang, không hương liệu hay hóa chất tẩy.
  + Trung thực: Minh bạch nguồn gốc giống hạt, hồ sơ kiểm định quốc tế.
  + Bản nguyên: Tôn trọng hương vị đặc trưng của thổ nhưỡng Tây Nguyên.

3. ĐỘT PHÁ CÔNG NGHỆ SÓNG SIÊU ÂM TẦN SỐ CAO CAVITATION (20 - 50 kHz):
- Cơ chế: Phát chùm sóng siêu âm tần số 20 - 50 kHz qua môi trường nước tinh khiết.
- Hiện tượng Cavitation: Hàng triệu bọt khí vi mô hình thành và sụp vỡ liên tục, tạo ra vi luồng sóng xung kích bóc tách triệt để cặn bẩn, bào tử nấm mốc (Aflatoxin) và tồn dư thuốc BVTV ẩn sâu trong các kẽ rãnh của hạt cà phê.
- Điểm khác biệt so với rửa nước truyền thống: Rửa truyền thống chỉ sạch bề mặt vỏ ngoài, không bóc tách được nấm mốc và hóa chất kẽ hạt; Siêu âm sạch sâu cấp độ vi mô mà KHÔNG làm tổn thương màng tế bào hay lớp dầu thơm.
- Lợi ích kép:
  + Vị giác: Nước cà phê trong trẻo, thơm dịu, đắng thanh không gắt, không khét lẹt.
  + Sức khỏe: Triệt tiêu nguy cơ say cà phê do nấm Aflatoxin, êm dịu cho dạ dày, không kích ứng hay cồn cào.

4. DANH MỤC SẢN PHẨM & BẢNG GIÁ NIÊM YẾT B2C:
- Cà phê tinh khiết 100% Robusta siêu âm: Túi 250g (139.000 VNĐ) | Túi 500g (270.000 VNĐ). Đắng đậm đà, thể chất dày, hương mộc, gu truyền thống mạnh mẽ.
- Cà phê tinh khiết 100% Arabica siêu âm: Túi 250g (175.000 VNĐ) | Túi 500g (340.000 VNĐ). Hương hoa quả trong trẻo, chua thanh tao, hậu ngọt nhẹ mật ong, gu hiện đại Pour-over/Espresso.
- Cà phê tinh khiết Mix Robusta & Arabica: Túi 250g (149.000 VNĐ) | Túi 500g (285.000 VNĐ). Cân bằng hoàn hảo giữa độ đậm và hương thơm.
- Phin cà phê LOPHA cao cấp: Hộp 01 phin (100.000 VNĐ). Hợp kim nhôm Anodize cao cấp chịu nhiệt, chiết xuất chuẩn.

5. GIẢI PHÁP THƯƠNG MẠI B2B & HORECA:
- Gói Quán Cà phê & Chuỗi F&B: Đảm bảo hạt siêu âm đồng nhất 100%, hỗ trợ tinh chỉnh profile rang riêng, chính sách sỉ hấp dẫn.
- Gói Khách sạn & Nhà hàng cao cấp (HORECA): Đầy đủ chứng nhận FDA, ISO phục vụ khách quốc tế.
- Gói Văn phòng Doanh nghiệp: Cà phê sạch bảo vệ sức khỏe nhân sự, tài trợ máy pha một chạm, định kỳ giao hàng và bảo dưỡng máy.
- Gia công OEM & Private Labeling: Nhận gia công thương hiệu riêng với công nghệ siêu âm tại nhà máy Lâm Đồng.

6. HỆ THỐNG TIÊU CHUẨN CHỨNG NHẬN:
- FDA (Hoa Kỳ): Đạt chuẩn an toàn thực phẩm toàn cầu, đủ điều kiện xuất khẩu Mỹ.
- HACCP: Kiểm soát mối nguy hại tới hạn trong toàn bộ chuỗi sản xuất.
- ISO 22000: Hệ thống an toàn thực phẩm từ nông trại đến bàn ăn.
- ISO 9001: Quản lý chất lượng vận hành doanh nghiệp.
- ISO 14005: Quản lý môi trường bền vững.
- CN-ATVSTP: Chứng nhận đủ điều kiện an toàn thực phẩm phân phối nội địa.

NGUYÊN TẮC TRẢ LỜI:
- Luôn thân thiện, chuyên nghiệp, tự hào về chất lượng cà phê Việt Nam và công nghệ siêu âm độc quyền của Công ty Long Phan.
- Trích dẫn số liệu cụ thể (giá, mã số thuế, tần số 20-50kHz, chứng nhận) để tạo sự tin tưởng tuyệt đối.
- Giữ câu trả lời ngắn gọn, có cấu trúc bullet point rõ ràng, dễ đọc.
`;

export function getSmartLocalResponse(userInput: string): string {
  const q = userInput.toLowerCase();

  if (q.includes('siêu âm') || q.includes('cavitation') || q.includes('công nghệ') || q.includes('khác biệt') || q.includes('sóng')) {
    return `☕ **Về Đột Phá Công Nghệ Sóng Siêu Âm Cavitation của Lopha Coffee:**
• **Cơ chế hoạt động:** Nhà máy Long Phan tại Lâm Đồng sử dụng chùm sóng siêu âm tần số cao từ **20 kHz đến 50 kHz** trong môi trường nước tinh khiết.
• **Hiện tượng Cavitation:** Hàng triệu bọt khí vi mô hình thành và sụp vỡ liên tục, sinh ra các vi luồng sóng xung kích đánh tan cặn bẩn, bào tử nấm mốc (**Aflatoxin**) và tồn dư thuốc BVTV bám sâu trong rãnh hạt mà cách rửa thông thường không chạm tới được.
• **Lợi ích kép:**
  1. *Hương vị:* Tách cà phê có màu nước trong trẻo, hương thơm dịu nhẹ, vị đắng thanh không gắt, không khét lẹt.
  2. *Sức khỏe:* Triệt tiêu hiện tượng say cà phê do nấm mốc, an toàn cho dạ dày, tỉnh táo thuần khiết cả ngày.
• **Cam kết:** 100% cơ chế vật lý thuần túy, không sử dụng bất kỳ hóa chất can thiệp nào!`;
  }

  if (q.includes('giá') || q.includes('bao nhiêu') || q.includes('sản phẩm') || q.includes('robusta') || q.includes('arabica') || q.includes('phin') || q.includes('bán lẻ')) {
    return `📋 **Bảng Giá Niêm Yết Cà Phê Tinh Khiết Siêu Âm Lopha Coffee:**

1. **Cà phê Tinh Khiết 100% Robusta Siêu Âm**
   • Túi 250g: **139.000 VNĐ**
   • Túi 500g: **270.000 VNĐ**
   *(Vị đắng đậm đà, thể chất dày, hương mộc truyền thống)*

2. **Cà phê Tinh Khiết 100% Arabica Siêu Âm**
   • Túi 250g: **175.000 VNĐ**
   • Túi 500g: **340.000 VNĐ**
   *(Hương hoa quả trong trẻo, chua thanh tao, hậu ngọt mật ong)*

3. **Cà phê Tinh Khiết Mix Robusta & Arabica**
   • Túi 250g: **149.000 VNĐ**
   • Túi 500g: **285.000 VNĐ**
   *(Sự cân bằng hài hòa giữa độ đậm và hương thơm quyến rũ)*

4. **Phin Cà Phê LOPHA Cao Cấp**
   • Hộp 01 phin: **100.000 VNĐ**
   *(Hợp kim nhôm Anodize cao cấp, chiết xuất giọt đều)*

*Bạn muốn đặt mua sản phẩm nào hay cần tư vấn khẩu vị phù hợp?*`;
  }

  if (q.includes('pháp lý') || q.includes('công ty') || q.includes('long phan') || q.includes('thành lập') || q.includes('mã số thuế') || q.includes('mst') || q.includes('đại diện')) {
    return `🏢 **Hồ Sơ Năng Lực & Pháp Lý Doanh Nghiệp:**
• **Tên công ty:** ${LOPHA_LEGAL_INFO.companyFullName}
• **Tên quốc tế:** ${LOPHA_LEGAL_INFO.internationalName}
• **Thương hiệu:** LOPHA COFFEE
• **Mã số thuế:** **${LOPHA_LEGAL_INFO.taxCode}** (Hỗ trợ xuất hóa đơn VAT đầy đủ)
• **Năm thành lập:** Ngày **31/12/2007** (Đã qua 11 lần thay đổi ĐKKD - hơn 17 năm bề dày kinh nghiệm)
• **Đại diện pháp luật:** Ông **PHAN VĂN QUẾ**
• **Trụ sở điều hành:** 207C Nguyễn Xí, Phường Bình Thạnh, TP. Hồ Chí Minh
• **Cơ sở nhà máy:** Tổ 5, Phường Đông Gia Nghĩa, Tỉnh Lâm Đồng (thủ phủ Tây Nguyên)`;
  }

  if (q.includes('b2b') || q.includes('quán') || q.includes('khách sạn') || q.includes('văn phòng') || q.includes('oem') || q.includes('sỉ') || q.includes('hợp tác')) {
    return `🤝 **Chính Sách & Giải Pháp B2B / HORECA Của Lopha Coffee:**
• **Quán Cà Phê & Chuỗi F&B:** Hạt siêu âm chất lượng đồng nhất 100%, hỗ trợ chuyên gia cupping và tinh chỉnh profile rang độc quyền cho menu quán.
• **Khách Sạn & Resort (HORECA):** Đầy đủ chứng nhận FDA Hoa Kỳ và ISO 22000, phục vụ tiêu chuẩn khách quốc tế.
• **Văn Phòng Doanh Nghiệp:** Cà phê sạch bảo vệ sức khỏe nhân sự, chính sách tài trợ máy pha cà phê tự động một chạm, giao định kỳ hàng tuần.
• **Gia công OEM & Private Labeling:** Nhà máy Lâm Đồng nhận gia công trọn gói cà phê siêu âm nhãn riêng theo yêu cầu.
👉 Bạn có thể để lại số điện thoại hoặc gọi Hotline **1900 636529** để nhận ngay **Sample Kit thử mẫu miễn phí**!`;
  }

  if (q.includes('chứng nhận') || q.includes('fda') || q.includes('iso') || q.includes('haccp') || q.includes('tiêu chuẩn') || q.includes('an toàn')) {
    return `🏆 **Hệ Thống Tiêu Chuẩn & Chứng Nhận Quốc Tế của Lopha Coffee:**
1. **FDA (Hoa Kỳ):** Chứng nhận Cục Quản lý Thực phẩm & Dược phẩm Mỹ, bảo chứng an toàn thực phẩm toàn cầu phục vụ xuất khẩu.
2. **HACCP:** Kiểm soát mối nguy hại tới hạn trong toàn bộ chuỗi sản xuất.
3. **ISO 22000:** Hệ thống quản lý an toàn thực phẩm từ nông trại Lâm Đồng đến tách cà phê.
4. **ISO 9001:** Quản lý chất lượng vận hành doanh nghiệp.
5. **ISO 14005:** Quản lý môi trường bền vững.
6. **CN-ATVSTP:** Chứng nhận cơ sở đủ điều kiện an toàn thực phẩm tại Việt Nam.`;
  }

  if (q.includes('địa chỉ') || q.includes('showroom') || q.includes('ở đâu') || q.includes('liên hệ') || q.includes('hotline') || q.includes('nhà máy')) {
    return `📍 **Hệ Thống Địa Chỉ & Kênh Liên Hệ Lopha Coffee:**
• **Trụ sở chính:** 207C Nguyễn Xí, Phường Bình Thạnh, TP. Hồ Chí Minh
• **Nhà máy sản xuất:** Tổ 5, Phường Đông Gia Nghĩa, Tỉnh Lâm Đồng
• **Mạng lưới Showroom trải nghiệm:**
  1. 128A Hai Bà Trưng, P. Đa Kao, Quận 1, TP.HCM
  2. 59 Xa lộ Hà Nội, P. Thảo Điền, Quận 2, TP.HCM
  3. Số 6 Lê Thánh Tông, Q. Hoàn Kiếm, TP. Hà Nội
• **Hotline 24/7:** **1900 636529**
• **Email:** info@lophacoffee.com / quephan@longphanvn.com`;
  }

  if (q.includes('r&d') || q.includes('hành trình') || q.includes('lịch sử') || q.includes('6-3-1') || q.includes('cốt lõi') || q.includes('triết lý')) {
    return `✨ **Hành Trình 10 Năm R&D (Lộ Trình 6 - 3 - 1) & Giá Trị Cốt Lõi:**
• **06 năm đầu:** Nghiên cứu ứng dụng sóng siêu âm tần số cao (20 - 50 kHz) để làm sạch sâu vi mô.
• **03 năm tiếp theo:** Hoàn thiện thông số kỹ thuật sấy và profile rang mộc để giữ nguyên lớp dầu tự nhiên.
• **01 năm trọn vẹn:** Chuẩn hóa quy trình sơ chế trái chín tại nông trại Lâm Đồng.
• **3 Giá trị cốt lõi:**
  1. *Thuần khiết:* 100% nguyên chất, nói không với phụ gia & bắp rang đậu nành.
  2. *Trung thực:* Minh bạch xuất xứ & hồ sơ kiểm định quốc tế.
  3. *Bản nguyên:* Tôn trọng cá tính thổ nhưỡng tự nhiên của hạt.
• **Thông điệp:** *"Tinh khiết không phải đích đến. Đó là cách chúng tôi bắt đầu mọi thứ."*`;
  }

  // General default response
  return `Chào bạn! Tôi là Trợ Lý Ảo Chuyên Gia Thương Hiệu **Lopha Coffee** (thuộc Công ty Long Phan - Est. 2007). 

Tôi có thể hỗ trợ bạn chi tiết về:
1. **Công nghệ siêu âm Cavitation (20-50 kHz):** Cơ chế làm sạch vi mô nấm mốc Aflatoxin & lợi ích cho sức khỏe.
2. **Danh mục sản phẩm & bảng giá niêm yết:** 100% Robusta, Arabica, Blend và Phin cao cấp.
3. **Hồ sơ pháp lý & doanh nghiệp:** Bề dày 17 năm, MST 0305395391, Nhà máy Lâm Đồng, Trụ sở TP.HCM.
4. **Giải pháp B2B & HORECA:** Mẫu thử cafe miễn phí cho quán, tài trợ máy pha văn phòng, gia công OEM.
5. **Chứng nhận chất lượng:** FDA Hoa Kỳ, HACCP, ISO 22000...

Bạn cần tìm hiểu thông tin cụ thể nào?`;
}
