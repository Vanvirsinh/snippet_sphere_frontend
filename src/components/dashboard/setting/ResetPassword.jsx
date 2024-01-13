import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../redux/auth/actions/userAction";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import ErrorMsg from "../../Alert/ErrorMsg";

function ResetPassword() {
  const dispatch = useDispatch();
  const resetPasswordData = useSelector((state) => state.user.resetPassword);
  const [data, setData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const { isLoading, response } = resetPasswordData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setMessage(response.message);
        setErrMessage(null);
      } else {
        setErrMessage(response.message);
        setMessage(null);
        if (response.errors) {
          setErrors(response.errors);
          setTimeout(() => {
            setErrors(null);
          }, 3000);
        }
      }
    }
  }, [isLoading, response]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("user-token");
    const isValid = Object.values(data).every((val) => val !== "");
    if (!isValid) {
      setErrMessage("Fill out all the fields!");
    } else {
      if (token) {
        dispatch(resetPassword({ token, data }));
      } else {
        setErrMessage("You're not authenticated!");
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col gap-y-5">
          <h1 className="text-white text-lg">Reset Password</h1>
          <form
            onSubmit={handleSubmit}
            className="text-white/[0.7] flex flex-col gap-y-5"
          >
            <div className="flex flex-col gap-y-1 w-96">
              <label htmlFor="email" className="text-xs">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Type your email"
                className="p-3 rounded w-full bg-primary border-2 border-secondary text-sm"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-1 w-96">
              <label htmlFor="password" className="text-xs">
                Current Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Type your password"
                className="p-3 rounded w-full bg-primary border-2 border-secondary text-sm"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-1 w-96">
              <label htmlFor="newPassword" className="text-xs">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Type your password"
                className="p-3 rounded w-full bg-primary border-2 border-secondary text-sm"
                onChange={handleChange}
              />
              <ErrorMsg errors={errors} path="newPassword" />
            </div>
            <div className="flex flex-col gap-y-1 w-96">
              <label htmlFor="confirmNewPassword" className="text-xs">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Type your password"
                className="p-3 rounded w-full bg-primary border-2 border-secondary text-sm"
                onChange={handleChange}
              />
            </div>
            <div className="linear-gradient-button">
              {isLoading ? (
                <button disabled className="button-gradient w-full">
                  <CircularProgress size={20} sx={{ color: "white" }} />
                </button>
              ) : (
                <button type="submit" className="button-gradient w-full">
                  Reset Password
                </button>
              )}
            </div>
            {message && <p className="text-center text-green-400">{message}</p>}
            {errMessage && (
              <p className="text-center text-red-400">{errMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
