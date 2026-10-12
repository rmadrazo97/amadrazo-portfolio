"use client";

import { useEffect, useRef, useState } from "react";

const MONO = "'JetBrains Mono', monospace";
const GROTESK = "'Space Grotesk', sans-serif";

const BEATS = [
  {
    kicker: "A-01  ·  SETUP",
    title: "The setup, before the agent.",
    body: "An agent for a consulting firm starts as a drawing. The work they already do, the sources and rules, the agent, and the team that will run it.",
  },
  {
    kicker: "01  ·  THE WORK",
    title: "One consulting process.",
    body: "The brief, the sources, and the rules of one engagement. You leave with a problem statement and a decision to build the agent, or to stop.",
  },
  {
    kicker: "02  ·  THE AGENT",
    title: "Route, tools, traces.",
    body: "A mock-up of the agent before a line of production code. Routing, the tools it may call, and a trace on every run. The KPI is agreed before the sprint.",
  },
  {
    kicker: "03  ·  THE FIRM",
    title: "The consultants keep it.",
    body: "Draft, review, handover. The people who do the work use the agent. The firm keeps it. I do not run it after go-live.",
  },
] as const;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

type Room = "process" | "mock" | "build" | "handover";

function roomsOn(progress: number): Room[] {
  if (progress < 0.3) return [];
  if (progress < 0.5) return ["process"];
  if (progress < 0.72) return ["mock", "build"];
  return ["handover"];
}

export function StudioPlan({
  progress,
  driven,
}: {
  progress: number;
  driven: boolean;
}) {
  const wall = driven ? clamp01(progress / 0.16) : 1;
  const fit = driven ? clamp01((progress - 0.08) / 0.28) : 1;
  const dims = driven ? clamp01((progress - 0.55) / 0.3) : 1;
  const rooms = driven ? roomsOn(progress) : [];
  const on = (room: Room) => rooms.includes(room);
  const setup = on("mock") || on("build");
  const label = {
    fontFamily: MONO,
    fontSize: 15,
    letterSpacing: "0.12em",
  } as const;

  return (
    <svg
      className={driven ? "studio-plan is-driven" : "studio-plan"}
      viewBox="0 0 960 560"
      role="img"
      aria-label="Setup for an agent at a consulting firm: the work, the agent, and the team that keeps it."
      style={{ ["--plan-draw" as string]: driven ? String(1 - wall) : "0" }}
    >
      <rect x="40" y="78" width="276" height="400" fill="#FF5A1F" opacity={on("process") ? 0.14 : 0} />
      <rect x="390" y="78" width="196" height="400" fill="#FF5A1F" opacity={setup ? 0.1 : 0} />
      <rect x="668" y="78" width="252" height="400" fill="#FF5A1F" opacity={on("handover") ? 0.14 : 0} />
      <circle cx="488" cy="182" r="46" fill="#FF5A1F" />

      <g
        className="plan-walls"
        fill="none"
        stroke="#17150F"
        strokeWidth="2.5"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      >
        <path pathLength={1} d="M40 78 H316 V478 H40 Z" />
        <path pathLength={1} d="M56 214 H300" />
        <path pathLength={1} d="M56 330 H300" />
        <path pathLength={1} d="M390 78 H586 V478 H390 Z" />
        <path pathLength={1} d="M406 250 H570" />
        <path pathLength={1} d="M406 318 H570" />
        <path pathLength={1} d="M406 386 H570" />
        <path pathLength={1} d="M668 78 H920 V478 H668 Z" />
        <path pathLength={1} d="M684 214 H904" />
        <path pathLength={1} d="M684 330 H904" />
        <path pathLength={1} d="M316 278 H370 V182 H442" />
        <path pathLength={1} d="M534 182 H668" />
      </g>

      <g
        className="plan-fit"
        fill="none"
        stroke="#5C574C"
        strokeWidth="1.4"
        opacity={driven ? fit : undefined}
      >
        <path d="M72 156 h150 M72 174 h110 M72 192 h70" />
        <rect x="72" y="246" width="54" height="28" />
        <rect x="136" y="246" width="54" height="28" />
        <rect x="200" y="246" width="54" height="28" />
        <path d="M72 368 h12 v12 h-12 z M96 378 h120 M72 400 h12 v12 h-12 z M96 410 h90" />
      </g>

      <g
        className="plan-fit"
        fill="#17150F"
        style={label}
        opacity={driven ? fit : undefined}
      >
        <text x="56" y="118">
          01 THE WORK
        </text>
        <text x="72" y="148" fill="#5C574C" style={{ ...label, fontSize: 13 }}>
          BRIEF
        </text>
        <text x="72" y="238" fill="#5C574C" style={{ ...label, fontSize: 13 }}>
          SOURCES
        </text>
        <text x="80" y="266" style={{ ...label, fontSize: 11 }}>
          CASE
        </text>
        <text x="146" y="266" style={{ ...label, fontSize: 11 }}>
          DOC
        </text>
        <text x="208" y="266" style={{ ...label, fontSize: 11 }}>
          DATA
        </text>
        <text x="72" y="360" fill="#5C574C" style={{ ...label, fontSize: 13 }}>
          RULES
        </text>
        <text x="406" y="118">
          02 AGENT
        </text>
        <text x="488" y="187" textAnchor="middle" style={{ ...label, fontSize: 13 }}>
          AGENT
        </text>
        <text x="422" y="286">
          ROUTE
        </text>
        <text x="422" y="354">
          TOOLS
        </text>
        <text x="422" y="422">
          TRACES
        </text>
        <text x="684" y="118">
          03 THE FIRM
        </text>
        <text x="700" y="178">
          DRAFT
        </text>
        <text x="700" y="286">
          REVIEW
        </text>
        <text x="700" y="400">
          THEY KEEP IT
        </text>
      </g>

      <g
        className="plan-dims"
        opacity={driven ? dims : undefined}
        fill="none"
        stroke="#8A8478"
        strokeWidth="1"
      >
        <path d="M40 40 H316" />
        <path d="M390 40 H586" />
        <path d="M668 40 H920" />
        <text
          x="178"
          y="32"
          fill="#5C574C"
          stroke="none"
          textAnchor="middle"
          style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em" }}
        >
          CONSULTING
        </text>
        <text
          x="488"
          y="32"
          fill="#5C574C"
          stroke="none"
          textAnchor="middle"
          style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em" }}
        >
          SETUP
        </text>
        <text
          x="794"
          y="32"
          fill="#5C574C"
          stroke="none"
          textAnchor="middle"
          style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em" }}
        >
          HANDOVER
        </text>
      </g>
    </svg>
  );
}

