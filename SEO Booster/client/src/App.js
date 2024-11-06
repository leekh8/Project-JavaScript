import React from "react";
import MarkdownEditor from "./components/Editor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <MarkdownEditor />
      </main>
      <Footer />
    </div>
  );
}

export default App;
