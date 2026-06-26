export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/svg+xml";

export default function Icon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" role="img" aria-label="Hornbill Aviation favicon">
      <rect width="32" height="32" rx="8" fill="#0B1C2C"/>
      <text
        x="50%"
        y="55%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="#C89F4F"
        font-family="Instrument Serif, Georgia, serif"
        font-size="18"
        font-weight="400"
      >H</text>
    </svg>
  `;

  return new Response(svg.trim(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
