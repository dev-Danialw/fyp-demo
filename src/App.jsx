import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Reports from "./pages/Reports";
import Login from "./pages/Login";

import Inprogress from "./pages/Inprogress";
import Solved from "./pages/Solved";
import Discarded from "./pages/Discarded";

import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";

function App() {
  const { user, authIsReady } = useAuthContext();
  const { logout, isPending } = useLogout();

  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          {/* Top Bar */}
          <div className="navbar bg-base-100">
            <div className="flex-1 navbar-start">
              <p className="btn btn-ghost normal-case text-xl">
                ABBOTTABAD POLICE
              </p>
            </div>
            {/* <div className="navbar-center">
              <img className="w-10 rounded-full" src="./assets/logo.jpg" />
            </div> */}
            <div className="navbar-end flex-none">
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

          {/* Nav */}

          <div className="navbar bg-base-200 flex flex-row justify-center gap-10">
            <Link to="/reports" className="btn btn-ghost normal-case text-xl">
              Active Reports
            </Link>
            <Link
              to="/inprogress"
              className="btn btn-ghost normal-case text-xl"
            >
              Under Investigation
            </Link>
            <Link to="/solved" className="btn btn-ghost normal-case text-xl">
              Solved
            </Link>
            <Link to="/discarded" className="btn btn-ghost normal-case text-xl">
              Discarded
            </Link>
          </div>
          {/* Nav */}

          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Reports /> : <Navigate to="/login" />}
            />

            <Route
              exact
              path="/reports"
              element={user ? <Reports /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/inprogress"
              element={user ? <Inprogress /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/solved"
              element={user ? <Solved /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/discarded"
              element={user ? <Discarded /> : <Navigate to="/login" />}
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
