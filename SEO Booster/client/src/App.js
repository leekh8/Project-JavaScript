import React from "react";
import HomePage from "./pages/HomePage";
import SEOAnalyzer from "./components/SEOAnalyzer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main>
        <HomePage />
        {/* <SEOAnalyzer /> */}
      </main>
    </div>
  );
}

export default App;
