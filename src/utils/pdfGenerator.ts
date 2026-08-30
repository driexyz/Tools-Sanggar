import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SuratIzinData } from '../types/suratIzin';

/**
 * Download element as high resolution PDF without clipping or creating trailing blank pages
 */
export const exportToPDF = async (
  elementId: string = 'invoice-preview-container',
  filename: string = 'Document-Sanggar-Tari-Bundaku.pdf'
): Promise<boolean> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found.`);
    return false;
  }

  try {
    const originalShadow = element.style.boxShadow;
    const originalTransform = element.style.transform;

    // Reset shadow and transform scale for exact 1:1 pixel rendering during canvas capture
    element.style.boxShadow = 'none';
    element.style.transform = 'scale(1)';

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
      windowHeight: 1123
    });

    // Restore original styles
    element.style.boxShadow = originalShadow;
    element.style.transform = originalTransform;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // For single page documents (Surat Izin and standard 1-page Invoices <= 1.18x A4 height),
    // fit strictly onto 1 single A4 page without creating any trailing blank page.
    if (imgHeight <= pdfHeight * 1.18 || filename.toLowerCase().includes('surat_izin')) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(pdfHeight, imgHeight), undefined, 'FAST');
    } else {
      // Multi-page document handling for very long invoices (>8 items)
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 25) { // 25mm threshold prevents blank trailing pages
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
    }

    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Error generating PDF:', err);
    window.print();
    return false;
  }
};

/**
 * Bulk generate and download individual PDF per student name for selected indexes
 */
export const exportBulkSuratIzinPDF = async (
  surat: SuratIzinData,
  selectedIndexes: number[],
  onSelectStudent: (index: number) => Promise<void> | void,
  elementId: string = 'invoice-preview-container'
): Promise<number> => {
  const students = surat.students || [];
  if (students.length === 0 || selectedIndexes.length === 0) return 0;

  let downloadedCount = 0;

  for (const idx of selectedIndexes) {
    if (idx < 0 || idx >= students.length) continue;
    const student = students[idx];
    const safeStudentName = (student.name || `Siswa_${idx + 1}`).replace(/\s+/g, '_').replace(/[\/\\?%*:|"<>]/g, '');
    const filename = `Surat_Izin_${safeStudentName}.pdf`;

    // Trigger state change to switch active student in DOM preview
    await onSelectStudent(idx);

    // Wait 350ms for React re-render
    await new Promise(resolve => setTimeout(resolve, 350));

    // Export PDF for current student
    const success = await exportToPDF(elementId, filename);
    if (success) downloadedCount++;
  }

  return downloadedCount;
};

/**
 * Trigger native window print
 */
export const triggerPrint = (): void => {
  window.print();
};
