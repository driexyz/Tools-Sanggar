import { InvoiceData, BusinessInfo } from '../types/invoice';

export const SANGGAR_BUNDAKU_INFO: BusinessInfo = {
  name: "SANGGAR BUNDAKU",
  tagline: "PELESTARIAN & KOREOGRAFI TARI TRADISIONAL",
  founder: "Sri Supeni",
  address: "Perum Sukoharjo Indah Blok N-201, Losari, Sukoharjo",
  district: "Kec. Ngaglik",
  regency: "Kabupaten Sleman",
  province: "Daerah Istimewa Yogyakarta",
  postalCode: "55581",
  phone: "0819-0411-6067",
  email: "sanggartari.bundaku@gmail.com",
  logoUrl: "/assets/logo/logo-green-forest.png",
  watermarkUrl: "/assets/logo/watermark-dancer.png"
};

export const SAMPLE_INVOICES: Record<string, InvoiceData> = {
  sewaKostum: {
    id: "sample-1",
    documentTitle: "NOTA / INVOICE",
    invoiceNumber: "INV/STB/2026/08/014",
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "PAID",
    currency: "Rp",
    
    showKopSurat: true,
    showWatermark: true,
    showStampPlaceholder: true,
    signerName: "Sri Supeni",
    signerRole: "Pimpinan Sanggar Bundaku",
    
    sender: { ...SANGGAR_BUNDAKU_INFO },
    
    client: {
      name: "Dinas Kebudayaan Kabupaten Sleman",
      organization: "Panitia Pentas Seni Budaya 2026",
      address: "Jl. Madureso No. 1, Triharjo, Kec. Sleman, Kabupaten Sleman, D.I. Yogyakarta",
      phone: "0812-3456-7890",
      email: "disbud.sleman@gov.id"
    },
    
    items: [
      {
        id: "item-1",
        description: "Sewa Kostum Tari Bedhaya lengkap (Sanggul, Aksesori Perhiasan & Jarik)",
        category: "Kostum",
        quantity: 5,
        unitPrice: 350000,
        discountPercentage: 0
      },
      {
        id: "item-2",
        description: "Jasa Tata Rias / Make Up Character & Sanggul Penari Traditional",
        category: "Make Up",
        quantity: 5,
        unitPrice: 200000,
        discountPercentage: 0
      },
      {
        id: "item-3",
        description: "Jasa Penari Utama Pentas Pembukaan Acara (5 Penari)",
        category: "Jasa Penari",
        quantity: 1,
        unitPrice: 2500000,
        discountPercentage: 10
      },
      {
        id: "item-4",
        description: "Honorarium Koreografer & Penata Musik Tari Tradisional",
        category: "Koreografi",
        quantity: 1,
        unitPrice: 1500000,
        discountPercentage: 0
      }
    ],
    
    taxPercentage: 0,
    discountAmount: 0,
    shippingFee: 0,
    downPayment: 2000000,
    
    notes: "Terima kasih telah mempercayakan pengisian acara dan penyewaan kostum kepada Sanggar Bundaku.",
    paymentTerms: "Pelunasan sisa tagihan dilakukan paling lambat H-1 sebelum pelaksanaan acara pentas.",
    
    bankDetails: {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "8930-1234-56",
      accountHolder: "Sri Supeni"
    },
    
    template: "KOP_SURAT_OFFICIAL",
    primaryColor: "#1F3F27",
    accentColor: "#E2BD8B"
  },
  
  pelatihanTari: {
    id: "sample-2",
    documentTitle: "KWITANSI SPP PELATIHAN",
    invoiceNumber: "KWT/STB/2026/08/089",
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "PAID",
    currency: "Rp",
    
    showKopSurat: true,
    showWatermark: true,
    showStampPlaceholder: true,
    signerName: "Sri Supeni",
    signerRole: "Pimpinan Sanggar Bundaku",
    
    sender: { ...SANGGAR_BUNDAKU_INFO },
    
    client: {
      name: "Ibu Rahmawati (Orang Tua Siswa)",
      organization: "Siswa: Ananda Clarissa Maharani",
      address: "Jl. Kaliurang Km 9, Ngaglik, Sleman, Yogyakarta",
      phone: "0813-9876-5432"
    },
    
    items: [
      {
        id: "item-101",
        description: "SPP Pelatihan Tari Tradisional Anak Kelas Dasar - Bulan Agustus 2026",
        category: "SPP",
        quantity: 1,
        unitPrice: 250000,
        discountPercentage: 0
      },
      {
        id: "item-102",
        description: "Seragam & Sampur / Selendang Latihan Sanggar Bundaku",
        category: "Perlengkapan",
        quantity: 1,
        unitPrice: 175000,
        discountPercentage: 0
      }
    ],
    
    taxPercentage: 0,
    discountAmount: 0,
    shippingFee: 0,
    downPayment: 0,
    
    notes: "Pembayaran SPP jatuh tempo setiap tanggal 10 awal bulan. Selamat berlatih di Sanggar Bundaku!",
    paymentTerms: "Transfer via Bank BCA a.n. Sri Supeni.",
    
    bankDetails: {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "8930-1234-56",
      accountHolder: "Sri Supeni"
    },
    
    template: "KOP_SURAT_OFFICIAL",
    primaryColor: "#1F3F27",
    accentColor: "#E2BD8B"
  }
};
