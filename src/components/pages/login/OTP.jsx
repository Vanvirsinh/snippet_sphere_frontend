import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/auth/actions/userAction";
import { AlertBox, alertStyle } from "../../Alert/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from 'js-cookie';

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

function OTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);
  const inputRefs = useRefsArray();

  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);

  // Error Handling
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    if(!state.otp.user) {
      navigate('/auth/sign-in');
    }

    if (state.user.response) {
      if (state.user.response.success) {
        setErrors(null);
        Cookies.set('user-token', state.user.response.token, { expires: 30 });
        window.location.assign('/');
      }

      if (!state.user.response.success) {
        if (state.user.response.errors) {
          setErrors(state.response.errors);
          setTimeout(() => {
            setErrors(null);
          }, 3000);
        } else {
          setErrors([{ msg: state.user.response.message }]);
          setTimeout(() => {
            setErrors(null);
          }, 3000);
        }
      }
    }
  }, [state, navigate]);

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
      if (state.otp.user) {
        const data = {
          name: state.otp.user.name,
          username: state.otp.user.username,
          email: state.otp.user.email,
          password: state.otp.user.password,
          otp: userOtp,
        };
        dispatch(registerUser(data));
      }
    }
  };

  const handleClose = () => {
    setErrors(null);
  };

  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="md:px-10 md:py-14 sm:px-5 sm:py-5 p-3 py-5">
            <div className="custom-background w-fit mx-auto">
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
                  <h1 className="text-3xl md:text-4xl font-semibold text-center">
                    Confirm your email
                  </h1>
                  <div className="mt-3 md:mt-5">
                    <form className="mb-5" onSubmit={handleSubmit}>
                      <div className="flex justify-between">
                        <input
                          className="w-[35px] h-[40px] sm:w-[50px] sm:h-[60px] rounded sm:rounded-md rounded-md bg-primary outline-none border border-[#404040] text-center text-xl md:text-3xl focus:border-[#f2f2f2]"
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
                          {state.user.isLoading ? (
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

export default OTP;
