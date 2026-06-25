"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import GlitchMark from "../components/GlitchMark";
import SiteNav from "../components/SiteNav";
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
type StackGroup = { span: string; cat: string; items: string[] };
type Channel = { label: string; value: string; icon: string; url: string };

const services: Service[] = [
  {
    no: "01",
    glyph: "{ }",
    title: "AI-Native Infrastructure & Tooling",
    desc: "The substrate beneath AI products: MCP servers, RAG pipelines and vector search, plus the developer tooling on top — agent-first CLIs, sandboxed environments, and secure code execution.",
    tags: ["MCP", "RAG", "Vector Search", "CLIs", "Sandboxes"],
  },
  {
    no: "02",
    glyph: "◇",
    title: "Agentic Systems & Copilots",
    desc: "Multi-agent orchestration across the spectrum — autonomous long-horizon workers, customer-facing copilots, and internal assistants. Tool-use, human-in-the-loop guardrails, and context engineering wired through MCP.",
    tags: ["Multi-Agent", "Copilots", "Autonomous", "MCP"],
  },
  {
    no: "03",
    glyph: "≋",
    title: "Observability & Telemetry",
    desc: "Hierarchical traces that capture every LLM call, tool invocation, and retrieval step — filterable by user, session, cost, and latency. LLM-as-a-judge evaluation, prompt management, and golden datasets on a high-throughput telemetry engine.",
    tags: ["Langfuse", "ClickHouse", "LLM-as-Judge", "Evals", "Tracing"],
  },
  {
    no: "04",
    glyph: "△",
    title: "Cloud & DevOps",
    desc: "Infrastructure-as-Code across AWS, GCP, and Azure, with Kubernetes at scale. DevOps pipelines with AI at their core — automated PR reviews and self-healing, self-building systems on GitHub Actions and GitLab CI.",
    tags: ["AWS/GCP/Azure", "Terraform", "Kubernetes", "GitHub/GitLab CI"],
  },
  {
    no: "05",
    glyph: "⌗",
    title: "High-Performance Backends & Intuitive Frontends",
    desc: "End-to-end product engineering, backed by 8+ years full-stack: Go and Python services over real-time data layers, paired with intuitive React / Next.js frontends — including generative UI — built for throughput and heavy user loads.",
    tags: ["Go", "Python", "Next.js", "React", "OLAP"],
  },
  {
    no: "06",
    glyph: "✦",
    title: "Leadership & Communication",
    desc: "Building effective multidisciplinary teams and leading them from business strategy to delivery. Fluent translating between technical and business contexts, with a genuine focus on mentoring, teaching, and growing engineers. Owns enterprise trust end-to-end: ISO 27001, SOC2, GDPR and EU AI Act.",
    tags: ["Team Building", "Mentoring", "Tech ↔ Business", "Compliance"],
  },
];

