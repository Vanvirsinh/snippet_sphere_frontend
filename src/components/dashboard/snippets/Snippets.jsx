import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import SnippetItem from "../collection/snippets/SnippetItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSpecSnippet } from "../../../redux/snippet/snippetAction";

function Snippets() {
  const outLetProps = useOutletContext();
  const [snippets, setSnippets] = useState([]);
  const [searchSnippets, setSearchSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { username } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserSpecSnippet(username));
  }, [dispatch, username]);

  const userSpecSnippetsData = useSelector(
    (state) => state.snippet.userSpecSnippets
  );

  const { isLoading, response } = userSpecSnippetsData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setSnippets(response.snippets);
      } else {
        setSnippets([]);
      }
    }
  }, [userSpecSnippetsData, isLoading, response]);

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
        <div className="p-6">
          <div className="flex flex-col gap-y-5">
            <div>
              <h1 className="text-white text-xl">View All Snippets</h1>
            </div>
            <div className="flex justify-between items-center">
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="search"
                  name="search"
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Search across snippets"
                  className="text-white px-3 py-2 w-96 bg-secondary rounded-l-md outline-none border-2 border-[#232323] border-r-0 focus:placeholder:text-[#808080]"
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
                  to={`/${username}/snippets/new`}
                  className="text-white cursor-pointer gap-x-2 flex items-center"
                >
                  <AddCircleOutlineIcon /> Create Snippet
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
                    <div className="grid grid-cols-4 gap-5">
                      {searchSnippets.slice().reverse().map((snippet, index) => {
                        return <SnippetItem snippet={snippet} key={index} />;
                      })}
                    </div>
                  ) : (
                    <div className="p-32 flex flex-col justify-center items-center gap-y-10 w-full h-full">
                      <h1 className="text-center text-[#404040] text-5xl font-semibold">
                        No Snippets Found
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
    </>
  );
}

export default Snippets;
