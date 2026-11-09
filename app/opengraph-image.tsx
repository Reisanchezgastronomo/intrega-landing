import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rei Sánchez | Dirección Ejecutiva";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", justifyContent: "center",
        flexDirection: "column", padding: 80, background: "#0b1115", color: "#f6f3ed",
        fontFamily: "sans-serif",
      }}>
        <div style={{ fontSize: 28, letterSpacing: "0.18em", color: "#bdd1c1", marginBottom: 28 }}>
          REI SÁNCHEZ
        </div>
        <div style={{ fontSize: 65, fontWeight: 700, lineHeight: 1.1, maxWidth: 1030 }}>
          Dirección Ejecutiva · Transformación · Autonomía
        </div>
        <div style={{ marginTop: 35, fontSize: 27, color: "#d7b98c" }}>
          Simplificar para transformar.
        </div>
      </div>
    ),
    size
  );
}
