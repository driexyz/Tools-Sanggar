import React, { useState } from 'react';
import { InvoiceData, LineItem } from '../../types/invoice';
import { 
  Building2, 
  User, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  CreditCard, 
  FileText, 
  Sliders, 
  CheckCircle2,
  Copy,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface InvoiceEditorProps {
  invoice: InvoiceData;
  onChange: (updated: InvoiceData) => void;
}

export const InvoiceEditor: React.FC<InvoiceEditorProps> = ({ invoice, onChange }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'business' | 'client' | 'items' | 'payment' | 'style'>('general');

  // Helper for updating single root field
  const updateField = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    onChange({ ...invoice, [field]: value });
  };

  // Helper for updating nested sender object
  const updateSender = (field: string, value: string) => {
    onChange({
      ...invoice,
      sender: { ...invoice.sender, [field]: value }
    });
  };

  // Helper for updating nested client object
  const updateClient = (field: string, value: string) => {
    onChange({
      ...invoice,
      client: { ...invoice.client, [field]: value }
    });
  };

  // Helper for updating nested bank object
  const updateBank = (field: string, value: string) => {
    onChange({
      ...invoice,
      bankDetails: { ...invoice.bankDetails, [field]: value }
    });
  };

  // Line item handlers
  const handleAddItem = () => {
    const newItem: LineItem = {
      id: 'item-' + Date.now(),
      description: 'Sewa Kostum / Jasa Tari Baru',
      category: 'Kostum',
      quantity: 1,
      unitPrice: 250000,
      discountPercentage: 0
    };
    updateField('items', [...invoice.items, newItem]);
  };

  const handleDuplicateItem = (itemToDuplicate: LineItem) => {
    const duplicated: LineItem = {
      ...itemToDuplicate,
      id: 'item-' + Date.now(),
      description: `${itemToDuplicate.description} (Salinan)`
    };
    updateField('items', [...invoice.items, duplicated]);
  };

  const handleMoveItemUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...invoice.items];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    updateField('items', newItems);
  };

  const handleMoveItemDown = (index: number) => {
    if (index >= invoice.items.length - 1) return;
    const newItems = [...invoice.items];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    updateField('items', newItems);
  };

  const handleUpdateItem = (id: string, field: keyof LineItem, value: any) => {
    const updatedItems = invoice.items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateField('items', updatedItems);
  };

  const handleRemoveItem = (id: string) => {
    updateField('items', invoice.items.filter(item => item.id !== id));
  };

  return (
    <div className="no-print w-full h-full bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col font-sora">
      
      {/* Navigation Tabs Header */}
      <div className="flex overflow-x-auto bg-slate-950 border-b border-slate-800 p-2 gap-1 scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            activeTab === 'general' 
              ? 'bg-forest text-sandstone font-bold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Kop & Status
        </button>

        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            activeTab === 'business' 
              ? 'bg-forest text-sandstone font-bold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          Sanggar Tari
        </button>

        <button
          onClick={() => setActiveTab('client')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            activeTab === 'client' 
              ? 'bg-forest text-sandstone font-bold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Data Klien
        </button>

        <button
          onClick={() => setActiveTab('items')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            activeTab === 'items' 
              ? 'bg-forest text-sandstone font-bold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Layanan & Kostum ({invoice.items.length})
        </button>

        <button
          onClick={() => setActiveTab('payment')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            activeTab === 'payment' 
              ? 'bg-forest text-sandstone font-bold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          Bayar & DP
        </button>

        <button
          onClick={() => setActiveTab('style')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            activeTab === 'style' 
              ? 'bg-forest text-sandstone font-bold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Tampilan
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs">
        
        {/* --- TAB 1: GENERAL & KOP --- */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="font-raleway font-bold text-sm text-sandstone flex items-center gap-2 border-b border-slate-800 pb-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Pengaturan Dokumen & Kop Surat
            </h3>

            {/* Kop Surat Toggles */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-slate-200">Tampilkan Kop Surat Resmi Sanggar</span>
                <input 
                  type="checkbox" 
                  checked={invoice.showKopSurat} 
                  onChange={(e) => updateField('showKopSurat', e.target.checked)}
                  className="w-4 h-4 accent-forest rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-slate-800">
                <span className="font-semibold text-slate-200">Tampilkan Watermark Penari di Background</span>
                <input 
                  type="checkbox" 
                  checked={invoice.showWatermark} 
                  onChange={(e) => updateField('showWatermark', e.target.checked)}
                  className="w-4 h-4 accent-forest rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-slate-800">
                <span className="font-semibold text-slate-200">Tampilkan Cap Sanggar & Tanda Tangan</span>
                <input 
                  type="checkbox" 
                  checked={invoice.showStampPlaceholder} 
                  onChange={(e) => updateField('showStampPlaceholder', e.target.checked)}
                  className="w-4 h-4 accent-forest rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Judul Dokumen</label>
                <input 
                  type="text" 
                  value={invoice.documentTitle} 
                  onChange={(e) => updateField('documentTitle', e.target.value)}
                  placeholder="NOTA / INVOICE / SURAT PENAWARAN"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Nomor Nota</label>
                <input 
                  type="text" 
                  value={invoice.invoiceNumber} 
                  onChange={(e) => updateField('invoiceNumber', e.target.value)}
                  placeholder="INV/STB/2026/08/001"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Tanggal Terbit</label>
                <input 
                  type="date" 
                  value={invoice.issueDate} 
                  onChange={(e) => updateField('issueDate', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Tanggal Jatuh Tempo</label>
                <input 
                  type="date" 
                  value={invoice.dueDate} 
                  onChange={(e) => updateField('dueDate', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Status Pembayaran</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('status', 'PAID')}
                  className={`py-2 px-3 rounded-lg font-bold text-center border transition-all ${
                    invoice.status === 'PAID' 
                      ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  LUNAS
                </button>
                <button
                  type="button"
                  onClick={() => updateField('status', 'PENDING')}
                  className={`py-2 px-3 rounded-lg font-bold text-center border transition-all ${
                    invoice.status === 'PENDING' 
                      ? 'bg-amber-600/30 text-amber-300 border-amber-500' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  PENDING
                </button>
                <button
                  type="button"
                  onClick={() => updateField('status', 'OVERDUE')}
                  className={`py-2 px-3 rounded-lg font-bold text-center border transition-all ${
                    invoice.status === 'OVERDUE' 
                      ? 'bg-rose-600/30 text-rose-300 border-rose-500' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  JATUH TEMPO
                </button>
              </div>
            </div>

            {/* Signature Info */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <h4 className="font-semibold text-slate-300">Informasi Penandatangan Nota</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Nama Penandatangan</label>
                  <input 
                    type="text" 
                    value={invoice.signerName} 
                    onChange={(e) => updateField('signerName', e.target.value)}
                    placeholder="Sri Supeni"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Jabatan</label>
                  <input 
                    type="text" 
                    value={invoice.signerRole} 
                    onChange={(e) => updateField('signerRole', e.target.value)}
                    placeholder="Pimpinan Sanggar Bundaku"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- TAB 2: SANGGAR BUNDAKU INFO --- */}
        {activeTab === 'business' && (
          <div className="space-y-4">
            <h3 className="font-raleway font-bold text-sm text-sandstone flex items-center gap-2 border-b border-slate-800 pb-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              Identitas & Header Kop Surat Sanggar
            </h3>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Nama Sanggar / Usaha</label>
              <input 
                type="text" 
                value={invoice.sender.name} 
                onChange={(e) => updateSender('name', e.target.value)}
                placeholder="SANGGAR BUNDAKU"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-bold focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Sub-Header / Tagline (Teks Warna Krem di Bawah Nama)</label>
              <input 
                type="text" 
                value={invoice.sender.tagline || ''} 
                onChange={(e) => updateSender('tagline', e.target.value)}
                placeholder="PELESTARIAN & KOREOGRAFI TARI TRADISIONAL"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sandstone font-semibold focus:border-forest focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Teks Pendiri / Founder</label>
                <input 
                  type="text" 
                  value={invoice.sender.founder || ''} 
                  onChange={(e) => updateSender('founder', e.target.value)}
                  placeholder="Pendiri / Founder: Sri Supeni"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">No. Telp / WhatsApp</label>
                <input 
                  type="text" 
                  value={invoice.sender.phone} 
                  onChange={(e) => updateSender('phone', e.target.value)}
                  placeholder="0819-0411-6067"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Alamat Sanggar</label>
              <textarea 
                rows={2}
                value={invoice.sender.address} 
                onChange={(e) => updateSender('address', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Kecamatan</label>
                <input 
                  type="text" 
                  value={invoice.sender.district || ''} 
                  onChange={(e) => updateSender('district', e.target.value)}
                  placeholder="Kec. Ngaglik"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Kabupaten</label>
                <input 
                  type="text" 
                  value={invoice.sender.regency || ''} 
                  onChange={(e) => updateSender('regency', e.target.value)}
                  placeholder="Kab. Sleman"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Kode Pos</label>
                <input 
                  type="text" 
                  value={invoice.sender.postalCode || ''} 
                  onChange={(e) => updateSender('postalCode', e.target.value)}
                  placeholder="55581"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Email Sanggar</label>
              <input 
                type="email" 
                value={invoice.sender.email || ''} 
                onChange={(e) => updateSender('email', e.target.value)}
                placeholder="sanggartari.bundaku@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* --- TAB 3: CLIENT DATA --- */}
        {activeTab === 'client' && (
          <div className="space-y-4">
            <h3 className="font-raleway font-bold text-sm text-sandstone flex items-center gap-2 border-b border-slate-800 pb-2">
              <User className="w-4 h-4 text-emerald-400" />
              Data Klien / Penyewa / Instansi (Kepada Yth)
            </h3>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Nama Klien / Perorangan</label>
              <input 
                type="text" 
                value={invoice.client.name} 
                onChange={(e) => updateClient('name', e.target.value)}
                placeholder="misal: Ibu Rahmawati / Dinas Kebudayaan"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-bold focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Organisasi / Instansi / Nama Siswa</label>
              <input 
                type="text" 
                value={invoice.client.organization || ''} 
                onChange={(e) => updateClient('organization', e.target.value)}
                placeholder="misal: Panitia Pentas Seni Budaya / Siswa: Clarissa"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Alamat Lengkap</label>
              <textarea 
                rows={2}
                value={invoice.client.address} 
                onChange={(e) => updateClient('address', e.target.value)}
                placeholder="Alamat penyewa atau tempat acara"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">No. HP / WA Klien</label>
                <input 
                  type="text" 
                  value={invoice.client.phone || ''} 
                  onChange={(e) => updateClient('phone', e.target.value)}
                  placeholder="0812-3456-7890"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Email Klien</label>
                <input 
                  type="email" 
                  value={invoice.client.email || ''} 
                  onChange={(e) => updateClient('email', e.target.value)}
                  placeholder="email@klien.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: LINE ITEMS & SERVICES --- */}
        {activeTab === 'items' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-raleway font-bold text-sm text-sandstone flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                Rincian Layanan & Sewa Kostum
              </h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 bg-forest hover:bg-forest/80 text-sandstone px-3 py-1 rounded-lg text-xs font-bold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Layanan
              </button>
            </div>

            {invoice.items.length === 0 ? (
              <div className="bg-slate-950 p-6 text-center rounded-lg border border-dashed border-slate-800 text-slate-500">
                <p>Belum ada rincian layanan.</p>
                <button 
                  onClick={handleAddItem}
                  className="mt-2 text-sandstone underline text-xs hover:text-white"
                >
                  + Tambah item pertama
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {invoice.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 relative group hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-slate-800 text-slate-400 font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                        #{index + 1}
                      </span>

                      {/* Category Selector */}
                      <select
                        value={item.category || 'Kostum'}
                        onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-300 text-xs focus:border-forest focus:outline-none"
                      >
                        <option value="Kostum">Sewa Kostum</option>
                        <option value="Make Up">Tata Rias / Sanggul</option>
                        <option value="Jasa Penari">Jasa Penari Event</option>
                        <option value="Koreografi">Koreografi & Penata Musik</option>
                        <option value="SPP">SPP Pelatihan Tari</option>
                        <option value="Transportasi">Transportasi / Kirim</option>
                        <option value="Lain-lain">Lain-lain</option>
                      </select>

                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveItemUp(index)}
                          className="text-slate-500 hover:text-slate-200 p-1 rounded transition-colors disabled:opacity-20 disabled:hover:text-slate-500"
                          title="Pindahkan Ke Atas"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index >= invoice.items.length - 1}
                          onClick={() => handleMoveItemDown(index)}
                          className="text-slate-500 hover:text-slate-200 p-1 rounded transition-colors disabled:opacity-20 disabled:hover:text-slate-500"
                          title="Pindahkan Ke Bawah"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateItem(item)}
                          className="text-slate-500 hover:text-sandstone p-1 rounded transition-colors"
                          title="Duplikasi Item Ini"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                          title="Hapus Layanan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <input 
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        placeholder="Deskripsi layanan / nama tari & kostum"
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-100 font-medium focus:border-forest focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Jumlah (Qty)</label>
                        <input 
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-100 font-mono text-center focus:border-forest focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Harga Satuan (Rp)</label>
                        <input 
                          type="number"
                          step="10000"
                          value={item.unitPrice}
                          onChange={(e) => handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-100 font-mono text-right focus:border-forest focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Diskon Item (%)</label>
                        <input 
                          type="number"
                          min="0"
                          max="100"
                          value={item.discountPercentage || 0}
                          onChange={(e) => handleUpdateItem(item.id, 'discountPercentage', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-100 font-mono text-center focus:border-forest focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 5: PAYMENT, DOWN PAYMENT & NOTES --- */}
        {activeTab === 'payment' && (
          <div className="space-y-4">
            <h3 className="font-raleway font-bold text-sm text-sandstone flex items-center gap-2 border-b border-slate-800 pb-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              Uang Muka (DP), Diskon & Rekening Bank
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Diskon Tambahan (Rp)</label>
                <input 
                  type="number" 
                  value={invoice.discountAmount || 0} 
                  onChange={(e) => updateField('discountAmount', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono text-right focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Uang Muka / DP (Rp)</label>
                <input 
                  type="number" 
                  value={invoice.downPayment || 0} 
                  onChange={(e) => updateField('downPayment', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono text-right text-emerald-400 font-bold focus:border-forest focus:outline-none"
                />
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-3">
              <h4 className="font-semibold text-slate-300">Rekening Bank Pembayaran</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Nama Bank</label>
                  <input 
                    type="text" 
                    value={invoice.bankDetails?.bankName || ''} 
                    onChange={(e) => updateBank('bankName', e.target.value)}
                    placeholder="Bank Central Asia (BCA)"
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">No. Rekening</label>
                  <input 
                    type="text" 
                    value={invoice.bankDetails?.accountNumber || ''} 
                    onChange={(e) => updateBank('accountNumber', e.target.value)}
                    placeholder="8930-1234-56"
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 font-mono focus:border-forest focus:outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-400 mb-1">Atas Nama (A/N)</label>
                  <input 
                    type="text" 
                    value={invoice.bankDetails?.accountHolder || ''} 
                    onChange={(e) => updateBank('accountHolder', e.target.value)}
                    placeholder="Sri Supeni"
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:border-forest focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Catatan / Ucapan Terima Kasih</label>
              <textarea 
                rows={2}
                value={invoice.notes} 
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Terima kasih telah mempercayakan acara kepada Sanggar Bundaku."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Syarat & Ketentuan Pembayaran</label>
              <textarea 
                rows={2}
                value={invoice.paymentTerms} 
                onChange={(e) => updateField('paymentTerms', e.target.value)}
                placeholder="Pelunasan sisa tagihan dilakukan H-1 sebelum pentas."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-forest focus:outline-none"
              />
            </div>

          </div>
        )}

        {/* --- TAB 6: STYLE & TEMPLATES --- */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            <h3 className="font-raleway font-bold text-sm text-sandstone flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Pilih Desain & Layout Dokumen
            </h3>

            <div className="space-y-3">
              <label className="block text-slate-400 font-medium">Layout Template</label>
              
              <div 
                onClick={() => updateField('template', 'KOP_SURAT_OFFICIAL')}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  invoice.template === 'KOP_SURAT_OFFICIAL' 
                    ? 'bg-forest/20 border-forest text-sandstone font-bold shadow-md' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Kop Surat Resmi Sanggar Bundaku</span>
                  {invoice.template === 'KOP_SURAT_OFFICIAL' && <CheckCircle2 className="w-4 h-4 text-sandstone" />}
                </div>
                <p className="text-xs text-slate-400 font-normal mt-1">
                  Layout resmi sesuai panduan logo Sanggar Bundaku. Dilengkapi header logo, watermark penari, dan cap.
                </p>
              </div>

              <div 
                onClick={() => updateField('template', 'MODERN_MINIMAL')}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  invoice.template === 'MODERN_MINIMAL' 
                    ? 'bg-forest/20 border-forest text-sandstone font-bold shadow-md' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Minimalis Modern</span>
                  {invoice.template === 'MODERN_MINIMAL' && <CheckCircle2 className="w-4 h-4 text-sandstone" />}
                </div>
                <p className="text-xs text-slate-400 font-normal mt-1">
                  Desain bersih & praktis untuk nota cepat atau penyewaan kostum sederhana.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
