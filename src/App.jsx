import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "./pages/Home";
import Ownership from "./pages/Ownership";
import StolenMobiles from "./pages/StolenMobiles";
import Register from "./pages/Register";
import Report from "./pages/Report";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              Danial
            </Link>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost px-8">Admin</button>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ownership" element={<Ownership />} />
        <Route exact path="/stolen" element={<StolenMobiles />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
