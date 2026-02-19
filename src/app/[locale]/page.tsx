import { T } from "gt-next";
import { getGT } from "gt-next/server";
import { getAllPosts } from "@/lib/posts";
import Header from "@/components/Header";
import LanguageBadge from "@/components/LanguageBadge";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const gt = await getGT();
  const posts = getAllPosts();

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
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
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
