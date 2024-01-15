import React, { useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth/actions/userAction";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { getUser } from "../../../redux/auth/actions/userAction";
import ErrorMsg from "../../Alert/ErrorMsg";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user.user);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [formFilled, setFormFilled] = useState(false);
  const [errors, setErrors] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  useEffect(() => {
    const { response } = state;
    if (response) {
      if (response.success) {
        Cookies.set("user-token", response.token, { expires: 30 });
        window.location.assign("/");
      } else {
        response.errors
          ? setErrors(response.errors)
          : setGeneralError([response.message]);
      }
    }
  }, [state]);

  useEffect(() => {
    const token = Cookies.get("user-token");
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch]);

  const authUser = useSelector((state) => state.user.authUser);
  const { user, isLoading } = authUser;

  useEffect(() => {
    if (!isLoading && user) {
      if (user.success) {
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
    dispatch(login(data));
  };

  const closeErrorDialogue = () => {
    setGeneralError(null);
  };

  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="md:px-10 md:py-14 sm:px-5 sm:py-5 p-3 py-5">
            <div className="custom-background w-fit mx-auto relative overflow-hidden">
              <div className="bg-primary p-3 sm:p-5 md:p-8 w-fit rounded-md text-white">
                <p className="text-sm text-white/[0.7] text-center">
                  Login to access the features of
                </p>
                <div
                  className={`${
                    generalError ? "" : "-z-50"
                  } border border-white ease-in duration-700 p-5 pt-20 text-center absolute top-0 left-0 h-full w-full text-red-600 bg-primary/[0.7] p-2 rounded-md`}
                >
                  <div>
                    <span
                      onClick={closeErrorDialogue}
                      className="cursor-pointer active:scale-90 bg-[#fdeded] p-[3px] pt-[2px] text-primary absolute top-5 right-5 rounded"
                    >
                      <CloseIcon />
                    </span>
                    <Alert severity="error">{generalError}</Alert>
                  </div>
                </div>
                <h1 className="mt-3 md:mt-5 mb-5 md:mb-10 text-3xl md:text-4xl font-semibold text-center">
                  Snippet Sphere
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-y-3 md:gap-y-5 sm:w-96 text-white"
                >
                  <div>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                      name="email"
                      placeholder="Enter your email..."
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                    {errors && <ErrorMsg errors={errors} path="email" />}
                  </div>
                  <div>
                    <input
                      type="password"
                      className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] w-full  focus:border-[#f2f2f2]"
                      name="password"
                      placeholder="Enter your password..."
                      onChange={handleChange}
                      required
                    />
                    {errors && <ErrorMsg errors={errors} path="password" />}
                    <div className="mt-2 w-fit ml-auto">
                      <Link to="/auth/forget-password" className="text-blue-500 text-sm border-b border-blue-500">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`linear-gradient-button ${
                      formFilled ? "" : "opacity-50"
                    }`}
                  >
                    {state.isLoading ? (
                      <button
                        type="submit"
                        className="text-white button-gradient w-full"
                        disabled
                      >
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      </button>
                    ) : (
                      <span>
                        {formFilled ? (
                          <button
                            type="submit"
                            className="text-white button-gradient w-full"
                          >
                            Sign In
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled
                            className="text-white button-gradient w-full opacity-50"
                          >
                            Sign In
                          </button>
                        )}
                      </span>
                    )}
                  </div>
                </form>
                <p className="text-sm mt-10 text-center">
                  Do not have an account yet?{" "}
                  <Link
                    to="/auth/sign-up"
                    className="text-blue-500 border-b border-blue-500"
                  >
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
