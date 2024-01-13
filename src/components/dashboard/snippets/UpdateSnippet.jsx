import React, { useState, useEffect, useRef } from "react";
import "./snippets.css";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import languages from "./languages";
import { useSelector, useDispatch } from "react-redux";
import { updateSnippet } from "../../../redux/snippet/snippetAction";
import { fetchUserSpecCollection } from "../../../redux/collection/collectionAction";
import { fetchIndSnippet } from "../../../redux/snippet/snippetAction";
import CircularProgress from "@mui/material/CircularProgress";

function UpdateSnippet() {
  const outLetProps = useOutletContext();
  const { username, snippetId } = useParams();
  const [language, setLanguage] = useState("javascript");
  const [collections, setCollections] = useState([]);
  const [snippetObjId, setSnippetObjId] = useState([]);
  const [error, setError] = useState(null);
  const [currentCollectionId, setCurrentCollectionId] = useState("disabled");
  const [data, setData] = useState({
    title: "",
    code: "",
    language,
    description: "",
    collectionId: "",
  });
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const createSnippetData = useSelector((state) => state.snippet.createSnippet);
  const collectionData = useSelector(
    (state) => state.collection.userSpecCollection
  );
  const indSnippetData = useSelector(
    (state) => state.snippet.individualSnippet
  );

  const { isLoading, response } = createSnippetData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        window.location.assign(
          `/${username}/collection/${currentCollectionId}`
        );
      } else {
        setError(response.message || "Something Went Wrong!");
      }
    }
  }, [createSnippetData, isLoading, response, currentCollectionId, username]);

  useEffect(() => {
    dispatch(fetchUserSpecCollection(username));
    dispatch(fetchIndSnippet({ username, snippetId }));
  }, [dispatch, username, snippetId]);

  useEffect(() => {
    const { isLoading, collection } = collectionData;
    if (!isLoading && collection) {
      if (collection.success) {
        setCollections(collection.collections);
      }
    }
  }, [collectionData]);

  useEffect(() => {
    const { isLoading, response } = indSnippetData;
    if (!isLoading && response) {
      if (response.success) {
        setSnippetObjId(response.snippet[0]._id);
        setData({
          title: response.snippet[0].title,
          code: response.snippet[0].code,
          language: response.snippet[0].language,
          description: response.snippet[0].description,
          collectionId: response.snippet[0].collectionId,
        });
        setCurrentCollectionId(response.snippet[0].collectionId);
        setLanguage(response.snippet[0].language);
      } else {
        setSnippetObjId([]);
      }
    }
  }, [indSnippetData]);

  const handleCollectionChange = (e) => {
    setCurrentCollectionId(e.target.value);
    setData({ ...data, collectionId: e.target.value });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = () => {
    const code = getEditorValue();
    setData({ ...data, code });
  };

  function getEditorValue() {
    return editorRef.current.getValue();
  }

  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
    setData({ ...data, language: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = getEditorValue();
    setData({ ...data, code });
    handleCreateSnippet();
  };

  const handleCreateSnippet = () => {
    setError(null);
    if (
      data.collectionId.length > 1 &&
      data.title.length > 1 &&
      data.code.length > 1 &&
      data.description.length > 1
    ) {
      dispatch(updateSnippet({ data, snippetId: snippetObjId }));
    } else {
      setError("Please, fill out all the fields!");
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
          <div className="flex flex-col gap-y-5">
            <Link to={`/${username}/snippets`} className="text-white/[0.6] text-sm">
              <ArrowBackIcon sx={{ fontSize: 20, mr: 1 }} />
              Back to Snippets
            </Link>
            <div className="flex flex-col gap-y-5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <div className="flex flex gap-x-5 items-center">
                  <div className="w-1/2 flex flex-col gap-y-2">
                    <label htmlFor="title" className="text-white/[0.7] text-sm">
                      Enter Title
                    </label>
                    <input
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                      id="title"
                      type="text"
                      autoFocus
                      placeholder={`"e.g.,Async Await in JavaScript"`}
                      className="text-white placeholder:text-[#808080] placeholder:text-sm px-3 py-2 rounded-md bg-primary border-2 border-secondary w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="language"
                      className="text-white/[0.7] text-sm"
                    >
                      Select Language
                    </label>
                    <select
                      id="language"
                      value={language}
                      onChange={handleChangeLanguage}
                      className="px-3 py-2 bg-secondary text-white rounded-md"
                    >
                      {languages.map((language, index) => {
                        return (
                          <option key={index} value={language}>
                            {language}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {collectionData.isLoading ? (
                    <div className="flex flex-col gap-y-2">
                      <label
                        htmlFor="collection"
                        className="text-white/[0.7] text-sm"
                      >
                        Select Collection
                      </label>
                      <span className="text-center">
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      </span>
                    </div>
                  ) : (
                    <div>
                      {collections && collections.length > 0 ? (
                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="collection"
                            className="text-white/[0.7] text-sm"
                          >
                            Select Collection
                          </label>
                          <select
                            value={currentCollectionId}
                            onChange={handleCollectionChange}
                            name="collectionId"
                            id="collection"
                            className="px-3 py-2 bg-secondary text-white rounded-md"
                            required
                          >
                            <option value="disabled" disabled>
                              --Select Collection--
                            </option>
                            {collections
                              .slice()
                              .reverse()
                              .map((collection, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={collection.collectionId}
                                  >
                                    {collection.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center flex-col gap-y-2">
                          <h1 className="text-sm text-white/[0.7]">
                            No collection found
                          </h1>
                          <h1 className="text-white">
                            Create an Collection first!
                          </h1>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Editor
                  height="450px"
                  theme="vs-dark"
                  value={data.code}
                  defaultLanguage="javascript"
                  language={language}
                  onMount={handleEditorDidMount}
                  onChange={handleEditorChange}
                  loading={<h1 className="text-white">Loading...</h1>}
                  className="border-2 border-secondary bg-[#1e1e1e] rounded-md py-4"
                />
                <div>
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="description"
                      className="text-white/[0.7] text-sm"
                    >
                      Enter Description
                    </label>
                    <textarea
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                      rows="5"
                      id="description"
                      className="text-white w-full p-5 rounded-md border-2 border-secondary bg-primary placeholder:text-sm placeholder:text-[#808080]"
                      placeholder={`"e.g.,Enter description..."`}
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-x-5 items-center">
                  <span className="linear-gradient-button text-white">
                    {isLoading ? (
                      <button className="button-gradient">
                        <span className="px-20">
                          <CircularProgress size={20} sx={{ color: "white" }} />
                        </span>
                      </button>
                    ) : (
                      <button className="button-gradient">
                        Update Code Snippet
                      </button>
                    )}
                  </span>
                  {error && <p className="text-center text-red-400">{error}</p>}
                </div>
              </form>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateSnippet;
