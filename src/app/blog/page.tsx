import Link from "next/link";
import type { Metadata } from "next";
import SiteShell from "../../components/SiteShell";
import { posts, formatDate } from "../../posts/meta";

const MONO = "'JetBrains Mono', monospace";
const GROTESK = "'Space Grotesk', sans-serif";

export const metadata: Metadata = {
  title: "Writing — Alex Madrazo",
  description:
    "Field notes on AI engineering — platforms, agent systems, observability, and shipping production software that compounds.",
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <SiteShell active="writing">
      <main
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1000,
          margin: "0 auto",
          padding: "70px 40px 90px",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#FF5A1F",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ width: 22, height: 1, background: "#FF5A1F" }} />
          Writing
        </div>
        <h1
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: "clamp(30px,4vw,46px)",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
            color: "#17150F",
          }}
        >
          Notes from the build
        </h1>
        <p
          style={{
            fontFamily: GROTESK,
            fontSize: 18,
            lineHeight: 1.6,
            color: "#3A362E",
            maxWidth: 620,
            margin: "0 0 44px",
          }}
        >
          Field notes on AI engineering — platforms, agent systems,
          observability, and shipping production software that compounds.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card-hover"
              style={{
                display: "block",
                background: "#FCFBF6",
                border: "1px solid #D7D0C2",
                borderRadius: 16,
                padding: "28px 30px",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.05em",
                  color: "#908A7C",
                  marginBottom: 12,
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <span>{formatDate(p.date)}</span>
                <span style={{ color: "#FF5A1F" }}>{p.readingTime}</span>
              </div>
              <h2
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  margin: "0 0 12px",
                  color: "#17150F",
                  lineHeight: 1.18,
                }}
              >
                {p.title}
              </h2>
              <p
                style={{
                  fontFamily: GROTESK,
                  fontSize: 15.5,
                  lineHeight: 1.62,
                  color: "#3A362E",
                  margin: "0 0 16px",
                  maxWidth: 700,
                }}
              >
                {p.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                  marginBottom: 14,
                }}
              >
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "#5C574C",
                      background: "#EFEBE2",
                      border: "1px solid #D7D0C2",
                      padding: "4px 9px",
                      borderRadius: 6,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "#FF5A1F",
                }}
              >
                Read →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
