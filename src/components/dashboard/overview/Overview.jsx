import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/profile/profileAction";
import { CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "js-cookie";
import { followUser } from "../../../redux/profile/profileAction";
import { fetchUserSpecSnippet } from "../../../redux/snippet/snippetAction";
import SnippetItem from "../collection/snippets/SnippetItem";

function Overview() {
  const outLetProps = useOutletContext();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const authUser = useSelector((state) => state.user.authUser.user);
  const followUserData = useSelector((state) => state.profile.followUserData);
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const [error, setError] = useState(null);
  const [snippets, setSnippets] = useState(null);
  const [totalSnippets, setTotalSnippets] = useState(0);

  useEffect(() => {
    dispatch(fetchUserSpecSnippet(username));
  }, [dispatch, username]);

  const userSpecSnippetsData = useSelector(
    (state) => state.snippet.userSpecSnippets
  );

  useEffect(() => {
    const { isLoading, response } = userSpecSnippetsData;
    if (!isLoading && response) {
      if (response.success) {
        setTotalSnippets(response.snippets.length);
        setSnippets(response.snippets.slice(0, 4));
      } else {
        setSnippets([]);
      }
    }
  }, [userSpecSnippetsData]);

  const { isLoading, response } = userProfile;

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [dispatch, username, followUserData]);

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setProfile(response.profile);
      } else {
        setProfile(null);
      }
    }
  }, [userProfile, isLoading, response]);

  const handleFollow = (followUsername) => {
    const token = Cookies.get("user-token");
    if (token) {
      dispatch(followUser({ username: followUsername, token }));
    } else {
      setError("Please, register or login before you follow!");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

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
          <div className="flex flex-col gap-y-5">
            <div>
              <h1 className="mb-5 text-xl text-white">Overview</h1>
              <div className="grid grid-cols-4 gap-5 text-white">
                <div className="col-span-2">
                  <div className="bg-secondary p-5 rounded-md">
                    {isLoading || !profile ? (
                      <div className="h-72 flex justify-center items-center">
                        <CircularProgress size={30} sx={{ color: "#f2f2f2" }} />
                      </div>
                    ) : (
                      <div className="flex gap-x-5 items-center">
                        <div className="flex flex-col gap-y-5">
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
                        </div>
                        <div>
                          <div className="flex flex-col gap-y-5">
                            <h1 className="text-2xl text-white font-bold">
                              {profile.name}
                            </h1>
                            {profile.headline !== "" && (
                              <p>{profile.headline}</p>
                            )}
                            <p>
                              <span className="flex gap-x-2 items-center hover:text-white">
                                <PersonIcon /> {profile.username}
                              </span>
                            </p>
                            <div className="linear-gradient-button w-fit">
                              <Link
                                to={`/${username}/profile`}
                                className="button-dark text-sm"
                                style={{ padding: "10px" }}
                              >
                                View Complete Profile
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-y-5 bg-secondary rounded-md p-5 justify-center items-center">
                  <h1 className="font-bold">
                    {profile && profile.followers.length > 1
                      ? "Followers"
                      : "Follower"}
                  </h1>
                  <h1 className="text-5xl">
                    {profile && profile.followers.length}
                  </h1>
                    <div>
                      <span className="linear-gradient-button">
                        {followUserData.isLoading ? (
                          <button
                            style={{ padding: "8px 15px" }}
                            className="button-gradient"
                          >
                            <span className="w-20 flex items-center justify-center">
                              <CircularProgress
                                size={20}
                                sx={{ color: "white" }}
                              />
                            </span>
                          </button>
                        ) : (
                          <div>
                            {profile && (
                              <button
                                style={{ padding: "8px 15px" }}
                                className="button-gradient"
                                onClick={() => handleFollow(profile.username)}
                              >
                                <span className="w-20 flex items-center justify-center">
                                  {authUser && profile.followers.includes(authUser.user._id)
                                    ? "Followed"
                                    : "Follow"}
                                </span>
                              </button>
                            )}
                          </div>
                        )}
                      </span>
                    </div>
                    {error && (
                      <p className="text-center text-red-400">{error}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-5 bg-secondary rounded-md p-5 justify-center items-center">
                  <h1 className="font-bold">Total Snippets</h1>
                  <h1 className="text-5xl">{totalSnippets}</h1>
                  <Link
                    to={`/${username}/snippets`}
                    className="linear-gradient-button"
                  >
                    <span
                      style={{ padding: "8px 15px" }}
                      className="button-gradient"
                    >
                      Explore Snippets
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Snippets */}
            <div>
              <div>
                <h1 className="text-white mb-5">Code Snippets by {profile && profile.name}</h1>
                  <div>
                    {userSpecSnippetsData.isLoading ? (
                      <div className="h-[200px] flex justify-center items-center">
                        <CircularProgress sx={{ color: "#f2f2f2" }} />
                      </div>
                    ) : (
                      <div>
                        {snippets && snippets.length > 0 ? (
                          <div className="grid grid-cols-4 gap-5">
                            {snippets
                              .slice()
                              .reverse()
                              .map((snippet, index) => {
                                return (
                                  <SnippetItem snippet={snippet} key={index} />
                                );
                              })}
                          </div>
                        ) : (
                          <div className="p-32 flex flex-col justify-center items-center gap-y-10 w-full h-full">
                            <h1 className="text-center text-[#404040] text-5xl font-semibold">
                              No Snippets Created Yet!
                            </h1>
                            <div className="linear-gradient-button">
                              <Link
                                to={`/${username}/snippets/new`}
                                className="button-gradient text-white cursor-pointer gap-x-2 flex items-center"
                              >
                                Create new Snippet
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
