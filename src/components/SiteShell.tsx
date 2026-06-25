import Link from "next/link";
import type { ReactNode } from "react";
import SiteNav from "./SiteNav";

const MONO = "'JetBrains Mono', monospace";
const GROTESK = "'Space Grotesk', sans-serif";

/**
 * Branded page chrome (dot-matrix backdrop + sticky nav + footer) shared by the
 * blog routes so they match the portfolio's visual identity. The homepage keeps
 * its own inline chrome since it's a single interactive client component.
 */
export default function SiteShell({
  children,
  active,
}: {
  children: ReactNode;
  active?: "writing";
}) {
  return (
    <div
      style={{
        background: "#EFEBE2",
        minHeight: "100vh",
        fontFamily: GROTESK,
        color: "#17150F",
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "radial-gradient(#CDC6B6 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <SiteNav active={active} />

      <div style={{ flex: "1 1 auto" }}>{children}</div>

      <footer
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid #D7D0C2",
        }}
      >
        <div
          className="site-footer"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            fontFamily: MONO,
            fontSize: 11,
            color: "#908A7C",
            letterSpacing: "0.05em",
            flexWrap: "wrap",
          }}
        >
          <span>© 2026 JOSÉ A. MADRAZO AVILA</span>
          <span>MADRID, ES · CET</span>
          <Link href="/" style={{ color: "#FF5A1F" }}>
            AM // SYSTEMS, SHIPPED.
          </Link>
        </div>
      </footer>
    </div>
  );
}
