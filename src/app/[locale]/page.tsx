import { T } from "gt-next";
import { tx } from "gt-next/server";
import { getAllPosts } from "@/lib/posts";
import Header from "@/components/Header";
import LanguageBadge from "@/components/LanguageBadge";

export default async function Home() {
  const posts = getAllPosts();

  const translatedPosts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      title: await tx(post.title),
      description: await tx(post.description),
    }))
  );

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
            <T>Multilingual Blog Platform</T>
          </h2>
          <p className="text-base text-neutral-400 max-w-xl leading-relaxed mb-4">
            <T>
              A statically generated blog with full internationalization support.
              Pre-rendered pages in every locale for optimal performance and SEO.
            </T>
          </p>
          <LanguageBadge />
        </div>

        <div className="space-y-4">
          {translatedPosts.map((post) => (
            <article
              key={post.slug}
              className="group border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors"
            >
              <a href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-xs text-neutral-500">{post.date}</time>
                  <span className="text-neutral-700">|</span>
                  <span className="text-xs text-neutral-500">
                    {post.author}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-100 group-hover:text-emerald-400 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </article>
          ))}
        </div>
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
