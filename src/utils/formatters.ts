import { InvoiceData, LineItem } from '../types/invoice';

/**
 * Format currency amount with IDR or custom symbol
 * e.g. 1500000 -> "Rp 1.500.000"
 */
export const formatCurrency = (amount: number, currencySymbol: string = 'Rp'): string => {
  if (isNaN(amount)) return `${currencySymbol} 0`;
  
  // Format with standard Indonesian dot thousands separator
  const formattedNumber = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${currencySymbol} ${formattedNumber}`;
};

/**
 * Internal recursive helper for converting number to Indonesian words (without "Rupiah" suffix)
 */
const convertNumberToWords = (num: number): string => {
  const angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  num = Math.floor(Math.abs(num));
  if (num === 0) return "";
  
  if (num < 12) {
    return angka[num];
  } else if (num < 20) {
    return convertNumberToWords(num - 10) + " Belas";
  } else if (num < 100) {
    return convertNumberToWords(Math.floor(num / 10)) + " Puluh " + convertNumberToWords(num % 10);
  } else if (num < 200) {
    return "Seratus " + convertNumberToWords(num - 100);
  } else if (num < 1000) {
    return convertNumberToWords(Math.floor(num / 100)) + " Ratus " + convertNumberToWords(num % 100);
  } else if (num < 2000) {
    return "Seribu " + convertNumberToWords(num - 1000);
  } else if (num < 1000000) {
    return convertNumberToWords(Math.floor(num / 1000)) + " Ribu " + convertNumberToWords(num % 1000);
  } else if (num < 1000000000) {
    return convertNumberToWords(Math.floor(num / 1000000)) + " Juta " + convertNumberToWords(num % 1000000);
  } else if (num < 1000000000000) {
    return convertNumberToWords(Math.floor(num / 1000000000)) + " Miliar " + convertNumberToWords(num % 1000000000);
  }
  return "";
};

/**
 * Convert number to Indonesian written words (terbilang)
 * e.g. 4500000 -> "Empat Juta Lima Ratus Ribu Rupiah"
 */
export const terbilangIndonesian = (n: number): string => {
  if (isNaN(n) || n === 0) return "Nol Rupiah";
  const words = convertNumberToWords(n).trim().replace(/\s+/g, ' ');
  return words ? `${words} Rupiah` : "Nol Rupiah";
};

/**
 * Format date string (YYYY-MM-DD) to Indonesian formatted date
 * e.g. "2026-08-29" -> "29 Agustus 2026"
 */
export const formatDateIndonesian = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Calculate line item total
 */
export const calculateLineTotal = (item: LineItem): number => {
  const sub = item.quantity * item.unitPrice;
  if (item.discountPercentage && item.discountPercentage > 0) {
    return sub - (sub * (item.discountPercentage / 100));
  }
  return sub;
};

/**
 * Calculate full invoice totals
 */
export const calculateInvoiceTotals = (invoice: InvoiceData) => {
  const subtotal = invoice.items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  
  const discount = invoice.discountAmount || 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  
  const tax = invoice.taxPercentage ? (taxableAmount * (invoice.taxPercentage / 100)) : 0;
  const shipping = invoice.shippingFee || 0;
  
  const grandTotal = taxableAmount + tax + shipping;
  const downPayment = invoice.downPayment || 0;
  const remainingBalance = Math.max(0, grandTotal - downPayment);

  return {
    subtotal,
    discount,
    taxableAmount,
    tax,
    shipping,
    grandTotal,
    downPayment,
    remainingBalance
  };
};
