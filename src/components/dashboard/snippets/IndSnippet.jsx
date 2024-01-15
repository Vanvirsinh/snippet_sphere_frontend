import React, { useEffect, useState, useRef } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndSnippet } from "../../../redux/snippet/snippetAction";
import { fetchIndCollection } from "../../../redux/collection/collectionAction";
import { Editor } from "@monaco-editor/react";
import { fetchUserProfile } from "../../../redux/profile/profileAction";
import { followUser } from "../../../redux/profile/profileAction";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import { getUser } from "../../../redux/auth/actions/userAction";
import { pinSnippet } from "../../../redux/snippet/snippetAction";
import { likeSnippet } from "../../../redux/snippet/snippetAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PageNotFound from "../../pages/error404/PageNotFound";

function IndSnippet() {
  const outLetProps = useOutletContext();
  const { username, snippetId } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [profile, setProfile] = useState(null);
  const [collection, setCollection] = useState([]);
  const [authorization, setAuthorization] = useState(false);
  const [error, setError] = useState(null);
  const [copyMessage, setCopyMessage] = useState({
    text: "Copy Code",
    icon: <ContentCopyIcon sx={{ fontSize: 15, mr: 0 }} />,
  });
  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const indSnippetData = useSelector(
    (state) => state.snippet.individualSnippet
  );
  const followUserData = useSelector((state) => state.profile.followUserData);
  const pinSnippetData = useSelector((state) => state.snippet.pinSnippetData);
  const likeSnippetData = useSelector((state) => state.snippet.likeSnippetData);
  const authUser = useSelector((state) => state.user.authUser.user);

  useEffect(() => {
    dispatch(fetchIndSnippet({ username, snippetId }));
    const token = Cookies.get("user-token");
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch, username, snippetId, pinSnippetData, likeSnippetData]);

  const { isLoading, response } = indSnippetData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setSnippet(response.snippet[0]);
        setAuthorization(true);
        dispatch(
          fetchIndCollection({
            username: response.snippet[0].authorName,
            collectionId: response.snippet[0].collectionId,
          })
        );
        dispatch(fetchUserProfile(response.snippet[0].authorName));
      } else {
        setSnippet(null);
      }
    }
  }, [isLoading, response, dispatch, username, followUserData]);

  const individualCollection = useSelector(
    (state) => state.collection.individualCollection
  );

  useEffect(() => {
    const { isLoading, response } = individualCollection;
    if (!isLoading && response) {
      if (response.success) {
        setCollection(response.collection);
      } else {
        setCollection([]);
      }
    }
  }, [individualCollection]);

  const userProfile = useSelector((state) => state.profile.userProfile);

  useEffect(() => {
    const { isLoading, response } = userProfile;
    if (!isLoading && response) {
      if (response.success) {
        setProfile(response.profile);
      } else {
        setProfile([]);
      }
    }
  }, [userProfile]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

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

  const handleCopy = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setCopyMessage({
            text: "Copied!",
            icon: <CheckIcon sx={{ fontSize: 15, mr: 0 }} />,
          });
          setTimeout(() => {
            setCopyMessage({
              text: "Copy Code",
              icon: <ContentCopyIcon sx={{ fontSize: 15, mr: 0 }} />,
            });
          }, 2000);
        })
        .catch(() => {
          setCopyMessage({
            text: "Error Occurred!",
            icon: <ErrorIcon sx={{ fontSize: 15, mr: 0 }} />,
          });
          setTimeout(() => {
            setCopyMessage({
              text: "Copy Code",
              icon: <ContentCopyIcon sx={{ fontSize: 15, mr: 0 }} />,
            });
          }, 2000);
        });
    }
  };

  useEffect(() => {
    const { isLoading, response } = likeSnippetData;
    if (!isLoading && response) {
      if (response.success) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  }, [likeSnippetData]);

  const handleLikeSnippet = () => {
    dispatch(likeSnippet(snippet._id));
  };

  useEffect(() => {
    const { isLoading, response } = pinSnippetData;
    if (!isLoading && response) {
      if (response.success) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  }, [pinSnippetData]);

  const handlePinSnippet = () => {
    dispatch(pinSnippet(snippet._id));
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
      <div style={style} className="bg-primary overflow-auto">
      {authorization ? (
        <div className="p-3 md:p-6">
          {snippet && (
            <div className="text-white flex flex-col gap-y-3 md:gap-y-5">
              <div>
                <Link
                  className="text-sm text-white/[0.7]"
                  to={`/${username}/snippets`}
                >
                  <ArrowBackIcon sx={{ fontSize: 18, mr: 1 }} />
                  Back to Snippets
                </Link>
              </div>
              <div>
                <h1>{snippet.title}</h1>
              </div>
              {/* Snippet */}
              <div>
                <div>
                  <div className="rounded-t-md bg-secondary py-2 px-2 md:px-4 flex justify-between text-sm text-white/[0.7] items-center">
                    <div>
                      <Link
                        to={`/${username}/collection/${collection.collectionId}`}
                      >
                        <SnippetFolderIcon sx={{ fontSize: 18, mr: 1 }} />
                        {collection.name}
                      </Link>
                    </div>
                    <span className="cursor-pointer text-xs" onClick={handleCopy}>
                      {copyMessage.icon} {copyMessage.text}
                    </span>
                  </div>
                  <div className="overflow-auto h-[400px] md:h-[450px] border-t-0 border-b-0 border-4 border-secondary">
                    <Editor
                      theme="vs-dark"
                      value={snippet.code}
                      language={snippet.language}
                      options={{
                        readOnly: true,
                        scrollbar: {
                          alwaysConsumeMouseWheel: false
                        }
                      }}
                      onMount={handleEditorDidMount}
                      loading={<h1 className="text-white">Loading...</h1>}
                      className="p-0 sm:p-2 md:p-5 bg-[#1e1e1e]"
                    />
                  </div>
                  <div className="rounded-b-md bg-secondary py-2 px-2 md:px-4 flex justify-between text-sm text-white/[0.7] items-center">
                  <span>{snippet.language}</span>
                    <div className="flex gap-x-2">
                    {authUser && snippet.likes.includes(authUser.user._id) ? (
                      <span>
                        <Tooltip title="Unlike">
                          <IconButton onClick={handleLikeSnippet}>
                            <FavoriteIcon
                              className="cursor-pointer active:scale-110"
                              sx={{ fontSize: 19, mr: 0, color: "#f2f2f2" }}
                            />
                          </IconButton>
                        </Tooltip>
                            {snippet.likes.length}
                      </span>
                    ) : (
                      <span>
                        <Tooltip title="Like This">
                          <IconButton onClick={handleLikeSnippet}>
                            <FavoriteBorderIcon
                              className="cursor-pointer active:scale-110"
                              sx={{ fontSize: 19, mr: 0, color: "#f2f2f2" }}
                            />
                          </IconButton>
                        </Tooltip>
                            {snippet.likes.length}
                      </span>
                    )}
                    {authUser && snippet.pins.includes(authUser.user._id) ? (
                      <span>
                        <Tooltip title="Already Pinned">
                          <IconButton onClick={handlePinSnippet}>
                            <PushPinIcon
                              className="cursor-pointer active:scale-110"
                              sx={{ fontSize: 19, mr: 0, color: "#f2f2f2" }}
                            />
                          </IconButton>
                        </Tooltip>
                        Pinned!
                      </span>
                    ) : (
                      <span>
                        <Tooltip title="Add to Pin">
                          <IconButton onClick={handlePinSnippet}>
                            <PushPinOutlinedIcon
                              className="cursor-pointer active:scale-110"
                              sx={{ fontSize: 19, mr: 0, color: "#f2f2f2" }}
                            />
                          </IconButton>
                        </Tooltip>
                        Pin Snippet
                      </span>
                    )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-3 md:gap-x-5">
                  {profile && (
                    <div className="user-profile">
                      {profile.profilePicture !== "" ? (
                        <Link to={`/${username}`}>
                          <img
                            src={`https://snippetsphere.online${profile.profilePicture}`}
                            className="rounded-full h-full w-full"
                            alt={profile.name}
                          />
                        </Link>
                      ) : (
                        <Link
                          to={`/${username}`}
                          className="h-full w-full rounded-full custom-avatar flex justify-center items-center"
                        >
                          <h1 className="text-center text-xl font-semibold">
                            {profile.name.charAt(0)}
                          </h1>
                        </Link>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <Link to={`/${username}`} className="text-sm sm:test-base hover:underline">
                      {profile && profile.name}
                    </Link>
                    <span className="text-xs text-white/[0.5]">
                      {profile && profile.followers.length}{" "}
                      {profile && profile.followers.length > 1
                        ? "followers"
                        : "follower"}
                    </span>
                  </div>
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
                                {authUser &&
                                profile.followers.includes(authUser.user._id)
                                  ? "Followed"
                                  : "Follow"}
                              </span>
                            </button>
                          )}
                        </div>
                      )}
                    </span>
                  </div>
                  {error && <p className="text-center text-red-400">{error}</p>}
                </div>
              </div>
              {/* Description */}
              <div className="bg-primary p-0 md:p-5 rounded-md flex flex-col gap-y-3 md:gap-y-5">
                <div>
                  <h1 className="text-white/[0.7] text-sm">
                    Created At: {snippet.createdAt}
                  </h1>
                  <h1 className="text-white/[0.7] text-sm">
                    Updated At: {snippet.updatedAt}
                  </h1>
                </div>
                <p className="text-white/[0.7] text-sm">
                  {snippet.description}
                </p>
              </div>
            </div>
          )}
        </div>
        ) : isLoading ? (
          <div className="text-white h-full flex justify-center items-center">
            <span><CircularProgress size={30} sx={{color: '#f2f2f2'}} /></span>
          </div>
        ) : (
          <div>
            <PageNotFound />
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default IndSnippet;
