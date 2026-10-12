"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import FeltOrb from "../components/FeltOrb";
import SheetFrame from "../components/SheetFrame";
import SiteNav from "../components/SiteNav";
import PlanSequence from "../components/StudioPlan";
import { useViewport } from "../components/useViewport";
import { posts, formatDate } from "../posts/meta";

const MONO = "'JetBrains Mono', monospace";
const GROTESK = "'Space Grotesk', sans-serif";

type Service = {
  no: string;
  glyph: string;
  title: string;
  desc: string;
  tags: string[];
};

type Project = {
  tag: string;
  status: string;
  glyph: string;
  url?: string;
  urlLabel?: string;
  img?: string;
  imgFit?: "cover" | "contain";
  org: string;
  period: string;
  title: string;
  blurb: string;
  metric: string;
  metricLabel: string;
  tags: string[];
};

type RoleLink = { label: string; url: string };

type Role = {
  year: string;
  org: string;
  url: string;
  title: string;
  location: string;
  period: string;
  scope: string;
  bullets: string[];
  tags: string[];
  linksLabel?: string;
  links?: RoleLink[];
};

type Education = { year: string; title: string; org: string };
type StackGroup = { cat: string; items: string[] };
type Channel = { label: string; value: string; icon: string; url: string };

const services: Service[] = [
  {
    no: "01",
    glyph: "⌖",
    title: "The process",
    desc: "Bring one process where the number has not moved, or one pilot that is stuck. You leave with a problem statement and a decision to scale or stop. If the value is unclear, the build waits.",
    tags: ["Value first", "As-is", "One process"],
  },
  {
    no: "02",
    glyph: "◇",
    title: "The build",
    desc: "A mock-up before a line of code. Then the data and the agent, from low-code validation to full-stack production engineering. Routing, traces, and a KPI agreed before the sprint.",
    tags: ["Mock-up", "Agents", "Traces", "KPI"],
  },
  {
    no: "03",
    glyph: "▷",
    title: "The handover",
    desc: "The people who do the work use it in daily operations. You keep the capability. I do not run the tool after go-live. Human oversight stays in the loop.",
    tags: ["Adoption", "Handover", "EU AI Act"],
  },
];

const situations = [
  {
    label: "A tool idea",
    leave: "The process",
    body: "There is an idea for a tool, and no process behind it. We start where the work happens and leave with a problem statement and the value at stake.",
  },
  {
    label: "A stuck pilot",
    leave: "A decision",
    body: "A pilot has not moved a number. We walk the accuracy check and say whether it should be scaled or stopped.",
  },
  {
    label: "An agent in a demo",
    leave: "The build",
    body: "The agent still lives in a demo. A mock-up comes first, then production engineering: routing, traces, and a KPI agreed before the sprint.",
  },
  {
    label: "A system the team runs",
    leave: "The handover",
    body: "The system is in daily operations, with a KPI and traces. The team keeps the capability. We do not run the tool after go-live.",
  },
];

const projects: Project[] = [
  {
    tag: "STUDIO",
    status: "● live",
    glyph: "✦",
    url: "https://www.hazelheartwood.com/impact/index.html",
    urlLabel: "Studio impact stories",
    org: "HazelHeartwood",
    period: "2025—present",
    title: "AI & Engineering Studio",
    blurb:
      "I lead the studio that puts agentic systems into daily operations. The firm's public stories — planners, supplier search, governed data — are HazelHeartwood's. This is the practice I run from Madrid: mock-up, production, handover.",
    metric: "Live",
    metricLabel: "in daily operations",
    tags: ["Transformation", "Agents", "Handover", "Madrid"],
  },
  {
    tag: "ENGINEERING",
    status: "● live",
    glyph: "≋",
    url: "https://www.interactive.ai/",
    urlLabel: "Visit interactive.ai",
    org: "Interactive AI",
    period: "2025—present",
    title: "Agent engineering platform",
    blurb:
      "The production system behind the studio's engineering: observability and orchestration from zero to enterprise in under six months. A telemetry engine tracing every run, an MCP orchestration layer, and an LLM router across 200+ models.",
    metric: "<6mo",
    metricLabel: "zero to production platform",
    tags: ["FastAPI", "ClickHouse", "MCP", "LLM Router", "Kubernetes"],
  },
  {
    tag: "DECADE",
    status: "shipped",
    glyph: "▣",
    url: "https://www.flourish.game/",
    urlLabel: "Visit Flourish",
    org: "Burlingame Studios",
    period: "2021—2025",
    title: "A decade of shipping",
    blurb:
      "Before the studio: fullstack and technical lead, including a CMS and live-ops tooling for an AAA mobile game serving millions of players, and a squad of five taken from business strategy to delivered software.",
    metric: "8+ yrs",
    metricLabel: "strategy to shipped software",
    tags: ["Technical Lead", "CMS", "Live Ops", "Squad of 5"],
  },
];

