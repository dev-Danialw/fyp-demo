import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-20 h-screen w-screen">
      <div className="flex flex-col justify-center items-center gap-10">
        {/* Ownership */}
        <div>
          <Link to="/ownership" className="btn btn-lg p-20">
            Mobile Ownership
          </Link>
        </div>

        {/* register */}
        <div>
          <Link to="/register" className="btn btn-md">
            Register
          </Link>
        </div>
      </div>

      {/* Stolen */}
      <div className="flex flex-col justify-center items-center gap-10">
        <div>
          <Link to="/stolen" className="btn btn-lg p-20">
            Stolen Mobiles
          </Link>
        </div>

        {/* report */}
        <div>
          <Link to="/report" className="btn btn-md">
            Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
