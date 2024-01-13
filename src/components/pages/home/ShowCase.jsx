import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import codeSnippet from "../../../assets/images/code-snippet-demo-3.png";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Link } from "react-router-dom";
import codeSnippet2 from "../../../assets/images/code-snippet-demo.png";

function ShowCase() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/explore-snippets?page=1&search=${searchQuery}`);
  };

  return (
    <>
      <div>
        <div className="bg-primary px-10 py-14">
          <div className="text-white mb-10">
            <h1 className="text-light-purple text-2xl mb-5 font-semibold">
              Code Mastery Unlocked
            </h1>
            <h1 className="text-5xl font-semibold">
              Explore, Organize, Innovate{" "}
              <TurnRightIcon
                className="rotate-90"
                sx={{ color: "#800080", fontSize: 30 }}
              />
            </h1>
          </div>
          {/* Search across public snippets */}
          <div className="flex gap-x-10 text-white">
            <div className="w-1/2">
              <div>
                <img src={codeSnippet} alt="" />
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex flex-col gap-y-5">
                <h1 className="text-4xl font-normal">
                  Search across public snippets
                </h1>
                <p className="text-white/[0.80] text-justify">
                  Tired of rewriting the same code? Our snippet manager
                  simplifies your coding process. Save frequently used snippets,
                  from function templates to complex algorithms, and access them
                  instantly whenever you need them. Say goodbye to repetitive
                  coding tasks.
                </p>
                <ul className="flex flex-col gap-y-3">
                  <li>
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: 18, mr: 2, color: "#800080" }}
                    />
                    Save Time, Code Less
                  </li>
                  <li>
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: 18, mr: 2, color: "#800080" }}
                    />
                    Efficient Collaboration
                  </li>
                  <li>
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: 18, mr: 2, color: "#800080" }}
                    />
                    Tailored for Productivity
                  </li>
                  <li>
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: 18, mr: 2, color: "#800080" }}
                    />
                    Customizable and Convenient
                  </li>
                </ul>
                <form onSubmit={handleSubmit} >
                  <input
                    className="rounded-md p-4 w-96 border border-[#303030] bg-secondary"
                    type="text"
                    placeholder="Search for snippets 🔎"
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Share solution open source */}
          <div className="flex gap-x-10 text-white mt-16">
            <div className="w-1/2">
              <div className="flex flex-col gap-y-5">
                <h1 className="text-4xl font-normal text-start leading-normal">
                  Share Open-Source Solutions
                </h1>
                <p className="text-white/[0.80] text-justify">
                  Empower the open-source community by contributing and sharing
                  your innovative code solutions. Seamlessly collaborate, offer
                  valuable insights, and enhance projects by sharing snippets
                  openly. Whether it's fixing a bug, optimizing performance, or
                  introducing new functionalities, our platform fosters a
                  collaborative environment for the exchange of ideas and
                  solutions among developers worldwide.
                </p>
                <div className="w-fit mr-auto">
                  <Link to="/auth/sign-in" className="linear-gradient-button">
                    <span className="button-gradient">Get Started 🚀</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <img src={codeSnippet2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowCase;
