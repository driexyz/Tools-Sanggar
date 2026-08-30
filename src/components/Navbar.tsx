import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  RotateCcw, 
  FileText, 
  Sparkles,
  FileCheck2,
  Receipt,
  Award,
  Users,
  Menu,
  X,
  Home,
  Check,
  Zap,
  ArrowRight,
  Keyboard
} from 'lucide-react';
import { SAMPLE_INVOICES } from '../utils/sampleData';
import { SAMPLE_SURAT_IZIN_PRESETS } from '../utils/sampleSuratIzin';
import { InvoiceData } from '../types/invoice';
import { SuratIzinData } from '../types/suratIzin';

interface NavbarProps {
  docMode: 'invoice' | 'suratIzin';
  onSelectDocMode: (mode: 'invoice' | 'suratIzin') => void;
  onGoToPortal: () => void;
  onUpdateInvoice: (updated: InvoiceData) => void;
  onUpdateSuratIzin?: (updated: SuratIzinData) => void;
  onReset: () => void;
  onExportPDF: () => void;
  onPrint: () => void;
  onOpenShortcuts?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  docMode,
  onSelectDocMode,
  onGoToPortal,
  onUpdateInvoice,
  onUpdateSuratIzin,
  onReset,
  onExportPDF,
  onPrint,
  onOpenShortcuts
}) => {
  const [logoError, setLogoError] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLoadInvoiceSample = (sampleKey: string) => {
    if (SAMPLE_INVOICES[sampleKey]) {
      onUpdateInvoice({ ...SAMPLE_INVOICES[sampleKey] });
      setIsDrawerOpen(false);
    }
  };

  const handleLoadSuratSample = (presetKey: string) => {
    if (SAMPLE_SURAT_IZIN_PRESETS[presetKey] && onUpdateSuratIzin) {
      onUpdateSuratIzin({ ...SAMPLE_SURAT_IZIN_PRESETS[presetKey] });
      setIsDrawerOpen(false);
    }
  };

  const handleSwitchMode = (mode: 'invoice' | 'suratIzin') => {
    onSelectDocMode(mode);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className="no-print bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-md font-sora">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Header: Hamburger Button & Studio Brand */}
            <div className="flex items-center space-x-3">
              
              {/* Hamburger Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sandstone border border-slate-700 transition-all active:scale-95 flex items-center justify-center"
                title="Buka Menu Navigasi Studio"
              >
                <Menu className="w-5 h-5 text-sandstone" />
              </button>

              {/* Studio Logo & Title */}
              <div 
                onClick={onGoToPortal}
                className="flex items-center space-x-2.5 cursor-pointer group"
                title="Kembali ke Portal Utama"
              >
                <div className="w-9 h-9 rounded-lg bg-forest p-1 flex items-center justify-center shadow-inner border border-sandstone/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                  {!logoError ? (
                    <img 
                      src="/assets/logo/dancer-icon-sandstone.png" 
                      alt="Sanggar Bundaku" 
                      className="w-full h-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <Sparkles className="w-4 h-4 text-sandstone" />
                  )}
                </div>
                <div>
                  <h1 className="font-raleway font-bold text-sm sm:text-base text-white tracking-wide flex items-center gap-2 group-hover:text-sandstone transition-colors">
                    Sanggar Bundaku Admin Tools
                  </h1>
                  <p className="text-[10px] text-slate-400 font-sora hidden md:block">
                    Studio Generator Dokumen Resmi
                  </p>
                </div>
              </div>

            </div>

            {/* Center Header: Active Tool Badge & Auto-Save Indicator */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-800 shadow-inner">
              <span className="text-[11px] font-bold text-sandstone flex items-center gap-1.5 font-raleway uppercase">
                {docMode === 'suratIzin' ? (
                  <>
                    <FileCheck2 className="w-3.5 h-3.5 text-sandstone" />
                    Surat Izin Sekolah
                  </>
                ) : (
                  <>
                    <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                    Nota & Kwitansi
                  </>
                )}
              </span>

              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Tersimpan
              </span>
            </div>

            {/* Right Header: Primary Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Keyboard Shortcuts Button */}
              {onOpenShortcuts && (
                <button
                  onClick={onOpenShortcuts}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all active:scale-95"
                  title="Tombol Pintas Keyboard (? / Shift + /)"
                >
                  <Keyboard className="w-3.5 h-3.5 text-sandstone" />
                  <kbd className="font-mono text-[10px] text-sandstone font-bold">Shortcuts</kbd>
                </button>
              )}

              {/* Print Button */}
              <button
                onClick={onPrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all hover:border-slate-400 active:scale-95"
                title="Cetak Langsung Ke Printer"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline">Cetak Dokumen</span>
                <span className="md:hidden">Cetak</span>
              </button>

              {/* PDF Export Button (Dynamic Label based on docMode) */}
              <button
                onClick={onExportPDF}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-sandstone hover:bg-sandstone/90 shadow-md shadow-sandstone/10 transition-all transform active:scale-95"
                title={docMode === 'suratIzin' ? "Buka Modal Unduh PDF Per Siswa" : "Unduh File PDF Nota"}
              >
                <Download className="w-4 h-4 text-slate-950" />
                {docMode === 'suratIzin' ? 'Unduh PDF (Bulk)' : 'Unduh PDF'}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* --- HAMBURGER SLIDE-OVER DRAWER OVERLAY --- */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex font-sora">
          
          {/* Backdrop Blur */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Drawer Panel (Left Slide-In) */}
          <div className="relative w-full max-w-xs bg-slate-900 text-slate-100 h-full shadow-2xl border-r border-slate-800 flex flex-col justify-between z-10 p-5 overflow-y-auto">
            
            <div className="space-y-6">

              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-forest p-1 flex items-center justify-center border border-sandstone/30">
                    <Sparkles className="w-4 h-4 text-sandstone" />
                  </div>
                  <div>
                    <h2 className="font-raleway font-bold text-sm text-white">Menu Studio</h2>
                    <p className="text-[10px] text-slate-400">Pilih Alat & Navigasi</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* SECTION 1: SWITCH TOOLS */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                  Pilih Alat Dokumen:
                </span>

                <div className="space-y-1.5">
                  {/* Option 1: Nota & Kwitansi */}
                  <button
                    onClick={() => handleSwitchMode('invoice')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      docMode === 'invoice'
                        ? 'bg-forest text-sandstone border-sandstone/30 shadow-md'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Receipt className="w-4 h-4 text-emerald-400" />
                      <span>Nota & Kwitansi</span>
                    </div>
                    {docMode === 'invoice' && <Check className="w-4 h-4 text-sandstone" />}
                  </button>

                  {/* Option 2: Surat Izin Sekolah */}
                  <button
                    onClick={() => handleSwitchMode('suratIzin')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      docMode === 'suratIzin'
                        ? 'bg-forest text-sandstone border-sandstone/30 shadow-md'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCheck2 className="w-4 h-4 text-sandstone" />
                      <span>Surat Izin Sekolah</span>
                    </div>
                    {docMode === 'suratIzin' && <Check className="w-4 h-4 text-sandstone" />}
                  </button>
                </div>
              </div>

              {/* SECTION 2: PRESETS LOADER */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3 text-sandstone" />
                  Muat Preset Acara:
                </span>

                {docMode === 'invoice' ? (
                  <div className="space-y-1.5">
                    <button
                      onClick={() => handleLoadInvoiceSample('sewaKostum')}
                      className="w-full text-left px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800 font-medium transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-sandstone" />
                      Sewa Kostum & Pentas
                    </button>
                    <button
                      onClick={() => handleLoadInvoiceSample('pelatihanTari')}
                      className="w-full text-left px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800 font-medium transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      SPP Pelatihan Tari
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <button
                      onClick={() => handleLoadSuratSample('festivalBudaya')}
                      className="w-full text-left px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800 font-medium transition-colors flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-sandstone" />
                      Festival Budaya Sleman
                    </button>
                    <button
                      onClick={() => handleLoadSuratSample('fls2nLomba')}
                      className="w-full text-left px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800 font-medium transition-colors flex items-center gap-2"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      Lomba FLS2N DIY
                    </button>
                    <button
                      onClick={() => handleLoadSuratSample('kirabBudaya')}
                      className="w-full text-left px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800 font-medium transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Kirab Budaya Sleman
                    </button>
                  </div>
                )}
              </div>

              {/* SECTION 3: NAVIGASI PORTAL */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                  Navigasi & Reset:
                </span>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onGoToPortal();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sandstone text-xs font-bold transition-all border border-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-sandstone" />
                    <span>Kembali ke Portal Utama</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-sandstone" />
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onReset();
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Form Draft Kosong</span>
                </button>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-500 text-center">
              Sanggar Bundaku • Sleman
            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default Navbar;
