import React from 'react';
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

export const ModernMinimalist: React.FC<TemplateProps> = ({ invoice }) => {
  const { sender, client, items } = invoice;
  const totals = calculateInvoiceTotals(invoice);

  return (
    <div className="w-full h-full min-h-[1050px] bg-white text-slate-800 font-sora p-8 sm:p-10 text-xs sm:text-sm flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* Header Bar */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-6">
          <div className="flex items-center space-x-3">
            <img 
              src={sender.logoUrl || "/assets/logo/dancer-icon-sandstone.png"} 
              alt="Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="font-raleway font-extrabold text-xl text-slate-900">{sender.name}</h1>
              <p className="text-xs text-slate-500">{sender.address}</p>
              <p className="text-xs text-slate-500">WA: {sender.phone}</p>
            </div>
          </div>

          <div className="text-right">
            <h2 className="font-raleway font-bold text-2xl text-slate-900 uppercase tracking-tight">
              {invoice.documentTitle || "NOTA"}
            </h2>
            <p className="font-mono text-xs font-semibold text-slate-500">{invoice.invoiceNumber}</p>
            <p className="text-xs text-slate-500 mt-1">{formatDateIndonesian(invoice.issueDate)}</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-[10px] font-bold uppercase text-slate-400">Kepada Yth:</p>
          <p className="font-bold text-sm text-slate-900">{client.name || '-'}</p>
          {client.organization && <p className="text-xs text-slate-600 font-medium">{client.organization}</p>}
          {client.address && <p className="text-xs text-slate-500 mt-1">{client.address}</p>}
        </div>

        {/* Items Table */}
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-900 font-raleway font-bold uppercase text-slate-700">
              <th className="py-2 px-2">Rincian</th>
              <th className="py-2 px-2 text-center w-16">Qty</th>
              <th className="py-2 px-2 text-right w-28">Harga</th>
              <th className="py-2 px-2 text-right w-28">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-2.5 px-2 font-medium text-slate-800">{item.description}</td>
                <td className="py-2.5 px-2 text-center text-slate-600">{item.quantity}</td>
                <td className="py-2.5 px-2 text-right font-mono text-slate-600">{formatCurrency(item.unitPrice, invoice.currency)}</td>
                <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-900">{formatCurrency(calculateLineTotal(item), invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end pt-4">
          <div className="w-64 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono">{formatCurrency(totals.subtotal, invoice.currency)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-slate-900 border-t border-slate-200 pt-2">
              <span>Total:</span>
              <span className="font-mono">{formatCurrency(totals.grandTotal, invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Terbilang */}
        <div className="bg-slate-50 p-3 rounded text-xs">
          <span className="font-bold text-slate-500 block text-[10px]">Terbilang:</span>
          <p className="italic font-medium text-slate-800">"{terbilangIndonesian(totals.grandTotal)}"</p>
        </div>

      </div>

      {/* Signature */}
      <div className="flex justify-between items-end pt-8">
        <div className="text-[11px] text-slate-500">
          <p className="font-semibold text-slate-700">Rekening Transfer:</p>
          <p>{invoice.bankDetails?.bankName} - {invoice.bankDetails?.accountNumber}</p>
          <p>a.n. {invoice.bankDetails?.accountHolder}</p>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-500 mb-8">Pimpinan Sanggar,</p>
          <p className="font-bold border-b border-slate-900 pb-0.5">{invoice.signerName || "Sri Supeni"}</p>
        </div>
      </div>
    </div>
  );
};
