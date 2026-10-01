import { Briefcase, CheckCircle2, Mail, Megaphone, PhoneCall } from 'lucide-react';
import { getApplicationLink, RECRUITMENT_EMAIL, RECRUITMENT_JOBS } from '../data/recruitment';

export function RecruitmentView({ selectedNodeId }: { selectedNodeId: string }) {
  const jobs = RECRUITMENT_JOBS.filter(job => !RECRUITMENT_JOBS.some(item => item.id === selectedNodeId) || job.id === selectedNodeId);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#B79372]/40 bg-[#0D1B44] p-6 sm:p-8 text-[#F0E5D5]">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#95D0E8]">
          <Briefcase className="h-4 w-4" /> Cơ hội nghề nghiệp
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold font-serif">Cùng Lopha phát triển cà phê tinh khiết</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F0E5D5]/85">
          Lopha tìm kiếm đồng đội ở hai vị trí Sales và Marketing. Khám phá công việc phù hợp và giới thiệu bản thân với chúng tôi.
        </p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {jobs.map(job => {
          const Icon = job.id === 'recruitment-sales' ? PhoneCall : Megaphone;
          return (
            <article key={job.id} className="flex flex-col rounded-3xl border border-[#B79372]/40 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-[#F0E5D5] p-3 text-[#773C1C]"><Icon className="h-5 w-5" /></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#773C1C]">{job.team}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#0D1B44]">{job.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#210E00]/75">{job.summary}</p>
              <h4 className="mt-5 text-sm font-bold text-[#0D1B44]">Bạn sẽ làm gì?</h4>
              <ul className="mt-3 space-y-3">
                {job.responsibilities.map(task => (
                  <li key={task} className="flex items-start gap-2 text-sm leading-relaxed text-[#210E00]/80">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#B79372]" /><span>{task}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-[#F7F2EA] p-4 text-sm leading-relaxed text-[#773C1C]">{job.fit}</p>
              <a href={getApplicationLink(job.title)} className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0D1B44] px-4 py-3 text-sm font-semibold text-[#F0E5D5] hover:bg-[#773C1C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#773C1C]">
                <Mail className="h-4 w-4" /> Ứng tuyển {job.team} qua email
              </a>
            </article>
          );
        })}
      </div>

      <section className="rounded-3xl border border-[#B79372]/40 bg-[#F0E5D5]/60 p-6">
        <h3 className="text-lg font-bold text-[#0D1B44]">Cách ứng tuyển</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#210E00]/80">
          Gửi CV hoặc phần giới thiệu bản thân, kèm số điện thoại và vị trí muốn ứng tuyển đến{' '}
          <a className="font-semibold text-[#773C1C] underline break-all" href={`mailto:${RECRUITMENT_EMAIL}`}>{RECRUITMENT_EMAIL}</a>.
          {' '}Vị trí Marketing có thể gửi thêm portfolio hoặc dự án đã tham gia, nếu có.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[#210E00]/65">Nút ứng tuyển mở ứng dụng email của bạn. Hãy đính kèm CV và gửi email để hoàn tất. Chi tiết về mức lương, hình thức, địa điểm và thời gian làm việc sẽ được trao đổi trực tiếp.</p>
      </section>
    </div>
  );
}
