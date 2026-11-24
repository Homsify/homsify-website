import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/content/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

function renderTextWithLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      const [, label, href] = match;
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800"
          >
            {label}
          </a>
        );
      }

      return (
        <Link
          key={index}
          href={href}
          className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800"
        >
          {label}
        </Link>
      );
    }

    return part;
  });
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://homsify.ca/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="mb-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          ← Back to Blog
        </Link>
      </nav>

      <header className="mb-10">
        <time dateTime={post.publishedAt} className="text-sm text-neutral-500">
          {post.publishedAt}
        </time>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
      </header>

      <div className="space-y-8 text-base leading-7 text-neutral-800">
        {post.sections.map((section, index) => (
          <section key={index} className="space-y-4">
            {section.heading && (
              <h2 className="pt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                {section.heading}
              </h2>
            )}

            {section.paragraphs?.map((paragraph, pIdx) => (
              <p key={pIdx}>{renderTextWithLinks(paragraph)}</p>
            ))}

            {section.orderedList && (
              <ol className="list-decimal space-y-2 pl-6">
                {section.orderedList.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderTextWithLinks(item)}</li>
                ))}
              </ol>
            )}

            {section.bulletList && (
              <ul className="list-disc space-y-2 pl-6">
                {section.bulletList.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderTextWithLinks(item)}</li>
                ))}
              </ul>
            )}

            {section.table && (
              <div className="my-6 overflow-x-auto">
                <table className="min-w-full border border-neutral-300 text-left text-sm">
                  <thead className="bg-neutral-100 font-semibold">
                    <tr>
                      {section.table.headers.map((header, hIdx) => (
                        <th
                          key={hIdx}
                          className="border border-neutral-300 px-4 py-3"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="border border-neutral-300 px-4 py-3"
                          >
                            {renderTextWithLinks(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.afterParagraphs?.map((paragraph, pIdx) => (
              <p key={pIdx}>{renderTextWithLinks(paragraph)}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
