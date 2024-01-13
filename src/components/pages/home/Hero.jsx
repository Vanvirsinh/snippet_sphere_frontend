import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndSnippet } from "../../../redux/snippet/snippetAction";
import { fetchIndCollection } from "../../../redux/collection/collectionAction";
import { Editor } from "@monaco-editor/react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import { fetchUserProfile } from "../../../redux/profile/profileAction";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import LinkIcon from '@mui/icons-material/Link';

function Hero() {
  const dispatch = useDispatch();
  const indSnippetData = useSelector(
    (state) => state.snippet.individualSnippet
  );
  const [snippet, setSnippet] = useState([]);
  const [profile, setProfile] = useState(null);
  const [collection, setCollection] = useState([]);
  const editorRef = useRef(null);
  const [copyMessage, setCopyMessage] = useState({
    text: "Copy Code",
    icon: <ContentCopyIcon sx={{ fontSize: 18, mr: 1 }} />,
  });

  useEffect(() => {
    dispatch(
      fetchIndSnippet({ username: "vanvirsinh", snippetId: "uvO4sOXT" })
    );
  }, [dispatch]);

  const { isLoading, response } = indSnippetData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setSnippet(response.snippet[0]);
        dispatch(
          fetchIndCollection({
            username: response.snippet[0].authorName,
            collectionId: response.snippet[0].collectionId,
          })
        );
        dispatch(fetchUserProfile(response.snippet[0].authorName));
      } else {
        setSnippet([]);
      }
    }
  }, [isLoading, response, dispatch]);

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

  const handleCopy = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setCopyMessage({
            text: "Copied!",
            icon: <CheckIcon sx={{ fontSize: 18, mr: 1 }} />,
          });
          setTimeout(() => {
            setCopyMessage({
              text: "Copy Code",
              icon: <ContentCopyIcon sx={{ fontSize: 18, mr: 1 }} />,
            });
          }, 2000);
        })
        .catch(() => {
          setCopyMessage({
            text: "Error Occurred!",
            icon: <ErrorIcon sx={{ fontSize: 18, mr: 1 }} />,
          });
          setTimeout(() => {
            setCopyMessage({
              text: "Copy Code",
              icon: <ContentCopyIcon sx={{ fontSize: 18, mr: 1 }} />,
            });
          }, 2000);
        });
    }
  };

  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="flex px-10 py-14 gap-x-10">
            {/* Left */}
            <div className="w-1/2">
              <div className="text-white flex flex-col gap-y-10">
                <span className="w-fit text-white/[0.90]">
                  💻 Fuel your creativity: Dive into code snippets{" "}
                  <ArrowRightAltIcon sx={{ color: "#800080" }} />
                </span>
                <h1 className="text-5xl font-bold leading-snug">
                  Keep Your Daily-Used{" "}
                  <span className="custom-heading text-7xl">Code Snippets</span>{" "}
                  <br />
                  Instantly Accessible
                </h1>
                <p className="text-white/[0.90]">
                  Access a wealth of code snippets to elevate your projects.
                  From JavaScript to Python, find solutions, inspiration, and
                  efficiency in our diverse collection. Start exploring today!
                  Store, organize, and access your go-to code snippets
                  effortlessly.
                </p>
                <div className="flex gap-x-5 pt-4">
                  <Link to="/auth/sign-in" className="linear-gradient-button">
                    <span className="button-gradient">
                      Get Started for Free
                    </span>
                  </Link>
                  <Link to="/explore-snippets" className="linear-gradient-button">
                    <span className="button-dark">Explore Snippets</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="w-1/2 flex flex-col gap-y-4">
              <Link to={`/vanvirsinh/snippets/uvO4sOXT`} className="text-white text-lg hover:text-light-purple flex items-center gap-x-1"><span className="inline-block -rotate-45"><LinkIcon/></span>{snippet.title}</Link>
              <div className="custom-snippet-parent">
                <div className="rounded-t-md bg-secondary py-2 px-4 flex justify-between text-sm text-white/[0.7] items-center">
                  <div>
                    <Link
                      to={`/vanvirsinh/collection/${collection.collectionId}`}
                    >
                      <SnippetFolderIcon sx={{ fontSize: 18, mr: 1 }} />
                      {collection.name}
                    </Link>
                    <span className="ml-5">{snippet.language}</span>
                  </div>
                  <span className="cursor-pointer" onClick={handleCopy}>
                    {copyMessage.icon} {copyMessage.text}
                  </span>
                </div>
                <div className="bg-secondary h-[400px] border-t-0 rounded-b-md border-b-0 border-4 border-secondary">
                  <Editor
                    height="400px"
                    theme="vs-dark"
                    value={snippet.code}
                    language={snippet.language}
                    options={{
                      readOnly: true,
                    }}
                    onMount={handleEditorDidMount}
                    loading={<h1 className="text-white">Loading...</h1>}
                    className="p-5 bg-[#1e1e1e]"
                  />
                </div>
              </div>
              <div>
                {profile && (
                  <Link
                    to={`/${profile.username}`}
                    className="flex gap-x-4 w-fit"
                  >
                    <span className="user-profile">
                      {profile.profilePicture !== "" ? (
                        <img
                          src={`http://localhost:8000${profile.profilePicture}`}
                          alt={profile.name}
                          className="h-full w-full rounded-full"
                        />
                      ) : (
                        <span className="h-full w-full rounded-full custom-avatar flex justify-center items-center">
                          <h1 className="text-center text-xl font-semibold">
                            {profile.name.charAt(0)}
                          </h1>
                        </span>
                      )}
                    </span>
                    <div className="text-white">
                      <h1 className="text-md leading-none">{profile.name}</h1>
                      <span className="text-sm text-white text-opacity-50">
                        {profile && profile.followers.length}{" "}
                        {profile && profile.followers.length > 1
                          ? "followers"
                          : "follower"}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
