import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionItem from "./CollectionItem";
import CreateCollection from "./CreateCollection";
import { useDispatch, useSelector } from "react-redux";
import { createCollection } from "../../../redux/collection/collectionAction";
import { fetchUserSpecCollection } from "../../../redux/collection/collectionAction";
import CircularProgress from "@mui/material/CircularProgress";

function Collection() {
  const { username } = useParams();
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [searchCollection, setSearchCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.authUser);
  const { user } = authUser;
  
  useEffect(() => {
    dispatch(fetchUserSpecCollection(username));
  }, [dispatch, username]);

  const collectionData = useSelector(
    (state) => state.collection.userSpecCollection
  );

  const { isLoading, collection } = collectionData;


  useEffect(() => {
    if (!isLoading && collection) {
      if (collection.success) {
        setCollections(collection.collections);
      }
    }
  }, [collection, isLoading]);

  const handleClickOpen = () => {
    console.log("open");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  const handleCreateCollection = (data) => {
    dispatch(createCollection(data));
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filteredCollections = collections.filter(collection =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchCollections(filteredCollections);
  }, [searchQuery, collections]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const outLetProps = useOutletContext();
  const style = {
    position: "absolute",
    height: `calc(100vh - ${outLetProps.height}px)`,
    width: `calc(100vw - ${outLetProps.width}px)`,
    top: `${outLetProps.height}px`,
    left: `${outLetProps.width}px`,
  };

  return (
    <>
      <div
        style={style}
        className="ease-in-out duration-100 bg-primary overflow-auto"
      >
        <div className="p-3 md:p-6">
          <div className="flex flex-col gap-y-3 md:gap-y-5">
            <div>
              <h1 className="text-white text-xl">View Collections</h1>
            </div>
            <div className="flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row justify-between sm:items-center">
              <form onSubmit={handleSubmit} className="flex">
                <input
                  name="search"
                  onChange={handleChange}
                  type="search"
                  autoComplete="off"
                  placeholder="Search across collections"
                  className="text-white px-3 py-2 w-full sm:w-96 bg-secondary rounded-l-md outline-none border-2 border-[#232323] border-r-0 focus:placeholder:text-[#808080]"
                />
                <button
                  className="px-3 py-2 bg-primary rounded-r-md border-2 border-[#232323] border-l-0"
                >
                  <SearchIcon sx={{ color: "#f2f2f2" }} />
                </button>
              </form>
              {user && user.user.username === username && (
              <div>
                <span
                  onClick={handleClickOpen}
                  className="text-sm sm:text-base text-white cursor-pointer gap-x-2 flex items-center"
                >
                  <AddCircleOutlineIcon /> Add Collection
                </span>
              </div>
              )}
            </div>

            {isLoading ? (
              <div className="h-[450px] flex justify-center items-center">
                <CircularProgress sx={{ color: "#f2f2f2" }} />
              </div>
            ) : (
              <div>
                {searchCollection && searchCollection.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {searchCollection
                      .slice()
                      .reverse()
                      .map((collection, index) => {
                        return (
                          <CollectionItem collection={collection} key={index} />
                        );
                      })}
                  </div>
                ) : (
                  <div className="py-28 md:p-32 flex flex-col justify-center items-center gap-y-10 w-full h-full">
                    <h1 className="text-[#404040] text-center text-3xl md:text-5xl font-semibold">
                      No Collections Available
                    </h1>
                    {user && user.user.username === username && (
                    <div className="linear-gradient-button">
                      <span
                        onClick={handleClickOpen}
                        className="button-gradient text-white cursor-pointer gap-x-2 flex items-center"
                      >
                        <AddCircleOutlineIcon /> Add Collection
                      </span>
                    </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <CreateCollection
        createCollection={handleCreateCollection}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
}

export default Collection;
