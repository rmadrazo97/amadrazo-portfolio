"use client";

import Link from "next/link";
import { useState } from "react";
import { useViewport } from "./useViewport";

const MONO = "'JetBrains Mono', monospace";

type NavItem = { label: string; hash?: string; href?: string };

const ITEMS: NavItem[] = [
  { label: "Capabilities", hash: "services" },
  { label: "Work", hash: "work" },
  { label: "Trajectory", hash: "timeline" },
  { label: "Stack", hash: "stack" },
  { label: "Writing", href: "/blog" },
];

/**
 * Shared, responsive site navigation used by both the homepage (`onHome`) and
 * the blog chrome. Desktop keeps the original inline-row layout; at <= 700px it
 * collapses the center links + CTA into a hamburger-toggled dropdown panel.
 *
 * `onHome` controls anchor targets: same-page hashes (`#services`, smooth
 * scroll via `<a>`) on the homepage, route-qualified (`/#services`, client-side
 * `<Link>`) everywhere else.
 */
export default function SiteNav({
  onHome = false,
  active,
}: {
  onHome?: boolean;
  active?: "writing";
}) {
  const { isMobile } = useViewport();
  const [open, setOpen] = useState(false);

  const hrefFor = (item: NavItem) =>
    item.href ?? (onHome ? `#${item.hash}` : `/#${item.hash}`);
  const brandHref = onHome ? "#top" : "/";
  const ctaHref = onHome ? "#contact" : "/#contact";

  // Same-page hashes use <a> (native smooth scroll); cross-route uses <Link>.
  const NavLink = ({
    href,
    className,
    style,
    onClick,
    children,
  }: {
    href: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    children: React.ReactNode;
  }) =>
    href.startsWith("#") ? (
      <a href={href} className={className} style={style} onClick={onClick}>
        {children}
      </a>
    ) : (
      <Link href={href} className={className} style={style} onClick={onClick}>
        {children}
      </Link>
    );

  const brand = (
    <NavLink
      href={brandHref}
      onClick={() => setOpen(false)}
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
          flexShrink: 0,
        }}
      />
      Alex Madrazo
      <span style={{ color: "#A39C8C", fontWeight: 500 }}> /</span>
    </NavLink>
  );

  return (
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
          padding: isMobile ? "13px 20px" : "14px 40px",
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: "0.04em",
        }}
      >
        {brand}

        {isMobile ? (
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
              width: 40,
              height: 40,
              padding: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "#17150F",
                  borderRadius: 2,
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  transform: open
                    ? i === 0
                      ? "translateY(6px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-6px) rotate(-45deg)"
                        : "none"
                    : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                gap: 30,
                textTransform: "uppercase",
                color: "#5C574C",
              }}
            >
              {ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  href={hrefFor(item)}
                  className="nav-link"
                  style={
                    active === "writing" && item.href === "/blog"
                      ? { color: "#FF5A1F" }
                      : undefined
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <NavLink
              href={ctaHref}
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
            </NavLink>
          </>
        )}
      </div>

      {/* mobile dropdown panel */}
      {isMobile && open && (
        <div
          style={{
            borderTop: "1px solid #D7D0C2",
            background: "rgba(239,235,226,0.97)",
            padding: "10px 20px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            fontFamily: MONO,
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {ITEMS.map((item) => (
            <NavLink
              key={item.label}
              href={hrefFor(item)}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={{
                color:
                  active === "writing" && item.href === "/blog"
                    ? "#FF5A1F"
                    : "#5C574C",
                padding: "12px 4px",
                borderBottom: "1px solid #E3DDD0",
              }}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            href={ctaHref}
            onClick={() => setOpen(false)}
            style={{
              marginTop: 12,
              background: "#17150F",
              color: "#EFEBE2",
              padding: "13px 16px",
              borderRadius: 8,
              fontWeight: 600,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Get in touch →
          </NavLink>
        </div>
      )}
    </nav>
  );
}
