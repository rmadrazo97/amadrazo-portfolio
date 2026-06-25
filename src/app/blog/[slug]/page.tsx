import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "../../../components/SiteShell";
import { posts, getPost, formatDate } from "../../../posts/meta";

const MONO = "'JetBrains Mono', monospace";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPost(slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Alex Madrazo`,
    description: meta.excerpt,
    openGraph: { title: meta.title, description: meta.excerpt, type: "article" },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPost(slug);
  if (!meta) notFound();

  // Pre-rendered at build time (static export), so reading from disk is fine.
  const html = fs.readFileSync(
    path.join(process.cwd(), "src/posts", `${slug}.html`),
    "utf8",
  );

  return (
    <SiteShell active="writing">
      <main
        className="post-main"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 26,
            fontFamily: MONO,
            fontSize: 12,
            color: "#5C574C",
          }}
        >
          <Link href="/blog" className="nav-link" style={{ color: "#5C574C" }}>
            ← All writing
          </Link>
          <span>
            {formatDate(meta.date)} ·{" "}
            <span style={{ color: "#FF5A1F" }}>{meta.readingTime}</span>
          </span>
        </div>

        <article
          className="postdoc"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div
          style={{
            marginTop: 48,
            paddingTop: 28,
            borderTop: "1px solid #D7D0C2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <Link
            href="/blog"
            className="nav-link post-foot-link"
            style={{
              fontFamily: MONO,
              fontSize: 13,
              fontWeight: 600,
              color: "#17150F",
            }}
          >
            ← More writing
          </Link>
          <Link
            href="/#contact"
            className="glitch-link"
            style={{
              fontFamily: MONO,
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              background: "#FF5A1F",
              border: "1px solid #FF5A1F",
              padding: "11px 20px",
              borderRadius: 8,
            }}
          >
            Get in touch →
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
