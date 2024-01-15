import React from "react";
import SnippetLogo from "../../../assets/images/snippets-logo.png";
import { Link } from "react-router-dom";

function AllSnippetItem({ snippet, profile }) {

  return (
    <>
      <div className="relative bg-secondary rounded-md p-5">
        <Link
          to={`/${snippet.authorName}/snippets/${snippet.snippetId}`}
          className="flex items-center justify-center hover:scale-110 ease-in-out duration-300"
        >
          <img src={SnippetLogo} className="h-[150px]" alt="" />
        </Link>
        <div className="flex gap-x-5 mt-5 text-white items-start">
          <div>
            {profile && (
              <Link
                to={`/${profile.username}`}
                className="cursor-pointer user-profile"
                style={{ border: "1px solid #303030", background: "#1c1c1c" }}
              >
                {profile && profile.profilePicture === "" ? (
                  <div className="h-full w-full rounded-full flex justify-center items-center">
                    <h1 className="text-white/[0.8] text-center text-xl font-semibold">
                      {profile.name.charAt(0)}
                    </h1>
                  </div>
                ) : (
                  <img
                    src={`https://snippetsphere.online${profile.profilePicture}`}
                    alt=""
                    className="h-full w-full rounded-full"
                  />
                )}
              </Link>
            )}
          </div>
          <div className="flex gap-y-1 flex-col">
            <Link
              to={`/${snippet.authorName}/snippets/${snippet.snippetId}`}
              className="hover:text-white/[0.8]"
            >
              {snippet.title.slice(0, 40)}
            </Link>
            <p className="text-xs text-white/[0.7]">{snippet.authorName}</p>
          </div>
          <span className="text-xs bottom-5 right-5 absolute bg-primary p-1 rounded text-white/[0.6]">
            {snippet.language}
          </span>
        </div>
      </div>
    </>
  );
}

export default AllSnippetItem;
