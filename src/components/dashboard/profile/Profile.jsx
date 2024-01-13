import React, { useEffect, useState } from "react";
import { useOutletContext, Link, useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/profile/profileAction";
import { CircularProgress } from "@mui/material";

function Profile() {
  const outLetProps = useOutletContext();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const [profile, setProfile] = useState(null);
  const { username } = useParams();

  const { isLoading, response } = userProfile;

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [dispatch, username]);

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setProfile(response.profile);
      } else {
        setProfile(null);
      }
    }
  }, [userProfile, isLoading, response]);

  const style = {
    position: "absolute",
    height: `calc(100vh - ${outLetProps.height}px)`,
    width: `calc(100vw - ${outLetProps.width}px)`,
    top: `${outLetProps.height}px`,
    left: `${outLetProps.width}px`,
  };

  return (
    <>
      <div style={style} className="ease-in-out duration-100 bg-primary overflow-auto">
        <div className="p-6">
          {isLoading || !profile ? (
            <div className="h-full">
              <CircularProgress size={30} sx={{ color: "#f2f2f2" }} />
            </div>
          ) : (
            <div className="text-white/[0.7]  flex flex-col gap-y-5">
              <div>
                <h1 className="text-white text-xl">
                  {profile.name}'s Personal Profile
                </h1>
              </div>
              <div className="flex gap-x-5 items-center">
                <div className="rounded-full h-72 w-72 border-2 border-[#404040]">
                  {profile.profilePicture === "" ? (
                    <div className="flex justify-center items-center rounded-full h-full w-full border-2 border-[#404040]">
                      <h1 className="text-2xl font-bold text-[#404040]">
                        No Image
                      </h1>
                    </div>
                  ) : (
                    <img
                      className="rounded-full h-full w-full"
                      src={`http://localhost:8000${profile.profilePicture}`}
                      alt={profile.name}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-y-5">
                  <h1 className="text-2xl text-white font-bold">
                    {profile.name}
                  </h1>
                  {profile.headline !== "" && <p>{profile.headline}</p>}
                  <p>
                    <Link
                      to={`/${profile.username}`}
                      className="flex gap-x-2 items-center hover:text-white"
                    >
                      <PersonIcon /> {profile.username}
                    </Link>
                  </p>
                  <div className="linear-gradient-button w-fit">
                    <Link
                      to={`/${username}/settings/profile`}
                      className="button-dark text-sm"
                      style={{ padding: "10px" }}
                    >
                      <EditIcon sx={{ fontSize: 18, mr: 1 }} />
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <div>
                  <ul className="flex gap-x-5">
                    <li className="flex items-center gap-x-2">
                      <PeopleIcon
                        sx={{ fontSize: 22, color: "#f2f2f2", opacity: 0.7 }}
                      />
                      <b className="text-white">{profile.followers.length}</b>{" "}
                      followers
                    </li>
                  </ul>
                </div>
                <p>
                  <a
                    href={
                      profile.personalEmail === ""
                        ? "#"
                        : `mailto:${profile.personalEmail}`
                    }
                    className="hover:text-white hover:underline"
                  >
                    <EmailIcon
                      sx={{
                        fontSize: 22,
                        color: "#f2f2f2",
                        opacity: 0.7,
                        mr: 1,
                      }}
                    />{" "}
                    {profile.personalEmail === ""
                      ? "Email not added!"
                      : profile.personalEmail}
                  </a>
                </p>
                <p>
                  <a
                    href={
                      profile.personalWebsite === ""
                        ? "#"
                        : profile.personalWebsite
                    }
                    className="hover:text-white hover:underline"
                    target={profile.personalWebsite === "" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <LanguageIcon
                      sx={{
                        fontSize: 22,
                        color: "#f2f2f2",
                        opacity: 0.7,
                        mr: 1,
                      }}
                    />{" "}
                    {profile.personalWebsite === ""
                      ? "Website not added!"
                      : `${profile.personalWebsite}`}
                  </a>
                </p>
                <p>
                  <a
                    href={
                      profile.gitHubProfile === "" ? "#" : profile.gitHubProfile
                    }
                    className="hover:text-white hover:underline"
                    target={profile.gitHubProfile === "" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon
                      sx={{
                        fontSize: 22,
                        color: "#f2f2f2",
                        opacity: 0.7,
                        mr: 1,
                      }}
                    />{" "}
                    {profile.gitHubProfile === ""
                      ? "GitHub Profile not added!"
                      : `${profile.gitHubProfile}`}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
