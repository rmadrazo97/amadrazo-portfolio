# Consulting front door

## Problem

The homepage introduces a senior engineer for hire. Alex leads the AI & Engineering Studio at HazelHeartwood. The page should say that, in the studio's language, and keep the existing paper, mono, and orange system.

## Job to be done

A European operator lands on amadrazo.dev, understands that Alex puts agentic systems into daily operations, and starts a conversation about one process.

## Scope

- Hero, proof bar, four-state diagnostic, three engagements, three proofs, shorter stack, writing pull quote, four objections, terminal close.
- Nav: Method, Proof, Notes, Engage. CTA: Bring a process.
- Contrast, focus, press, hover timing, image outline, reduced motion, no glitch on controls, no hotlinked product screenshots.
- Metadata, blog intro, footer.

## Non-goals

- New visual language, client logo wall, invented prices, claiming HazelHeartwood impact stories as personal deliveries, a contact form, merging to main without an explicit yes.

## Acceptance

1. Headline reads "AI that runs in the work, not a demo."
2. Eyebrow names the studio and Madrid.
3. Primary action is "Bring a process" and reaches the terminal.
4. Four situations are selectable and show what the visitor leaves with. First state is selected on load.
5. Three engagements: The process, The build, The handover.
6. Three proofs: the studio (linked to HazelHeartwood impact), the production platform (no third-party screenshot), the decade of shipping.
7. Terminal command is `am --engage --process`.
8. Orange words on paper use `#B83A0A`. Orange fills use ink labels.
9. Hover transitions are 150ms ease-out on named properties. Primary controls scale to 0.96 on press. Glitch hover is off.
10. `prefers-reduced-motion` holds the ticker on its first phrase.
11. `npm run build` succeeds. Firebase Hosting serves the export.

## Assumptions

1. The site is a Next.js static export deployed with Firebase Hosting project `amadrazo`, public dir `out`.
2. Homepage section markup lives in `src/app/page.tsx`. Nav is `SiteNav.tsx`.
3. HazelHeartwood's public impact stories are firm work and may be linked, not signed as Alex's personal case studies.
4. The public contact email remains `jmadrazo7@gmail.com`. No domain mailbox was verified.
5. The role title on the page is the one Alex stated: Lead, AI & Engineering Studio.
