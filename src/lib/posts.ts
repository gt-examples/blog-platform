import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

function getLocaleDir(locale: string) {
  const localeDir = path.join(contentDir, locale);
  if (fs.existsSync(localeDir)) return localeDir;
  return path.join(contentDir, "en");
}

export function getAllPosts(locale: string = "en"): PostMeta[] {
  const dir = getLocaleDir(locale);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
    };
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string, locale: string = "en") {
  const dir = getLocaleDir(locale);
  const filePath = path.join(dir, `${slug}.mdx`);
  // Fall back to English if locale file doesn't exist
  const actualPath = fs.existsSync(filePath)
    ? filePath
    : path.join(contentDir, "en", `${slug}.mdx`);
  const raw = fs.readFileSync(actualPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
    } as PostMeta,
    content,
  };
}

export function getAllSlugs(): string[] {
  const dir = path.join(contentDir, "en");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
