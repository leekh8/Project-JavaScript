import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MarkdownEditor = () => {
  const [content, setContent] = useState("");

  const handleChange = (value) => {
    setContent(value);
  };

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
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
