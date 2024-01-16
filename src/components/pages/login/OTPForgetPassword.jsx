import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../../redux/auth/actions/userAction";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function useRefsArray() {
  return [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
}

function OTPForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendOtpForgetPasswordData = useSelector(
    (state) => state.user.sendOtpForgetPassword
  );
  const forgetPasswordData = useSelector((state) => state.user.forgetPassword);
  const inputRefs = useRefsArray();

  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);

  // Error Handling
  const [errors, setErrors] = useState(null);

  const { isLoading, response } = forgetPasswordData;

  useEffect(() => {
    if (!sendOtpForgetPasswordData.response) {
      navigate("/auth/forget-password");
    }

    if (!isLoading && response) {
      if (response.success) {
        setErrors(null);
        navigate("/auth/sign-in");
      } else {
        response.errors
          ? setErrors(response.errors)
          : setErrors([{ msg: response.message }]);
      }
    }
  }, [isLoading, response, sendOtpForgetPasswordData, navigate]);

  useEffect(() => {
    const handleInput = (index) => {
      if (inputRefs[index].current.value.length === 1 && inputRefs[index + 1]) {
        inputRefs[index + 1].current.focus();
      }

      if (inputRefs[index].current.value.length === 0 && inputRefs[index - 1]) {
        inputRefs[index - 1].current.focus();
      }
    };

    // Add event listeners for each input element
    inputRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.addEventListener("keyup", function (event) {
          if (event.key === "Backspace") {
            handleInput(index);
          }
        });
        ref.current.addEventListener("input", function () {
          handleInput(index);
        });
      }
    });

    return () => {
      // Clean up event listeners
      inputRefs.forEach((ref, index) => {
        if (ref.current) {
          ref.current.addEventListener("keyup", function (event) {
            if (event.key === "Backspace") {
              handleInput(index);
            }
          });
          ref.current.removeEventListener("input", function () {
            handleInput(index);
          });
        }
      });
    };
  }, [inputRefs]);

  const handleFocus = (e) => {
    e.target.value = "";
    const index = parseInt(e.target.name, 10) - 1;
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleChange = (e) => {
    const index = parseInt(e.target.name, 10) - 1;
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAllFieldsFilled = inputValues.every((value) => value.length === 1);
    if (isAllFieldsFilled) {
      const userOtp = inputValues.join("");
      const { user } = sendOtpForgetPasswordData.response;
      if (user) {
        const data = {
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
          otp: userOtp,
        };
        dispatch(forgetPassword(data));
      }
    }
  };

  const closeErrorDialogue = () => {
    setErrors(null);
  };

  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="md:px-10 md:py-14 sm:px-5 sm:py-5 p-3 py-5">
            <div className="relative custom-background w-fit mx-auto">
              <div className="bg-primary p-3 sm:p-5 md:p-8 w-fit rounded-md text-white">
                <div className="flex flex-col gap-y-3 md:gap-y-5">
                  <p className="text-sm text-white/[0.7] text-center">
                    We sent a verification code on your{" "}
                    <Link
                      to="https://mail.google.com/mail/u/0/#search/snippet+sphere"
                      target="_blank"
                      className="text-light-purple font-semibold"
                    >
                      Gmail
                    </Link>
                  </p>
                  <div
                  className={`${
                    errors ? "" : "-z-50"
                  } border border-white ease-in duration-700 p-5 pt-20 text-center absolute top-0 left-0 h-full w-full text-red-600 bg-primary/[0.7] p-2 rounded-md`}
                >
                  {errors && <div>
                    <span
                      onClick={closeErrorDialogue}
                      className="cursor-pointer active:scale-90 bg-[#fdeded] p-[3px] pt-[2px] text-primary absolute top-5 right-5 rounded"
                    >
                      <CloseIcon />
                    </span>
                    {
                      errors.map((err, index) => {
                        return <Alert key={index} severity="error">{err.msg}</Alert>
                      })
                    }
                  </div>}
                </div>
                  <h1 className="text-3xl md:text-4xl font-semibold text-center">
                    Confirm your email
                  </h1>
                  <div className="mt-3 md:mt-5">
                    <form className="mb-5" onSubmit={handleSubmit}>
                      <div className="flex justify-between">
                        <input
                          className="w-[35px] h-[40px] sm:w-[50px] sm:h-[60px] rounded sm:rounded-md bg-primary outline-none border border-[#404040] text-center text-xl md:text-3xl focus:border-[#f2f2f2]"
                          maxLength="1"
                          autoFocus
                          type="text"
                          name="1"
                          ref={inputRefs[0]}
                          onFocus={handleFocus}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <input
                          className="w-[35px] h-[40px] sm:w-[50px] sm:h-[60px] rounded sm:rounded-md bg-primary outline-none border border-[#404040] text-center text-xl md:text-3xl focus:border-[#f2f2f2]"
                          maxLength="1"
                          type="text"
                          name="2"
                          ref={inputRefs[1]}
                          onFocus={handleFocus}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <input
                          className="w-[35px] h-[40px] sm:w-[50px] sm:h-[60px] rounded sm:rounded-md bg-primary outline-none border border-[#404040] text-center text-xl md:text-3xl focus:border-[#f2f2f2]"
                          maxLength="1"
                          type="text"
                          name="3"
                          ref={inputRefs[2]}
                          onFocus={handleFocus}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <input
                          className="w-[35px] h-[40px] sm:w-[50px] sm:h-[60px] rounded sm:rounded-md bg-primary outline-none border border-[#404040] text-center text-xl md:text-3xl focus:border-[#f2f2f2]"
                          maxLength="1"
                          type="text"
                          name="4"
                          ref={inputRefs[3]}
                          onFocus={handleFocus}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <input
                          className="w-[35px] h-[40px] sm:w-[50px] sm:h-[60px] rounded sm:rounded-md bg-primary outline-none border border-[#404040] text-center text-xl md:text-3xl focus:border-[#f2f2f2]"
                          maxLength="1"
                          type="text"
                          name="5"
                          ref={inputRefs[4]}
                          onFocus={handleFocus}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <input
                          className="w-[35px] h-[40px] sm:w-[50px] sm:h-[60px] rounded sm:rounded-md bg-primary outline-none border border-[#404040] text-center text-xl md:text-3xl focus:border-[#f2f2f2]"
                          maxLength="1"
                          type="text"
                          name="6"
                          ref={inputRefs[5]}
                          onFocus={handleFocus}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>
                      <div className="text-center mt-5">
                        <div className="w-full linear-gradient-button">
                          {isLoading ? (
                            <button
                            disabled
                              type="submit"
                              className="button-gradient w-full"
                            >
                              <CircularProgress
                                size={20}
                                sx={{ color: "white" }}
                              />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="button-gradient w-full"
                            >
                              Verify OTP
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* <p className="text-sm text-white/[0.7] text-center">
                    Didn't receive an OTP?{" "}
                    <Link className="text-blue-500 border-b border-blue-500">
                      Resend
                    </Link>
                  </p> */}
                  <p className="text-sm text-white/[0.7] text-center">
                    Wrong Email?{" "}
                    <a
                      href="/auth/sign-up"
                      className="text-blue-500 border-b border-blue-500"
                    >
                      Click here to start over
                    </a>
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

export default OTPForgetPassword;
