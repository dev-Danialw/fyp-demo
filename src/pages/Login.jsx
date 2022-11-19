import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center py-20">
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Login
            </h1>
          </div>
          {/* input fields */}
          <div className="space-y-4">
            <input
              required
              type="email"
              placeholder="Email Addres"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
            <input
              required
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
          </div>

          {/* submit btn */}
          {!isPending && (
            <div className="text-center mt-6">
              <button className="btn-outline py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
                Login
              </button>
            </div>
          )}

          {isPending && (
            <div className="text-center mt-6">
              <button
                className="btn-outline py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
                disabled
              >
                Loading...
              </button>
            </div>
          )}

          {error && (
            <div className="alert alert-error shadow-lg mt-4 justify-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
    //   <p className="mt-4 text-sm">
    // Already Have An Account?{" "}
    // <span className="underline cursor-pointer"> Sign In</span>
    //  </p>
  );
}
