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
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchUserSpecCollection(username));
  }, [dispatch, username]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCollection = (data) => {
    dispatch(createCollection(data));
  };

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
      <div style={style} className="bg-primary overflow-auto">
        <div className="p-6">
          <div className="flex flex-col gap-y-5">
            <div>
              <h1 className="text-white text-xl">View Collections</h1>
            </div>
            <div className="flex justify-between items-center">
              <form action="" className="flex">
                <input
                  type="text"
                  placeholder="Search across collections"
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
                <span
                  onClick={handleClickOpen}
                  className="text-white cursor-pointer gap-x-2 flex items-center"
                >
                  <AddCircleOutlineIcon /> Add Collection
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="h-[450px] flex justify-center items-center">
                <CircularProgress sx={{ color: "#f2f2f2" }} />
              </div>
            ) : (
              <div>
                {collections && collections.length > 0 ? (
                  <div className="grid grid-cols-3 gap-5">
                    {collections.slice().reverse().map((collection, index) => {
                      return (
                        <CollectionItem collection={collection} key={index} />
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-32 flex flex-col justify-center items-center gap-y-10 w-full h-full">
                    <h1 className="text-[#404040] text-5xl font-semibold">
                      No Collections Available
                    </h1>
                    <div className="linear-gradient-button">
                      <span
                        onClick={handleClickOpen}
                        className="button-gradient text-white cursor-pointer gap-x-2 flex items-center"
                      >
                        <AddCircleOutlineIcon /> Add Collection
                      </span>
                    </div>
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
