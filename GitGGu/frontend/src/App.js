// import "./App.css";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <p>Hello world</p>
        <Editor name="hai ~.~" />
        Learn React
      </header>
      <body>
        <MainPage />
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
