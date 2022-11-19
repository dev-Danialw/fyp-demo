import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "./pages/Home";
import Ownership from "./pages/Ownership";
import StolenMobiles from "./pages/StolenMobiles";
import Register from "./pages/Register";
import Report from "./pages/Report";
import Login from "./pages/Login";

import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";

function App() {
  const { user, authIsReady } = useAuthContext();
  const { logout, isPending } = useLogout();

  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <div>
            <div className="navbar bg-base-100">
              <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                  Danial
                </Link>
              </div>
              <div className="flex-none">
                {!user && (
                  <Link to="/login" className="btn btn-square btn-ghost px-8">
                    Admin
                  </Link>
                )}

                {user && (
                  <div>
                    {!isPending && (
                      <button
                        className="btn btn-square btn-ghost px-8"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    )}

                    {isPending && (
                      <button className="btn btn-outline" disabled>
                        Logging out...
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/ownership" element={<Ownership />} />
            <Route exact path="/stolen" element={<StolenMobiles />} />
            <Route
              exact
              path="/register"
              element={user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/report"
              element={user ? <Report /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
