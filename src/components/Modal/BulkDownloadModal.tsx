import React, { useState } from 'react';
import { StudentInfo } from '../../types/suratIzin';
import { Download, X, CheckSquare, Square, FileText } from 'lucide-react';

interface BulkDownloadModalProps {
  students: StudentInfo[];
  isOpen: boolean;
  onClose: () => void;
  onConfirmDownload: (selectedIndexes: number[]) => void;
}

export const BulkDownloadModal: React.FC<BulkDownloadModalProps> = ({
  students,
  isOpen,
  onClose,
  onConfirmDownload,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => 
    students.map(s => s.id)
  );

  if (!isOpen) return null;

  const isAllSelected = selectedIds.length === students.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const handleToggleStudent = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDownload = () => {
    const selectedIndexes = students
      .map((student, idx) => (selectedIds.includes(student.id) ? idx : -1))
      .filter(idx => idx !== -1);

    if (selectedIndexes.length === 0) {
      alert("Pilih minimal 1 nama siswa untuk diunduh!");
      return;
    }

    onConfirmDownload(selectedIndexes);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-sora no-print animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-forest/30 border border-sandstone/30 text-sandstone">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-raleway font-bold text-base text-white">Unduh PDF Surat Izin</h3>
              <p className="text-xs text-slate-400">Pilih siswa yang akan dibuatkan file PDF</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Select All / Deselect Toolbar */}
        <div className="px-5 py-2.5 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <span className="font-medium text-slate-400">
            Terpilih: <span className="font-bold text-emerald-400">{selectedIds.length}</span> dari {students.length} Siswa
          </span>

          <button
            onClick={handleToggleSelectAll}
            className="flex items-center gap-1.5 font-bold text-sandstone hover:text-white transition-colors"
          >
            {isAllSelected ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
            {isAllSelected ? 'Batal Pilih Semua' : 'Pilih Semua'}
          </button>
        </div>

        {/* Scrollable Student List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2 max-h-[350px]">
          {students.map((student, idx) => {
            const isChecked = selectedIds.includes(student.id);
            return (
              <div
                key={student.id || idx}
                onClick={() => handleToggleStudent(student.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-forest/20 border-forest text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    isChecked ? 'bg-forest border-emerald-400 text-sandstone' : 'border-slate-700 bg-slate-900'
                  }`}>
                    {isChecked && <CheckSquare className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-100">{student.name || `Siswa #${idx + 1}`}</p>
                    <p className="text-[11px] text-slate-400">
                      {student.school || 'Sekolah'} • {student.gradeClass || 'Kelas'}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-500 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  #{idx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-950 px-5 py-3.5 border-t border-slate-800 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={selectedIds.length === 0}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-sandstone hover:bg-sandstone/90 disabled:opacity-40 disabled:hover:bg-sandstone transition-all shadow-md active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-950" />
            Unduh {selectedIds.length} PDF Surat Izin
          </button>
        </div>

      </div>
    </div>
  );
};
