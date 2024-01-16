import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../../../redux/profile/profileAction";
import { CircularProgress } from "@mui/material";
import { createProfile } from "../../../redux/profile/profileAction";

function UpdateProfile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const [data, setData] = useState({
    name: "",
    headline: "",
    userImage: "",
    personalEmail: "",
    websiteUrl: "",
    gitHubProfile: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [dispatch, username]);

  useEffect(() => {
    const { isLoading, response } = userProfile;
    if (!isLoading && response) {
      if (response.success) {
        const { profile } = response;
        setData({
          name: profile.name,
          headline: profile.headline,
          userImage: profile.profilePicture,
          personalEmail: profile.personalEmail,
          websiteUrl: profile.personalWebsite,
          gitHubProfile: profile.gitHubProfile,
        });
      }
    }
  }, [userProfile]);

  const createProfileData = useSelector(
    (state) => state.profile.createProfileData
  );

  const { isLoading, response } = createProfileData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        window.location.assign(`/${username}/profile`);
        setError(null);
      } else {
        setError(response.message || "Something went wrong!");
      }
    }
  }, [isLoading, response, username]);

  const handleChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("data", JSON.stringify(data));

    dispatch(createProfile(formData));
  };

  return (
    <>
      <div>
        <div className="flex flex-col gap-y-3 sm:gap-y-5">
          <h1 className="text-white text-lg">Update your Profile</h1>
          <form
            onSubmit={handleSubmit}
            className="text-white/[0.7] flex flex-col gap-y-3 sm:gap-y-5"
          >
            <div className="relative rounded-full h-60 w-60 border-2 border-[#404040]">
              {data.userImage === "" ? (
                <div className="flex justify-center items-center rounded-full h-full w-full border-2 border-[#404040]">
                  <h1 className="font-bold text-[#404040]">
                    <label
                      htmlFor="file-upload"
                      className="text-sm border border-[#303030] p-2 bg-secondary rounded hover:bg-primary cursor-pointer"
                    >
                      {selectedFile ? selectedFile.name : "Upload Photo"}
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      name="image"
                      multiple="multiple"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleChangeFile}
                    />
                  </h1>
                </div>
              ) : (
                <div className="rounded-full h-full w-full">
                  <img
                    className="rounded-full h-full w-full"
                    src={`https://snippetsphere.online${data.userImage}`}
                    alt={data.name}
                  />
                  <label
                    htmlFor="file-upload"
                    className="text-sm absolute bottom-0 left-0 border border-[#303030] p-2 bg-secondary rounded hover:bg-primary cursor-pointer"
                  >
                    {selectedFile ? selectedFile.name : "Change Photo"}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    name="image"
                    multiple="multiple"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={handleChangeFile}
                  />
                </div>
              )}
            </div>
            <p className="text-xs">*Image size should be less than 1 MB.</p>
            <h1>{data.name}</h1>
            <div className="flex flex-col gap-y-1 sm:w-96">
              <label htmlFor="headline" className="text-xs">
                Headline
              </label>
              <input
                type="text"
                name="headline"
                id="headline"
                value={data.headline}
                placeholder="e.g., Full Stack Developer"
                className="p-3 rounded w-full bg-primary border-2 border-secondary text-sm"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:w-96">
              <label htmlFor="personalEmail" className="text-xs">
                Personal Email
              </label>
              <input
                type="email"
                name="personalEmail"
                value={data.personalEmail}
                placeholder="Type personal email"
                className="p-3 rounded w-full bg-primary border-2 border-secondary text-sm"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:w-96">
              <label htmlFor="websiteUrl" className="text-xs">
                Website URL
              </label>
              <input
                type="text"
                name="websiteUrl"
                value={data.websiteUrl}
                placeholder="Type URL of your personal website"
                className="p-3 rounded w-full bg-primary border-2 border-secondary text-sm"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-1 sm:w-96">
              <label htmlFor="gitHubProfile" className="text-xs">
                GitHub Profile
              </label>
              <input
                type="text"
                name="gitHubProfile"
                value={data.gitHubProfile}
                placeholder="Type URL of your GitHub profile"
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
                  Save
                </button>
              )}
            </div>
            {error && <p className="text-center text-red-400">{error}</p>}
          </form>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
