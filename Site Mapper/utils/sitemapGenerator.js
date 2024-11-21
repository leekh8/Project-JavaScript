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
    try {
      await page.goto(url, { waitUntil: "networkidle2" });
    } catch (error) {
      console.error("URL 로드 실패:", error.message);
      throw new Error(
        "URL을 로드하는 중 문제가 발생했습니다. 유효한 URL인지 확인해주세요."
      );
    }
    const html = await page.content();
    await browser.close();

    // HTML 파싱
    const $ = cheerio.load(html);
    const baseURL = new URL(url);
    const visited = new Set();

    $("a[href]").each((_, element) => {
      let link = $(element).attr("href")?.trim();
      if (!link) return;

      if (link.startsWith("/") || !link.startsWith("http")) {
        link = new URL(link, baseURL).href;
      }

      const linkURL = new URL(link);
      if (linkURL.hostname === baseURL.hostname && !visited.has(link)) {
        visited.add(link);
      }
    });

    if (visited.size === 0) {
      throw new Error("수집할 링크가 없습니다. 페이지를 확인해주세요.");
    }

    // 사이트맵 생성
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    visited.forEach((link) => {
      sitemap += `
      <url>
        <loc>${link}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`;
    });
    sitemap += `</urlset>`;

    // 저장 디렉토리 설정
    const dirPath = path.resolve("public");
    await fs.mkdir(dirPath, { recursive: true });
    console.log("생성된 디렉토리:", dirPath);

    // 파일 저장
    const filePath = path.join(dirPath, `sitemap-${Date.now()}.xml`);

    await fs.writeFile(filePath, sitemap);

    return { sitemap, filePath };
  } catch (error) {
    console.error("사이트맵 생성 실패:", error.message);
    throw new Error("사이트맵 생성에 실패했습니다.");
  }
};
