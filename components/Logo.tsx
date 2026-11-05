/** Homsify wordmark, rebuilt as SVG so it recolours with the theme and stays
 *  crisp at any size. `tone` picks the palette; nothing else changes. */
export default function Logo({
  height = 34,
  tone = "light",
}: { height?: number; tone?: "light" | "dark" }) {
  const text = tone === "light" ? "#F6F2EA" : "#171A1C";
  const bracket = tone === "light" ? "#C6A66E" : "#A98C55";
  return (
    <svg viewBox="0 0 260 76" height={height} role="img" aria-label="Homsify" style={{ display: "block" }}>
      {/* bracket frame */}
      <path d="M8 4 H70 M8 4 V72 M8 72 H70" fill="none" stroke={bracket} strokeWidth="4" />
      <path d="M252 4 H190 M252 4 V72 M252 72 H190" fill="none" stroke={bracket} strokeWidth="4" />
      <text
        x="130" y="53" textAnchor="middle" fill={text}
        fontFamily="Jost, Poppins, 'Segoe UI', system-ui, sans-serif"
        fontSize="46" letterSpacing="-1"
      >
        <tspan fontWeight="600">hom</tspan><tspan fontWeight="300">sify</tspan>
      </text>
    </svg>
  );
}
