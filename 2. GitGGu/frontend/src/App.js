// import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <body>
          <Routes>
            <Route path="/" exact Component={MainPage} />
            <Route path="/editor" exact Component={Editor} />
          </Routes>
        </body>
        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
