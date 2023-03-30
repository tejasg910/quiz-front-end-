import CreateQuiz from "./components/createQuiz/CreateQuiz";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import EditQuiz from "./components/Edit/EditQuiz";
import StartQuiz from "./components/start/SrartQuiz";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/edit" element={<EditQuiz />} />

        <Route path="/start" element={<StartQuiz />} />
      </Routes>
    </>
  );
}

export default App;
