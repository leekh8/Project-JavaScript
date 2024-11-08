import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { generateSeoTags, analyzeSeoImprovements } from "../utils/seoHelper";
import KeywordHighlighter from "./KeywordHighlighter";
import SEOAnalyzer from "./SEOAnalyzer";

const MarkdownEditor = () => {
  const [content, setContent] = useState("");
  const [seoSuggestions, setSeoSuggestions] = useState([]);
  const keywords = ["SEO", "React", "content"];

  const handleChange = (value) => {
    setContent(value);
    const seoTags = generateSeoTags(value);
    setSeoSuggestions(analyzeSeoImprovements(seoTags));
  };

  useEffect(() => {
    const saveContent = () => {
      localStorage.setItem("markdownContent", content);
    };
    const interval = setInterval(saveContent, 5000);
    return () => clearInterval(interval);
  }, [content]);

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleChange}
        theme="snow"
        placeholder="Start writing your markdown..."
      />
      <div>
        <h3>Markdown Preview:</h3>
        <KeywordHighlighter content={content} keywords={keywords} />
      </div>
      <div>
        <h3>SEO 개선점:</h3>
        <SEOAnalyzer content={content} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