export default function PlanSequence() {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFrozen(true);
      setProgress(1);
      return;
    }
    let raf = 0;
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const y = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(y / Math.max(total, 1));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const beat =
    progress < 0.28 ? 0 : progress < 0.52 ? 1 : progress < 0.76 ? 2 : 3;
  const shown = frozen ? BEATS : [BEATS[beat]];

  return (
    <section
      ref={ref}
      className={frozen ? "plan-stage is-static" : "plan-stage"}
      aria-label="How an agent is set up for a consulting firm"
    >
      <div className="plan-sticky">
        <div className="plan-copy">
          <div className="plan-index" aria-hidden="true">
            {BEATS.map((_, i) => (
              <span key={i} className={!frozen && i === beat ? "is-on" : undefined} />
            ))}
          </div>
          {shown.map((copy) => (
            <div key={copy.kicker} className="plan-beat">
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  color: "#B83A0A",
                  marginBottom: 16,
                }}
              >
                {copy.kicker}
              </div>
              <h2
                style={{
                  fontFamily: GROTESK,
                  fontWeight: 700,
                  fontSize: "clamp(32px, 4vw, 58px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.94,
                  textTransform: "uppercase",
                  margin: "0 0 18px",
                }}
              >
                {copy.title}
              </h2>
              <p
                style={{
                  fontFamily: GROTESK,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "#3A362E",
                  margin: 0,
                  maxWidth: "36ch",
                }}
              >
                {copy.body}
              </p>
            </div>
          ))}
        </div>
        <div className="plan-canvas">
          <StudioPlan progress={frozen ? 1 : progress} driven={!frozen} />
        </div>
      </div>
    </section>
  );
}
