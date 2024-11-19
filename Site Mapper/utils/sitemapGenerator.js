import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";

export const generateSitemapXML = async (url) => {
  try {
    // sitemap.xml 파일 가져오기 시도
    try {
      const sitemapResponse = await axios.get(`${url}/sitemap.xml`);
      return sitemapResponse.data; // 기존 sitemap.xml이 있으면 그대로 반환
    } catch (e) {
      console.warn(
        "기존 sitemap.xml을 찾을 수 없습니다. 직접 수집을 시도합니다."
      );
    }

    // Puppeteer로 HTML 데이터 수집
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> `;

    const baseURL = new URL(url);
    const visited = new Set(); // 중복 링크 방지를 위한 Set

    $("a[href]").each((_, element) => {
      let link = $(element).attr("href").trim();
      if (link.startsWith("/") || !link.startsWith("http")) {
        link = new URL(link, baseURL).href; // 상대 경로를 절대 경로로 변환
      }

      // baseURL과 동일한 도메인만 포함
      const linkURL = new URL(link);
      if (linkURL.hostname === baseURL.hostname && !visited.has(link)) {
        visited.add(link);
        sitemap += `  <url>
        <loc>${link}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      `;
      }
    });

    if (visited.size === 0) {
      throw new Error(
        "수집할 수 있는 링크가 없습니다. 페이지가 올바른지 확인해 주세요."
      );
    }

    sitemap += `</urlset>`;
    return sitemap;
  } catch (error) {
    console.error("사이트맵 생성 실패:", error.message);
    throw new Error("사이트맵 생성 실패");
  }
};
