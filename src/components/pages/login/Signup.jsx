import React, { useEffect, useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../../redux/auth/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { AlertBox, alertStyle } from "../../Alert/Alert";

function Signup() {
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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (state.message && submitting) {
      const { message } = state;
      if (message.success) {
        setErrors(null);
        navigate(`/auth/email-verification`);
      } else {
        const errorsToSet = message.errors
          ? message.errors
          : [{ msg: message.message }];

        setErrors(errorsToSet);
        setTimeout(() => {
          setErrors(null);
        }, 3000);
      }
    }
  }, [state, navigate, submitting]);

  const handleChange = (e) => {
    const formFilled = Object.values(data).every((value) => value.length > 1);
    setFormFilled(formFilled);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch(sendOtp(data));
  };

  const handleClose = () => {
    setErrors(null);
  };

  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="px-10 py-14">
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
                  <input
                    type="text"
                    className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                    name="name"
                    placeholder="Enter your name..."
                    onChange={handleChange}
                    value={data.name}
                    autoComplete="off"
                    autoFocus
                  />
                  <input
                    type="text"
                    className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                    name="username"
                    placeholder="Enter your username..."
                    onChange={handleChange}
                    value={data.username}
                    autoComplete="off"
                  />
                  <input
                    type="email"
                    className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] focus:border-[#f2f2f2]"
                    name="email"
                    placeholder="Enter your email..."
                    onChange={handleChange}
                    value={data.email}
                  />
                  <input
                    type="password"
                    className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] w-full  focus:border-[#f2f2f2]"
                    name="password"
                    placeholder="Enter your password..."
                    onChange={handleChange}
                    value={data.password}
                    autoComplete="off"
                  />
                  <div
                    className={`linear-gradient-button ${
                      formFilled ? "" : "opacity-50"
                    }`}
                  >
                    {state.isLoading ? (
                      <button
                        type="submit"
                        className="text-white button-gradient w-full"
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
          </div>
          {errors ? (
            <div style={alertStyle}>
              <AlertBox handleClose={handleClose} errors={errors} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Signup;
