// 사용자가 작성한 콘텐츠의 SEO 점수를 계산하고 개선사항을 제안
import React, { useEffect, useState } from "react";

const SEOAnalyzer = ({ content }) => {
  const [seoScore, setSeoScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const analyzeContent = () => {
      let score = 0;
      let suggestionsList = [];

      // 콘텐츠가 있는지 확인하여 기본 점수를 부여
      if (content.length > 0) {
        score += 10;
      } else {
        suggestionsList.push("Add more content to improve SEO.");
      }

      // 콘텐츠 길이에 따라 점수 계산
      if (content.split(" ").length > 300) {
        score += 30;
      } else {
        suggestionsList.push("Content should be at least 300 words.");
      }

      // 문장 다양성과 단어 사용에 대한 점수 계산
      const sentenceCount = content.split(/\.|\!|\?/).length;
      if (sentenceCount > 5) {
        score += 20;
      } else {
        suggestionsList.push("Add more sentences to make the content richer.");
      }

      const uniqueWords = new Set(content.split(/\W+/)).size;
      if (uniqueWords > 100) {
        score += 20;
      } else {
        suggestionsList.push(
          "Use a wider variety of words to improve content quality."
        );
      }

      setSeoScore(score);
      setSuggestions(suggestionsList);
    };

    analyzeContent();
  }, [content]);

  return (
    <div>
      <h3>SEO Score: {seoScore}/100</h3>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default SEOAnalyzer;
