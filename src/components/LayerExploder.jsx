import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

// Layer data
const LAYERS = [
  {
    id: 1,
    label: 'Fondo esistente',
    color: 'rgb(194, 112, 58)',
    stepTitle: 'Superficie esistente',
    stepDesc: 'Anche direttamente su piastrelle o la vecchia guaina.',
    delay: 0,
    labelSide: 'left',
    labelTop: 69.230769,
  },
  {
    id: 2,
    label: 'Pulizia + Primer',
    color: 'rgb(14, 165, 233)',
    stepTitle: 'Pulizia + Primer',
    stepDesc: 'Pulizia, sgrassatura e primer la massima adesione.',
    delay: 0.55,
    labelSide: 'right',
    labelTop: 75,
  },
  {
    id: 3,
    label: 'Prima Mano',
    color: 'rgb(156, 163, 175)',
    stepTitle: 'Prima Mano Resina',
    stepDesc: 'Prima mano di membrana liquida impermeabilizzante.',
    delay: 1.1,
    labelSide: 'left',
    labelTop: 54.846154,
  },
  {
    id: 4,
    label: 'Rete Annegata',
    color: 'rgb(217, 119, 6)',
    stepTitle: 'Rete Annegata',
    stepDesc: "Rete d'armatura anti-crepa annegata nella resina.",
    delay: 1.65,
    labelSide: 'right',
    labelTop: 62.769231,
  },
  {
    id: 5,
    label: 'Ultima Mano',
    color: 'rgb(156, 163, 175)',
    stepTitle: 'Ultima Mano — Finitura',
    stepDesc: 'Mano finale — impermeabile, anti-UV, calpestabile.',
    delay: 2.2,
    labelSide: 'left',
    labelTop: 42.923077,
  },
];

// Isometric geometry — wide rectangles matching the original production layout.
// Each layer is defined by four iso-projected corner points relative to a
// "base-center" (bx, by). The original HTML coords give us:
//   top-left = (bx - 155.88, by - 90)     → e.g. 316.17
//   top-right = (bx + 155.88, by - 90)    → e.g. 783.83
//   centre-top = (bx - 77.94, by - 180)   → e.g. 472.06
//   centre-bottom = (bx + 77.94, by)      → e.g. 627.94
// This gives wide rectangular iso tiles, NOT square diamonds.
const BX = 550;  // horizontal centre of SVG
const GAP = 41;  // vertical spacing between layers
const BASE_BY = 615; // bottom-center Y of layer 0
const THICKNESSES = [30, 7, 7, 2, 8];
const TOP_FILLS = ['#d9935e', '#7dd3fc', '#d1d5db', 'rgba(251,191,36,0.4)', '#e5e7eb'];
const RIGHT_FILLS = ['#a25a2a', '#0284c7', '#6b7280', '#b45309', '#6b7280'];
const LEFT_FILLS = ['#c2703a', '#0ea5e9', '#9ca3af', '#d97706', '#9ca3af'];

// Half-widths of the iso rectangle
const HW = 155.88; // half-width along x from centre to left/right corners
const HH = 90;     // half-height along y from centre to top/bottom edges

function getLayerBY(i) {
  return BASE_BY - i * GAP;
}

// The four corner points of the top face of a layer
//   top:    (bx - HW/2,  by - HH*2)   — pointy top
//   right:  (bx + HW,    by - HH)     — right corner
//   bottom: (bx + HW/2,  by)          — pointy bottom
//   left:   (bx - HW,    by - HH)     — left corner
// But looking at the actual production values more carefully:
//  top    = (472.06, 345)  →  bx + (472.06-550) = bx - 77.94,  by - 270 → by = 615, so 615-270=345 ✓
//  right  = (783.83, 525)  →  bx + 233.83, by - 90 → 615-90=525 ✓
//  bottom = (627.94, 615)  →  bx + 77.94,  by → 615 ✓
//  left   = (316.17, 435)  →  bx - 233.83, by - 180 → 615-180=435 ✓
// So the shape is asymmetric relative to the standard iso diamond.
const DX_SMALL = 77.94;   // x offset from BX for top and bottom points
const DY_TOP = 270;       // y offset above BY for the top point
const DX_LARGE = 233.83;  // x offset from BX for left and right points
const DY_MID = 90;        // y offset above BY for right point
const DY_LEFT = 180;      // y offset above BY for left point

function isoTop(by) {
  const top = `${BX - DX_SMALL},${by - DY_TOP}`;
  const right = `${BX + DX_LARGE},${by - DY_MID}`;
  const bottom = `${BX + DX_SMALL},${by}`;
  const left = `${BX - DX_LARGE},${by - DY_LEFT}`;
  return `${top} ${right} ${bottom} ${left}`;
}

function isoRight(by, t) {
  return `${BX + DX_SMALL},${by} ${BX + DX_LARGE},${by - DY_MID} ${BX + DX_LARGE},${by - DY_MID + t} ${BX + DX_SMALL},${by + t}`;
}