const projects: Project[] = [
  {
    tag: "FLAGSHIP",
    status: "● live",
    glyph: "≋",
    url: "https://www.interactive.ai/",
    urlLabel: "Visit interactive.ai",
    img: "https://langfuse.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobservability-ui.0bpdi69_vw-s7.png&w=3840&q=100",
    org: "Interactive AI",
    period: "2025—present",
    title: "Agent Engineering Platform",
    blurb:
      "An end-to-end enterprise platform to build, connect, deploy, govern and improve AI agents. I engineered the observability and orchestration core — a high-throughput telemetry engine (FastAPI + ClickHouse) tracing every run from prompt to outcome, an MCP-based orchestration layer with a smart LLM Router across 200+ models, and an agent-first CLI + SDK, wrapped in a Generative-UI agent builder.",
    metric: "<6mo",
    metricLabel: "zero → enterprise production",
    tags: [
      "Go",
      "Python · FastAPI",
      "ClickHouse",
      "MCP",
      "LLM Router",
      "Generative UI",
      "Kubernetes",
    ],
  },
  {
    tag: "PRODUCT",
    status: "● live",
    glyph: "◧",
    img: "/assets/promptvm-ask.png",
    url: "https://promptvm.ai/",
    urlLabel: "Visit promptvm.ai",
    org: "PromptVM",
    period: "2025—present",
    title: "PromptVM",
    blurb:
      "Version control, a marketplace, and developer tools for AI prompts — write once, deploy anywhere via MCP, CLI, SDK or REST API. Semantic search runs across thousands of prompt versions so teams can track how a prompt evolved and promote the best-performing one as their default.",
    metric: "∞",
    metricLabel: "prompt versions, searchable",
    tags: [
      "Next.js",
      "Prompt Versioning",
      "Semantic Search",
      "CLI",
      "MCP",
      "API",
    ],
  },
  {
    tag: "MOBILE · AI",
    status: "● live",
    glyph: "☀",
    url: "https://apps.apple.com/us/app/myweather-ai/id6779910676",
    urlLabel: "App Store",
    img: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/be/46/79/be467983-adee-e28c-10c0-1173b7dc8807/01-hero.png/300x650bb.webp",
    imgFit: "contain",
    org: "Independent",
    period: "2025",
    title: "MyWeather AI",
    blurb:
      'A beautifully minimal iOS weather app with a built-in conversational AI assistant. Instead of decoding charts, just ask — "Do I need an umbrella today?" — and it reads the live forecast (Open-Meteo) for any city, checks air quality, UV and more, and replies in plain, friendly language. The UI adapts to the weather and time of day.',
    metric: "iOS",
    metricLabel: "on the App Store",
    tags: ["SwiftUI", "Conversational AI", "Open-Meteo", "Air Quality"],
  },
  {
    tag: "PLATFORM",
    status: "shipped",
    glyph: "◆",
    img: "/assets/cms-asset-manager.png",
    org: "Burlingame Studios",
    period: "2021—2025",
    title: "Mobile Game CMS + 3D Content Production Pipelines",
    blurb:
      "Content pipelines for AAA mobile titles built for fast-paced LiveOps: headless Unity render clusters producing 3D game assets at scale, AI-driven localization across four languages, and content-generation copilot agents that accelerated production — serving millions of players.",
    metric: "M+",
    metricLabel: "users served",
    tags: [
      "TypeScript",
      "Unity",
      "GCP",
      "LiveOps",
      "AI Localization",
      "Copilot Agents",
    ],
  },
  {
    tag: "WEB3",
    status: "shipped",
    glyph: "⬡",
    url: "https://x.com/BiotaNexus",
    urlLabel: "Biota on X",
    img: "/assets/biota-certificate.jpg",
    org: "Meteo.tech",
    period: "2019—2021",
    title: "Biota.land",
    blurb:
      "A Web3 NFT marketplace for carbon credits on Celo — each token a certificate of authenticity tied to a real preserved area (e.g. Tirimbina Biological Reserve), enabling transparent, traceable carbon-offset transactions on-chain.",
    metric: "NFT",
    metricLabel: "carbon-credit marketplace",
    tags: ["Web3", "Celo", "Solidity", "Next.js"],
  },
  {
    tag: "GEOSPATIAL",
    status: "shipped",
    glyph: "◉",
    url: "https://cvtas.centroclima.org/#/login",
    urlLabel: "Visit platform",
    img: "/assets/climate-map.png",
    org: "Meteo.tech / D.A.P",
    period: "2019—2021",
    title: "Climate Intelligence Platforms",
    blurb:
      "Advanced meteorological and climatological platforms with interactive real-time maps, plus climate-risk assessment tools supporting strategic planning and resilience across the region.",
    metric: "RT",
    metricLabel: "real-time interactive maps",
    tags: ["React", "Node.js", "PostgreSQL", "Mapping"],
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
    url: "https://hazelheartwood.com/",
    title: "Lead AI Engineering Consultant",
    location: "Madrid, ES · EU",
    period: "2025 — Present",
    scope: "AI CONSULTING · STRATEGY → IMPACT",
    bullets: [
      "Guide human organizations through AI-driven change — from roadmap to measurable impact.",
      "Design and build complex multidisciplinary agent-orchestration architectures and systems.",
      "Consult, implement, and embed AI agents and systems into production within large EU enterprises.",
      "Translate business strategy into pragmatic, compliant agentic architectures.",
      "Partner with internal teams to upskill engineers and de-risk adoption at scale.",
    ],
    tags: [
      "AI Strategy",
      "Agent Orchestration",
      "Agentic Systems",
      "Enterprise",
      "EU",
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
    span: "span 2",
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
    span: "span 1",
    cat: "Frontend",
    items: ["Next.js", "React", "Generative UI", "Tailwind", "Angular"],
  },
  {
    span: "span 1",
    cat: "Backend & Languages",
    items: ["Go", "Python", "FastAPI", "Node.js", "TypeScript", "PHP"],
  },
  {
    span: "span 2",
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
    span: "span 1",
    cat: "Data Stores",
    items: ["ClickHouse", "PostgreSQL", "Redis", "MySQL", "MongoDB", "DynamoDB"],
  },
  {
    span: "span 1",
    cat: "Compliance & Trust",
    items: ["ISO 27001", "SOC2", "GDPR", "EU AI Act"],
  },
];

const marquee = [
  "GO",
  "PYTHON",
  "TYPESCRIPT",
  "KUBERNETES",
  "TERRAFORM",
  "CLICKHOUSE",
  "FASTAPI",
  "MCP",
  "POSTGRES",
  "NEXT.JS",
  "GCP",
  "REDIS",
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
  fontSize: 11,
  color: "#5C574C",
  background: "#EFEBE2",
  border: "1px solid #D7D0C2",
  padding: "4px 9px",
  borderRadius: 6,
} as const;

const sectionLabel = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.14em",
  color: "#FF5A1F",
  marginBottom: 10,
} as const;

