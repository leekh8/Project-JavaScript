export const generateSeoTags = (content) => {
  const title = extractTitle(content);
  const description = extractDescription(content);
  const keywords = extractKeywords(content);

  return {
    title,
    description,
    keywords,
  };
};

// 제목 추출 예시
const extractTitle = (content) => {
  const lines = content.split("\n");
  return lines[0].slice(0, 60); // 첫 번째 줄을 제목으로 가정하고 60자로 제한
};

// 설명 추출 예시
const extractDescription = (content) => {
  const lines = content.split("\n");
  return lines.slice(1, 3).join(" ").slice(0, 160); // 두 번째, 세 번째 줄을 설명으로 사용
};

// 키워드 추출 예시
const extractKeywords = (content) => {
  const commonWords = ["the", "is", "and"]; // 일반적인 단어는 제외
  const words = content
    .split(/\W+/)
    .filter((word) => word.length > 3 && !commonWords.includes(word));
  const keywordCount = {};

  words.forEach((word) => {
    keywordCount[word] = (keywordCount[word] || 0) + 1;
  });

  return Object.keys(keywordCount).slice(0, 5); // 상위 5개 키워드 반환
};

// src/utils/seoHelper.js

export const analyzeSeoImprovements = (seoTags) => {
  const improvements = [];

  // 제목 길이 점검
  if (seoTags.title.length > 60) {
    improvements.push("제목이 너무 깁니다. 60자 이내로 줄이세요.");
  }

  // 설명 길이 점검
  if (seoTags.description.length > 160) {
    improvements.push("메타 설명이 너무 깁니다. 160자 이내로 줄이세요.");
  }

  // 키워드 개수 점검
  if (seoTags.keywords.length < 3) {
    improvements.push("키워드가 부족합니다. 핵심 키워드를 추가해 보세요.");
  }

  return improvements;
};
