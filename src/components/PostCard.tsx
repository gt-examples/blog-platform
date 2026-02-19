import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors">
      <a href={`/blog/${post.slug}`} className="block">
        <div className="flex items-center gap-3 mb-3">
          <time className="text-xs text-neutral-500">{post.date}</time>
          <span className="text-neutral-700">|</span>
          <span className="text-xs text-neutral-500">{post.author}</span>
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
  );
}
