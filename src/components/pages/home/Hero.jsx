import React from "react";
import "./home.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import codeSnippet from "../../../assets/images/code-snippet-demo-3.png";

function Hero() {
  return (
    <>
      <div>
        <div className="bg-primary">
          <div className="flex px-10 py-14 gap-x-10">
            {/* Left */}
            <div className="w-1/2">
              <div className="text-white flex flex-col gap-y-10">
                <span className="w-fit text-white/[0.90]">
                  💻 Fuel your creativity: Dive into code snippets{" "}
                  <ArrowRightAltIcon sx={{ color: "#800080" }} />
                </span>
                <h1 className="text-5xl font-bold leading-snug">
                  Keep Your Daily-Used{" "}
                  <span className="custom-heading text-7xl">Code Snippets</span>{" "}
                  <br />
                  Instantly Accessible
                </h1>
                <p className="text-white/[0.90]">
                  Access a wealth of code snippets to elevate your projects.
                  From JavaScript to Python, find solutions, inspiration, and
                  efficiency in our diverse collection. Start exploring today!
                  Store, organize, and access your go-to code snippets
                  effortlessly.
                </p>
                <div className="flex gap-x-5 pt-4">
                  <Link className="linear-gradient-button">
                    <span className="button-gradient">Get Started for Free</span>
                  </Link>
                  <Link className="linear-gradient-button">
                    <span className="button-dark">Explore Snippets</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="w-1/2 flex flex-col gap-y-4">
              <h1 className="text-white text-lg">
                How to generate a random number of string...
              </h1>
              <div className="custom-snippet-parent">
                <div className="bg-secondary rounded-md">
                  <img src={codeSnippet} alt="code-snippet-demo" />
                </div>
              </div>
              <div>
                <Link to="/anna-smith" className="flex gap-x-4 w-fit">
                  <span className="user-profile">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/55758/random-user-31.jpg"
                      alt=""
                      className="h-full w-full rounded-full"
                    />
                  </span>
                  <div className="text-white">
                    <h1 className="text-md leading-none">Anna Smith</h1>
                    <span className="text-sm text-white text-opacity-50">
                      1.2k Followers
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
