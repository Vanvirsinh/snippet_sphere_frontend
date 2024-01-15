import React, { useState, useEffect } from "react";
import "./auth.css";
import ErrorMsg from "../../Alert/ErrorMsg";
import { Link, useNavigate } from "react-router-dom";
import { sendOtpForgetPassword } from "../../../redux/auth/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendOtpForgetPasswordData = useSelector(
    (state) => state.user.sendOtpForgetPassword
  );
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error Handling
  const [errors, setErrors] = useState(null);
  const [formFilled, setFormFilled] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const { isLoading, response } = sendOtpForgetPasswordData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setErrors(null);
        navigate("/auth/forget-password/email-verification");
      } else {
        response.errors
          ? setErrors(response.errors)
          : setGeneralError(response.message);
      }
    }
  }, [isLoading, response, navigate]);

  const handleChange = (e) => {
    const formFilled = Object.values(data).every((value) => value.length > 1);
    setFormFilled(formFilled);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOtpForgetPassword(data));
  };

  const closeErrorDialogue = () => {
    setGeneralError(null);
  };

  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="md:px-10 md:py-14 sm:px-5 sm:py-5 p-3 py-5">
            <div>
              <div className="relative custom-background w-fit mx-auto">
                <div className="bg-primary p-3 sm:p-5 md:p-8 w-fit rounded-md text-white">
                  <p className="text-sm text-white/[0.7] text-center">
                    We'll send you an OTP to your email
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
                    Forget Password
                  </h1>
                  <form
                    className="flex flex-col gap-y-5 sm:w-96 text-white"
                    onSubmit={handleSubmit}
                  >
                    <div>
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
                      {errors && <ErrorMsg errors={errors} path="password" />}
                    </div>
                    <div>
                      <input
                        type="password"
                        className="px-4 py-3 rounded-md bg-primary outline-none border border-[#404040] placeholder:text-[#808080] w-full focus:border-[#f2f2f2]"
                        name="confirmPassword"
                        placeholder="Confirm your password..."
                        onChange={handleChange}
                        value={data.confirmPassword}
                        autoComplete="off"
                      />
                      {errors && (
                        <ErrorMsg errors={errors} path="confirmPassword" />
                      )}
                    </div>
                    <div
                      className={`linear-gradient-button ${
                        formFilled ? "" : "opacity-50"
                      }`}
                    >
                      {sendOtpForgetPasswordData.isLoading ? (
                        <button
                          disabled
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
                    Remember your password?{" "}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
