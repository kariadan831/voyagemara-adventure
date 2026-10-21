export default function TripAdvisorBadge({ size = 124, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tripadvisor-badge-svg ${className}`}
      aria-label="Top-Rated on TripAdvisor badge"
    >
      {/* Outer concentric green circles */}
      <circle cx="80" cy="80" r="74" stroke="#2e7d32" strokeWidth="2.5" />
      <circle cx="80" cy="80" r="69" stroke="#2e7d32" strokeWidth="1.5" />

      {/* Arched text: TOP-RATED ON */}
      <defs>
        <path id="taTopArc" d="M 28 80 A 52 52 0 0 1 132 80" />
      </defs>
      <text
        fill="#2e7d32"
        fontSize="11.5"
        fontWeight="800"
        letterSpacing="2.2"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        <textPath href="#taTopArc" startOffset="50%">
          TOP-RATED ON
        </textPath>
      </text>

      {/* TripAdvisor Owl Logo */}
      <g id="taOwl">
        {/* Owl mask/brow background */}
        <path
          d="M 64 54 C 64 49 68 47 72 50 C 76 52 80 52 84 52 C 88 52 92 50 96 49 C 100 47 104 49 104 54 C 107 58 107 65 104 70 C 100 75 94 77 88 77 C 80 77 74 77 64 70 C 61 65 61 58 64 54 Z"
          fill="#111827"
        />

        {/* Left Eye */}
        <circle cx="72" cy="62" r="8.5" fill="#ffffff" stroke="#111827" strokeWidth="2" />
        <circle cx="72" cy="62" r="5" fill="#00aa6c" />
        <circle cx="72" cy="62" r="2.2" fill="#111827" />

        {/* Right Eye */}
        <circle cx="88" cy="62" r="8.5" fill="#ffffff" stroke="#111827" strokeWidth="2" />
        <circle cx="88" cy="62" r="5" fill="#e53935" />
        <circle cx="88" cy="62" r="2.2" fill="#111827" />

        {/* Beak */}
        <polygon points="80,63 76.5,69 83.5,69" fill="#111827" />
      </g>

      {/* tripadvisor text wordmark */}
      <text
        x="80"
        y="91"
        fill="#111827"
        fontSize="13"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        textAnchor="middle"
        letterSpacing="-0.3"
      >
        tripadvisor
      </text>

      {/* 5 Green Rating Circles in gentle arc */}
      <g id="taRatingBubbles">
        {/* Bubble 1 */}
        <circle cx="47" cy="111" r="6" fill="#00aa6c" stroke="#2e7d32" strokeWidth="1.2" />
        <circle cx="47" cy="111" r="3.2" fill="#ffffff" />
        <circle cx="47" cy="111" r="2" fill="#00aa6c" />

        {/* Bubble 2 */}
        <circle cx="63.5" cy="115" r="6" fill="#00aa6c" stroke="#2e7d32" strokeWidth="1.2" />
        <circle cx="63.5" cy="115" r="3.2" fill="#ffffff" />
        <circle cx="63.5" cy="115" r="2" fill="#00aa6c" />

        {/* Bubble 3 (Center) */}
        <circle cx="80" cy="116.5" r="6" fill="#00aa6c" stroke="#2e7d32" strokeWidth="1.2" />
        <circle cx="80" cy="116.5" r="3.2" fill="#ffffff" />
        <circle cx="80" cy="116.5" r="2" fill="#00aa6c" />

        {/* Bubble 4 */}
        <circle cx="96.5" cy="115" r="6" fill="#00aa6c" stroke="#2e7d32" strokeWidth="1.2" />
        <circle cx="96.5" cy="115" r="3.2" fill="#ffffff" />
        <circle cx="96.5" cy="115" r="2" fill="#00aa6c" />

        {/* Bubble 5 */}
        <circle cx="113" cy="111" r="6" fill="#00aa6c" stroke="#2e7d32" strokeWidth="1.2" />
        <circle cx="113" cy="111" r="3.2" fill="#ffffff" />
        <circle cx="113" cy="111" r="2" fill="#00aa6c" />
      </g>

      {/* Bottom Concentric Arcs */}
      <path d="M 34 112 A 74 74 0 0 0 126 112" stroke="#2e7d32" strokeWidth="2.5" fill="none" />
      <path d="M 39 119 A 69 69 0 0 0 121 119" stroke="#2e7d32" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
