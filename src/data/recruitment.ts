export const RECRUITMENT_EMAIL = 'info@lophacoffee.com';

export const RECRUITMENT_JOBS = [
  {
    id: 'recruitment-sales',
    title: 'Sales – Tư vấn khách hàng',
    team: 'Kinh doanh',
    summary: 'Kết nối với khách hàng, tìm hiểu nhu cầu thực tế và giới thiệu trải nghiệm dùng thử cà phê Lopha.',
    responsibilities: [
      'Gọi điện tư vấn và xác định khách hàng đã có quán cà phê, đang chuẩn bị mở quán hay có nhu cầu sử dụng khác.',
      'Tìm hiểu nhu cầu cà phê: gu vị, cách pha, sản lượng dự kiến và loại cà phê đang sử dụng.',
      'Gợi ý dùng thử cà phê Lopha phù hợp với nhu cầu đã xác định; hướng dẫn bước đăng ký nhận mẫu.',
      'Ghi nhận thông tin, phân loại khách hàng và cập nhật kết quả tư vấn cho bộ phận kinh doanh.',
      'Theo dõi phản hồi sau khi dùng thử và phối hợp tư vấn bước tiếp theo.',
    ],
    fit: 'Phù hợp với người thích giao tiếp, biết lắng nghe, đặt câu hỏi rõ ràng và theo dõi thông tin khách hàng cẩn thận.',
  },
  {
    id: 'recruitment-marketing',
    title: 'Marketing – Hỗ trợ dự án',
    team: 'Marketing',
    summary: 'Đồng hành cùng bộ phận Marketing trong việc lên kế hoạch và triển khai các dự án của Lopha.',
    responsibilities: [
      'Hỗ trợ thu thập thông tin về khách hàng, thị trường và sản phẩm để chuẩn bị dự án marketing.',
      'Tham gia đề xuất ý tưởng, xây dựng kế hoạch công việc và chuẩn bị tài liệu theo hướng dẫn của bộ phận Marketing.',
      'Hỗ trợ chuẩn bị nội dung, hình ảnh và các hạng mục truyền thông cho từng dự án.',
      'Phối hợp với các bộ phận liên quan, theo dõi tiến độ và cập nhật tình trạng công việc.',
      'Tổng hợp kết quả triển khai và hỗ trợ báo cáo, rút kinh nghiệm sau dự án.',
    ],
    fit: 'Phù hợp với người chủ động học hỏi, yêu thích marketing, làm việc có tổ chức và phối hợp tốt với đội nhóm.',
  },
];

export function getApplicationLink(title: string) {
  const subject = `[Ứng tuyển Lopha] ${title}`;
  const body = `Kính gửi Lopha Coffee,\n\nTôi muốn ứng tuyển vị trí ${title}.\n\nHọ và tên: \nSố điện thoại: \nKinh nghiệm / giới thiệu bản thân: \nLink CV / portfolio (nếu có): \n\nTôi sẽ đính kèm CV trước khi gửi email.\n\nTrân trọng,`;
  return `mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
