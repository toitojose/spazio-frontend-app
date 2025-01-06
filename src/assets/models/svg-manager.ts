export class SVGManager {
  private baseSVG: string;

  constructor(baseSVG: string) {
    this.baseSVG = baseSVG;
  }

  // Actualiza el color de relleno (fill) del SVG
  updateFillColor(fillColor: string): string {
    return this.baseSVG.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  }
}
