import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GTProvider } from "gt-next";
import { getGT } from "gt-next/server";
import { T } from "gt-next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const gt = await getGT();
  const title = gt("Blog Platform | General Translation");
  const description = gt(
    "A multilingual MDX blog with SSG, SEO metadata, and locale routing powered by General Translation"
  );
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GTProvider>
          <div className="bg-emerald-900/30 border-b border-emerald-800/50">
            <div className="max-w-3xl mx-auto px-6 py-2 text-center">
              <p className="text-xs text-emerald-400/80">
                <T>
                  This is an example app built with{" "}
                  <a
                    href="https://generaltranslation.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-emerald-300"
                  >
                    General Translation
                  </a>
                  . View the{" "}
                  <a
                    href="https://github.com/gt-examples/blog-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-emerald-300"
                  >
                    source code on GitHub
                  </a>
                  .
                </T>
              </p>
            </div>
          </div>
          {children}
        </GTProvider>
      </body>
    </html>
  );
}
