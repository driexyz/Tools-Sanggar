import React from 'react';
import { SuratIzinData, StudentInfo } from '../../types/suratIzin';
import { SAMPLE_SURAT_IZIN_PRESETS } from '../../utils/sampleSuratIzin';
import { 
  FileText, 
  Calendar, 
  PenTool,
  Plus,
  Trash2,
  Users,
  Building2,
  Sparkles,
  Award,
  Copy,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface SuratIzinEditorProps {
  surat: SuratIzinData;
  onChange: (updated: SuratIzinData) => void;
}

export const SuratIzinEditor: React.FC<SuratIzinEditorProps> = ({ surat, onChange }) => {
  
  const updateField = <K extends keyof SuratIzinData>(field: K, value: SuratIzinData[K]) => {
    onChange({ ...surat, [field]: value });
  };

  const handleLoadPreset = (key: string) => {
    if (SAMPLE_SURAT_IZIN_PRESETS[key]) {
      onChange({ ...SAMPLE_SURAT_IZIN_PRESETS[key] });
    }
  };

  const updateSender = (field: string, value: string) => {
    onChange({
      ...surat,
      sender: { ...surat.sender, [field]: value }
    });
  };

  const handleAddStudent = () => {
    const newStudent: StudentInfo = {
      id: 'std-' + Date.now(),
      name: 'Nama Siswa Baru',
      school: 'Nama Sekolah',
      gradeClass: 'Kelas'
    };
    const updatedStudents = [...(surat.students || []), newStudent];
    onChange({
      ...surat,
      students: updatedStudents,
      selectedStudentIndex: updatedStudents.length - 1
    });
  };

  const handleDuplicateStudent = (studentToDuplicate: StudentInfo) => {
    const duplicated: StudentInfo = {
      ...studentToDuplicate,
      id: 'std-' + Date.now(),
      name: `${studentToDuplicate.name} (Salinan)`
    };
    const updatedStudents = [...(surat.students || []), duplicated];
    onChange({
      ...surat,
      students: updatedStudents,
      selectedStudentIndex: updatedStudents.length - 1
    });
  };

  const handleMoveStudentUp = (index: number) => {
    if (index === 0) return;
    const newStudents = [...surat.students];
    const temp = newStudents[index - 1];
    newStudents[index - 1] = newStudents[index];
    newStudents[index] = temp;
    onChange({
      ...surat,
      students: newStudents,
      selectedStudentIndex: index - 1
    });
  };

  const handleMoveStudentDown = (index: number) => {
    if (index >= surat.students.length - 1) return;
    const newStudents = [...surat.students];
    const temp = newStudents[index + 1];
    newStudents[index + 1] = newStudents[index];
    newStudents[index] = temp;
    onChange({
      ...surat,
      students: newStudents,
      selectedStudentIndex: index + 1
    });
  };

  const handleUpdateStudent = (id: string, field: keyof StudentInfo, value: string) => {
    const updatedStudents = surat.students.map(s => {
      if (s.id === id) {
        return { ...s, [field]: value };
      }
      return s;
    });
    updateField('students', updatedStudents);
  };

  const handleRemoveStudent = (id: string) => {
    if (surat.students.length <= 1) {
      alert("Harus ada minimal 1 data siswa!");
      return;
    }
    const updatedStudents = surat.students.filter(s => s.id !== id);
    const newIndex = Math.max(0, Math.min(surat.selectedStudentIndex || 0, updatedStudents.length - 1));
    onChange({
      ...surat,
      students: updatedStudents,
      selectedStudentIndex: newIndex
    });
  };

  return (
    <div className="no-print w-full h-full bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col font-sora">
      
      {/* Title Header */}
      <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
        <h2 className="font-raleway font-bold text-sm text-sandstone flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          Editor Surat Izin Sekolah
        </h2>
        <span className="text-[10px] bg-forest/30 text-sandstone px-2 py-0.5 rounded font-mono border border-sandstone/20">
          {surat.students?.length || 0} Siswa
        </span>
      </div>

      {/* Editor Content Scroll Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-6 text-xs">
        
        {/* --- PRESETS QUICK LOADER BAR --- */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-400 text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sandstone" />
              Preset Acara & Template Surat:
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleLoadPreset('festivalBudaya')}
              className="px-2.5 py-1 rounded bg-forest/30 hover:bg-forest text-sandstone text-[11px] font-medium border border-sandstone/30 transition-colors flex items-center gap-1"
            >
              <Award className="w-3 h-3 text-sandstone" />
              Festival Budaya
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('fls2nLomba')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700 transition-colors flex items-center gap-1"
            >
              <Users className="w-3 h-3 text-slate-400" />
              Lomba FLS2N
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('kirabBudaya')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              Kirab Budaya
            </button>
          </div>
        </div>

        {/* --- SECTION 1: KOP SURAT & IDENTITY SANGGAR --- */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sandstone flex items-center gap-1.5 border-b border-slate-800 pb-1 text-xs">
            <Building2 className="w-4 h-4 text-sandstone" />
            Kop Surat & Identitas Sanggar
          </h3>

          <div className="space-y-3 bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Nama Sanggar / Lembaga</label>
              <input 
                type="text" 
                value={surat.sender.name} 
                onChange={(e) => updateSender('name', e.target.value)}
                placeholder="SANGGAR BUNDAKU"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-bold focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Tagline / Sub-Header Kop Surat</label>
              <input 
                type="text" 
                value={surat.sender.tagline || ""} 
                onChange={(e) => updateSender('tagline', e.target.value)}
                placeholder="PELESTARIAN & KOREOGRAFI TARI TRADISIONAL"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-semibold focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Pendiri / Founder</label>
              <input 
                type="text" 
                value={surat.sender.founder || ""} 
                onChange={(e) => updateSender('founder', e.target.value)}
                placeholder="Sri Supeni"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Alamat Studio</label>
                <input 
                  type="text" 
                  value={surat.sender.address} 
                  onChange={(e) => updateSender('address', e.target.value)}
                  placeholder="Perum Sukoharjo Indah Blok N-201"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Telp / WA</label>
                <input 
                  type="text" 
                  value={surat.sender.phone} 
                  onChange={(e) => updateSender('phone', e.target.value)}
                  placeholder="0819-0411-6067"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: BULK DAFTAR SISWA --- */}
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1">
            <h3 className="font-semibold text-slate-300 flex items-center gap-1.5 text-xs">
              <Users className="w-4 h-4 text-slate-400" />
              Daftar Siswa ({surat.students?.length || 0})
            </h3>
            <button
              type="button"
              onClick={handleAddStudent}
              className="flex items-center gap-1 bg-forest hover:bg-forest/80 text-sandstone px-2.5 py-1 rounded text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Tambah Siswa
            </button>
          </div>

          <div className="space-y-3">
            {surat.students.map((student, index) => {
              const isSelected = index === (surat.selectedStudentIndex || 0);
              return (
                <div 
                  key={student.id || index}
                  onClick={() => updateField('selectedStudentIndex', index)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-forest/20 border-forest shadow-md' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded ${
                      isSelected ? 'bg-forest text-sandstone' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Siswa #{index + 1} {isSelected && '(Dipratinjau)'}
                    </span>

                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveStudentUp(index);
                        }}
                        className="text-slate-500 hover:text-slate-200 p-1 rounded transition-colors disabled:opacity-20 disabled:hover:text-slate-500"
                        title="Pindahkan Ke Atas"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={index >= surat.students.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveStudentDown(index);
                        }}
                        className="text-slate-500 hover:text-slate-200 p-1 rounded transition-colors disabled:opacity-20 disabled:hover:text-slate-500"
                        title="Pindahkan Ke Bawah"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateStudent(student);
                        }}
                        className="text-slate-500 hover:text-sandstone p-1 rounded transition-colors"
                        title="Duplikasi Siswa Ini"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveStudent(student.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                        title="Hapus Siswa Ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Nama Lengkap Siswa</label>
                      <input 
                        type="text" 
                        value={student.name} 
                        onChange={(e) => handleUpdateStudent(student.id, 'name', e.target.value)}
                        placeholder="Nama Siswa"
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 font-bold focus:border-forest focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Sekolah</label>
                        <input 
                          type="text" 
                          value={student.school} 
                          onChange={(e) => handleUpdateStudent(student.id, 'school', e.target.value)}
                          placeholder="Nama Sekolah"
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Kelas</label>
                        <input 
                          type="text" 
                          value={student.gradeClass} 
                          onChange={(e) => handleUpdateStudent(student.id, 'gradeClass', e.target.value)}
                          placeholder="Kelas"
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- SECTION 3: DETAIL ACARA & TANGGAL IZIN --- */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-1 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Detail Acara & Tanggal Izin (Berlaku Semua Siswa)
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-400 mb-1">Jenis Kegiatan / Acara</label>
              <input 
                type="text" 
                value={surat.activityCategory} 
                onChange={(e) => updateField('activityCategory', e.target.value)}
                placeholder="Pentas Seni Budaya Tradisional / Lomba Tari"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Nama Acara Resmi</label>
              <input 
                type="text" 
                value={surat.eventName} 
                onChange={(e) => updateField('eventName', e.target.value)}
                placeholder="Festival Seni & Budaya Sleman 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Hari & Tanggal Izin Tidak Masuk Sekolah</label>
              <input 
                type="text" 
                value={surat.absenceDateText} 
                onChange={(e) => updateField('absenceDateText', e.target.value)}
                placeholder="Sabtu, 5 September 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-emerald-400 font-bold focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Lokasi / Tempat Pelaksanaan Acara</label>
              <input 
                type="text" 
                value={surat.eventLocation} 
                onChange={(e) => updateField('eventLocation', e.target.value)}
                placeholder="Gedung Kesenian Kabupaten Sleman"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* --- SECTION 4: NOMOR & TUJUAN SURAT --- */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-1 text-xs">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Pengaturan Surat & Penerima
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Nomor Surat</label>
              <input 
                type="text" 
                value={surat.letterNumber} 
                onChange={(e) => updateField('letterNumber', e.target.value)}
                placeholder="01/SB-2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Perihal</label>
              <input 
                type="text" 
                value={surat.subject} 
                onChange={(e) => updateField('subject', e.target.value)}
                placeholder="Permohonan Izin"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Penerima (Kepada Yth)</label>
              <input 
                type="text" 
                value={surat.recipientTitle} 
                onChange={(e) => updateField('recipientTitle', e.target.value)}
                placeholder="Bapak / Ibu Guru Wali Kelas"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Tempat Penerima</label>
              <input 
                type="text" 
                value={surat.recipientLocation} 
                onChange={(e) => updateField('recipientLocation', e.target.value)}
                placeholder="Di tempat"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* --- SECTION 5: TANDA TANGAN & CAP SANGGAR --- */}
        <div className="space-y-3 pt-2">
          <h3 className="font-semibold text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-1 text-xs">
            <PenTool className="w-3.5 h-3.5 text-slate-400" />
            Tanda Tangan & Cap Sanggar
          </h3>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-200">Tampilkan Cap Sanggar & Tanda Tangan PNG</span>
              <input 
                type="checkbox" 
                checked={surat.showStampAndSignature} 
                onChange={(e) => updateField('showStampAndSignature', e.target.checked)}
                className="w-4 h-4 accent-forest rounded cursor-pointer"
              />
            </label>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800">
              <div>
                <label className="block text-slate-400 mb-1">Nama Penandatangan</label>
                <input 
                  type="text" 
                  value={surat.signerName} 
                  onChange={(e) => updateField('signerName', e.target.value)}
                  placeholder="Sri Supeni"
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Jabatan</label>
                <input 
                  type="text" 
                  value={surat.signerRole} 
                  onChange={(e) => updateField('signerRole', e.target.value)}
                  placeholder="Ketua Sanggar Bundaku"
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
