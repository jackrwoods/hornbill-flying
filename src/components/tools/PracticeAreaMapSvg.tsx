interface PracticeAreaMapSvgProps {
  className?: string;
}

export function PracticeAreaMapSvg({ className }: PracticeAreaMapSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      role="img"
      aria-label="Simplified training area map around Reno-Tahoe (RNO). Common practice areas lie northeast of the field, with nearby airports KRTS, KMLC, KLOL, and KSPZ. Confirm with current sectional chart before flight."
      className={className}
    >
      {/* Background */}
      <rect width="800" height="600" fill="#FFF8EC" />

      {/* Sierra ridge */}
      <path
        d="M0 380 L120 320 L240 350 L360 280 L500 300 L640 240 L800 260 L800 600 L0 600 Z"
        fill="#E6F0F0"
        stroke="#827D74"
        strokeWidth="1"
      />
      <text x="20" y="340" fontSize="14" fill="#827D74" fontFamily="Inter, sans-serif">
        Sierra ridge
      </text>

      {/* Class C boundary (simplified ring) */}
      <circle
        cx="420"
        cy="360"
        r="140"
        fill="none"
        stroke="#F8AF12"
        strokeWidth="2"
        strokeDasharray="8 6"
      />
      <text x="560" y="230" fontSize="13" fill="#F8AF12" fontFamily="Inter, sans-serif" fontWeight="600">
        Class C boundary (simplified)
      </text>

      {/* Common practice area */}
      <ellipse
        cx="620"
        cy="220"
        rx="90"
        ry="60"
        fill="#F9A90C"
        fillOpacity="0.25"
        stroke="#F8AF12"
        strokeWidth="2"
      />
      <text x="570" y="225" fontSize="14" fill="#004E7C" fontFamily="Inter, sans-serif" fontWeight="600">
        Common practice area
      </text>
      <text x="560" y="245" fontSize="12" fill="#827D74" fontFamily="Inter, sans-serif">
        Altitude and airspace notes
      </text>

      {/* RNO */}
      <circle cx="420" cy="360" r="8" fill="#004E7C" />
      <text x="435" y="365" fontSize="16" fill="#004E7C" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
        RNO
      </text>

      {/* Nearby airports */}
      <g>
        <circle cx="300" cy="160" r="5" fill="#F45115" />
        <text x="312" y="165" fontSize="13" fill="#004E7C" fontFamily="IBM Plex Mono, monospace">
          KRTS
        </text>
      </g>
      <g>
        <circle cx="520" cy="140" r="5" fill="#F45115" />
        <text x="532" y="145" fontSize="13" fill="#004E7C" fontFamily="IBM Plex Mono, monospace">
          KMLC
        </text>
      </g>
      <g>
        <circle cx="680" cy="120" r="5" fill="#F45115" />
        <text x="692" y="125" fontSize="13" fill="#004E7C" fontFamily="IBM Plex Mono, monospace">
          KLOL
        </text>
      </g>
      <g>
        <circle cx="600" cy="420" r="5" fill="#F45115" />
        <text x="612" y="425" fontSize="13" fill="#004E7C" fontFamily="IBM Plex Mono, monospace">
          KSPZ
        </text>
      </g>

      {/* Legend */}
      <g transform="translate(20, 520)">
        <rect width="280" height="70" fill="#FFFFFF" stroke="#003A60" strokeWidth="1" rx="6" />
        <circle cx="20" cy="20" r="6" fill="#004E7C" />
        <text x="34" y="24" fontSize="12" fill="#004E7C" fontFamily="Inter, sans-serif">
          Field / airport
        </text>
        <circle cx="20" cy="45" r="5" fill="#F45115" />
        <text x="34" y="49" fontSize="12" fill="#004E7C" fontFamily="Inter, sans-serif">
          Nearby airport
        </text>
        <line x1="130" y1="20" x2="150" y2="20" stroke="#F8AF12" strokeWidth="2" strokeDasharray="6 4" />
        <text x="158" y="24" fontSize="12" fill="#004E7C" fontFamily="Inter, sans-serif">
          Class C boundary
        </text>
      </g>
    </svg>
  );
}
