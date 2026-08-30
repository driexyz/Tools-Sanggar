import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { InvoiceData } from '../../../types/invoice';
import { 
  formatCurrency, 
  formatDateIndonesian, 
  calculateInvoiceTotals, 
  calculateLineTotal,
  terbilangIndonesian 
} from '../../../utils/formatters';

interface TemplateProps {
  invoice: InvoiceData;
}

export const SanggarBundakuKopSurat: React.FC<TemplateProps> = ({ invoice }) => {
  const { sender, client, items } = invoice;
  const totals = calculateInvoiceTotals(invoice);
  const [logoError, setLogoError] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return (
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[11px] leading-snug rounded-md uppercase tracking-wider text-center">
            LUNAS
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 font-bold text-[11px] leading-snug rounded-md uppercase tracking-wider text-center">
            MENUNGGU PEMBAYARAN
          </span>
        );
      case 'OVERDUE':
        return (
          <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 border border-rose-300 font-bold text-[11px] leading-snug rounded-md uppercase tracking-wider text-center">
            JATUH TEMPO
          </span>
        );
      default:
        return (
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 border border-slate-300 font-bold text-[11px] leading-snug rounded-md uppercase tracking-wider text-center">
            DRAFT
          </span>
        );
    }
  };

  return (
    <div className="relative w-full h-[295mm] max-h-[295mm] bg-white text-slate-900 font-sora flex flex-col justify-between px-8 py-5 sm:px-10 sm:py-6 text-xs select-none box-border overflow-hidden">
      
      {/* Background Watermark - Large Sandstone Dancer Mark */}
      {(invoice.showWatermark ?? true) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 z-0 overflow-hidden">
          <img 
            src="/assets/logo/watermark-dancer.png" 
            alt="Watermark Sanggar Bundaku" 
            className="w-[480px] max-w-[85%] h-auto object-contain select-none"
          />
        </div>
      )}

      <div className="relative z-10 space-y-3.5">

        {/* --- OFFICIAL KOP SURAT HEADER --- */}
        {invoice.showKopSurat && (
          <header className="avoid-break border-b-2 border-forest pb-2.5 mb-2.5">
            <div className="flex items-start justify-between gap-4">
              
              {/* Left Header: Brand Logo & Title */}
              <div className="flex items-center space-x-3.5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center shadow-sm border border-slate-200 bg-forest p-1">
                  {!logoError ? (
                    <img 
                      src="/assets/logo/logo-green-forest.png" 
                      alt="Logo Sanggar Bundaku" 
                      className="w-full h-full object-cover"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-sandstone">
                      <Sparkles className="w-6 h-6 mb-0.5" />
                      <span className="text-[9px] font-black tracking-tighter">STB</span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="font-raleway font-black text-xl sm:text-2xl text-forest uppercase tracking-wider leading-none">
                    {sender.name || "SANGGAR BUNDAKU"}
                  </h1>
                  {sender.tagline && sender.tagline.trim() !== "" && (
                    <p className="font-raleway font-bold text-xs text-sandstone-dark tracking-widest mt-1 uppercase">
                      {sender.tagline}
                    </p>
                  )}
                  {sender.founder && sender.founder.trim() !== "" && (
                    <p className="text-[11px] text-slate-500 font-medium italic mt-0.5">
                      {sender.founder.toLowerCase().includes('founder') || sender.founder.toLowerCase().includes('pendiri')
                        ? sender.founder
                        : `Pendiri / Founder: ${sender.founder}`}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Header: Address & Contact Details */}
              <div className="text-right text-[11px] leading-relaxed text-slate-600 max-w-[320px] flex-shrink-0">
                <p className="font-semibold text-slate-800">{sender.address}</p>
                <p>{sender.district}, {sender.regency}</p>
                <p>{sender.province} {sender.postalCode}</p>
                <p className="font-medium text-forest mt-0.5 whitespace-nowrap">
                  <span className="font-bold">Telp/WA:</span> {sender.phone}
                </p>
              </div>

            </div>
          </header>
        )}

        {/* --- DOCUMENT TITLE & META INFO --- */}
        <div className="avoid-break flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/80 px-3.5 py-2 rounded-lg border border-slate-200 gap-2">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block leading-tight">Jenis Dokumen</span>
            <h2 className="font-raleway font-extrabold text-base sm:text-lg text-forest uppercase leading-tight mt-0.5">
              {invoice.documentTitle || "NOTA / INVOICE"}
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              No: <span className="font-mono font-bold text-slate-900">{invoice.invoiceNumber}</span>
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end text-xs">
            <div className="mb-1">{getStatusBadge(invoice.status)}</div>
            <div className="text-left sm:text-right text-slate-600 text-[11px] space-y-0.5">
              <p>Tanggal: <span className="font-semibold text-slate-900">{formatDateIndonesian(invoice.issueDate)}</span></p>
              {invoice.dueDate && (
                <p>Jatuh Tempo: <span className="font-semibold text-slate-900">{formatDateIndonesian(invoice.dueDate)}</span></p>
              )}
            </div>
          </div>
        </div>

        {/* --- CLIENT (BILL TO) INFO --- */}
        <div className="avoid-break grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white px-3.5 py-2 rounded-md border border-slate-200">
            <h3 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 leading-tight">Kepada Yth (Tujuan):</h3>
            <p className="font-bold text-xs sm:text-sm text-slate-900 mt-0.5">{client.name || "-"}</p>
            {client.organization && <p className="text-[11px] font-semibold text-forest mt-0.5">{client.organization}</p>}
            {client.address && <p className="text-[11px] text-slate-600 mt-0.5 leading-snug whitespace-pre-line">{client.address}</p>}
            {client.phone && <p className="text-[11px] text-slate-600 mt-0.5"><span className="font-semibold">Telp:</span> {client.phone}</p>}
          </div>

          <div className="bg-white px-3.5 py-2 rounded-md border border-slate-200">
            <h3 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 leading-tight">Diterbitkan Oleh:</h3>
            <p className="font-bold text-xs sm:text-sm text-slate-900 mt-0.5">{sender.name}</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Perum Sukoharjo Indah, Ngaglik, Sleman</p>
            <p className="text-[11px] text-slate-600">Telp: {sender.phone}</p>
          </div>
        </div>

        {/* --- LINE ITEMS TABLE WITH INTEGRATED SUMMARY FOOTER --- */}
        <div className="avoid-break overflow-hidden rounded-lg border border-slate-200 shadow-sm mt-2">
          <table className="w-full text-left border-collapse text-xs table-fixed">
            <thead>
              <tr className="bg-forest text-white font-raleway uppercase tracking-wider text-[10px]">
                <th className="py-2 px-3 font-bold w-10 text-center">No</th>
                <th className="py-2 px-3 font-bold">Rincian Layanan / Kostum</th>
                <th className="py-2 px-3 font-bold text-center w-16">Jumlah</th>
                <th className="py-2 px-3 font-bold text-right w-28">Harga Satuan</th>
                <th className="py-2 px-3 font-bold text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-3 text-center text-slate-400 italic">Belum ada item layanan.</td>
                </tr>
              ) : (
                items.map((item, idx) => {
                  const itemTotal = calculateLineTotal(item);
                  return (
                    <tr key={item.id || idx} className={`avoid-break ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="py-1.5 px-3 text-center text-slate-500 font-semibold align-top">{idx + 1}</td>
                      <td className="py-1.5 px-3 align-top">
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-semibold text-slate-900 leading-snug">{item.description}</span>
                          {item.category && (
                            <span className="inline-block px-2 py-0.5 text-[9px] bg-slate-100 text-slate-700 border border-slate-200 rounded font-mono font-semibold leading-normal">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-1.5 px-3 text-center font-medium text-slate-700 align-top">{item.quantity}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-slate-700 align-top">
                        {formatCurrency(item.unitPrice, invoice.currency)}
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono font-bold text-slate-900 align-top pr-3">
                        {formatCurrency(itemTotal, invoice.currency)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

            {/* INTEGRATED SUMMARY FOOTER DIRECTLY UNDER TABLE */}
            <tfoot className="border-t-2 border-slate-300 bg-slate-50/80 font-sora">
              <tr>
                <td colSpan={3} className="py-1.5 px-3 text-right font-medium text-slate-600">Subtotal:</td>
                <td colSpan={2} className="py-1.5 px-3 text-right font-mono font-semibold text-slate-800 pr-3">
                  {formatCurrency(totals.subtotal, invoice.currency)}
                </td>
              </tr>

              {totals.discount > 0 && (
                <tr>
                  <td colSpan={3} className="py-1 px-3 text-right font-medium text-emerald-700">Diskon Tambahan:</td>
                  <td colSpan={2} className="py-1 px-3 text-right font-mono font-semibold text-emerald-700 pr-3">
                    -{formatCurrency(totals.discount, invoice.currency)}
                  </td>
                </tr>
              )}

              {totals.tax > 0 && (
                <tr>
                  <td colSpan={3} className="py-1 px-3 text-right font-medium text-slate-600">Pajak ({invoice.taxPercentage}%):</td>
                  <td colSpan={2} className="py-1 px-3 text-right font-mono font-semibold text-slate-800 pr-3">
                    {formatCurrency(totals.tax, invoice.currency)}
                  </td>
                </tr>
              )}

              {totals.shipping > 0 && (
                <tr>
                  <td colSpan={3} className="py-1 px-3 text-right font-medium text-slate-600">Biaya Kirim / Transport:</td>
                  <td colSpan={2} className="py-1 px-3 text-right font-mono font-semibold text-slate-800 pr-3">
                    {formatCurrency(totals.shipping, invoice.currency)}
                  </td>
                </tr>
              )}

              <tr className="bg-forest/10 font-bold text-slate-900 border-t border-slate-300">
                <td colSpan={3} className="py-2 px-3 text-right font-raleway text-forest uppercase tracking-wider text-[11px]">Total Tagihan:</td>
                <td colSpan={2} className="py-2 px-3 text-right font-mono text-sm text-forest font-extrabold pr-3">
                  {formatCurrency(totals.grandTotal, invoice.currency)}
                </td>
              </tr>

              {totals.downPayment > 0 && (
                <>
                  <tr>
                    <td colSpan={3} className="py-1 px-3 text-right font-medium text-blue-800">Uang Muka (DP):</td>
                    <td colSpan={2} className="py-1 px-3 text-right font-mono font-semibold text-blue-800 pr-3">
                      -{formatCurrency(totals.downPayment, invoice.currency)}
                    </td>
                  </tr>
                  <tr className="bg-forest text-white font-bold">
                    <td colSpan={3} className="py-2 px-3 text-right font-raleway uppercase tracking-wider text-[11px]">Sisa Tagihan:</td>
                    <td colSpan={2} className="py-2 px-3 text-right font-mono text-sm font-black pr-3 text-sandstone">
                      {formatCurrency(totals.remainingBalance, invoice.currency)}
                    </td>
                  </tr>
                </>
              )}
            </tfoot>
          </table>
        </div>

        {/* --- BOTTOM SECTION: TERBILANG, BANK INFO, SYARAT & BALANCED SIGNATURE --- */}
        <div className="avoid-break grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch pt-2">
          
          {/* Terbilang & Bank Details (Left 7 Cols) */}
          <div className="md:col-span-7 space-y-2.5">
            
            {/* Terbilang Box */}
            <div className="avoid-break bg-amber-50/70 border border-amber-200/90 px-3.5 py-2 rounded-md text-xs">
              <span className="text-[9px] font-bold text-amber-800 uppercase tracking-widest block leading-tight">Terbilang:</span>
              <p className="font-semibold text-amber-950 italic leading-snug text-xs sm:text-sm mt-0.5">
                "{terbilangIndonesian(totals.remainingBalance > 0 ? totals.remainingBalance : totals.grandTotal)}"
              </p>
            </div>

            {/* Bank Transfer Details */}
            {invoice.bankDetails && (
              <div className="avoid-break bg-slate-50 px-3.5 py-2 rounded-md border border-slate-200 text-xs">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block leading-tight mb-1">Informasi Pembayaran (Transfer Bank):</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-slate-500">Bank:</p>
                    <p className="font-bold text-slate-800">{invoice.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">No. Rekening:</p>
                    <p className="font-mono font-bold text-forest text-xs sm:text-sm">{invoice.bankDetails.accountNumber}</p>
                  </div>
                  <div className="col-span-2 pt-0.5">
                    <p className="text-[10px] text-slate-500">Atas Nama (A/N):</p>
                    <p className="font-semibold text-slate-800">{invoice.bankDetails.accountHolder}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {invoice.notes && (
              <div className="avoid-break text-slate-600 text-xs space-y-0.5">
                <span className="font-bold text-slate-700 block text-[10px]">Catatan / Keterangan:</span>
                <p className="italic text-[11px] bg-slate-50 px-2 py-1 rounded border border-slate-100 leading-snug">{invoice.notes}</p>
              </div>
            )}

          </div>

          {/* Right Column (5 cols): Syarat & Ketentuan + Larger Balanced Signature Block */}
          <div className="md:col-span-5 flex flex-col justify-between h-full space-y-3 pl-2 self-stretch">
            
            {/* Syarat & Ketentuan */}
            <div className="text-[11px] text-slate-600 bg-slate-50/60 p-2.5 rounded-md border border-slate-100">
              <p className="font-semibold text-slate-700 mb-0.5">Syarat & Ketentuan:</p>
              <p className="leading-snug text-slate-600">{invoice.paymentTerms || "Bukti transfer mohon dikirimkan kepada pengurus Sanggar Bundaku."}</p>
            </div>

            {/* Signature Block - Larger and pushed lower to balance the bottom space */}
            <div className="text-center relative min-w-[200px] pt-3 pb-1">
              <p className="text-xs text-slate-600 mb-0.5">
                Sleman, {formatDateIndonesian(invoice.issueDate)}
              </p>
              <p className="font-bold text-xs sm:text-sm text-forest uppercase tracking-wider">
                {invoice.signerRole || "Pimpinan Sanggar Bundaku"}
              </p>

              {/* Stamp & Signature Image Container */}
              <div className="relative h-20 w-full flex items-center justify-center my-1.5">
                {invoice.showStampPlaceholder && (
                  <img 
                    src="/assets/logo/stamp-signature.png" 
                    alt="Cap Sanggar & Tanda Tangan Sri Supeni" 
                    className="h-26 w-auto object-contain absolute z-10 pointer-events-none"
                  />
                )}
              </div>

              <div className="relative z-20">
                <p className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-800 pb-0.5 inline-block min-w-[160px]">
                  {invoice.signerName || sender.founder || "Sri Supeni"}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* --- FOOTER ACCENT BAR --- */}
      <footer className="avoid-break mt-3 pt-1 border-t border-slate-200 text-center text-[10px] text-slate-400 font-sora">
        <p>Sanggar Bundaku • Perum Sukoharjo Indah Blok N-201, Sleman, DIY • Contact: 0819-0411-6067</p>
      </footer>

    </div>
  );
};
