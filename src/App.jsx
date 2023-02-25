import "./App.css";
import Logo from "./assets/logo.png";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Login from "./pages/Login";

import Reports from "./pages/Reports";
import Inprogress from "./pages/Inprogress";
import Solved from "./pages/Solved";
import Discarded from "./pages/Discarded";
import NotSatisfied from "./pages/NotSatisfied";

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
          <div className="navbar bg-purple-900">
            <div className="flex-1 navbar-start">
              <p className="btn btn-ghost text-white normal-case text-xl">
                ABBOTTABAD POLICE
              </p>
            </div>
            <div className="navbar-center">
              <img className="w-14 rounded-full" src={Logo} alt="logo" />
            </div>
            <div className="navbar-end text-white">
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
          <div className="navbar bg-base-200 flex flex-row justify-center gap-20">
            <Link to="/reports" className="btn btn-ghost normal-case text-xl">
              Active Complaints
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
              Dismissed
            </Link>
            {user && user.uid === import.meta.env.VITE_REACT_ADMIN && (
              <Link
                to="/notsatisfied"
                className="btn btn-ghost normal-case text-xl"
              >
                Not Satisfied
              </Link>
            )}
          </div>
          {/* Nav */}

          <div className="flex justify-center">
            <img className="absolute -z-50 opacity-10" src={Logo} alt="" />
          </div>

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
            {user && user.uid === import.meta.env.VITE_REACT_ADMIN && (
              <Route
                exact
                path="/notsatisfied"
                element={user ? <NotSatisfied /> : <Navigate to="/login" />}
              />
            )}

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
