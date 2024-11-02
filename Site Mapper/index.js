import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs"); // 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // Bootstrap 사용 설정
app.use(express.urlencoded({ extended: true })); // 폼 데이터 처리 설정

app.get("/", (req, res) => {
  res.render("index", { sitemap: null, error: null }); // 초기 화면
});

app.post("/generate", async (req, res) => {
  const baseUrl = req.body.url;

  try {
    const response = await fetch(baseUrl);
    if (response.status !== 200) {
      throw new Error("웹사이트에 접속할 수 없습니다.");
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const pages = $("a")
      .map((i, el) => {
        const href = $(el).attr("href");
        if (href && href.startsWith("/") && !href.startsWith("//")) {
          // 상대 경로를 절대 경로로 변환
          const absoluteUrl = new URL(href, baseUrl).href;
          if (absoluteUrl.startsWith(baseUrl)) {
            // 내부 링크만 크롤링
            return { url: absoluteUrl };
          }
        }
      })
      .get();

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    pages.forEach((page) => {
      sitemap += "<url>";
      sitemap += `<loc>${baseUrl}${page.url}</loc>`;
      sitemap += `<lastmod>${new Date().toISOString()}</lastmod>`;
      sitemap += "</url>";
    });
    sitemap += "</urlset>";

    res.render("index", { sitemap, error: null });
  } catch (error) {
    res.render("index", {
      sitemap: null,
      error: "URL을 가져오는 중 오류가 발생했습니다.",
    });
  }
});

app.listen(3000, () => {
  console.log(
    "서버 시작! http://localhost:3000/sitemap.xml 에서 사이트맵 확인"
  );
});