const h2Style = {
  fontFamily: MONO,
  fontSize: 30,
  fontWeight: 700,
  letterSpacing: "-0.01em",
  margin: 0,
} as const;

export default function Home() {
  const [scr, setScr] = useState("");
  const [selIdx, setSelIdx] = useState<number | null>(null);
  const { width, isMobile, isTablet } = useViewport();

  // Shared responsive helpers. Desktop (>1024) must stay byte-for-byte; every
  // value below collapses to the original when neither isMobile nor isTablet.
  const isSmall = width <= 360; // very narrow phones (<=360)
  // standard vertical section rhythm (74px 40px on desktop)
  const sectionPad = isMobile
    ? "52px 20px"
    : isTablet
      ? "60px 28px"
      : "74px 40px";

  // hero scramble / reveal ticker
  useEffect(() => {
    const phrases = [
      "LLM ROUTING & OBSERVABILITY",
      "AGENT ORCHESTRATION (MCP)",
      "GENERATIVE UI COPILOTS",
      "CLOUD INFRASTRUCTURE (IaC)",
      "HIGH-PERFORMANCE BACKENDS",
    ];
    const CH = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789/#<>*";
    let pIdx = 0;
    let reveal = 0;
    let hold = 0;
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
  const progressW =
    roles.length <= 1 ? "0%" : `${(sel / (roles.length - 1)) * 100}%`;
  const projectCount = String(projects.length).padStart(2, "0");

  return (
    <div
      style={{
        background: "#EFEBE2",
        minHeight: "100vh",
        fontFamily: GROTESK,
        color: "#17150F",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* dot matrix backdrop */}
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

      {/* NAV */}
      <SiteNav onHome />

      {/* HERO */}
      <header
        id="top"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile
            ? "44px 20px 52px"
            : isTablet
              ? "56px 28px 64px"
              : "70px 40px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile || isTablet ? "1fr" : "1.08fr 0.92fr",
            gap: isMobile ? 28 : 40,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FF5A1F",
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ width: 22, height: 1, background: "#FF5A1F" }} />
              Senior AI Engineer · Fullstack · Technical Lead
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "clamp(28px,3.6vw,40px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginBottom: 18,
                color: "#17150F",
              }}
            >
              Alex Madrazo
            </div>
            <h1
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "clamp(30px,4.4vw,52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: "0 0 26px",
                color: "#5C574C",
              }}
            >
              Shipping Agentic Systems
              <br />
              in <span style={{ color: "#FF5A1F" }}>production</span>
            </h1>
            <p
              style={{
                fontFamily: GROTESK,
                fontSize: 18,
                lineHeight: 1.6,
                color: "#3A362E",
                maxWidth: 520,
                margin: "0 0 22px",
              }}
            >
              I architect the foundational infrastructure for AI-native
              applications — LLM routing, agent observability, and the cloud
              platforms beneath them — backed by 8+ years leading teams from
              business strategy to delivered software.
            </p>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 13,
                color: "#5C574C",
                marginBottom: 34,
              }}
            >
              <span style={{ color: "#FF5A1F" }}>$</span> am --skill{" "}
              <span style={{ color: "#908A7C" }}>&gt;&gt;</span>{" "}
              <span style={{ color: "#17150F", fontWeight: 600 }}>{scr}</span>
              {cursor}
            </div>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="#work"
                className="btn-dark"
                style={{
                  background: "#FF5A1F",
                  color: "#fff",
                  fontFamily: MONO,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "13px 22px",
                  borderRadius: 8,
                  display: "inline-flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                View selected work <span>→</span>
              </a>
              <a
                href="#contact"
                className="btn-outline"
                style={{
                  border: "1px solid #C7C0B0",
                  color: "#17150F",
                  fontFamily: MONO,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "13px 22px",
                  borderRadius: 8,
                }}
              >
                Get in touch
              </a>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: MONO,
                  fontSize: 12,
                  color: "#5C574C",
                  marginLeft: 6,
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
                Available · Madrid, ES
              </span>
            </div>
          </div>

          {/* 3D signature mark */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: isMobile ? 300 : 380,
              transform: isMobile
                ? isSmall
                  ? "scale(0.8)"
                  : "scale(0.9)"
                : undefined,
              transformOrigin: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 16,
                height: 16,
                borderTop: "1.5px solid #17150F",
                borderLeft: "1.5px solid #17150F",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 16,
                height: 16,
                borderTop: "1.5px solid #17150F",
                borderRight: "1.5px solid #17150F",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 16,
                height: 16,
                borderBottom: "1.5px solid #17150F",
                borderLeft: "1.5px solid #17150F",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 16,
                height: 16,
                borderBottom: "1.5px solid #17150F",
                borderRight: "1.5px solid #17150F",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 300,
                height: 300,
                border: "1px solid #DDD6C8",
                borderRadius: "50%",
              }}
            />
            <GlitchMark size={isMobile ? 240 : 300} />
            {!isSmall && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 8,
                    fontFamily: MONO,
                    fontSize: 10,
                    lineHeight: 1.9,
                    color: "#5C574C",
                    textAlign: "left",
                  }}
                >
                  <div style={{ color: "#A39C8C" }}>▌STATE</div>
                  <div>EVOLVING</div>
                  <div style={{ color: "#A39C8C", marginTop: 8 }}>▌SIGNAL</div>
                  <div style={{ color: "#FF5A1F" }}>UNSTABLE</div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 8,
                    fontFamily: MONO,
                    fontSize: 10,
                    lineHeight: 1.9,
                    color: "#5C574C",
                  }}
                >
                  <div style={{ color: "#A39C8C" }}>▌NODE</div>
                  <div>AM // MADRID</div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* CAPABILITIES */}
      <section
        id="services"
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
              <div style={sectionLabel}>// 01 — CAPABILITIES</div>
              <h2 style={h2Style}>What I build</h2>
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
              Not a list of tools — the systems I own end-to-end, from
              infrastructure to the interface on top.
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
                  borderRadius: 14,
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
                    fontSize: 14.5,
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div>
              <div style={sectionLabel}>// 02 — SELECTED WORK</div>
              <h2 style={h2Style}>Projects I&apos;ve shipped</h2>
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: "#908A7C",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: "#FF5A1F" }}>↕</span> scroll · {projectCount}{" "}
              projects
            </div>
          </div>

          <div
            className="work-scroll"
            style={{
              maxHeight: isMobile ? "none" : 660,
              overflowY: isMobile ? "visible" : "auto",
              paddingRight: isMobile ? 0 : 10,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {projects.map((pj) => (
              <div
                key={pj.title}
                className="card-hover"
                style={{
                  flexShrink: 0,
                  background: "#FCFBF6",
                  border: "1px solid #D7D0C2",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns:
                    isMobile || isTablet ? "1fr" : "1fr 300px",
                }}
              >
                <div
                  style={{
                    padding: isMobile ? "20px 18px" : "24px 26px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 13,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: "0.05em",
                      color: "#908A7C",
                    }}
                  >
                    <span>{pj.tag}</span>
                    <span style={{ color: "#FF5A1F" }}>{pj.status}</span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        color: "#908A7C",
                        marginBottom: 7,
                      }}
                    >
                      {pj.org} · {pj.period}
                    </div>
                    <h3
                      style={{
                        fontFamily: MONO,
                        fontSize: 23,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        margin: 0,
                        color: "#17150F",
                      }}
                    >
                      {pj.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: GROTESK,
                      fontSize: 15,
                      lineHeight: 1.62,
                      color: "#3A362E",
                      margin: 0,
                      flexGrow: 1,
                    }}
                  >
                    {pj.blurb}
                  </p>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        color: "#FF5A1F",
                        fontWeight: 700,
                        fontSize: 21,
                      }}
                    >
                      {pj.metric}
                    </span>
                    <span style={{ color: "#908A7C" }}>{pj.metricLabel}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 7,
                      paddingTop: 2,
                    }}
                  >
                    {pj.tags.map((pt) => (
                      <span key={pt} style={tagChip}>
                        {pt}
                      </span>
                    ))}
                  </div>
                  {pj.url && (
                    <a
                      href={pj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glitch-link"
                      style={{
                        alignSelf: "flex-start",
                        marginTop: 4,
                        fontFamily: MONO,
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: "#fff",
                        background: "#FF5A1F",
                        border: "1px solid #FF5A1F",
                        padding: "9px 16px",
                        borderRadius: 8,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {pj.urlLabel} <span style={{ fontSize: 13 }}>↗</span>
                    </a>
                  )}
                </div>
                <div
                  style={{
                    position: "relative",
                    ...(isMobile || isTablet
                      ? { borderTop: "1px solid #E3DDD0", height: 200 }
                      : { borderLeft: "1px solid #E3DDD0" }),
                    background: "#F3EFE6",
                    backgroundImage:
                      "radial-gradient(#D7D0C2 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 200,
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      width: 12,
                      height: 12,
                      borderTop: "1.5px solid #C7C0B0",
                      borderLeft: "1.5px solid #C7C0B0",
                      zIndex: 2,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      width: 12,
                      height: 12,
                      borderBottom: "1.5px solid #C7C0B0",
                      borderRight: "1.5px solid #C7C0B0",
                      zIndex: 2,
                    }}
                  />
                  {pj.img ? (
                    <img
                      src={pj.img}
                      alt={`${pj.title} preview`}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: pj.imgFit ?? "cover",
                        objectPosition:
                          pj.imgFit === "contain" ? "center" : "left top",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        color: "#A39C8C",
                      }}
                    >
                      <span
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 11,
                          background: "#FCFBF6",
                          border: "1px solid #D7D0C2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          color: "#FF5A1F",
                        }}
                      >
                        {pj.glyph}
                      </span>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        preview
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
              Select a node to inspect the role.{" "}
              <span
                style={{ fontFamily: MONO, fontSize: 12, color: "#908A7C" }}
              >
                [ click to expand ]
              </span>
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
                    background: "#FF5A1F",
                    width: progressW,
                    transition: "width 0.35s ease",
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
                      fontSize: 14.5,
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
            <div style={sectionLabel}>// 04 — STACK</div>
            <h2 style={h2Style}>Works across the stack</h2>
            <p
              style={{
                fontFamily: GROTESK,
                fontSize: 15,
                color: "#5C574C",
                margin: "12px 0 0",
                maxWidth: 460,
                lineHeight: 1.6,
              }}
            >
              From the intelligence layer down to the platform it runs on — no
              framework lock-in.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
              gap: 16,
            }}
          >
            {stack.map((sk) => (
              <div
                key={sk.cat}
                style={{
                  gridColumn: isMobile ? "auto" : sk.span,
                  background: "#FCFBF6",
                  border: "1px solid #D7D0C2",
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "#17150F",
                    marginBottom: 14,
                  }}
                >
                  {sk.cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {sk.items.map((it) => (
                    <span
                      key={it}
                      className="chip-hover"
                      style={{
                        fontFamily: MONO,
                        fontSize: 11.5,
                        color: "#3A362E",
                        background: "#FFFFFF",
                        border: "1px solid #DDD6C8",
                        padding: "5px 10px 5px 6px",
                        borderRadius: 7,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          background: "#F0ECE2",
                          border: "1px solid #DDD6C8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 8,
                          fontWeight: 700,
                          color: "#A39C8C",
                          flexShrink: 0,
                        }}
                      >
                        {initial(it)}
                      </span>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS marquee */}
      <section style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            background: "#1A1813",
            borderTop: "1px solid #2E2A22",
            borderBottom: "1px solid #2E2A22",
            padding: "16px 0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "marquee 22s linear infinite",
            }}
          >
            <div style={{ display: "flex", gap: 34, paddingRight: 34 }}>
              {marquee.map((mq, mi) => (
                <span
                  key={mi}
                  style={{
                    fontFamily: MONO,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#C9C3B4",
                    whiteSpace: "nowrap",
                  }}
                >
                  {mq} <span style={{ color: "#FF5A1F" }}>/</span>
                </span>
              ))}
            </div>
            <div
              style={{ display: "flex", gap: 34, paddingRight: 34 }}
              aria-hidden="true"
            >
              {marquee.map((mq, mi) => (
                <span
                  key={mi}
                  style={{
                    fontFamily: MONO,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#C9C3B4",
                    whiteSpace: "nowrap",
                  }}
                >
                  {mq} <span style={{ color: "#FF5A1F" }}>/</span>
                </span>
              ))}
            </div>
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
              <div style={sectionLabel}>// 05 — WRITING</div>
              <h2 style={h2Style}>Notes from the build</h2>
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
            // 06 — CONTACT
          </div>
          <h2
            style={{
              fontFamily: MONO,
              fontSize: "clamp(30px,4.5vw,52px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "0 0 32px",
              lineHeight: 1.08,
            }}
          >
            Let&apos;s build something
            <br />
            that ships.
          </h2>

          {/* terminal */}
          <div
            style={{
              background: "#1A1813",
              border: "1px solid #2E2A22",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 28px 70px -34px rgba(20,18,12,0.55)",
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
              <div style={{ fontSize: 13, color: "#7A7565", marginBottom: 8 }}>
                <span style={{ color: "#FF5A1F" }}>$</span> am --connect{" "}
                <span style={{ color: "#908A7C" }}>--all</span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#C9C3B4",
                  marginBottom: 22,
                  lineHeight: 1.7,
                }}
              >
                → opening 4 channels · pick one to reach me directly
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
            color: "#908A7C",
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
