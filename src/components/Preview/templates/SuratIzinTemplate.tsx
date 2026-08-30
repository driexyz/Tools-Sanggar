import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SuratIzinData } from '../../../types/suratIzin';
import { formatDateIndonesian } from '../../../utils/formatters';

interface SuratIzinTemplateProps {
  surat: SuratIzinData;
}

export const SuratIzinTemplate: React.FC<SuratIzinTemplateProps> = ({ surat }) => {
  const { sender } = surat;
  const [logoError, setLogoError] = useState(false);

  const activeStudent = (surat.students && surat.students.length > 0)
    ? surat.students[Math.min(surat.selectedStudentIndex || 0, surat.students.length - 1)]
    : { name: "", school: "", gradeClass: "" };

  return (
    <div className="relative w-full h-[297mm] max-h-[297mm] bg-white text-slate-900 font-sora flex flex-col justify-between px-8 py-6 sm:px-12 sm:py-7 text-xs sm:text-sm select-none box-border overflow-hidden">
      
      {/* Background Watermark - Large Sandstone Dancer Mark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08] z-0 overflow-hidden">
        <img 
          src="/assets/logo/watermark-dancer.png" 
          alt="Watermark Sanggar Bundaku" 
          className="w-[460px] max-w-[85%] h-auto object-contain"
        />
      </div>

      <div className="relative z-10 space-y-3.5">

        {/* --- OFFICIAL KOP SURAT HEADER --- */}
        <header className="avoid-break border-b-2 border-forest pb-2.5 mb-2">
          <div className="flex items-start justify-between gap-4">
            
            {/* Left Header: Brand Logo & Title */}
            <div className="flex items-center space-x-3.5">
              <div className="w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center shadow-sm border border-slate-200 bg-forest p-1">
                {!logoError ? (
                  <img 
                    src="/assets/logo/logo-green-forest.png" 
                    alt="Logo Sanggar Bundaku" 
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-sandstone">
                    <Sparkles className="w-6 h-6 mb-0.5" />
                    <span className="text-[9px] font-black tracking-tighter">STB</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-raleway font-black text-xl sm:text-2xl text-forest uppercase tracking-wider leading-none">
                  {sender.name || "SANGGAR BUNDAKU"}
                </h1>
                {sender.tagline && sender.tagline.trim() !== "" && (
                  <p className="font-raleway font-bold text-xs text-sandstone-dark tracking-widest mt-1 uppercase">
                    {sender.tagline}
                  </p>
                )}
                {sender.founder && sender.founder.trim() !== "" && (
                  <p className="text-[11px] text-slate-500 font-medium italic mt-0.5">
                    {sender.founder.toLowerCase().includes('founder') || sender.founder.toLowerCase().includes('pendiri')
                      ? sender.founder
                      : `Pendiri / Founder: ${sender.founder}`}
                  </p>
                )}
              </div>
            </div>

            {/* Right Header: Address & Contact Details */}
            <div className="text-right text-[11px] leading-relaxed text-slate-600 max-w-[320px] flex-shrink-0">
              <p className="font-semibold text-slate-800">{sender.address}</p>
              <p>{sender.district}, {sender.regency}</p>
              <p>{sender.province} {sender.postalCode}</p>
              <p className="font-medium text-forest mt-0.5 whitespace-nowrap">
                <span className="font-bold">Telp/WA:</span> {sender.phone}
              </p>
            </div>

          </div>
        </header>

        {/* --- PLACE & DATE --- */}
        <div className="flex justify-end text-xs sm:text-sm font-medium text-slate-800">
          <p>{surat.issueCity || "Sleman"}, {formatDateIndonesian(surat.issueDate)}</p>
        </div>

        {/* --- LETTER METADATA (NO, PERIHAL, LAMPIRAN) --- */}
        <div className="space-y-0.5 text-xs sm:text-sm font-medium text-slate-800">
          <div className="flex">
            <span className="w-24">No</span>
            <span>: <span className="font-mono font-semibold">{surat.letterNumber}</span></span>
          </div>
          <div className="flex">
            <span className="w-24">Perihal</span>
            <span>: <span className="font-semibold">{surat.subject || "Permohonan Izin"}</span></span>
          </div>
          <div className="flex">
            <span className="w-24">Lampiran</span>
            <span>: {surat.attachment || "-"}</span>
          </div>
        </div>

        {/* --- RECIPIENT --- */}
        <div className="pt-0.5 text-xs sm:text-sm text-slate-900 leading-snug">
          <p className="font-semibold">Kepada Yth:</p>
          <p className="font-bold">{surat.recipientTitle || "Bapak / Ibu Guru Wali Kelas"}</p>
          <p className="italic text-slate-700">{surat.recipientLocation || "Di tempat"}</p>
        </div>

        {/* --- SALUTATION & OPENING PARAGRAPH --- */}
        <div className="space-y-1.5 text-xs sm:text-sm text-slate-900 leading-relaxed text-justify">
          <p className="font-semibold">Dengan Hormat,</p>
          <p>
            Sehubungan dengan akan di adakannya <span className="font-bold text-forest">{surat.activityCategory || "kegiatan tari"}</span> oleh Sanggar Bundaku pada acara <span className="font-bold">{surat.eventName || "acara sanggar"}</span>, maka saya selaku ketua Sanggar Bundaku pada kesempatan ini menyampaikan Surat Permohonan Izin kepada Bapak/Ibu Wali Kelas untuk memberikan izin kepada siswa di bawah ini:
          </p>
        </div>

        {/* --- STUDENT DETAILS TABLE --- */}
        <div className="pl-4 sm:pl-6 py-0.5 space-y-1 text-xs sm:text-sm text-slate-900">
          <div className="flex items-baseline">
            <span className="w-24 sm:w-28 font-medium text-slate-600">Nama</span>
            <span className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-300 pb-0.5 flex-1 max-w-md">
              {activeStudent.name || "..................................................."}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-24 sm:w-28 font-medium text-slate-600">Sekolah</span>
            <span className="font-semibold text-slate-800 border-b border-slate-300 pb-0.5 flex-1 max-w-md">
              {activeStudent.school || "..................................................."}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-24 sm:w-28 font-medium text-slate-600">Kelas</span>
            <span className="font-semibold text-slate-800 border-b border-slate-300 pb-0.5 flex-1 max-w-md">
              {activeStudent.gradeClass || "..................................................."}
            </span>
          </div>
        </div>

        {/* --- ABSENCE STATEMENT --- */}
        <div className="text-xs sm:text-sm text-slate-900 leading-relaxed text-justify">
          <p>
            Menginformasikan bahwa siswa tersebut tidak dapat mengikuti proses pembelajaran pada hari <span className="font-bold text-slate-900 underline">{surat.absenceDateText || "..."}</span> karena akan mengikuti <span className="font-bold text-forest">{surat.activityCategory || "kegiatan tari"}</span> oleh Sanggar Bundaku di <span className="font-bold">{surat.eventLocation || "..."}</span>.
          </p>
        </div>

        {/* --- CLOSING PARAGRAPH --- */}
        <div className="text-xs sm:text-sm text-slate-900 leading-relaxed text-justify">
          <p>
            Demikian surat permohonan izin ini kami sampaikan. Semoga Bapak/Ibu Wali Kelas dapat memberikan izin. Atas perhatian Bapak/Ibu Wali Kelas, kami ucapkan terima kasih.
          </p>
        </div>

        {/* --- SIGNATURE & CAP BLOCK --- */}
        <div className="avoid-break pt-2 flex justify-end">
          <div className="text-center relative min-w-[220px]">
            <p className="font-semibold text-xs sm:text-sm text-slate-800 mb-0.5">
              Hormat Kami,
            </p>
            <p className="font-bold text-xs sm:text-sm text-forest uppercase tracking-wider">
              {surat.signerRole || "Ketua Sanggar Bundaku"}
            </p>

            {/* Stamp & Signature Image Container */}
            <div className="relative h-20 w-full flex items-center justify-center my-1">
              {surat.showStampAndSignature && (
                <img 
                  src="/assets/logo/stamp-signature.png" 
                  alt="Cap Sanggar & Tanda Tangan Sri Supeni" 
                  className="h-24 w-auto object-contain absolute z-10 pointer-events-none"
                />
              )}
            </div>

            <div className="relative z-20">
              <p className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-800 pb-0.5 inline-block min-w-[170px]">
                ({surat.signerName || sender.founder || "Sri Supeni"})
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* --- FOOTER ACCENT BAR --- */}
      <footer className="avoid-break mt-2 pt-1 border-t border-slate-200 text-center text-[10px] text-slate-400 font-sora">
        <p>Sanggar Bundaku • Perum Sukoharjo Indah Blok N-201, Sleman, DIY • Contact: 0819-0411-6067</p>
      </footer>

    </div>
  );
};
