import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/snippet-sphere-logo-transparent.png";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <>
      <div>
        <div className="bg-primary border-t border-[#303030] p-10 pb-5">
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-2">
              <div className="flex flex-col gap-y-5">
                <div className="h-[50px]">
                  <img className="h-full" src={logo} alt="" />
                </div>
                <div>
                  <p className="text-white/[0.7]">
                    Embark on a coding journey with us! At our core, we're
                    dedicated to simplifying coding complexities, fostering
                    innovation, and empowering every developer with curated,
                    time-saving code solutions.
                  </p>
                </div>
                <Link
                  to="https://ko-fi.com/snippetsphere"
                  target="_blank"
                  className="text-white flex items-center gap-x-3 bg-secondary w-fit py-3 px-4 rounded-md border border-[#303030]"
                >
                  <img
                    className="h-[20px]"
                    src="https://storage.ko-fi.com/cdn/cup-border.png"
                    alt=""
                  />
                  Support us on Ko-fi
                </Link>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-y-5 text-white">
                <h1 className="text-xl text-center">Navigation</h1>
                <ul className="flex flex-col items-center gap-y-2 text-white/[0.7]">
                  <li>Home</li>
                  <li>Snippets</li>
                  <li>Blogs</li>
                  <li>Documentation</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
            <div>
              <div>
                <div className="flex flex-col gap-y-5 text-white">
                  <h1 className="text-xl text-center">Connect with me</h1>
                  <ul className="flex flex-col items-center gap-y-2 text-white/[0.7]">
                    <li>
                      <GitHubIcon sx={{ fontSize: 33 }} />
                    </li>
                    <li>
                      <LinkedInIcon sx={{ fontSize: 33 }} />
                    </li>
                    <li>
                      <LanguageIcon sx={{ fontSize: 33 }} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="flex flex-col gap-y-5 text-white">
                  <h1 className="text-xl text-center">Legal</h1>
                  <ul className="flex flex-col items-center gap-y-2 text-white/[0.7]">
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                    <li>Cookie Policy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#303030] mt-10">
            <div className="text-white/[0.8] text-center flex flex-col gap-y-3 mt-5">
              <p className="text-sm">
                Made with ❤️ by{" "}
                <Link
                  to="https://vanvirsingh.vercel.app/"
                  target="_blank"
                  className="border-b border-white"
                >
                  Vanvirsinh Deora
                </Link>
              </p>
              <p className="text-sm">© 2024 Snippet Sphere. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
