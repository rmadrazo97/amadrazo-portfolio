// Post metadata only — no `fs` here, so this is safe to import from client
// components (the homepage) as well as the server-rendered blog routes.

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  readingTime: string;
  excerpt: string;
  tags: string[];
};

export const posts: PostMeta[] = [
  {
    slug: "building-an-ai-engineering-practice",
    title: "Building an AI Engineering Practice — A Reference Strategy",
    date: "2026-06-25",
    readingTime: "18 min read",
    excerpt:
      "A generalized, anonymized playbook for turning a salad of one-off agents and tools into a standardized AI Engineering platform — one that builds from a compounding set of reusable blocks, so every next solution ships faster, safer, and cheaper than the last.",
    tags: ["AI Engineering", "Strategy", "Platform", "Agents", "EU Sovereignty"],
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
