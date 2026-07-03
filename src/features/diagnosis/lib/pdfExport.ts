/**
 * Client-side PDF export for DOMINASE Growth Diagnosis reports.
 *
 * Privacy: everything here runs in the browser. It reads a DOM element that was
 * rendered from the visitor's current local state and turns it into a PDF that
 * is saved directly to their device. No answers, scores, or context are sent to
 * any server, and nothing is stored remotely. jsPDF + html2canvas are imported
 * dynamically so they never load until the visitor explicitly asks for a PDF.
 */

export type PdfExportState = "generating" | "done" | "error";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

/** Generate an offline QR code as a PNG data URL (no network request). */
export async function generateQrDataUrl(url: string): Promise<string | null> {
  try {
    const QRCode = (await import("qrcode")).default;
    return await QRCode.toDataURL(url, {
      errorCorrectionLevel: "M",
      margin: 1,
      scale: 6,
      color: { dark: "#0c2f26", light: "#ffffff" },
    });
  } catch {
    return null;
  }
}

/** Strip characters that are unsafe or awkward in a downloaded file name. */
export function sanitizeFilenamePart(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

/** Build a descriptive, filesystem-safe file name for the report. */
export function buildPdfFilename(options: {
  domain: string;
  institution?: string;
  date?: Date;
}): string {
  const date = options.date ?? new Date();
  const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
  const domain = sanitizeFilenamePart(options.domain) || "report";
  const institution = options.institution ? sanitizeFilenamePart(options.institution) : "";
  const parts = ["dominase", domain, "diagnosis", institution, iso].filter(Boolean);
  const name = parts.join("-").toLowerCase();
  return `${name || "dominase-diagnosis-report"}.pdf`;
}

/**
 * Capture each `[data-pdf-page]` block inside `element` and compose an A4 PDF.
 * Each block starts on a fresh PDF page. A block taller than one A4 page is
 * sliced across consecutive pages so nothing is squashed or distorted.
 */
export async function exportDiagnosisReportPdf(options: {
  element: HTMLElement;
  filename: string;
  onProgress?: (state: PdfExportState) => void;
}): Promise<void> {
  const { element, filename, onProgress } = options;
  onProgress?.("generating");

  try {
    // Load jsPDF's browser build directly. The default ("jspdf") entry resolves
    // to a Node build that statically pulls in canvg -> core-js and breaks the
    // client bundle; the .es build only loads canvg lazily (which we never use).
    const [jspdfModule, html2canvasModule] = await Promise.all([
      import("jspdf/dist/jspdf.es.min.js"),
      import("html2canvas"),
    ]);
    const { jsPDF } = jspdfModule;
    const html2canvas = html2canvasModule.default;

    const pageEls = Array.from(
      element.querySelectorAll<HTMLElement>("[data-pdf-page]")
    );
    if (pageEls.length === 0) {
      throw new Error("No printable pages found");
    }

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    let pdfPageStarted = false;

    const startPdfPage = () => {
      if (pdfPageStarted) pdf.addPage();
      pdfPageStarted = true;
    };

    for (const pageEl of pageEls) {
      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: pageEl.scrollWidth,
      });

      const fullHeightMm = (canvas.height * A4_WIDTH_MM) / canvas.width;

      if (fullHeightMm <= A4_HEIGHT_MM + 1) {
        // Fits on a single A4 page.
        startPdfPage();
        pdf.addImage(
          canvas.toDataURL("image/jpeg", 0.92),
          "JPEG",
          0,
          0,
          A4_WIDTH_MM,
          fullHeightMm
        );
      } else {
        // Slice the tall block into A4-height chunks.
        const pageHeightPx = Math.floor((canvas.width * A4_HEIGHT_MM) / A4_WIDTH_MM);
        let renderedPx = 0;
        while (renderedPx < canvas.height) {
          const sliceHeightPx = Math.min(pageHeightPx, canvas.height - renderedPx);
          const slice = document.createElement("canvas");
          slice.width = canvas.width;
          slice.height = sliceHeightPx;
          const ctx = slice.getContext("2d");
          if (!ctx) break;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(
            canvas,
            0,
            renderedPx,
            canvas.width,
            sliceHeightPx,
            0,
            0,
            canvas.width,
            sliceHeightPx
          );

          const sliceHeightMm = (sliceHeightPx * A4_WIDTH_MM) / canvas.width;
          startPdfPage();
          pdf.addImage(
            slice.toDataURL("image/jpeg", 0.92),
            "JPEG",
            0,
            0,
            A4_WIDTH_MM,
            sliceHeightMm
          );
          renderedPx += sliceHeightPx;
        }
      }
    }

    pdf.save(filename);
    onProgress?.("done");
  } catch (error) {
    onProgress?.("error");
    throw error instanceof Error ? error : new Error("PDF export failed");
  }
}
