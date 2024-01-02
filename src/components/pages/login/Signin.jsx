import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="px-10 py-14">
            <div className="custom-background w-fit mx-auto">
              <div className="bg-primary p-8 w-fit rounded-md text-white">
                <p className="text-sm text-white/[0.7] text-center">
                  Login to access the features of
                </p>
                <h1 className="mt-5 mb-10 text-4xl font-semibold text-center">
                  Snippet Sphere
                </h1>
                <form className="flex flex-col gap-y-5 w-96 text-white">
                  <input
                    type="email"
                    className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                    name="email"
                    placeholder="Enter your email..."
                  />
                  <div>
                    <input
                      type="password"
                      className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] w-full  focus:border-[#f2f2f2]"
                      name="password"
                      placeholder="Enter your password..."
                    />
                    <div className="mt-2 w-fit ml-auto">
                      <Link className="text-blue-500 text-sm border-b border-blue-500">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div className="linear-gradient-button">
                    <button
                      type="submit"
                      className="text-white button-gradient w-full"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                <p className="text-sm mt-10 text-center">
                  Do not have an account yet?{" "}
                  <Link to="/auth/sign-up" className="text-blue-500 border-b border-blue-500">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
