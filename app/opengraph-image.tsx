import { ImageResponse } from "next/og";
import { site } from "@/lib/seo";

export const alt = `${site.name} — Git, JavaScript, and AI, made clear`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#121212", color: "#f4f0e8", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="1" y="1" width="62" height="62" rx="17" fill="#121212" stroke="#6c6962" />
          <path d="M36 26v22m0-11a11 11 0 1 1-22 0 11 11 0 1 1 22 0" stroke="#c8f05a" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M49 32v16" stroke="#ff5b45" strokeWidth="6.5" strokeLinecap="round" />
          <circle cx="49" cy="20" r="4.5" fill="#ff5b45" />
        </svg>
        <span>aitech<span style={{ color: "#ff5b45" }}>foryou</span></span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -4 }}>Complex tech. Made clear.</div>
        <div style={{ fontSize: 34, color: "#c8c5be" }}>Git · JavaScript · AI — interactive lessons and visual guides</div>
      </div>
    </div>,
    size,
  );
}
