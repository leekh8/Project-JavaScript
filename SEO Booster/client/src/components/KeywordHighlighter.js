// 사용자가 입력한 콘텐츠에서 주요 키워드를 강조 표시
import React from "react";

const KeywordHighlighter = ({ content, keywords }) => {
  const highlightedContent = keywords.reduce((acc, keyword) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    return acc.replace(regex, `<mark>$1</mark>`);
  }, content);

  return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
};

export default KeywordHighlighter;
