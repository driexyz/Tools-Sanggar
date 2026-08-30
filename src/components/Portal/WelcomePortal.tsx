import React, { useState } from 'react';
import { 
  Receipt, 
  FileCheck2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Award,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SAMPLE_INVOICES } from '../../utils/sampleData';
import { SAMPLE_SURAT_IZIN_PRESETS } from '../../utils/sampleSuratIzin';
import { InvoiceData } from '../../types/invoice';
import { SuratIzinData } from '../../types/suratIzin';

interface WelcomePortalProps {
  onSelectOption: (mode: 'invoice' | 'suratIzin') => void;
  onLoadInvoicePreset: (invoice: InvoiceData) => void;
  onLoadSuratPreset: (surat: SuratIzinData) => void;
}

export const WelcomePortal: React.FC<WelcomePortalProps> = ({
  onSelectOption,
  onLoadInvoicePreset,
  onLoadSuratPreset
}) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sora flex flex-col justify-between p-4 sm:p-6 lg:p-10 relative overflow-hidden select-none">
      
      {/* Background Decorative Halos */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sandstone/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full space-y-8 relative z-10 my-auto">
        
        {/* --- BRAND HERO HEADER --- */}
        <header className="text-center space-y-4 max-w-3xl mx-auto pt-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full shadow-lg">
            <div className="w-7 h-7 rounded-full bg-forest p-1 flex items-center justify-center border border-sandstone/40">
              {!logoError ? (
                <img 
                  src="/assets/logo/dancer-icon-sandstone.png" 
                  alt="Sanggar Bundaku" 
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-sandstone" />
              )}
            </div>
            <span className="text-xs font-bold text-sandstone tracking-wider font-raleway uppercase">
              Sanggar Bundaku Admin Tools
            </span>
          </div>

          <h1 className="font-raleway font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Portal Generator Dokumen Resmi
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Pilih jenis dokumen administrasi sanggar di bawah ini untuk composer langsung dengan pratinjau A4 cetak presisi dan otomatisasi PDF.
          </p>
        </header>

        {/* --- DUAL OPTION SELECTION CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-2">
          
          {/* OPTION 1: INVOICE / NOTA GENERATOR */}
          <div 
            onClick={() => onSelectOption('invoice')}
            className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-forest/80 rounded-2xl p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer shadow-xl hover:shadow-forest/20 flex flex-col justify-between animate-fade-in-up-delay-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-forest/10 rounded-full blur-2xl group-hover:bg-forest/20 transition-all pointer-events-none"></div>

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-forest/20 border border-forest/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Receipt className="w-7 h-7 text-emerald-400" />
                </div>
                <span className="text-[11px] font-mono font-bold bg-forest/30 text-sandstone px-3 py-1 rounded-full border border-sandstone/30">
                  Keuangan & Sewa
                </span>
              </div>

              <div>
                <h2 className="font-raleway font-extrabold text-xl sm:text-2xl text-white group-hover:text-sandstone transition-colors flex items-center gap-2">
                  Nota & Kwitansi Pembayaran
                </h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Buat tagihan sewa kostum tari, fee penampilan event, dan SPP pelatihan tari bulanan lengkap dengan perhitungan otomatis Rupiah (`Rp`) & Terbilang.
                </p>
              </div>

              {/* Feature Highlights */}
              <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Kalkulasi otomatis Subtotal, Diskon, DP & Terbilang</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Informasi Rekening Bank Transfer & Syarat Pembayaran</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Pilihan Kop Surat Resmi atau Modern Minimalis</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <div className="w-full py-3 px-4 rounded-xl bg-forest group-hover:bg-forest/90 text-sandstone font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group-hover:gap-3">
                <span>Buka Editor Nota & Kwitansi</span>
                <ArrowRight className="w-4 h-4 text-sandstone" />
              </div>
            </div>
          </div>

          {/* OPTION 2: SURAT IZIN SEKOLAH GENERATOR */}
          <div 
            onClick={() => onSelectOption('suratIzin')}
            className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-sandstone/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer shadow-xl hover:shadow-sandstone/10 flex flex-col justify-between animate-fade-in-up-delay-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/10 rounded-full blur-2xl group-hover:bg-sandstone/20 transition-all pointer-events-none"></div>

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-sandstone/20 border border-sandstone/40 flex items-center justify-center text-sandstone group-hover:scale-110 transition-transform">
                  <FileCheck2 className="w-7 h-7 text-sandstone" />
                </div>
                <span className="text-[11px] font-mono font-bold bg-sandstone/20 text-sandstone px-3 py-1 rounded-full border border-sandstone/30">
                  Administrasi Siswa
                </span>
              </div>

              <div>
                <h2 className="font-raleway font-extrabold text-xl sm:text-2xl text-white group-hover:text-sandstone transition-colors flex items-center gap-2">
                  Surat Izin Dispensasi Sekolah
                </h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Buat dan unduh bulk surat izin permohonan dispensasi tidak masuk sekolah untuk belasan siswa penari sanggar sekaligus per nama siswa.
                </p>
              </div>

              {/* Feature Highlights */}
              <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sandstone flex-shrink-0" />
                  <span>Generator Bulk PDF per-siswa sekali klik</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sandstone flex-shrink-0" />
                  <span>Kop Surat Resmi, Watermark Penari, & Cap Stempel PNG</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sandstone flex-shrink-0" />
                  <span>Penataan daftar siswa fleksibel (tambah, salin, urutkan)</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <div className="w-full py-3 px-4 rounded-xl bg-sandstone group-hover:bg-sandstone/90 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group-hover:gap-3">
                <span>Buka Editor Surat Izin Sekolah</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </div>
            </div>
          </div>

        </div>

        {/* --- PRESET QUICK LAUNCH FOOTER --- */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <Zap className="w-4 h-4 text-sandstone" />
            <span>Preset Cepat:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                onLoadInvoicePreset(SAMPLE_INVOICES.sewaKostum);
                onSelectOption('invoice');
              }}
              className="px-3 py-1.5 rounded-lg bg-forest/30 hover:bg-forest text-sandstone border border-sandstone/20 font-medium transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sandstone" />
              Sewa Kostum & Pentas
            </button>

            <button
              onClick={() => {
                onLoadSuratPreset(SAMPLE_SURAT_IZIN_PRESETS.festivalBudaya);
                onSelectOption('suratIzin');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-sandstone" />
              Festival Budaya Sleman
            </button>

            <button
              onClick={() => {
                onLoadSuratPreset(SAMPLE_SURAT_IZIN_PRESETS.fls2nLomba);
                onSelectOption('suratIzin');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              Lomba FLS2N DIY
            </button>
          </div>
        </div>

      </div>

      {/* Footer Identity */}
      <footer className="text-center text-slate-500 text-xs pt-6 pb-2 border-t border-slate-900 font-sora">
        <p className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-forest" />
          <span>Sanggar Bundaku Admin Tools • Sleman, Yogyakarta</span>
        </p>
      </footer>

    </div>
  );
};

export default WelcomePortal;
