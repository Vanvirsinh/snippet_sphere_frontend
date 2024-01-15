import React, { useState, useEffect } from "react";
import { useOutletContext, Link, useParams } from "react-router-dom";
import AllSnippetItem from "../../pages/snippets/AllSnippetItem";
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPinnedSnippets } from "../../../redux/snippet/snippetAction";
import PageNotFound from "../../pages/error404/PageNotFound";

function PinnedSnippets() {
  const outLetProps = useOutletContext();
  const { username } = useParams();
  const [snippets, setSnippets] = useState([]);
  const [searchSnippets, setSearchSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorization, setAuthorization] = useState(false);
  const authUser = useSelector((state) => state.user.authUser);
  const dispatch = useDispatch();
  const pinnedSnippetsData = useSelector(
    (state) => state.snippet.pinnedSnippets
  );

  useEffect(() => {
    const { user, isLoading } = authUser;
    if (!isLoading && user) {
      if (user.success) {
        if (user.user.username === username) {
          setAuthorization(true);
        }
      }
    }
  }, [authUser, username]);

  useEffect(() => {
    dispatch(fetchPinnedSnippets({ username }));
  }, [dispatch, username]);

  const { isLoading, response } = pinnedSnippetsData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setSnippets(response.snippets);
      }
    }
  }, [isLoading, response]);

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
      <div style={style} className="ease-in-out duration-100 bg-primary overflow-auto">
      {authorization ? (
        <div className="p-3 md:p-6">
          <div className="flex flex-col gap-y-3 md:gap-y-5">
            <div>
              <h1 className="text-white text-xl">Your Pinned Snippets</h1>
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
              <div>
                <Link
                  to={`/explore-snippets`}
                  className="text-sm sm:text-base text-white cursor-pointer gap-x-2 flex items-center"
                >
                  <ViewComfyAltIcon /> Explore Snippets
                </Link>
              </div>
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
                      {searchSnippets
                        .slice()
                        .reverse()
                        .map((snippet, index) => {
                          return (
                            <AllSnippetItem snippet={snippet} key={index} />
                          );
                        })}
                    </div>
                  ) : (
                    <div className="p-32 flex flex-col justify-center items-center gap-y-10 w-full h-full">
                      <h1 className="text-center text-[#404040] text-5xl font-semibold">
                        No Pinned Snippets Found
                      </h1>
                      <div className="linear-gradient-button">
                        <Link
                          to="/explore-snippets"
                          className="button-gradient text-white cursor-pointer gap-x-2 flex items-center"
                        >
                          Explore now to add few
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        ) : authUser.isLoading ? (
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

export default PinnedSnippets;
