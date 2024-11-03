import axios from "axios";
import * as cheerio from "cheerio";

export const generateSitemapXML = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    $("a[href]").each((_, element) => {
      const link = $(element).attr("href");
      if (link.startsWith("http")) {
        sitemap += `  <url>
    <loc>${link}</loc>
  </url>
`;
      }
    });

    sitemap += `</urlset>`;
    return sitemap;
  } catch (error) {
    throw new Error("사이트맵 생성 실패");
  }
};
