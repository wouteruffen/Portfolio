import type { CSSProperties } from "react";
import logoWit from "@/assets/KLOPT DEZE WIT.svg";
import logoZwart from "@/assets/KLOPT DEZE ZWART.svg";

export { logoWit as LOGO_WIT, logoZwart as LOGO_ZWART };

/**
 * Both KLOPT DEZE WIT/ZWART.svg files use a 1000x1000 viewBox with the mark
 * inset well inside it, rather than being cropped tight to its own bounds
 * (unlike the logo files they replace). These boxes — measured from the
 * mark's actual path geometry, in source-canvas units — let every consumer
 * crop back to a tight mark, or to an individual row/glyph within it,
 * purely at the CSS layer. The SVG files themselves are never touched.
 */
const CANVAS = 1000;

export const LOGO_FULL_BOX = { x0: 321.46, y0: 355.24, x1: 720.70, y1: 661.91 };
/** "BIT &" */
export const LOGO_ROW1_BOX = { x0: 321.46, y0: 355.24, x1: 635.41, y1: 503.82 };
/** "BEELD" (excludes the ® mark) */
export const LOGO_ROW2_BOX = { x0: 321.46, y0: 515.88, x1: 682.64, y1: 661.91 };
/** trailing ® mark */
export const LOGO_MARK_BOX = { x0: 688.65, y0: 624.81, x1: 720.70, y1: 656.91 };

/**
 * The ® mark's position/size expressed as a fraction of the ROW2 box, so it
 * can be pinned against a rendered row2 crop of any size without hardcoded
 * pixels — same source coordinate space, just re-expressed as a percentage.
 */
export const LOGO_MARK_IN_ROW2 = {
  left: ((LOGO_MARK_BOX.x0 - LOGO_ROW2_BOX.x0) / (LOGO_ROW2_BOX.x1 - LOGO_ROW2_BOX.x0)) * 100,
  top: ((LOGO_MARK_BOX.y0 - LOGO_ROW2_BOX.y0) / (LOGO_ROW2_BOX.y1 - LOGO_ROW2_BOX.y0)) * 100,
  width: ((LOGO_MARK_BOX.x1 - LOGO_MARK_BOX.x0) / (LOGO_ROW2_BOX.x1 - LOGO_ROW2_BOX.x0)) * 100,
  height: ((LOGO_MARK_BOX.y1 - LOGO_MARK_BOX.y0) / (LOGO_ROW2_BOX.y1 - LOGO_ROW2_BOX.y0)) * 100,
};

/**
 * The natural vertical gap between "BIT &" and "BEELD" in the source
 * artwork — LOGO_FULL_BOX (used by SolidLogoMark) preserves it automatically
 * since it's one crop of the whole region, gap included. A consumer that
 * renders the two rows as separate tight crops (see ScrollLogo) stacks two
 * boxes that individually exclude it, so it has to be added back explicitly
 * — expressed here as a fraction of ROW2's own height so it scales with
 * whatever font-size/em basis the consumer sizes its rows from.
 */
export const LOGO_ROW_GAP_FRACTION =
  (LOGO_ROW2_BOX.y0 - LOGO_ROW1_BOX.y1) / (LOGO_ROW2_BOX.y1 - LOGO_ROW2_BOX.y0);

export interface LogoBox {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

interface LogoCropProps {
  src: string;
  box: LogoBox;
  className?: string;
  style?: CSSProperties;
  /** Accessible name for this crop. Leave unset (default "") for a crop that's
   *  decorative or accompanied elsewhere by an accessible "Bit & Beeld" name. */
  alt?: string;
}

/**
 * Renders one rectangular region of the shared 1000x1000 logo canvas,
 * scaled to fill its own box exactly (aspect-ratio matches the region, an
 * absolutely-positioned <img> is scaled/offset so only that region shows).
 * The wrapper needs an explicit height (or a parent that gives it one) —
 * width follows automatically from aspect-ratio.
 */
export const LogoCrop = ({ src, box, className = "", style, alt = "" }: LogoCropProps) => {
  const w = box.x1 - box.x0;
  const h = box.y1 - box.y0;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${w} / ${h}`, ...style }}
    >
      <img
        src={src}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        className="absolute select-none pointer-events-none max-w-none"
        style={{
          height: `${(CANVAS / h) * 100}%`,
          width: `${(CANVAS / w) * 100}%`,
          top: `${-(box.y0 / h) * 100}%`,
          left: `${-(box.x0 / w) * 100}%`,
        }}
      />
    </div>
  );
};

/**
 * The one "small brand mark" size/crop used at every hand-off point — the
 * solid navbar (NavbarV2) and the fully-shrunk ScrollLogo both render this
 * exact component with the exact same box and height classes, so there is
 * no independent sizing to keep in sync by hand: same DOM shape, same
 * crop, same visible pixels, differing only in `src` (WIT on a dark
 * background, ZWART on the solid orange bar).
 */
export const SOLID_LOGO_SIZE_CLASS = "h-6 md:h-7 lg:h-8";

interface SolidLogoMarkProps {
  src: string;
  className?: string;
  alt?: string;
}

export const SolidLogoMark = ({ src, className = "", alt = "Bit & Beeld" }: SolidLogoMarkProps) => (
  <LogoCrop src={src} box={LOGO_FULL_BOX} className={`${SOLID_LOGO_SIZE_CLASS} ${className}`} alt={alt} />
);
