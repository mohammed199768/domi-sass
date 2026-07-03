/**
 * Ambient types for jsPDF's browser ESM build.
 *
 * We import `jspdf/dist/jspdf.es.min.js` directly (instead of the default
 * "jspdf" entry) to avoid the Node build pulling canvg/core-js into the client
 * bundle. That deep path ships no types, so we declare the small surface we use.
 */
declare module "jspdf/dist/jspdf.es.min.js" {
  export interface JsPdfOptions {
    orientation?: "portrait" | "landscape" | "p" | "l";
    unit?: "pt" | "mm" | "cm" | "in" | "px";
    format?: string | number[];
  }

  export class jsPDF {
    constructor(options?: JsPdfOptions);
    addPage(): jsPDF;
    addImage(
      imageData: string,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number
    ): jsPDF;
    save(filename: string): jsPDF;
  }

  export default jsPDF;
}
