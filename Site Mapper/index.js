import express from "express";
import bodyParser from "body-parser";
import { generateSitemapXML } from "./utils/sitemapGenerator.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));

// 메인 페이지 GET 요청
app.get("/", (req, res) => {
  const error = req.query.error;
  const sitemapGenerated = req.query.sitemap;

  let errorHtml = "";
  let sitemapHtml = "";

  if (error) {
    errorHtml = `<div class="alert">${error}</div>`;
  }

  if (sitemapGenerated) {
    sitemapHtml = `
      <div class="mt-4">
        <h5 class="text-success">사이트맵 결과:</h5>
        <textarea class="form-control" rows="10" readonly style="resize: none;">${sitemapGenerated}</textarea>
        <div class="mt-3">
          <a href="/download?data=${encodeURIComponent(
            sitemapGenerated
          )}" class="btn btn-success">사이트맵 다운로드</a>
        </div>
      </div>`;
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Site Mapper</title>
      <link rel="stylesheet" href="/styles.css" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <script>
        function validateForm() {
          const urlInput = document.getElementById("url").value;
          const urlPattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", // fragment locator
            "i"
          );
          if (!urlPattern.test(urlInput)) {
            alert("올바른 URL을 입력해 주세요.");
            return false;
          }
          return true;
        }
    </script>

    <script>
      function showLoading() {
        document.getElementById("loading").style.display = "block";
      }
    </script>

    </head>
    <body class="bg-light">
      <div class="container mt-5 p-5 bg-white rounded shadow">
        <h1 class="text-center text-primary mb-4">Site Mapper</h1>
<div id="loading" style="display: none;" class="text-center">
  <p>사이트맵을 생성 중입니다. 잠시만 기다려 주세요...</p>
  <div class="spinner"></div>
</div>
        <!-- URL 입력 폼 -->
        <form action="/generate" method="post" class="mb-3" onsubmit="showLoading(); return validateForm();">
          <div class="mb-3">
            <label for="url" class="form-label">웹 사이트 URL:</label>
            <input
              type="url"
              class="form-control form-control-lg"
              id="url"
              name="url"
              placeholder="예: https://example.com"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-100">
            사이트맵 생성
          </button>
          <button type="button" onclick="window.location.href='/'" class="btn btn-secondary btn-lg w-100 mt-2">
          초기화
          </button>
        </form>
        ${errorHtml}
        ${sitemapHtml}
      </div>
    </body>
    </html>
  `);
});

// 사이트맵 생성 POST 요청
app.post("/generate", async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.redirect("/?error=URL을 입력해주세요.");
  }

  try {
    const sitemap = await generateSitemapXML(url);
    res.redirect(`/?sitemap=${encodeURIComponent(sitemap)}`);
  } catch (err) {
    console.error(err);
    res.redirect("/?error=사이트맵 생성 중 오류가 발생했습니다.");
  }
});

// 사이트맵 다운로드 GET 요청
app.get("/download", (req, res) => {
  const data = req.query.data;
  if (!data) {
    return res.redirect("/?error=다운로드할 데이터가 없습니다.");
  }

  res.setHeader("Content-Disposition", 'attachment; filename="sitemap.xml"');
  res.setHeader("Content-Type", "application/xml");
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
