# Blog Platform

A multilingual MDX blog with static site generation, SEO metadata, and locale routing — powered by General Translation.

**[Live Demo](https://blog-platform.generaltranslation.dev)** | **[General Translation Docs](https://generaltranslation.com/docs)**

## About

This example demonstrates a fully internationalized blog built with Next.js and [gt-next](https://generaltranslation.com/docs). Blog posts are written in MDX and translated into multiple languages. Pages are statically generated at build time for every supported locale, delivering fast load times and strong [multilingual SEO](https://generaltranslation.com/en-US/blog/multilingual-nextjs-seo).

## GT Features Used

- `<T>` — JSX translation
- `getGT` — Server-side string translations
- `<LocaleSelector>` — Language picker
- `loadTranslations` — Local translation storage
- MDX content translation via `gtx-cli`

## Getting Started

```bash
git clone https://github.com/gt-examples/blog-platform.git
cd blog-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

- [Next.js](https://nextjs.org)
- [General Translation](https://generaltranslation.com) (gt-next)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com/)
