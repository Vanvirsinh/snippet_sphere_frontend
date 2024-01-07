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

function SpecificCollection() {
  const [snippets, setSnippets] = useState([]);
  const outLetProps = useOutletContext();
  const { username, collectionId } = useParams();

  const dispatch = useDispatch();

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
      } else {
        setSnippets([]);
      }
    }
  }, [collectionSpecSnippetsData, isLoading, response]);

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
            <div className="flex gap-x-10 items-center">
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
                  <div className="text-white text-xl">
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
            <div className="flex justify-between items-center">
              <form action="" className="flex">
                <input
                  type="text"
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
                  to={`/${username}/snippets/new/?collectionId=${collectionId}`}
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
                  {snippets && snippets.length > 0 ? (
                    <div className="grid grid-cols-4 gap-5">
                      {snippets.map((snippet, index) => {
                        return <SnippetItem snippet={snippet} key={index} />;
                      })}
                    </div>
                  ) : (
                    <div className="p-32 flex flex-col justify-center items-center gap-y-10 w-full h-full">
                      <h1 className="text-center text-[#404040] text-5xl font-semibold">
                        Empty Collection
                      </h1>
                      <div className="linear-gradient-button">
                        <Link
                          to={`/${username}/snippets/new/?collectionId=${collectionId}`}
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

export default SpecificCollection;