function isoLeft(by, t) {
  return `${BX - DX_LARGE},${by - DY_LEFT} ${BX + DX_SMALL},${by} ${BX + DX_SMALL},${by + t} ${BX - DX_LARGE},${by - DY_LEFT + t}`;
}

function LayerExploder() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center px-3 py-1 bg-black text-white font-bold uppercase tracking-widest text-[10px] mb-4">
            Testato e Certificato
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-[0.9]">
            Sigillatura<span className="text-yellow-500">100% </span>Impenetrabile
          </h2>
          <div className="flex items-center justify-center gap-6 md:gap-10 mt-6 opacity-70 grayscale-0">
            <img alt="Mapei" className="h-5 md:h-7 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Mapei_logo.svg/1280px-Mapei_logo.svg.png" />
            <img alt="Sika" className="h-5 md:h-7 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Logo_Sika_AG.svg/1280px-Logo_Sika_AG.svg.png" />
            <img alt="Kerakoll" className="h-7 md:h-10 w-auto object-contain" src="https://www.resistoproject.com/wp-content/uploads/2018/07/img-logo-kerakoll-color-400x200-2.png" />
            <img alt="Winkler" className="h-7 md:h-10 w-auto object-contain" src="https://cdn.freebiesupply.com/logos/large/2x/winkler-logo-png-transparent.png" />
          </div>
        </div>

        {/* Isometric SVG Diagram */}
        <div className="relative max-w-5xl mx-auto mb-12 md:mb-16">
          <div className="relative w-full" style={{ aspectRatio: '1100 / 650' }}>
            <svg viewBox="0 0 1100 650" className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="isoTiles" width="44" height="44" patternUnits="userSpaceOnUse">
                  <rect width="44" height="44" fill="none" />
                  <rect x="1" y="1" width="20" height="20" rx="1" fill="#a0522d" opacity="0.3" />
                  <rect x="23" y="1" width="20" height="20" rx="1" fill="#8b4513" opacity="0.22" />
                  <rect x="1" y="23" width="20" height="20" rx="1" fill="#8b4513" opacity="0.22" />
                  <rect x="23" y="23" width="20" height="20" rx="1" fill="#a0522d" opacity="0.3" />
                  <line x1="22" y1="0" x2="22" y2="44" stroke="#6d3319" strokeWidth="1.5" opacity="0.2" />
                  <line x1="0" y1="22" x2="44" y2="22" stroke="#6d3319" strokeWidth="1.5" opacity="0.2" />
                </pattern>
                <pattern id="isoMesh" width="14" height="14" patternUnits="userSpaceOnUse">
                  <rect width="14" height="14" fill="none" />
                  <line x1="0" y1="1" x2="14" y2="1" stroke="#b45309" strokeWidth="1.4" opacity="0.8" />
                  <line x1="0" y1="8" x2="14" y2="8" stroke="#b45309" strokeWidth="1.4" opacity="0.8" />
                  <line x1="1" y1="0" x2="1" y2="14" stroke="#b45309" strokeWidth="1.4" opacity="0.8" />
                  <line x1="8" y1="0" x2="8" y2="14" stroke="#b45309" strokeWidth="1.4" opacity="0.8" />
                  <circle cx="1" cy="1" r="1.4" fill="#92400e" opacity="0.85" />
                  <circle cx="8" cy="1" r="1.4" fill="#92400e" opacity="0.85" />
                  <circle cx="1" cy="8" r="1.4" fill="#92400e" opacity="0.85" />
                  <circle cx="8" cy="8" r="1.4" fill="#92400e" opacity="0.85" />
                </pattern>
                <pattern id="isoMeshSide" width="8" height="4" patternUnits="userSpaceOnUse">
                  <rect width="8" height="4" fill="none" />
                  <line x1="0" y1="2" x2="8" y2="2" stroke="#92400e" strokeWidth="0.8" opacity="0.7" />
                  <line x1="2" y1="0" x2="2" y2="4" stroke="#92400e" strokeWidth="0.8" opacity="0.7" />
                  <line x1="6" y1="0" x2="6" y2="4" stroke="#92400e" strokeWidth="0.8" opacity="0.7" />
                </pattern>
              </defs>

              {LAYERS.map((layer, i) => {
                const by = getLayerBY(i);
                const t = THICKNESSES[i];
                const labelDelay = layer.delay + 0.8;
                // Connector dot positions
                const leftDotX = BX - DX_LARGE - 4;
                const leftDotY = by - DY_LEFT + t / 2;
                const rightDotX = BX + DX_LARGE + 4;
                const rightDotY = by - DY_MID + t / 2;

                return (
                  <g
                    key={layer.id}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
                      transition: `opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${layer.delay}s, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${layer.delay}s`,
                    }}
                  >
                    <polygon points={isoRight(by, t)} fill={RIGHT_FILLS[i]} stroke="#00000010" strokeWidth="0.5" />
                    <polygon points={isoLeft(by, t)} fill={LEFT_FILLS[i]} stroke="#00000010" strokeWidth="0.5" />
                    <polygon points={isoTop(by)} fill={TOP_FILLS[i]} stroke="#00000010" strokeWidth="0.5" />
                    {i === 0 && <polygon points={isoTop(by)} fill="url(#isoTiles)" />}
                    {i === 3 && (
                      <>
                        <polygon points={isoTop(by)} fill="url(#isoMesh)" />
                        <polygon points={isoLeft(by, t)} fill="url(#isoMeshSide)" />
                        <polygon points={isoRight(by, t)} fill="url(#isoMeshSide)" />
                      </>
                    )}
                    {/* Label connector */}
                    <g style={{ opacity: isVisible ? 1 : 0, transition: `opacity 1s ${labelDelay}s` }}>
                      {layer.labelSide === 'left' ? (
                        <>
                          <circle cx={leftDotX} cy={leftDotY} r="3.5" fill={LEFT_FILLS[i]} />
                          <line x1={leftDotX} y1={leftDotY} x2={leftDotX - 76} y2={leftDotY} stroke={LEFT_FILLS[i]} strokeWidth="2.2" strokeDasharray="6,4" opacity="0.6" />
                        </>
                      ) : (
                        <>
                          <circle cx={rightDotX} cy={rightDotY} r="3.5" fill={LEFT_FILLS[i]} />
                          <line x1={rightDotX} y1={rightDotY} x2={rightDotX + 96} y2={rightDotY} stroke={LEFT_FILLS[i]} strokeWidth="2.2" strokeDasharray="6,4" opacity="0.6" />
                        </>
                      )}
                    </g>
                  </g>
                );
              })}

              {/* Top arrow — points up from top layer */}
              <g style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s 3.4s' }}>
                <line x1={BX} y1={getLayerBY(4) - DY_TOP + 110} x2={BX} y2={getLayerBY(4) - DY_TOP} stroke="#6b7280" strokeWidth="2.0" strokeDasharray="5,3" opacity="0.5" />
                <circle cx={BX} cy={getLayerBY(4) - DY_TOP + 110} r="3" fill="#6b7280" opacity="0.6" />
              </g>
            </svg>

            {/* Top label */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: `${((getLayerBY(4) - DY_TOP - 10) / 650) * 100}%`,
                transform: 'translate(-50%, -100%)',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s 3.4s',
              }}
            >
              <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-wide text-slate-500 whitespace-nowrap text-center leading-tight">
                Ultimo strato<br />
                <span className="text-slate-400 font-medium">Calpestabile · Anti-UV</span>
              </p>
            </div>

            {/* Layer number labels */}
            {LAYERS.map((layer, i) => {
              const labelDelay = layer.delay + 0.8;
              const isLeft = layer.labelSide === 'left';
              const by = getLayerBY(i);
              const t = THICKNESSES[i];
              // Compute % positions matching connector dots
              const topPct = isLeft
                ? ((by - DY_LEFT + t / 2) / 650) * 100
                : ((by - DY_MID + t / 2) / 650) * 100;
              const leftEdgePct = ((BX - DX_LARGE - 4 - 76) / 1100) * 100;
              const rightEdgePct = ((BX + DX_LARGE + 4 + 96) / 1100) * 100;

              return (
                <div
                  key={`label-${layer.id}`}
                  className="absolute pointer-events-none flex items-center gap-1.5"
                  style={{
                    top: `${topPct}%`,
                    ...(isLeft
                      ? { right: `${100 - leftEdgePct + 0.5}%`, flexDirection: 'row-reverse' }
                      : { left: `${rightEdgePct + 0.5}%`, flexDirection: 'row' }),
                    transform: 'translateY(-50%)',
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 1s ${labelDelay}s`,
                  }}
                >
                  <span className="font-black text-[14px] md:text-[18px] leading-none" style={{ color: layer.color }}>
                    {layer.id}
                  </span>
                  <span className="text-[8px] md:text-[11px] uppercase leading-none whitespace-nowrap text-slate-500 font-medium" style={{ letterSpacing: '-0.01em' }}>
                    {layer.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {LAYERS.map((layer) => (
              <div key={`step-${layer.id}`} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.id}
                </span>
                <div>
                  <p className="font-black text-sm md:text-base text-slate-900 uppercase tracking-tight leading-tight">{layer.stepTitle}</p>
                  <p className="text-xs md:text-sm text-slate-500 font-medium mt-1 leading-relaxed">{layer.stepDesc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certified Badge */}
          <div className="mt-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4 max-w-md mx-auto">
            <ShieldCheck className="w-7 h-7 text-green-600 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-black text-xs md:text-sm text-slate-900 uppercase tracking-tight">Sistema certificato</p>
              <p className="text-xs text-slate-500 font-medium">Materiali professionali, zero improvvisazione</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LayerExploder;