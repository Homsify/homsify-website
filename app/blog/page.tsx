import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog & Guides | Homsify",
  description:
    "Practical renovation guides, contractor checklists, and home improvement tips for Ontario homeowners and businesses.",
  alternates: {
    canonical: "https://homsify.ca/blog/",
  },
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 text-lg text-neutral-600">
          Guides, checklists, and renovation advice for Ontario property owners.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200 p-6 shadow-sm transition hover:shadow-md"
          >
            <div>
              <time
                dateTime={post.publishedAt}
                className="text-sm text-neutral-500"
              >
                {post.publishedAt}
              </time>
              <h2 className="mt-2 text-xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-neutral-600">{post.excerpt}</p>
            </div>

            <div className="mt-6">
              <Link
                href={`/blog/${post.slug}`}
                className="font-medium underline underline-offset-4"
              >
                Read article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
