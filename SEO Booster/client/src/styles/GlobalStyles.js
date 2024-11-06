import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    background-color: #F0F4F8; /* Background Color 적용 */
    color: #333333; /* 기본 텍스트 색상 */
  }

  h1, h2, h3, h4, h5, h6 {
    color: #0077B6; /* Primary Color for headers */
  }

  a {
    color: #00B4D8; /* Secondary Color for links */
    text-decoration: none;
  }

  button {
    background-color: #FFB703; /* Accent Color for buttons */
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #FFA500; /* Hover 색상 변경 */
    }
  }

  /* Markdown Preview Styling */
  .markdown-preview {
    color: #333333;
    background-color: #FFFFFF;
    padding: 1em;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default GlobalStyles;
