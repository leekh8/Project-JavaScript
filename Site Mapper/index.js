import express from "express";
import bodyParser from "body-parser";
import { generateSitemapXML } from "./utils/sitemapGenerator.js";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs/promises";

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

  // 초기화 요청 시 세션 데이터 제거
  if (req.query.reset) {
    req.session.sitemap = null;
    req.session.sitemapPath = null;
  }

  // 세션 데이터에서 사이트맵 내용 가져오기
  const sitemapGenerated = req.session.sitemap || null;

  res.render("index", { error, sitemapGenerated });
});

// 사이트맵 생성 POST 요청
app.post("/generate", async (req, res) => {
  let url = req.body.url?.trim();

  // URL 기본값 처리
  if (!url || !urlPattern.test(url)) {
    return res.redirect("/?error=올바른 URL을 입력해주세요.");
  }

  // HTTP/HTTPS가 없는 경우 기본으로 추가
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  try {
    const { sitemap } = await generateSitemapXML(url);

    req.session.sitemap = sitemap; // 세션에 사이트맵 저장

    res.redirect("/?keep=true"); // 생성 후 메인 페이지로 리다이렉트
  } catch (err) {
    console.error(err);
    res.redirect("/?error=사이트맵 생성 중 오류가 발생했습니다.");
  }
});

// 사이트맵 다운로드 GET 요청
app.get("/download", async (req, res) => {
  const sitemap = req.session.sitemap;

  if (!sitemap) {
    return res.redirect("/?error=다운로드할 사이트맵이 없습니다.");
  }

  try {
    // 파일 저장 경로 설정
    const dirPath = path.resolve("public");
    await fs.mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, `sitemap-${Date.now()}.xml`);
    await fs.writeFile(filePath, sitemap); // 파일 저장

    res.download(filePath, "sitemap.xml", (err) => {
      if (err) {
        console.error("파일 다운로드 오류:", err.message);
        res.redirect("/?error=다운로드에 실패했습니다.");
      }
    });
  } catch (error) {
    console.error("다운로드 처리 실패:", error.message);
    res.redirect("/?error=다운로드 처리 중 문제가 발생했습니다.");
  }
});

// 사용 가이드 페이지
app.get("/guide", (req, res) => {
  res.render("guide");
});

// 연락처 페이지
app.get("/contact", (req, res) => {
  const error = req.query.error || null; // 쿼리로 전달된 오류 메시지
  const success = req.query.success || null; // 쿼리로 전달된 성공 메시지

  res.render("contact", { error, success });
});

// Feedback 처리
app.post("/submit-feedback", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message || message.length < 10) {
    return res.redirect(
      "/contact?error=올바른 이메일과 메시지를 입력해주세요."
    );
  }

  try {
    // Nodemailer 설정
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 이메일 전송
    await transporter.sendMail({
      from: email,
      to: "contact.us.universally.now@gmail.com",
      subject: `Site Mapper 피드백 from ${email}`,
      text: message,
    });

    res.redirect("/contact?success=피드백이 성공적으로 전송되었습니다!");
  } catch (error) {
    console.error(error);
    res.redirect("/contact?error=피드백 전송 중 문제가 발생했습니다.");
  }
});

// FAQ 페이지
app.get("/faq", (req, res) => {
  res.render("faq");
});

// 404 페이지
app.use((req, res) => {
  res.status(404).render("404");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
