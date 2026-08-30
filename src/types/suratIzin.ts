import { BusinessInfo } from './invoice';

export interface StudentInfo {
  id: string;
  name: string; // e.g. "Ananda Clarissa Maharani"
  school: string; // e.g. "SMP Negeri 1 Sleman"
  gradeClass: string; // e.g. "VIII B"
}

export interface SuratIzinData {
  id: string;
  letterNumber: string; // e.g. "01/SB-2026"
  subject: string; // "Permohonan Izin"
  attachment: string; // "-"
  issueCity: string; // "Sleman"
  issueDate: string; // "2026-08-29"
  
  // Recipient
  recipientTitle: string; // "Bapak / Ibu Guru Wali Kelas"
  recipientLocation: string; // "Di tempat"
  
  // Activity info
  activityCategory: string; // e.g. "Pentas Seni Budaya Tradisional"
  eventName: string; // e.g. "Festival Seni Pelajar Sleman 2026"
  absenceDateText: string; // e.g. "Sabtu, 5 September 2026"
  eventLocation: string; // e.g. "Gedung Kesenian Kabupaten Sleman"
  
  // Multiple Students List for Bulk Generate
  students: StudentInfo[];
  selectedStudentIndex: number; // Pointer to active student in preview
  
  // Sender info
  sender: BusinessInfo;
  
  // Signer
  signerRole: string; // "Ketua Sanggar Bundaku"
  signerName: string; // "Sri Supeni"
  showStampAndSignature: boolean;
}
