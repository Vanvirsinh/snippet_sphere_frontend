import React, { useEffect, useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth/actions/userAction";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.user);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [formFilled, setFormFilled] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const { response } = state;
    const success = response ? response.success : response;
    if (success) {
      Cookies.set("user-token", response.token, { expires: 30 });
      window.location.assign("/");
    } else if (success === false) {
      setErrors(response.message);
    }
  }, [state]);

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
    setErrors(null);
  };

  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="px-10 py-14">
            <div className="custom-background w-fit mx-auto relative overflow-hidden">
              <div className="bg-primary p-8 w-fit rounded-md text-white">
                <p className="text-sm text-white/[0.7] text-center">
                  Login to access the features of
                </p>
                <div className={`${errors? "": "-z-50"} border border-white ease-in duration-700 p-5 pt-20 text-center absolute top-0 left-0 h-full w-full text-red-600 bg-primary/[0.7] p-2 rounded-md`}>
                  <div>
                    <span onClick={closeErrorDialogue} className="cursor-pointer active:scale-90 bg-[#fdeded] p-[3px] pt-[2px] text-primary absolute top-5 right-5 rounded">
                      <CloseIcon />
                    </span>
                    <Alert severity="error">{errors}</Alert>
                  </div>
                </div>
                <h1 className="mt-5 mb-10 text-4xl font-semibold text-center">
                  Snippet Sphere
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-y-5 w-96 text-white"
                >
                  <input
                    type="email"
                    className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                    name="email"
                    placeholder="Enter your email..."
                    onChange={handleChange}
                    autoFocus
                    required
                  />
                  <div>
                    <input
                      type="password"
                      className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] w-full  focus:border-[#f2f2f2]"
                      name="password"
                      placeholder="Enter your password..."
                      onChange={handleChange}
                      required
                    />
                    <div className="mt-2 w-fit ml-auto">
                      <Link className="text-blue-500 text-sm border-b border-blue-500">
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
