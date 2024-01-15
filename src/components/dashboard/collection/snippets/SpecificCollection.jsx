import React, { useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SnippetItem from "./SnippetItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionSpecSnippet } from "../../../../redux/snippet/snippetAction";
import { fetchIndCollection } from "../../../../redux/collection/collectionAction";
import CircularProgress from "@mui/material/CircularProgress";
import PageNotFound from "../../../pages/error404/PageNotFound"

function SpecificCollection() {
  const [snippets, setSnippets] = useState([]);
  const [searchSnippets, setSearchSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorization, setAuthorization] = useState(false);
  const outLetProps = useOutletContext();
  const { username, collectionId } = useParams();

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.authUser);
  const { user } = authUser;

  useEffect(() => {
    dispatch(fetchCollectionSpecSnippet({ username, collectionId }));
    dispatch(fetchIndCollection({ username, collectionId }));
  }, [dispatch, username, collectionId]);

  const collectionSpecSnippetsData = useSelector(
    (state) => state.snippet.collectionSpecSnippets
  );
  const individualCollection = useSelector(
    (state) => state.collection.individualCollection
  );

  const { isLoading, response } = collectionSpecSnippetsData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setSnippets(response.snippets);
        setAuthorization(true);
      } else {
        setSnippets([]);
      }
    }
  }, [collectionSpecSnippetsData, isLoading, response]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filteredSnippets = snippets.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.language.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

    setSearchSnippets(filteredSnippets);
  }, [searchQuery, snippets]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <div className="flex flex-col gap-y-3 md:gap-y-5">
            <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-10 md:items-center">
              <div>
                <Link
                  to={`/${username}/collection`}
                  className="text-white/[0.7] text-sm"
                >
                  <ArrowBackIcon sx={{ fontSize: 18, mr: 1 }} />
                  Back to Collections
                </Link>
              </div>
              {!individualCollection.isLoading &&
              individualCollection.response ? (
                <div className="flex gap-x-5 items-center">
                  <div className="text-white text-lg md:text-xl">
                    <h1>{individualCollection.response.collection.name}</h1>
                  </div>
                  <div className="text-white/[0.7] text-sm py-1 px-2 rounded-md bg-secondary">
                    <h1>
                      {individualCollection.response.collection.isPublic
                        ? "Public"
                        : "Private"}
                    </h1>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row justify-between sm:items-center">
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="search"
                  onChange={handleChange}
                  autoComplete="off"
                  name="search"
                  placeholder="Search across snippets"
                  className="text-white px-3 py-2 w-full sm:w-96 bg-secondary rounded-l-md outline-none border-2 border-[#232323] border-r-0 focus:placeholder:text-[#808080]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary rounded-r-md border-2 border-[#232323] border-l-0"
                >
                  <SearchIcon sx={{ color: "#f2f2f2" }} />
                </button>
              </form>
              {user && user.user.username === username && (
              <div>
                <Link
                  to={`/${username}/snippets/new/?collectionId=${collectionId}`}
                  className="text-sm sm:text-base text-white cursor-pointer gap-x-2 flex items-center"
                >
                  <AddCircleOutlineIcon /> Create Snippet
                </Link>
              </div>
              )}
            </div>

            <div>
              {isLoading ? (
                <div className="h-[450px] flex justify-center items-center">
                  <CircularProgress sx={{ color: "#f2f2f2" }} />
                </div>
              ) : (
                <div>
                  {searchSnippets && searchSnippets.length > 0 ? (
                    <div className="grid gid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                      {searchSnippets.map((snippet, index) => {
                        return <SnippetItem snippet={snippet} key={index} />;
                      })}
                    </div>
                  ) : (
                    <div className="py-28 md:p-32 flex flex-col justify-center items-center gap-y-10 w-full h-full">
                      <h1 className="text-center text-[#404040] text-3xl md:text-5xl font-semibold">
                        No Snippet Found
                      </h1>
                      {user && user.user.username === username && (
                      <div className="linear-gradient-button">
                        <Link
                          to={`/${username}/snippets/new/?collectionId=${collectionId}`}
                          className="button-gradient text-white cursor-pointer gap-x-2 flex items-center"
                        >
                          Create new Snippet
                        </Link>
                      </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
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
    </>
  );
}

export default SpecificCollection;
