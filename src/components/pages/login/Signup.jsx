import React, { useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../../redux/auth/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { getUser } from "../../../redux/auth/actions/userAction";
import ErrorMsg from "../../Alert/ErrorMsg";
import Cookies from "js-cookie";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user.otp);
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Error Handling
  const [errors, setErrors] = useState(null);
  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
    const token = Cookies.get("user-token");
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch]);

  const authUser = useSelector((state) => state.user.authUser);
  const { user, isLoading } = authUser;

  useEffect(() => {
    if (state.message) {
      const { message } = state;
      if (message.success) {
        setErrors(null);
        navigate(`/auth/email-verification`);
      } else {
        const errorsToSet = message.errors
          ? message.errors
          : [{ msg: message.message }];
        setErrors(errorsToSet);
      }
    }
  }, [state, navigate]);

  useEffect(() => {
    if (!isLoading && user) {
      if(user.success) {
        navigate(`/${user.user.username}`);
      }
    }
  }, [authUser, isLoading, navigate, user]);

  const handleChange = (e) => {
    const formFilled = Object.values(data).every((value) => value.length > 1);
    setFormFilled(formFilled);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOtp(data));
  };

  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="px-10 py-14">
            {isLoading ? (
              <div className="h-[500px]">Loading...</div>
            ) : (
              <div>
                {user && user.success ? (
                  <div className="h-[500px]"></div>
                ) : (
                  <div className="custom-background w-fit mx-auto">
                    <div className="bg-primary p-8 w-fit rounded-md text-white">
                      <p className="text-sm text-white/[0.7] text-center">
                        Create an account with
                      </p>
                      <h1 className="mt-5 mb-10 text-4xl font-semibold text-center">
                        Snippet Sphere
                      </h1>
                      <form
                        className="flex flex-col gap-y-5 w-96 text-white"
                        onSubmit={handleSubmit}
                      >
                        <div>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                            name="name"
                            placeholder="Enter your name..."
                            onChange={handleChange}
                            value={data.name}
                            autoComplete="off"
                            autoFocus
                          />
                          {errors && <ErrorMsg errors={errors} path="name" />}
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                            name="username"
                            placeholder="Enter your username..."
                            onChange={handleChange}
                            value={data.username}
                            autoComplete="off"
                          />
                          {errors && (
                            <ErrorMsg errors={errors} path="username" />
                          )}
                        </div>
                        <div className="">
                          <input
                            type="email"
                            className="w-full px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                            name="email"
                            placeholder="Enter your email..."
                            onChange={handleChange}
                            value={data.email}
                          />
                          {errors && <ErrorMsg errors={errors} path="email" />}
                        </div>
                        <div>
                          <input
                            type="password"
                            className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] w-full focus:border-[#f2f2f2]"
                            name="password"
                            placeholder="Enter your password..."
                            onChange={handleChange}
                            value={data.password}
                            autoComplete="off"
                          />
                          {errors && (
                            <ErrorMsg errors={errors} path="password" />
                          )}
                        </div>
                        <div
                          className={`linear-gradient-button ${
                            formFilled ? "" : "opacity-50"
                          }`}
                        >
                          {state.isLoading ? (
                            <button
                              disabled
                              type="submit"
                              className="text-white button-gradient w-full"
                            >
                              <CircularProgress
                                size={20}
                                sx={{ color: "white" }}
                              />
                            </button>
                          ) : (
                            <span>
                              {formFilled ? (
                                <button
                                  type="submit"
                                  className="text-white button-gradient w-full"
                                >
                                  Register
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  disabled
                                  className="text-white button-gradient w-full opacity-50"
                                >
                                  Register
                                </button>
                              )}
                            </span>
                          )}
                        </div>
                      </form>
                      <p className="text-sm mt-10 text-center">
                        Already have an account?{" "}
                        <Link
                          to="/auth/sign-in"
                          className="text-blue-500 border-b border-blue-500"
                        >
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
