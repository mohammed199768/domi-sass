/**
 * Minimal ambient types for the `qrcode` package.
 *
 * The upstream `@types/qrcode` package is not installed in this project, and
 * we only use a single client-side function (`toDataURL`) to render an inline,
 * offline QR image for the diagnosis PDF. This declaration covers exactly that
 * surface so the codebase stays type-safe without pulling in extra dev deps.
 */
declare module "qrcode" {
  export interface QRCodeToDataURLOptions {
    version?: number;
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    margin?: number;
    scale?: number;
    width?: number;
    color?: {
      dark?: string;
      light?: string;
    };
    type?: "image/png" | "image/jpeg" | "image/webp";
  }

  export function toDataURL(text: string, options?: QRCodeToDataURLOptions): Promise<string>;

  const _default: {
    toDataURL: typeof toDataURL;
  };
  export default _default;
}
