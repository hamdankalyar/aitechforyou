import type { Article } from "@/lib/articles";

export const site = {
  name: "AI Tech For You",
  url: "https://aitechforyou.com",
  description: "Git, JavaScript, and AI explained through simple mental models, interactive examples, and honest learning notes.",
  author: { name: "Hamdan Kalyar", url: "https://github.com/hamdankalyar" },
  repo: "https://github.com/hamdankalyar/aitechforyou",
};

/** "Sep 11, 2026" → "2026-09-11" (schema.org and <time dateTime> want ISO). */
export function isoDate(date: string) {
  return new Date(`${date} UTC`).toISOString().slice(0, 10);
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const publisher = { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/brand/aitechforyou-mark.svg` } };
const author = { "@type": "Person", name: site.author.name, url: site.author.url };

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  publisher,
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleSchema(article: Article) {
  const url = `${site.url}/articles/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    datePublished: isoDate(article.date),
    dateModified: isoDate(article.date),
    author,
    publisher,
    about: article.topic,
    inLanguage: "en",
    isAccessibleForFree: true,
    ...(article.series && { isPartOf: { "@type": "CreativeWorkSeries", name: article.series.title }, position: article.series.order }),
  };
}

export function lessonSchema({ title, description, path }: { title: string; description: string; path: string }) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    image: `${site.url}/opengraph-image`,
    author,
    publisher,
    about: "Git",
    inLanguage: "en",
    isAccessibleForFree: true,
    isPartOf: { "@type": "Course", name: "Learn Git", url: `${site.url}/learn/git` },
  };
}
