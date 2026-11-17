import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "INTEGRA: La identidad se sostiene desde la operación. Rei Sánchez | Dirección Ejecutiva.";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#F5F2FB",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 410,
            height: "100%",
            padding: "58px 38px",
            background: "#5825AD",
            color: "#FFFFFF",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 19 }}>
            <div
              style={{
                display: "flex",
                width: 60,
                height: 7,
                borderRadius: 4,
                background: "#D9C5FF",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 71,
                fontWeight: 800,
                letterSpacing: "-3px",
                lineHeight: 1,
              }}
            >
              INTEGRA
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                fontWeight: 600,
                lineHeight: 1.35,
                letterSpacing: "1.5px",
                color: "#E4D7FC",
              }}
            >
              TRANSFORMACIÓN OPERATIVA
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontSize: 20,
              lineHeight: 1.35,
              color: "#F1EBFF",
            }}
          >
            <span>Identidad</span>
            <span>Operación</span>
            <span>Resultados</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 790,
            height: "100%",
            padding: "61px 56px 48px",
            color: "#221B32",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              width: 105,
              height: 9,
              borderRadius: 4,
              background: "#A886E2",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.17,
                letterSpacing: "-1.3px",
                color: "#2B1846",
              }}
            >
              <span>La identidad se sostiene</span>
              <span>desde la operación.</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.32,
                color: "#50455F",
                maxWidth: 675,
              }}
            >
              Dirección y transformación operativa para negocios gastronómicos.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              borderTop: "2px solid #D5C7EC",
              paddingTop: 24,
              fontSize: 23,
              fontWeight: 600,
              color: "#5825AD",
            }}
          >
            Rei Sánchez | Dirección Ejecutiva
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
