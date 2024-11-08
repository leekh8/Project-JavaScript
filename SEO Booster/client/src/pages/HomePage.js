import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MarkdownEditor from "../components/Editor";
import GlobalStyles from "../styles/GlobalStyles";

const HomePage = () => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <MarkdownEditor />
      <Footer />
    </div>
  );
};

export default HomePage;
