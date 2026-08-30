import React from 'react';
import { Keyboard, X, Command, Printer, Download, RotateCcw, Home } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      key: "Ctrl / Cmd + P",
      description: "Cetak dokumen langsung ke printer (Print A4)",
      icon: Printer
    },
    {
      key: "Ctrl / Cmd + Shift + E",
      description: "Unduh file PDF resmi (Nota / Bulk Surat Izin)",
      icon: Download
    },
    {
      key: "Ctrl / Cmd + Shift + R",
      description: "Reset form draft dokumen menjadi kosong",
      icon: RotateCcw
    },
    {
      key: "Ctrl / Cmd + Shift + H",
      description: "Kembali ke Portal Utama (Welcome Portal)",
      icon: Home
    },
    {
      key: "? / Shift + /",
      description: "Buka modal petunjuk tombol pintas ini",
      icon: Command
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sora">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Dialog Box */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl z-10 space-y-5 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-forest/30 border border-forest/40 flex items-center justify-center text-sandstone">
              <Keyboard className="w-5 h-5 text-sandstone" />
            </div>
            <div>
              <h3 className="font-raleway font-bold text-base text-white">Tombol Pintas (Shortcuts)</h3>
              <p className="text-xs text-slate-400">Administrasi Cepat Sanggar Bundaku</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-3">
          {shortcuts.map((sc, index) => {
            const Icon = sc.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-300 font-medium">{sc.description}</span>
                </div>
                <kbd className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] font-bold text-sandstone shadow-sm">
                  {sc.key}
                </kbd>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center text-slate-500 text-[11px] border-t border-slate-800">
          Tekan tombol <span className="text-sandstone font-mono">Esc</span> untuk menutup dialog ini.
        </div>

      </div>
    </div>
  );
};
