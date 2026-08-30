import React, { useState, useEffect } from 'react';
import { InvoiceData } from './types/invoice';
import { SuratIzinData } from './types/suratIzin';
import { SAMPLE_INVOICES } from './utils/sampleData';
import { SAMPLE_SURAT_IZIN } from './utils/sampleSuratIzin';
import { WelcomePortal } from './components/Portal/WelcomePortal';
import { Navbar } from './components/Navbar';
import { InvoiceEditor } from './components/Editor/InvoiceEditor';
import { SuratIzinEditor } from './components/Editor/SuratIzinEditor';
import { InvoicePreview } from './components/Preview/InvoicePreview';
import { BulkDownloadModal } from './components/Modal/BulkDownloadModal';
import { exportToPDF, exportBulkSuratIzinPDF, triggerPrint } from './utils/pdfGenerator';

import { KeyboardShortcutsModal } from './components/Modal/KeyboardShortcutsModal';
import { getAssetUrl } from './utils/assetHelper';

const INVOICE_STORAGE_KEY = 'sanggar_bundaku_invoice_draft';
const SURAT_STORAGE_KEY = 'sanggar_bundaku_surat_izin_draft';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'portal' | 'studio'>('portal');
  const [docMode, setDocMode] = useState<'invoice' | 'suratIzin'>('invoice');
  const [isExportingBulk, setIsExportingBulk] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes modals
      if (e.key === 'Escape') {
        setIsShortcutsModalOpen(false);
        setIsBulkModalOpen(false);
      }

      // Check if user is typing inside an input/textarea
      const target = e.target as HTMLElement;
      const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (isTyping) return;

      // ? / Shift + / opens shortcuts modal
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsModalOpen(prev => !prev);
        return;
      }

      // Ctrl / Cmd + Shift + E -> Export PDF
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        handleExportPDF();
        return;
      }

      // Ctrl / Cmd + Shift + R -> Reset Form
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleResetForm();
        return;
      }

      // Ctrl / Cmd + Shift + H -> Go to Home Portal
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setViewMode('portal');
        showToast('Kembali ke Welcome Portal');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [docMode]);

  // Invoice state
  const [invoice, setInvoice] = useState<InvoiceData>(() => {
    const saved = localStorage.getItem(INVOICE_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.sender) {
          parsed.sender.logoUrl = getAssetUrl("assets/logo/logo-green-forest.png");
          parsed.sender.watermarkUrl = getAssetUrl("assets/logo/watermark-dancer.png");
          parsed.showWatermark = true;
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved invoice:', e);
      }
    }
    return SAMPLE_INVOICES.sewaKostum;
  });

  // Surat Izin state
  const [suratIzin, setSuratIzin] = useState<SuratIzinData>(() => {
    const saved = localStorage.getItem(SURAT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.sender) {
          parsed.sender.logoUrl = getAssetUrl("assets/logo/logo-green-forest.png");
          parsed.sender.watermarkUrl = getAssetUrl("assets/logo/watermark-dancer.png");
        }
        if (!parsed.students || parsed.students.length === 0) {
          parsed.students = SAMPLE_SURAT_IZIN.students;
          parsed.selectedStudentIndex = 0;
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved surat izin:', e);
      }
    }
    return SAMPLE_SURAT_IZIN;
  });

  // Auto-save Invoice to LocalStorage
  useEffect(() => {
    localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(invoice));
  }, [invoice]);

  // Auto-save Surat Izin to LocalStorage
  useEffect(() => {
    localStorage.setItem(SURAT_STORAGE_KEY, JSON.stringify(suratIzin));
  }, [suratIzin]);

  const handleSelectOptionFromPortal = (mode: 'invoice' | 'suratIzin') => {
    setDocMode(mode);
    setViewMode('studio');
  };

  const handleResetForm = () => {
    if (docMode === 'invoice') {
      const resetInv: InvoiceData = {
        ...SAMPLE_INVOICES.sewaKostum,
        id: `inv-${Date.now()}`,
        invoiceNumber: `INV/STB/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}/${Math.floor(100+Math.random()*900)}`,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        client: { name: "", organization: "", address: "", phone: "", email: "" },
        items: [{ id: 'item-1', description: "", category: "Kostum", quantity: 1, unitPrice: 0, discountPercentage: 0 }],
        taxPercentage: 0, discountAmount: 0, shippingFee: 0, downPayment: 0,
        notes: "Terima kasih telah mempercayakan acara kepada Sanggar Bundaku."
      };
      setInvoice(resetInv);
      showToast('Form Nota & Kwitansi Direset!');
    } else {
      const resetSurat: SuratIzinData = {
        ...SAMPLE_SURAT_IZIN,
        id: `surat-${Date.now()}`,
        letterNumber: `089/STB-IZIN/${new Date().getFullYear()}`,
        issueDate: new Date().toISOString().split('T')[0],
        selectedStudentIndex: 0
      };
      setSuratIzin(resetSurat);
      showToast('Form Surat Izin Direset!');
    }
  };

  const handleExportPDF = () => {
    if (docMode === 'suratIzin') {
      setIsBulkModalOpen(true);
      return;
    }

    // Export single invoice PDF
    const filename = `Nota_${invoice.invoiceNumber.replace(/[\/\\?%*:|"<>]/g, '_')}.pdf`;
    exportToPDF('invoice-preview-container', filename);
    showToast('Mengunduh PDF Nota...');
  };

  const handleConfirmBulkDownload = async (selectedIndexes: number[]) => {
    setIsBulkModalOpen(false);
    setIsExportingBulk(true);
    try {
      const count = await exportBulkSuratIzinPDF(suratIzin, selectedIndexes, (index) => {
        setSuratIzin(prev => ({ ...prev, selectedStudentIndex: index }));
      });
      showToast(`Berhasil mengunduh ${count} file PDF Surat Izin!`);
    } finally {
      setIsExportingBulk(false);
    }
  };

  const handlePrint = () => {
    triggerPrint();
    showToast('Membuka Dialog Cetak Dokumen...');
  };

  const handleSelectStudentIndex = (index: number) => {
    setSuratIzin(prev => ({ ...prev, selectedStudentIndex: index }));
  };

  // RENDER PORTAL LANDING PAGE FIRST
  if (viewMode === 'portal') {
    return (
      <>
        <WelcomePortal
          onSelectOption={handleSelectOptionFromPortal}
          onLoadInvoicePreset={(preset) => {
            setInvoice(preset);
            setDocMode('invoice');
            setViewMode('studio');
            showToast('Preset Nota Berhasil Dimuat!');
          }}
          onLoadSuratPreset={(preset) => {
            setSuratIzin(preset);
            setDocMode('suratIzin');
            setViewMode('studio');
            showToast('Preset Surat Izin Berhasil Dimuat!');
          }}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up bg-slate-900 border border-sandstone/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-sora text-xs sm:text-sm">
            <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center text-sandstone font-bold">
              ✓
            </div>
            <span className="font-medium text-slate-200">{toastMessage}</span>
          </div>
        )}
      </>
    );
  }

  // RENDER DEDICATED STUDIO WORKSPACE
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sora">
      
      {/* Top Navbar with Hamburger Menu & Drawer */}
      <Navbar
        docMode={docMode}
        onSelectDocMode={(mode) => setDocMode(mode)}
        onGoToPortal={() => setViewMode('portal')}
        onUpdateInvoice={(updated) => {
          setInvoice(updated);
        }}
        onUpdateSuratIzin={(updated) => {
          setSuratIzin(updated);
        }}
        onReset={handleResetForm}
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
      />

      {/* Main Split Screen Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
        
        {/* Left Column: Form Editor (5 cols on large screen) */}
        <section className="lg:col-span-5 h-auto lg:h-[calc(100vh-4rem)] overflow-y-auto bg-slate-900 border-r border-slate-800">
          {docMode === 'suratIzin' ? (
            <SuratIzinEditor 
              surat={suratIzin} 
              onChange={(updated) => setSuratIzin(updated)} 
            />
          ) : (
            <InvoiceEditor 
              invoice={invoice} 
              onChange={(updated) => setInvoice(updated)} 
            />
          )}
        </section>

        {/* Right Column: Live Document Preview (7 cols on large screen) */}
        <section className="lg:col-span-7 h-auto lg:h-[calc(100vh-4rem)] bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800">
          <InvoicePreview 
            docMode={docMode}
            invoice={invoice} 
            suratIzin={suratIzin}
            onSelectStudentIndex={handleSelectStudentIndex}
          />
        </section>

      </main>

      {/* Bulk Download Student Selection Modal */}
      <BulkDownloadModal
        students={suratIzin.students || []}
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onConfirmDownload={handleConfirmBulkDownload}
      />

      {/* Keyboard Shortcuts Reference Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      {/* Bulk Export Processing Overlay */}
      {isExportingBulk && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white font-sora">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sandstone border-t-transparent mb-4"></div>
          <p className="font-bold text-lg">Sedang Mengunduh PDF Surat Izin Terpilih...</p>
          <p className="text-sm text-slate-400 mt-1">Mohon tunggu sebentar, file per nama siswa sedang dibuat otomatis.</p>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up bg-slate-900 border border-sandstone/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-sora text-xs sm:text-sm">
          <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center text-sandstone font-bold">
            ✓
          </div>
          <span className="font-medium text-slate-200">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default App;
