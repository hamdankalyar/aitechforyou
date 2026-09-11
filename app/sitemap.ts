import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { publishedGitLessons } from "@/lib/git-learning";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aitechforyou.com";
  const staticPages = ["", "/articles", "/topics", "/about", "/learn/git", ...publishedGitLessons.map(lesson => lesson.href)].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticPages, ...articlePages];
}
