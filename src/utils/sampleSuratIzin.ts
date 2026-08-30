import { SuratIzinData } from '../types/suratIzin';
import { SANGGAR_BUNDAKU_INFO } from './sampleData';

export const SAMPLE_SURAT_IZIN: SuratIzinData = {
  id: "surat-1",
  letterNumber: "01/SB-2026",
  subject: "Permohonan Izin",
  attachment: "-",
  issueCity: "Sleman",
  issueDate: new Date().toISOString().split('T')[0],
  
  recipientTitle: "Bapak / Ibu Guru Wali Kelas",
  recipientLocation: "Di tempat",
  
  activityCategory: "Pentas Seni Budaya Tradisional",
  eventName: "Festival Seni & Budaya Sleman 2026",
  absenceDateText: "Sabtu, 5 September 2026",
  eventLocation: "Gedung Kesenian Kabupaten Sleman",
  
  students: [
    {
      id: "std-1",
      name: "Ananda Clarissa Maharani",
      school: "SMP Negeri 1 Sleman",
      gradeClass: "VIII B"
    },
    {
      id: "std-2",
      name: "Bima Putera Pratama",
      school: "SD Negeri Sukoharjo 2",
      gradeClass: "V A"
    },
    {
      id: "std-3",
      name: "Cinta Laura Septiani",
      school: "SMA Negeri 1 Ngaglik",
      gradeClass: "X 3"
    }
  ],
  selectedStudentIndex: 0,
  
  sender: { 
    ...SANGGAR_BUNDAKU_INFO,
    logoUrl: "/assets/logo/logo-green-forest.png",
    watermarkUrl: "/assets/logo/watermark-dancer.png"
  },
  
  signerRole: "Ketua Sanggar Bundaku",
  signerName: "Sri Supeni",
  showStampAndSignature: true
};

export const SAMPLE_SURAT_IZIN_PRESETS: Record<string, SuratIzinData> = {
  festivalBudaya: {
    ...SAMPLE_SURAT_IZIN
  },
  fls2nLomba: {
    ...SAMPLE_SURAT_IZIN,
    id: "surat-fls2n",
    letterNumber: "02/SB-FLS2N/2026",
    activityCategory: "Lomba FLS2N Tari Kreasi Tradisional",
    eventName: "Festival dan Lomba Seni Siswa Nasional (FLS2N) Tingkat DIY",
    absenceDateText: "Kamis - Jumat, 17 - 18 September 2026",
    eventLocation: "Taman Budaya Yogyakarta (TBY)",
    students: [
      {
        id: "std-fls-1",
        name: "Ananda Clarissa Maharani",
        school: "SMP Negeri 1 Sleman",
        gradeClass: "VIII B"
      },
      {
        id: "std-fls-2",
        name: "Nabila Sekar Arum",
        school: "SMP Negeri 1 Sleman",
        gradeClass: "VIII C"
      },
      {
        id: "std-fls-3",
        name: "Dewi Kirana Putri",
        school: "SMP Negeri 2 Sleman",
        gradeClass: "IX A"
      }
    ]
  },
  kirabBudaya: {
    ...SAMPLE_SURAT_IZIN,
    id: "surat-kirab",
    letterNumber: "03/SB-KIRAB/2026",
    activityCategory: "Pawai Kirab & Tari Kolosal",
    eventName: "Pawai Kirab Budaya Hari Jadi Kabupaten Sleman",
    absenceDateText: "Selasa, 12 Mei 2026",
    eventLocation: "Lapangan Denggung Sleman",
    students: [
      {
        id: "std-kirab-1",
        name: "Ananda Clarissa Maharani",
        school: "SMP Negeri 1 Sleman",
        gradeClass: "VIII B"
      },
      {
        id: "std-kirab-2",
        name: "Bima Putera Pratama",
        school: "SD Negeri Sukoharjo 2",
        gradeClass: "V A"
      }
    ]
  }
};

