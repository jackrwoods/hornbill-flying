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
          backgroundColor: "#0B1C2C",
          borderRadius: "22%",
        }}
      >
        <span
          style={{
            color: "#C89F4F",
            fontSize: "110px",
            fontFamily: "Georgia, serif",
            fontWeight: 400,
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
