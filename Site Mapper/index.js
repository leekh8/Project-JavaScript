import express from "express";
import bodyParser from "body-parser";
import { generateSitemapXML } from "./utils/sitemapGenerator.js";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 세션 미들웨어 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET, // 보안을 위한 secret 키 설정
    resave: false,
    saveUninitialized: true,
  })
);

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// 정규 표현식 URL 유효성 검사
const urlPattern = new RegExp(
  "^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

// 메인 페이지 GET 요청
app.get("/", (req, res) => {
  const error = req.query.error;
  const sitemapGenerated = req.session.sitemap || null;

  res.render("index", { error, sitemapGenerated });
});

// 사이트맵 생성 POST 요청
app.post("/generate", async (req, res) => {
  const url = req.body.url;

  if (!url || !urlPattern.test(url)) {
    return res.redirect("/?error=올바른 URL을 입력해주세요.");
  }

  try {
    const sitemap = await generateSitemapXML(url);
    req.session.sitemap = sitemap; // 세션에 사이트맵 저장
    res.redirect(`/`);
  } catch (err) {
    console.error(err);
    if (err.message.includes("ENOTFOUND")) {
      res.redirect(
        "/?error=해당 URL을 찾을 수 없습니다. 올바른 URL인지 확인해 주세요."
      );
    } else {
      // 기본 사이트 정보 추가
      req.session.sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
      res.redirect(
        "/?error=사이트맵 생성 중 일부 오류가 발생했습니다. 기본 정보가 추가되었습니다."
      );
    }
  }
});

// 사이트맵 다운로드 GET 요청
app.get("/download", (req, res) => {
  const sitemap = req.session.sitemap;
  if (!sitemap) {
    return res.redirect("/?error=다운로드할 데이터가 없습니다.");
  }

  res.setHeader("Content-Disposition", 'attachment; filename="sitemap.xml"');
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemap);
});

// 사용 가이드 페이지
app.get("/guide", (req, res) => {
  res.render("guide");
});

// 연락처 페이지
app.get("/contact", (req, res) => {
  res.render("contact");
});

// FAQ 페이지
app.get("/faq", (req, res) => {
  res.render("faq");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
