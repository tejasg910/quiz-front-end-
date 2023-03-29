import logo from "./logo.svg";
import "./App.css";
import CreateQuiz from "./components/createQuiz/CreateQuiz";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
      </Routes>
    </>
  );
}

export default App;
