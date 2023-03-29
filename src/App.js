import CreateQuiz from "./components/createQuiz/CreateQuiz";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import EditQuiz from "./components/Edit/EditQuiz";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/edit" element={<EditQuiz />} />
      </Routes>
    </>
  );
}

export default App;