const roles: Role[] = [
  {
    year: "2016—18",
    org: "Computación Universal",
    url: "https://ucguate.com/",
    title: "Senior Fullstack Engineer",
    location: "Guatemala City, GT",
    period: "2016 — 2018",
    scope: "WEB · MOBILE · SERVERS",
    bullets: [
      "Designed and shipped dynamic full-stack web applications that lifted user engagement.",
      "Built and released native iOS and Android apps, expanding the company's mobile presence.",
      "Administered server configs and maintenance for optimal performance and security.",
      "Streamlined delivery with early DevOps practices on configured Linux servers.",
    ],
    tags: ["PHP", "JavaScript", "iOS", "Android", "Linux"],
  },
  {
    year: "2018—19",
    org: "Mayfer",
    url: "https://mayfer.dev/en/home-2/",
    title: "Mid Software Engineer",
    location: "Guatemala",
    period: "2018 — 2019",
    scope: "MOBILE · PAYMENTS",
    bullets: [
      "Developed mobile applications across iOS and Android.",
      "Integrated payment-gateway flows for secure in-app transactions.",
      "Collaborated cross-functionally to ship features on tight delivery cycles.",
    ],
    tags: ["iOS", "Android", "Payment Gateways", "Mobile"],
  },
  {
    year: "2019—21",
    org: "Meteo.tech / D.A.P",
    url: "https://meteo.tech/",
    title: "Senior Fullstack Engineer",
    location: "Guatemala · Costa Rica",
    period: "2019 — 2021",
    scope: "GEOSPATIAL · WEB3",
    bullets: [
      "Led advanced meteorological platforms with interactive, real-time maps.",
      "Built climate-risk assessment apps supporting strategic planning and resilience.",
      "Shipped Biota.land — a Web3 NFT marketplace for carbon credits.",
      "Drove data accuracy and engagement across climatological products.",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Web3", "Mapping"],
    linksLabel: "Related",
    links: [{ label: "D.A.P", url: "https://dap.rocks/" }],
  },
  {
    year: "2021—25",
    org: "Burlingame Studios",
    url: "https://bgamestudios.com/",
    title: "Lead Fullstack Engineer — CMS",
    location: "San Mateo, CA",
    period: "2021 — 2025",
    scope: "AAA GAMES · CMS · DEVOPS",
    bullets: [
      "Led and mentored a team of five full-stack engineers.",
      "Built robust CMS platforms with efficient content pipelines for AAA game development.",
      "Rendered game assets via headless Unity clusters serving millions of users.",
      "Implemented AI-driven localization across four languages, cutting time-to-market.",
      "Designed scalable cloud infra & DevOps: automated testing, queues, autoscaling.",
    ],
    tags: ["TypeScript", "Unity", "GCP", "DevOps", "AI Localization"],
    linksLabel: "Garden Joy — shipped title",
    links: [
      { label: "Website", url: "https://www.gardenjoygame.com/" },
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/garden-joy-exterior-designer/id1618284064",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.scopely.gardenjoy&hl=en",
      },
    ],
  },
  {
    year: "2025",
    org: "Interactive AI",
    url: "https://interactive.ai/",
    title: "Lead Fullstack Engineer",
    location: "Madrid, ES",
    period: "2025",
    scope: "AGENTIC AI · OBSERVABILITY",
    bullets: [
      "Architected & launched an LLM observability platform — zero to production in under 6 months.",
      'Engineered a Generative-UI "Agent-Builder" copilot for composing agent behaviors.',
      "Built a high-throughput telemetry engine on FastAPI + ClickHouse (tokens, latency, traces).",
      "Developed MCP-based agent orchestration with a smart AI Router for cost/performance.",
      "Shipped an agent-first CLI + SDK; designed GCP infra with Terraform & Kubernetes.",
      "Drove ISO 27001, SOC2, GDPR & EU AI Act technical alignment and certification.",
    ],
    tags: [
      "Go",
      "Python",
      "FastAPI",
      "ClickHouse",
      "MCP",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    year: "2025—now",
    org: "HazelHeartwood",
    url: "https://www.hazelheartwood.com/",
    title: "Lead, AI & Engineering Studio",
    location: "Madrid, ES",
    period: "2025 — Present",
    scope: "AI CONSULTING · STRATEGY → IMPACT",
    bullets: [
      "Guide human organizations through AI-driven change — from roadmap to measurable impact.",
      "Design and build complex multidisciplinary agent-orchestration architectures and systems.",
      "Consult, implement, and embed AI agents and systems into production within large enterprises.",
      "Translate business strategy into pragmatic, compliant agentic architectures.",
      "Partner with internal teams to upskill engineers and de-risk adoption at scale.",
    ],
    tags: [
      "AI Strategy",
      "Agent Orchestration",
      "Agentic Systems",
      "Enterprise",
    ],
  },
];

const education: Education[] = [
  {
    year: "2016",
    title: "IB Diploma Programme",
    org: "SEK International School, Ecuador",
  },
  {
    year: "2017—2020",
    title: "BSc Computer Science & Engineering",
    org: "Universidad Francisco Marroquín · DevOps, Cloud & Web",
  },
  {
    year: "2022—2023",
    title: "Master in Management — STEM",
    org: "EAE Business School, Madrid",
  },
];

const stack: StackGroup[] = [
  {
    cat: "AI & Agents",
    items: [
      "MCP",
      "AG-UI",
      "LLM Routing",
      "LangGraph",
      "LangChain",
      "OpenRouter",
      "OpenAI API",
      "Azure AI Foundry",
      "Google AI Studio",
      "Langfuse",
      "RAG",
      "Vector Search",
      "CLI Development",
      "AI-Native CI/CD",
      "Coding Agents",
    ],
  },
  {
    cat: "Frontend",
    items: ["Next.js", "React", "Generative UI", "Tailwind", "Angular"],
  },
  {
    cat: "Backend & Languages",
    items: ["Go", "Python", "FastAPI", "Node.js", "TypeScript", "PHP"],
  },
  {
    cat: "Cloud / IaC",
    items: [
      "Terraform",
      "Kubernetes",
      "Docker",
      "AWS",
      "GCP",
      "Azure",
      "GitHub Actions",
      "GitLab CI",
    ],
  },
  {
    cat: "Data Stores",
    items: ["ClickHouse", "PostgreSQL", "Redis", "MySQL", "MongoDB", "DynamoDB"],
  },
  {
    cat: "Compliance & Trust",
    items: ["ISO 27001", "SOC2", "GDPR", "EU AI Act"],
  },
];

const channels: Channel[] = [
  {
    label: "Email",
    value: "jmadrazo7@gmail.com",
    icon: "@",
    url: "mailto:jmadrazo7@gmail.com",
  },
  {
    label: "WhatsApp",
    value: "+34 677 893 008",
    icon: "✆",
    url: "https://wa.me/34677893008",
  },
  {
    label: "LinkedIn",
    value: "/in/amadrazo",
    icon: "in",
    url: "https://www.linkedin.com/in/amadrazo/",
  },
  {
    label: "GitHub",
    value: "@rmadrazo97",
    icon: "{}",
    url: "https://github.com/rmadrazo97",
  },
];

const initial = (name: string) =>
  (name.match(/[A-Za-z0-9]/)?.[0] ?? "#").toUpperCase();

const cursor = (
  <span
    style={{
      display: "inline-block",
      width: "0.55ch",
      height: "1em",
      background: "#FF5A1F",
      transform: "translateY(0.14em)",
      marginLeft: 2,
      animation: "blink 1s step-end infinite",
    }}
  />
);

const tagChip = {
  fontFamily: MONO,
  fontSize: 12,
  color: "#5C574C",
  background: "#EFEBE2",
  border: "1px solid #D7D0C2",
  padding: "4px 9px",
  borderRadius: 8,
} as const;

const sectionLabel = {
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: "0.14em",
  color: "#B83A0A",
  marginBottom: 10,
} as const;

const h2Style = {
  fontFamily: GROTESK,
  fontSize: "clamp(32px, 4.6vw, 64px)",
  fontWeight: 700,
  letterSpacing: "-0.04em",
  lineHeight: 0.95,
  textTransform: "uppercase",
  margin: 0,
} as const;

export default function Home() {
  const [scr, setScr] = useState("BRING A PROCESS");
  const [selIdx, setSelIdx] = useState<number | null>(null);
  const [diag, setDiag] = useState(0);
  const { isMobile, isTablet } = useViewport();

  // Shared responsive helpers. Desktop (>1024) must stay byte-for-byte; every
  // value below collapses to the original when neither isMobile nor isTablet.
  // standard vertical section rhythm (74px 40px on desktop)
  const sectionPad = isMobile
    ? "52px 20px"
    : isTablet
      ? "60px 28px"
      : "74px 40px";

  // hero scramble / reveal ticker
  useEffect(() => {
    const phrases = [
      "BRING A PROCESS",
      "MOCK-UP BEFORE THE BUILD",
      "WHERE THE VALUE IS",
      "CHALLENGE THE PROCESS",
      "HAND OVER THE CAPABILITY",
    ];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScr(phrases[0]);
      return;
    }
    const CH = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789/#<>*";
    let pIdx = 0;
    let reveal = 0;
    let hold = 40;
    const id = setInterval(() => {
      const tg = phrases[pIdx];
      let s = "";
      if (hold > 0) {
        hold--;
        s = tg;
      } else {
        reveal += 0.7;
        for (let k = 0; k < tg.length; k++) {
          if (tg[k] === " ") {
            s += " ";
            continue;
          }
          s += k < reveal ? tg[k] : CH[Math.floor(Math.random() * CH.length)];
        }
        if (reveal >= tg.length) {
          hold = 40;
          reveal = 0;
          pIdx = (pIdx + 1) % phrases.length;
        }
      }
      setScr(s);
    }, 55);
    return () => clearInterval(id);
  }, []);

  const sel = selIdx ?? roles.length - 1;
  const selRole = roles[sel];

  return (
    <div
      className="sheet-page"
      style={{
        background: "#EFEBE2",
        minHeight: "100dvh",
        fontFamily: GROTESK,
        color: "#17150F",
        position: "relative",
        overflowX: "clip",
      }}
    >
      <SheetFrame />

      {/* NAV */}
      <SiteNav onHome />

      {/* HERO */}
      <header id="top" className="felt-hero">
        <div className="hero-kicker">
          <i />
          Fullstack AI Engineer · 8+ yrs
        </div>
        <div className="felt-stage">
          <div className="felt-copy">
            <h1 className="hero-title">
              Value
              <br />
              driven
              <br />
              agentic
              <br />
              systems.
              <br />
              Built to
              <br />
              <span className="hero-em">scale.</span>
            </h1>
            <p className="felt-lead">
              Governable as they grow. I learn the need, find where the value
              is, and challenge the process.
            </p>
            <div className="felt-actions">
              <a href="#contact" className="pill-ink">
                Bring a process <span>↗</span>
              </a>
              <a href="#work" className="pill-line">
                See the work
              </a>
            </div>
          </div>
          <FeltOrb />
          <div className="felt-aside">
            <p>
              A mock-up before the build. Production once the value is proven.
              A handover so the team keeps the capability.
            </p>
            <div className="felt-pills">
              <a href="#method">Process</a>
              <a href="#method">Build</a>
              <a href="#method">Handover</a>
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 13,
                color: "#5C574C",
                marginTop: 18,
              }}
            >
              <span style={{ color: "#B83A0A" }}>$</span> am --engage{" "}
              <span>&gt;&gt;</span>{" "}
              <span style={{ color: "#17150F", fontWeight: 600 }}>{scr}</span>
              {cursor}
            </div>
            <div className="felt-status">
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#1B9C5A",
                  display: "inline-block",
                  animation: "pulseDot 1.6s ease-in-out infinite",
                }}
              />
              Available · Madrid
            </div>
          </div>
        </div>
      </header>

      <section className="title-block" aria-label="Proof">
        {[
          ["Studio", "AI & Engineering, Madrid"],
          ["8+ yrs", "From squad lead to production AI"],
          ["Range", "Low-code validation to full-stack agents"],
          ["Trust", "EU AI Act, GDPR, and NIS2 in the build"],
        ].map(([k, v]) => (
          <div key={k}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#B83A0A",
              }}
            >
              {k}
            </div>
            <div
              style={{
                fontFamily: GROTESK,
                fontSize: 16,
                lineHeight: 1.45,
                color: "#17150F",
                marginTop: 6,
              }}
            >
              {v}
            </div>
          </div>
        ))}
      </section>

      <PlanSequence />

      <section
        id="situation"
        className="sheet-pause"
      >
        <h2>
          Bring the situation,
          <br />
          not the tool.
        </h2>
      </section>

      <section
        style={{ position: "relative", zIndex: 2, borderTop: "1px solid #D7D0C2" }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: sectionPad }}>
          <div style={sectionLabel}>// WHERE YOU ARE</div>
          <div
            role="tablist"
            aria-label="Where AI sits in the company"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: 8,
              marginTop: 28,
            }}
          >
            {situations.map((st, i) => {
              const on = diag === i;
              return (
                <button
                  key={st.label}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setDiag(i)}
                  className="btn-press"
                  style={{
                    textAlign: "left",
                    minHeight: 44,
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: on ? "1px solid #B83A0A" : "1px solid #D7D0C2",
                    background: on ? "#FCFBF6" : "transparent",
                    color: "#17150F",
                    fontFamily: MONO,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transitionProperty: "border-color, background-color, scale",
                    transitionDuration: "150ms",
                    transitionTimingFunction: "ease-out",
                  }}
                >
                  0{i + 1} {st.label}
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            style={{
              marginTop: 16,
              background: "#FCFBF6",
              border: "1px solid #D7D0C2",
              borderRadius: 16,
              padding: isMobile ? 18 : 24,
            }}
          >
            <div style={{ ...sectionLabel, marginBottom: 8 }}>
              YOU LEAVE WITH {situations[diag].leave.toUpperCase()}
            </div>
            <p
              style={{
                fontFamily: GROTESK,
                fontSize: 16,
                lineHeight: 1.6,
                color: "#3A362E",
                margin: 0,
                maxWidth: "65ch",
              }}
            >
              {situations[diag].body}
            </p>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section
        id="method"
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid #D7D0C2",
          background: "rgba(252,251,246,0.45)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: sectionPad }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div style={sectionLabel}>// 01 — METHOD</div>
              <h2 style={h2Style}>How an engagement runs</h2>
            </div>
            <p
              style={{
                fontFamily: GROTESK,
                fontSize: 15,
                color: "#5C574C",
                maxWidth: 360,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Three steps. The need picks the tool, from low-code to
              full-stack. Business first, technology second.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "repeat(2,1fr)"
                  : "repeat(3,1fr)",
              gap: 18,
            }}
          >
            {services.map((sv) => (
              <div
                key={sv.no}
                className="card-hover"
                style={{
                  background: "#FCFBF6",
                  border: "1px solid #D7D0C2",
                  borderRadius: 2,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      color: "#FF5A1F",
                      fontWeight: 600,
                    }}
                  >
                    {sv.no}
                  </span>
                  <span
                    style={{ fontFamily: MONO, fontSize: 13, color: "#C7C0B0" }}
                  >
                    {sv.glyph}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: MONO,
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {sv.title}
                </h3>
                <p
                  style={{
                    fontFamily: GROTESK,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "#3A362E",
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {sv.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    paddingTop: 4,
                  }}
                >
                  {sv.tags.map((tg) => (
                    <span key={tg} style={tagChip}>
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section
        id="work"
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid #D7D0C2",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: sectionPad }}>
          <div style={sectionLabel}>// 02 — PROOF</div>
          <h2 style={{ ...h2Style, maxWidth: "14ch" }}>What the work looks like</h2>
        </div>
        <div className="work-index">
          {projects.map((pj, i) => (
            <article key={pj.title} className="work-plate">
              <div className="work-no">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="work-kicker">
                  {pj.org} · {pj.period}
                </div>
                <h3>{pj.title}</h3>
                <p>{pj.blurb}</p>
                <div className="work-tags">
                  {pj.tags.map((tg) => (
                    <span key={tg} style={tagChip}>
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="work-metric">{pj.metric}</div>
                <div className="work-metric-label">{pj.metricLabel}</div>
                {pj.url ? (
                  <a
                    className="work-link"
                    href={pj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pj.urlLabel} <span>↗</span>
                  </a>
                ) : null}
              </div>
              {pj.img ? (
                <div className="work-shot">
                  <img
                    src={pj.img}
                    alt={`${pj.title} at ${pj.org}`}
                    style={{ objectFit: pj.imgFit ?? "contain" }}
                  />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>


      {/* TIMELINE */}
      <section
        id="timeline"
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid #D7D0C2",
          background: "rgba(252,251,246,0.45)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: sectionPad }}>
          <div style={{ marginBottom: 42 }}>
            <div style={sectionLabel}>// 03 — TRAJECTORY</div>
            <h2 style={h2Style}>The path so far</h2>
            <p
              style={{
                fontFamily: GROTESK,
                fontSize: 15,
                color: "#5C574C",
                margin: "12px 0 0",
                maxWidth: 480,
                lineHeight: 1.6,
              }}
            >
              A decade of shipping, then the studio. Select a year to read the role.
            </p>
          </div>

          {/* axis */}
          <div style={{ position: "relative", margin: "0 0 30px" }}>
            {/* horizontal progress line — desktop/tablet only */}
            {!isMobile && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: 11,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "#D7D0C2",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 11,
                    left: 0,
                    height: 2,
                    right: 0,
                    background: "#FF5A1F",
                    transform: `scaleX(${roles.length <= 1 ? 0 : sel / (roles.length - 1)})`,
                    transformOrigin: "left center",
                    transitionProperty: "transform",
                    transitionDuration: "200ms",
                    transitionTimingFunction: "ease-out",
                  }}
                />
              </>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: isMobile ? "flex-start" : "space-between",
                gap: isMobile ? 6 : undefined,
                position: "relative",
              }}
            >
              {roles.map((rl, i) => {
                const active = i === sel;
                return (
                  <button
                    key={i}
                    onClick={() => setSelIdx(i)}
                    style={{
                      background: active && isMobile ? "#FCFBF6" : "none",
                      border: isMobile
                        ? `1px solid ${active ? "#FF5A1F" : "#D7D0C2"}`
                        : "none",
                      borderRadius: isMobile ? 12 : 0,
                      cursor: "pointer",
                      padding: isMobile ? "12px 14px" : 0,
                      width: isMobile ? "100%" : undefined,
                      minHeight: isMobile ? 44 : undefined,
                      display: "flex",
                      flexDirection: isMobile ? "row" : "column",
                      alignItems: "center",
                      gap: isMobile ? 14 : 12,
                      flex: isMobile ? undefined : 1,
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        flexShrink: 0,
                        borderRadius: "50%",
                        border: `2px solid ${active ? "#FF5A1F" : "#C7C0B0"}`,
                        background: active ? "#FF5A1F" : "#EFEBE2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: active ? "#fff" : "#C7C0B0",
                        }}
                      />
                    </span>
                    <span
                      style={{
                        textAlign: "left",
                        display: isMobile ? "flex" : "block",
                        flexDirection: isMobile ? "row" : undefined,
                        alignItems: isMobile ? "baseline" : undefined,
                        gap: isMobile ? 10 : undefined,
                        flexWrap: isMobile ? "wrap" : undefined,
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontFamily: MONO,
                          fontSize: 13,
                          fontWeight: 700,
                          color: active ? "#FF5A1F" : "#17150F",
                        }}
                      >
                        {rl.year}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: MONO,
                          fontSize: 11,
                          color: "#908A7C",
                          marginTop: isMobile ? 0 : 3,
                        }}
                      >
                        {rl.org}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* detail panel */}
          <div
            style={{
              background: "#1A1813",
              border: "1px solid #2E2A22",
              borderRadius: 16,
              padding: isMobile ? "22px 18px" : "34px 34px 32px",
              color: "#EFEBE2",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 22,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: "#FF5A1F",
                    letterSpacing: "0.06em",
                    marginBottom: 10,
                  }}
                >
                  {selRole.period} · {selRole.location}
                </div>
                <h3
                  style={{
                    fontFamily: MONO,
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    margin: 0,
                    color: "#F4F0E6",
                  }}
                >
                  {selRole.title}
                </h3>
                <a
                  href={selRole.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glitch-link"
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#17150F",
                    background: "#EFEBE2",
                    padding: "9px 16px",
                    borderRadius: 8,
                    border: "1px solid transparent",
                    marginTop: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {selRole.org} <span style={{ fontSize: 13 }}>↗</span>
                </a>
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#7A7565",
                  textAlign: "right",
                  lineHeight: 1.8,
                }}
              >
                <div>
                  ▌CHAPTER {String(sel + 1).padStart(2, "0")}/
                  {String(roles.length).padStart(2, "0")}
                </div>
                <div style={{ color: "#C9C3B4" }}>{selRole.scope}</div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "14px" : "14px 34px",
                marginBottom: 24,
              }}
            >
              {selRole.bullets.map((bl, bi) => (
                <div
                  key={bi}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      color: "#FF5A1F",
                      fontFamily: MONO,
                      fontSize: 13,
                      marginTop: 2,
                    }}
                  >
                    →
                  </span>
                  <span
                    style={{
                      fontFamily: GROTESK,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "#D9D3C6",
                    }}
                  >
                    {bl}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                borderTop: "1px solid #2E2A22",
                paddingTop: 20,
                alignItems: "center",
              }}
            >
              {selRole.tags.map((st) => (
                <span
                  key={st}
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: "#C9C3B4",
                    background: "#252118",
                    border: "1px solid #38332A",
                    padding: "5px 11px",
                    borderRadius: 6,
                  }}
                >
                  {st}
                </span>
              ))}
            </div>
            {selRole.links && selRole.links.length > 0 && (
              <div
                style={{
                  marginTop: 22,
                  background: "#211A12",
                  border: "1px solid #3A2A1C",
                  borderRadius: 12,
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    color: "#FF5A1F",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#FF5A1F",
                      display: "inline-block",
                      animation: "pulseDot 1.6s ease-in-out infinite",
                    }}
                  />
                  {selRole.linksLabel ?? "Links"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {selRole.links.map((ln) => (
                    <a
                      key={ln.url}
                      href={ln.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glitch-link"
                      style={{
                        fontFamily: MONO,
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "#17150F",
                        background: "#EFEBE2",
                        padding: "9px 16px",
                        borderRadius: 8,
                        border: "1px solid transparent",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {ln.label} <span style={{ fontSize: 13 }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* education strip */}
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: 14,
            }}
          >
            {education.map((ed) => (
              <div
                key={ed.title}
                style={{
                  background: "#FCFBF6",
                  border: "1px solid #D7D0C2",
                  borderRadius: 12,
                  padding: "18px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: "#FF5A1F",
                    marginBottom: 8,
                  }}
                >
                  {ed.year}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: "#17150F",
                    lineHeight: 1.3,
                  }}
                >
                  {ed.title}
                </div>
                <div
                  style={{
                    fontFamily: GROTESK,
                    fontSize: 13,
                    color: "#5C574C",
                    marginTop: 5,
                  }}
                >
                  {ed.org}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section
        id="stack"
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
            padding: isMobile
              ? "52px 20px 40px"
              : isTablet
                ? "60px 28px 40px"
                : "74px 40px 40px",
          }}
        >
          <div style={{ marginBottom: 38 }}>
            <div style={sectionLabel}>// 04 — THE BUILD</div>
            <h2 style={h2Style}>What the engagement stands on</h2>
            <p
              style={{
                fontFamily: GROTESK,
                fontSize: 16,
                color: "#3A362E",
                margin: "12px 0 0",
                maxWidth: "65ch",
                lineHeight: 1.6,
              }}
            >
              Low-code where the data already lives. Full-stack where the
              company needs to own the system. Traces and a human in the loop
              either way.
            </p>
          </div>

          <div className="stack-folds">
            {stack.map((sk) => (
              <details key={sk.cat} className="stack-fold">
                <summary>
                  <span>{sk.cat}</span>
                  <span className="stack-count">
                    {String(sk.items.length).padStart(2, "0")}
                  </span>
                </summary>
                <div className="stack-items">
                  {sk.items.map((it) => (
                    <span key={it} className="chip-hover stack-chip">
                      <span className="stack-initial">{initial(it)}</span>
                      {it}
                    </span>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section
        id="writing"
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid #D7D0C2",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: sectionPad }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 28,
            }}
          >
            <div>
              <div style={sectionLabel}>// 05 — NOTES</div>
              <h2 style={h2Style}>The method, in writing</h2>
            </div>
            <a
              href="/blog"
              className="nav-link"
              style={{
                fontFamily: MONO,
                fontSize: 12.5,
                fontWeight: 600,
                color: "#17150F",
              }}
            >
              Read all writing →
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {posts.slice(0, 2).map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card-hover"
                style={{
                  display: "block",
                  background: "#FCFBF6",
                  border: "1px solid #D7D0C2",
                  borderRadius: 16,
                  padding: "26px 28px",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.05em",
                    color: "#908A7C",
                    marginBottom: 11,
                    display: "flex",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <span>{formatDate(p.date)}</span>
                  <span style={{ color: "#FF5A1F" }}>{p.readingTime}</span>
                </div>
                <h3
                  style={{
                    fontFamily: MONO,
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    margin: "0 0 11px",
                    color: "#17150F",
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: GROTESK,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "#3A362E",
                    margin: "0 0 14px",
                    maxWidth: 720,
                  }}
                >
                  {p.excerpt}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={tagChip}>
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid #D7D0C2",
          background: "rgba(252,251,246,0.45)",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: isMobile
              ? "52px 20px"
              : isTablet
                ? "60px 28px"
                : "80px 40px",
          }}
        >
          <div style={{ ...sectionLabel, marginBottom: 18 }}>
            // 06 — ENGAGE
          </div>
          <h2 style={{ ...h2Style, margin: "0 0 16px" }}>
            Bring me the process.
          </h2>
          <p
            style={{
              fontFamily: GROTESK,
              fontSize: 16,
              lineHeight: 1.6,
              color: "#3A362E",
              maxWidth: "65ch",
              margin: "0 0 32px",
            }}
          >
            One hour. Bring one process where the number has not moved, or one
            pilot that is stuck. You leave with a problem statement and a
            decision to scale or stop.
          </p>

          {/* terminal */}
          <div
            className="panel"
            style={{
              background: "#1A1813",
              border: "1px solid #2E2A22",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow:
                "0px 0px 0px 1px oklch(0 0 0 / 0.06), 0px 1px 2px -1px oklch(0 0 0 / 0.06), 0px 2px 4px 0px oklch(0 0 0 / 0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "13px 18px",
                borderBottom: "1px solid #2E2A22",
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#FF5A1F",
                }}
              />
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#EFEBE2",
                  opacity: 0.35,
                }}
              />
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#EFEBE2",
                  opacity: 0.2,
                }}
              />
              <span
                style={{
                  marginLeft: 10,
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#7A7565",
                  letterSpacing: "0.05em",
                }}
              >
                am@madrid ~ /contact
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#1B9C5A",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#1B9C5A",
                    display: "inline-block",
                    animation: "pulseDot 1.6s ease-in-out infinite",
                  }}
                />
                available
              </span>
            </div>
            <div
              style={{
                padding: isMobile ? "20px 16px 24px" : "26px 26px 30px",
                fontFamily: MONO,
              }}
            >
              <div style={{ fontSize: 13, color: "#C9C3B4", marginBottom: 8 }}>
                <span style={{ color: "#FF5A1F" }}>$</span> am --engage{" "}
                <span style={{ color: "#C9C3B4" }}>--process</span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#C9C3B4",
                  marginBottom: 22,
                  lineHeight: 1.7,
                }}
              >
                → one process, or one stuck pilot. The first conversation is an hour.
                {cursor}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fit,minmax(225px,1fr))",
                  gap: 12,
                }}
              >
                {channels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glitch-link channel"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      background: "#211A12",
                      border: "1px solid #3A2E22",
                      borderRadius: 10,
                      padding: "14px 16px",
                      color: "#EFEBE2",
                    }}
                  >
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        background: "#15120C",
                        border: "1px solid #3A2E22",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#FF5A1F",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {ch.icon}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#7A7565",
                        }}
                      >
                        {ch.label}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#F4F0E6",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {ch.value}
                      </span>
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "#7A7565",
                        fontSize: 13,
                      }}
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#5C574C",
                  marginTop: 24,
                  paddingTop: 18,
                  borderTop: "1px solid #2E2A22",
                }}
              >
                <span style={{ color: "#FF5A1F" }}>$</span> _
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
            padding: isMobile ? "20px" : "22px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: MONO,
            fontSize: 11,
            color: "#5C574C",
            letterSpacing: "0.05em",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span>© 2026 JOSÉ A. MADRAZO AVILA</span>
          <span>MADRID, ES · CET</span>
          <span style={{ color: "#FF5A1F" }}>AM // SYSTEMS, SHIPPED.</span>
        </div>
      </footer>
    </div>
  );
}
