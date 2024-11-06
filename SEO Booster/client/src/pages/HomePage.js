import React from "react";
import Header from "../components/Header";
import MarkdownEditor from "../components/Editor";
import GlobalStyles from "../styles/GlobalStyles";

const HomePage = () => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <MarkdownEditor />
    </div>
  );
};

export default HomePage;
