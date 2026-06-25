import Link from "next/link";
import type { ReactNode } from "react";

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
  const writingStyle =
    active === "writing" ? { color: "#FF5A1F" as const } : undefined;
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

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(8px)",
          background: "rgba(239,235,226,0.82)",
          borderBottom: "1px solid #D7D0C2",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 40px",
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: "0.04em",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#17150F",
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                background: "#FF5A1F",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            Alex Madrazo
            <span style={{ color: "#A39C8C", fontWeight: 500 }}> /</span>
          </Link>
          <div
            style={{
              display: "flex",
              gap: 30,
              textTransform: "uppercase",
              color: "#5C574C",
            }}
          >
            <Link href="/#services" className="nav-link">
              Capabilities
            </Link>
            <Link href="/#work" className="nav-link">
              Work
            </Link>
            <Link href="/#timeline" className="nav-link">
              Trajectory
            </Link>
            <Link href="/#stack" className="nav-link">
              Stack
            </Link>
            <Link href="/blog" className="nav-link" style={writingStyle}>
              Writing
            </Link>
          </div>
          <Link
            href="/#contact"
            className="nav-cta"
            style={{
              background: "#17150F",
              color: "#EFEBE2",
              padding: "9px 16px",
              borderRadius: 7,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Get in touch →
          </Link>
        </div>
      </nav>

      <div style={{ flex: "1 1 auto" }}>{children}</div>

      <footer
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid #D7D0C2",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "22px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: MONO,
            fontSize: 11,
            color: "#908A7C",
            letterSpacing: "0.05em",
            flexWrap: "wrap",
            gap: 10,
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
