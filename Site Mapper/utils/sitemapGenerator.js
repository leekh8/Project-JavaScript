import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";

export const generateSitemapXML = async (url) => {
  try {
    // 기존 sitemap.xml 확인
    try {
      const sitemapResponse = await axios.get(`${url}/sitemap.xml`);
      return sitemapResponse.data; // 기존 sitemap.xml 반환
    } catch {
      console.warn("기존 sitemap.xml을 찾을 수 없습니다. 직접 생성합니다.");
    }

    // Puppeteer로 HTML 데이터 수집
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const baseURL = new URL(url);
    const visited = new Set();

    $("a[href]").each((_, element) => {
      let link = $(element).attr("href").trim();
      if (link.startsWith("/") || !link.startsWith("http")) {
        link = new URL(link, baseURL).href;
      }

      const linkURL = new URL(link);
      if (linkURL.hostname === baseURL.hostname && !visited.has(link)) {
        visited.add(link);
        sitemap += `  <url>
        <loc>${link}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`;
      }
    });

    if (visited.size === 0) {
      throw new Error("수집할 링크가 없습니다. 페이지를 확인해주세요.");
    }

    sitemap += `</urlset>`;

    // 파일로 저장 (서버의 임시 디렉토리)
    const filePath = path.resolve("sitemaps", `sitemap-${Date.now()}.xml`);
    await fs.writeFile(filePath, sitemap);

    return { sitemap, filePath }; // XML과 파일 경로 반환
  } catch (error) {
    console.error("사이트맵 생성 실패:", error.message);
    throw new Error("사이트맵 생성에 실패했습니다.");
  }
};
