/**
 * Empty stub used to alias the optional `canvg` dependency of jsPDF.
 *
 * The DOMINASE diagnosis PDF only rasterizes HTML via html2canvas and adds
 * JPEG images to jsPDF — it never uses jsPDF's SVG path (`addSvgAsImage`),
 * which is the only feature that loads canvg. jsPDF's Node build pulls canvg
 * (and a partially-installed core-js) into the bundle, breaking the build, so
 * we alias canvg to this no-op module. If SVG-in-PDF is ever needed, remove the
 * alias in next.config.ts and ensure canvg/core-js are fully installed.
 */
export default {};
