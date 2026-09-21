import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { isoDate, site } from "@/lib/seo";
import { publishedGitLessons } from "@/topics/git/content/git-learning";
import { gitReferences } from "@/topics/git/content/git-references";

export default function sitemap(): MetadataRoute.Sitemap {
  // Newest article date stands in for "site last changed" so hub pages do not
  // claim a fresh lastModified on every crawl.
  const latest = new Date(Math.max(...articles.map(article => Date.parse(isoDate(article.date)))));
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: latest,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    page("/articles", 0.9, "weekly"),
    page("/learn/git", 0.9, "weekly"),
    page("/courses", 0.6),
    page("/courses/javascript", 0.9, "weekly"),
    page("/courses/react-native", 0.9, "weekly"),
    page("/about", 0.4),
    ...publishedGitLessons.map(lesson => page(lesson.href, 0.7)),
    ...gitReferences.filter(reference => reference.href !== "/learn/git/configure").map(reference => page(reference.href, 0.8)),
    ...articles.map(article => ({
      url: `${site.url}/articles/${article.slug}`,
      lastModified: new Date(isoDate(article.date)),
      changeFrequency: "monthly" as const,
      priority: article.featured ? 0.9 : 0.8,
    })),
  ];
}
