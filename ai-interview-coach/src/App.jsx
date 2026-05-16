import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Login from "./pages/Login";
import History from "./pages/History";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/history" element={<History />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;