import React, { useState } from 'react';
import { InvoiceData } from '../../types/invoice';
import { SuratIzinData } from '../../types/suratIzin';
import { SanggarBundakuKopSurat } from './templates/SanggarBundakuKopSurat';
import { ModernMinimalist } from './templates/ModernMinimalist';
import { SuratIzinTemplate } from './templates/SuratIzinTemplate';
import { ZoomIn, ZoomOut, FileCheck, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';

interface InvoicePreviewProps {
  docMode: 'invoice' | 'suratIzin';
  invoice: InvoiceData;
  suratIzin: SuratIzinData;
  onSelectStudentIndex?: (index: number) => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ 
  docMode, 
  invoice, 
  suratIzin,
  onSelectStudentIndex 
}) => {
  const [scale, setScale] = useState<number>(1.0);

  const totalStudents = suratIzin.students?.length || 1;
  const currentStudentIndex = suratIzin.selectedStudentIndex || 0;
  const activeStudent = (suratIzin.students && suratIzin.students.length > 0)
    ? suratIzin.students[Math.min(currentStudentIndex, suratIzin.students.length - 1)]
    : { name: "Siswa" };

  const handlePrevStudent = () => {
    if (onSelectStudentIndex && currentStudentIndex > 0) {
      onSelectStudentIndex(currentStudentIndex - 1);
    }
  };

  const handleNextStudent = () => {
    if (onSelectStudentIndex && currentStudentIndex < totalStudents - 1) {
      onSelectStudentIndex(currentStudentIndex + 1);
    }
  };

  const renderTemplate = () => {
    if (docMode === 'suratIzin') {
      return <SuratIzinTemplate surat={suratIzin} />;
    }

    switch (invoice.template) {
      case 'MODERN_MINIMAL':
        return <ModernMinimalist invoice={invoice} />;
      case 'KOP_SURAT_OFFICIAL':
      default:
        return <SanggarBundakuKopSurat invoice={invoice} />;
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full min-h-[calc(100vh-4rem)] bg-slate-950 p-4 sm:p-6 overflow-y-auto font-sora">
      
      {/* Zoom & Student Pagination Toolbar */}
      <div className="no-print w-full max-w-[210mm] flex flex-wrap items-center justify-between gap-2 mb-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 shadow-lg">
        
        {/* Left Side: Document Mode Label / Student Selector */}
        <div className="flex items-center space-x-2 font-medium">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Pratinjau A4</span>
          
          {docMode === 'suratIzin' ? (
            <div className="flex items-center space-x-1.5 bg-slate-800/90 text-sandstone px-2.5 py-1 rounded-lg border border-slate-700">
              <UserCheck className="w-3.5 h-3.5 text-sandstone" />
              <span className="font-bold text-xs max-w-[140px] truncate">{activeStudent.name}</span>
              
              <div className="flex items-center space-x-1 ml-1 border-l border-slate-700 pl-1.5">
                <button
                  disabled={currentStudentIndex === 0}
                  onClick={handlePrevStudent}
                  className="p-0.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Siswa Sebelumnya"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[10px] text-slate-400">
                  {currentStudentIndex + 1}/{totalStudents}
                </span>
                <button
                  disabled={currentStudentIndex >= totalStudents - 1}
                  onClick={handleNextStudent}
                  className="p-0.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Siswa Berikutnya"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
              {invoice.template === 'KOP_SURAT_OFFICIAL' ? 'Kop Surat Resmi' : 'Minimalis'}
            </span>
          )}
        </div>

        {/* Right Side: Zoom & Scale Controls */}
        <div className="flex items-center space-x-1.5">
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setScale(0.75)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                scale === 0.75 ? 'bg-forest text-sandstone font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              75%
            </button>
            <button
              onClick={() => setScale(1.0)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                scale === 1.0 ? 'bg-forest text-sandstone font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              100%
            </button>
            <button
              onClick={() => setScale(1.25)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                scale === 1.25 ? 'bg-forest text-sandstone font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              125%
            </button>
          </div>

          <div className="flex items-center space-x-0.5 pl-1 border-l border-slate-800">
            <button
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition-colors"
              title="Perkecil Tampilan"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale(s => Math.min(1.5, s + 0.1))}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition-colors"
              title="Perbesar Tampilan"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div className="w-full flex justify-center overflow-x-auto pb-12">
        <div 
          id="invoice-preview-container"
          className="a4-page-container w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm transition-transform origin-top overflow-hidden"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            marginBottom: scale < 1 ? `-${(1 - scale) * 297}mm` : '0px'
          }}
        >
          {renderTemplate()}
        </div>
      </div>

    </div>
  );
};
