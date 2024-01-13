import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";

function Pricing() {
  return (
    <>
      <div>
        <div className="bg-primary px-10 py-14">
          <div>
            <h1 className="text-white text-center text-5xl mb-5 font-semibold">
              We offer a single plan: free! 🌟
            </h1>
          </div>
          <div className="custom-pricing-plan w-fit mx-auto mt-10 rounded-lg">
            <div className="p-10 bg-primary rounded-lg text-white">
              <p className="text-light-purple font-semibold">Starter</p>
              <h1 className="my-5 text-4xl font-semibold">
                Free{" "}
                <span className="text-sm text-white/[0.7] font-normal">
                  /month
                </span>
              </h1>
              <p className="text-white/[0.7]">
                Features you're getting for free!
              </p>
              <ul className="flex flex-col gap-y-2 mt-3">
                <li>
                  <VerifiedIcon
                    sx={{ fontSize: 18, color: "#ffc0cb", mr: 2 }}
                  />
                  Private Snippets
                </li>
                <li>
                  <VerifiedIcon
                    sx={{ fontSize: 18, color: "#ffc0cb", mr: 2 }}
                  />
                  Public Snippets
                </li>
                <li>
                  <VerifiedIcon
                    sx={{ fontSize: 18, color: "#ffc0cb", mr: 2 }}
                  />
                  Basic Search
                </li>
                <li>
                  <VerifiedIcon
                    sx={{ fontSize: 18, color: "#ffc0cb", mr: 2 }}
                  />
                  Syntax Highlighting
                </li>
                <li>
                  <VerifiedIcon
                    sx={{ fontSize: 18, color: "#ffc0cb", mr: 2 }}
                  />
                  Supporting Multiple Language
                </li>
                <li>
                  <VerifiedIcon
                    sx={{ fontSize: 18, color: "#ffc0cb", mr: 2 }}
                  />
                  Folder Organization
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/auth/sign-in" className="linear-gradient-button w-fit">
                      <span className="button-gradient">Get Started 🚀</span>
                    </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
