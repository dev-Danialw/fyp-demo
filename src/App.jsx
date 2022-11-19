import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Ownership from "./pages/Ownership";
import StolenMobiles from "./pages/StolenMobiles";
import Register from "./pages/Register";
import Report from "./pages/Report";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/ownership" element={<Ownership />} />
          <Route exact path="/stolen" element={<StolenMobiles />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/report" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
