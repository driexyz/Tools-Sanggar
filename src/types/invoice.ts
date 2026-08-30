export interface BusinessInfo {
  name: string;
  tagline?: string;
  founder?: string;
  address: string;
  village?: string;
  district?: string;
  regency?: string;
  province?: string;
  postalCode?: string;
  phone: string;
  email?: string;
  website?: string;
  taxId?: string; // NPWP / NIK
  logoUrl?: string;
  watermarkUrl?: string;
}

export interface ClientInfo {
  name: string;
  organization?: string;
  address: string;
  phone?: string;
  email?: string;
}

export interface LineItem {
  id: string;
  description: string; // e.g. "Sewa Kostum Tari Bedhaya & Tata Rias"
  category?: string; // e.g. "Kostum", "Jasa Penari", "Pelatihan"
  quantity: number;
  unitPrice: number;
  discountPercentage?: number;
}

export interface BankAccount {
  bankName: string; // e.g. "Bank Central Asia (BCA)"
  accountNumber: string; // e.g. "123-456-7890"
  accountHolder: string; // e.g. "Sri Supeni"
}

export type InvoiceStatus = 'PAID' | 'PENDING' | 'OVERDUE' | 'DRAFT';

export type TemplateStyle = 'KOP_SURAT_OFFICIAL' | 'MODERN_MINIMAL' | 'ELEGANT_CREATIVE';

export interface InvoiceData {
  id: string;
  documentTitle: string; // "NOTA / INVOICE" or "SURAT PENAWARAN" or "KWITANSI"
  invoiceNumber: string; // e.g. "INV/STB/2026/08/001"
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  currency: string; // "Rp"
  
  // Header / Kop Surat customization
  showKopSurat: boolean;
  showWatermark: boolean;
  showStampPlaceholder: boolean;
  signerName: string; // "Sri Supeni"
  signerRole: string; // "Pimpinan Sanggar Bundaku"
  
  // Entities
  sender: BusinessInfo;
  client: ClientInfo;
  
  // Items & Money
  items: LineItem[];
  taxPercentage: number;
  discountAmount: number;
  shippingFee: number;
  downPayment: number; // Uang Muka (DP)
  
  // Extra Details
  notes: string; // e.g. "Terima kasih atas kepercayaan Anda menggunakan jasa Sanggar Bundaku."
  paymentTerms: string; // e.g. "Pembayaran dilakukan H-3 sebelum acara."
  bankDetails: BankAccount;
  
  // Style settings
  template: TemplateStyle;
  primaryColor: string; // #1F3F27
  accentColor: string; // #E2BD8B
}
