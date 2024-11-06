// 사용자가 작성한 콘텐츠의 SEO 점수를 계산하고 개선사항을 제안
import React, { useEffect, useState } from "react";

const SEOAnalyzer = ({ content }) => {
  const [seoScore, setSeoScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const analyzeContent = () => {
      let score = 0;
      let suggestionsList = [];

      if (content.includes("h1")) {
        score += 20;
      } else {
        suggestionsList.push("Add an H1 tag for better SEO.");
      }

      if (content.split(" ").length > 300) {
        score += 30;
      } else {
        suggestionsList.push("Content should be at least 300 words.");
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
