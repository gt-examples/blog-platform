import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { T } from "gt-next";
import { getLocale } from "gt-next/server";
import { getPost, getAllSlugs } from "@/lib/posts";
import Header from "@/components/Header";
import LanguageBadge from "@/components/LanguageBadge";

const locales = ["en", "es", "fr", "ja", "zh"];

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { meta } = getPost(slug, locale);
  return {
    title: `${meta.title} | Blog Platform`,
    description: meta.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const locale = await getLocale();
  const { slug } = await params;
  const { meta, content } = getPost(slug, locale);

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <a
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <T>Back to all posts</T>
          </a>
        </div>

        <article>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <time className="text-sm text-neutral-500">{meta.date}</time>
              <span className="text-neutral-700">|</span>
              <span className="text-sm text-neutral-500">{meta.author}</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-100 mb-3">
              {meta.title}
            </h1>
            <p className="text-base text-neutral-400 leading-relaxed mb-4">
              {meta.description}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <LanguageBadge />
            </div>
          </div>

          <div className="prose prose-invert prose-neutral max-w-none prose-headings:text-neutral-100 prose-p:text-neutral-300 prose-a:text-emerald-400 prose-strong:text-neutral-200 prose-code:text-emerald-300 prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-li:text-neutral-300">
            <MDXRemote source={content} />
          </div>
        </article>
      </main>

      <footer className="border-t border-neutral-800 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <p className="text-xs text-neutral-600">
            <T>
              Built with Next.js and General Translation. Translations are
              bundled locally for reliability and performance.
            </T>
          </p>
        </div>
      </footer>
    </div>
  );
}
