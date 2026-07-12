import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1E212B",
          borderRadius: "22%",
        }}
      >
        <span
          style={{
            color: "#F1A21B",
            fontSize: "110px",
            fontFamily: "Nunito Sans, system-ui, sans-serif",
            fontWeight: 800,
          }}
        >
          H
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
