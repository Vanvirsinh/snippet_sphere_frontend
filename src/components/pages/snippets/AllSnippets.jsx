import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSnippets } from "../../../redux/snippet/snippetAction";
import CircularProgress from "@mui/material/CircularProgress";
import AllSnippetItem from "./AllSnippetItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function AllSnippets() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allSnippetsData = useSelector((state) => state.snippet.allSnippets);
  const [snippets, setSnippets] = useState(null);
  const [totalSnippets, setTotalSnippets] = useState(null);
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [query, setQuery] = useState({ query: "" });
  const [currentQuery, setCurrentQuery] = useState(
    searchParams.get("search") || ""
  );

  const { isLoading, response } = allSnippetsData;

  useEffect(() => {
    dispatch(fetchAllSnippets({ page: currentPage, query: currentQuery }));
  }, [dispatch, currentPage, currentQuery]);

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        setSnippets(response.snippets);
        const { totalSnippetsLength } = response;
        setTotalSnippets(totalSnippetsLength);
      }
    }
  }, [isLoading, response]);

  const handleChangePagination = (event, value) => {
    setCurrentPage(value);
    navigate(`/explore-snippets?page=${value}&search=${currentQuery}`);
  };

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setCurrentQuery(query.query);
    navigate(`/explore-snippets?page=${1}&search=${query.query}`);
  };

  const handleRemoveQuery = () => {
    setQuery({ query: "" });
    setCurrentQuery("");
    navigate(`/explore-snippets?page=${1}`);
  };

  return (
    <>
      <div className="bg-primary">
        <div className="flex flex-col gap-y-5 px-10 py-14">
          <h1 className="text-xl text-white">
            Explore across all the public snippets
          </h1>
          <div className="flex gap-x-5 items-center">
            <form onSubmit={handleSubmitForm} className="flex">
              <input
                name="query"
                type="text"
                onChange={handleChange}
                value={query.query}
                placeholder="Search across collections"
                autoComplete="off"
                required
                className="text-white px-3 w-[500px] py-2 bg-secondary rounded-l-md outline-none border-2 border-[#232323] border-r-0 focus:placeholder:text-[#808080]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-primary rounded-r-md border-2 border-[#232323] border-l-0"
              >
                <SearchIcon sx={{ color: "#f2f2f2" }} />
              </button>
            </form>
            {currentQuery !== "" && (
              <div>
                <h1 className="bg-secondary p-2 rounded text-white/[0.8] flex justify-center items-center gap-x-3">
                  Result for: {currentQuery}{" "}
                  <span
                    onClick={handleRemoveQuery}
                    className="cursor-pointer rounded border border-secondary flex items-center active:border-[#404040]"
                  >
                    <CloseIcon sx={{ fontSize: 20 }} />
                  </span>
                </h1>
              </div>
            )}
          </div>

          {/* All Snippets */}
          <div>
            {isLoading ? (
              <div className="h-[450px] flex justify-center items-center">
                <CircularProgress sx={{ color: "#f2f2f2" }} />
              </div>
            ) : (
              <div>
                {snippets && snippets.length > 0 ? (
                  <div className="grid grid-cols-4 gap-5">
                    {snippets.map((snippet, index) => {
                      return (
                        <AllSnippetItem
                          key={index}
                          snippet={snippet}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-[450px] flex justify-center items-center">
                    <h1 className="text-[#404040] text-5xl font-semibold">
                      No Public Snippets Available!
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Pagination */}
          {totalSnippets && (
            <div className="p-5 rounded-md flex justify-center">
              <Stack spacing={Math.ceil(totalSnippets / 8)}>
                <Pagination
                  onChange={handleChangePagination}
                  page={parseInt(currentPage)}
                  count={Math.ceil(totalSnippets / 8)}
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#f2f2f2",
                    },
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: "#232323",
                      border: "1px solid #303030",
                    },
                  }}
                />
              </Stack>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllSnippets;
