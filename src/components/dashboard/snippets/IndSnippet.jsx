import React, { useEffect, useState, useRef } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PushPinIcon from "@mui/icons-material/PushPin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndSnippet } from "../../../redux/snippet/snippetAction";
import { fetchIndCollection } from "../../../redux/collection/collectionAction";
import { Editor } from "@monaco-editor/react";

function IndSnippet() {
  const outLetProps = useOutletContext();
  const { username, snippetId } = useParams();
  const [snippet, setSnippet] = useState([]);
  const [collection, setCollection] = useState([]);
  const [copyMessage, setCopyMessage] = useState({
    text: "Copy Code",
    icon: <ContentCopyIcon sx={{ fontSize: 18, mr: 1 }} />,
  });
  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const indSnippetData = useSelector(
    (state) => state.snippet.individualSnippet
  );

  useEffect(() => {
    dispatch(fetchIndSnippet({ username, snippetId }));
  }, [dispatch, username, snippetId]);

  const { isLoading, response } = indSnippetData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setSnippet(response.snippet[0]);
        dispatch(
          fetchIndCollection({ username, collectionId: response.snippet[0].collectionId })
        );
      } else {
        setSnippet([]);
      }
    }
  }, [isLoading, response, dispatch, snippet.collectionId, username]);

  const individualCollection = useSelector(
    (state) => state.collection.individualCollection
  );

  useEffect(() => {
    const {isLoading, response} = individualCollection;
    if (!isLoading && response) {
      if (response.success) {
        setCollection(response.collection);
      } else {
        setCollection([]);
      }
    }
  }, [individualCollection]);

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
        <div className="p-6">
          <div className="text-white flex flex-col gap-y-5">
            <div>
              <h1>{snippet.title}</h1>
            </div>
            {/* Snippet */}
            <div>
              <div>
                <div className="rounded-t-md bg-secondary py-2 px-4 flex justify-between text-sm text-white/[0.7] items-center">
                  <div>
                    <Link to={`/${username}/collection/${collection.collectionId}`}>
                      <ArrowBackIcon sx={{ fontSize: 18, mr: 1 }} />
                      {collection.name}
                    </Link>
                    <span className="ml-5">{snippet.language}</span>
                  </div>
                  <span className="cursor-pointer" onClick={handleCopy}>
                    {copyMessage.icon} {copyMessage.text}
                  </span>
                </div>
                <div className="overflow-auto h-[440px] border-t-0 border-b-0 border-4 border-secondary">
                  <Editor
                    height="450px"
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
                <div className="rounded-b-md bg-secondary py-2 px-4 flex gap-x-6 justify-end text-sm text-white/[0.7] items-center">
                  <span>
                    <FavoriteBorderIcon sx={{ fontSize: 19, mr: 1 }} />{" "}
                    {snippet.length > 0 ? snippet.likes.length : 0}
                  </span>
                  <span>
                    <RemoveRedEyeIcon sx={{ fontSize: 19, mr: 1 }} />{" "}
                    {snippet.views}
                  </span>
                  <span>
                    <PushPinIcon sx={{ fontSize: 19, mr: 1 }} />
                    Pin Snippet
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-5">
                <div className="user-profile">
                  <div className="h-full w-full rounded-full custom-avatar flex justify-center items-center">
                    <h1 className="text-center text-xl font-semibold">V</h1>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span>Vanvir Singh</span>
                  <span className="text-xs text-white/[0.5]">
                    1.5k Followers
                  </span>
                </div>
                <div>
                  <span className="linear-gradient-button active:scale-[98%]">
                    <button
                      style={{ padding: "8px 15px" }}
                      className="button-dark"
                    >
                      Follow
                    </button>
                  </span>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="bg-primary p-5 rounded-md flex flex-col gap-y-5">
              <div>
                <h1 className="text-white/[0.7] text-sm">
                  Created At: {snippet.createdAt}
                </h1>
                <h1 className="text-white/[0.7] text-sm">
                  Updated At: {snippet.updatedAt}
                </h1>
              </div>
              <p className="text-white/[0.7] text-sm">{snippet.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndSnippet;
