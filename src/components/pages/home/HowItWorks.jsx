import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import SignIn from "../../../assets/images/sign-in.png";
import CreateCollections from "../../../assets/images/create-collections.png";
import StoreSnippets from "../../../assets/images/store-snippets.png";
import Contribute from "../../../assets/images/contribution-open-source.png";
import StoreAndAccess from "../../../assets/images/store-and-access.png";
import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <div>
      <div className="bg-primary md:px-10 md:py-14 sm:px-5 sm:py-5 p-3 pt-0">
        <div>
          <h1 className="text-white text-center text-3xl md:text-5xl mb-3 md:mb-5 font-semibold">
            🚀 Explore How Snippet Sphere Works
          </h1>
        </div>
        <div>
          <div className="md:block hidden mt-5 md:mt-10 text-white">
            <Timeline position="alternate">
              {/* Step 1 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img
                      className="border-2 rounded-md border-[#303030]"
                      src={SignIn}
                      alt=""
                    />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="font-poppins flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl">Register or Sign In 💻</h1>
                    <p className="text-white/[0.8]text-justify">
                      Get started by registering or signing in to your account.
                      Enjoy the full suite of features by creating your
                      personalized workspace.
                    </p>
                    <Link
                      to="/auth/sign-in"
                      className="linear-gradient-button w-fit"
                    >
                      <span className="button-gradient">Sign In</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>

              {/* Step 2 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img
                      className="border-2 rounded-md border-[#303030]"
                      src={CreateCollections}
                      alt=""
                    />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="font-poppins flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl text-start">
                      Create Public or Private Collection 🔐
                    </h1>
                    <p className="text-white/[0.8] text-justify">
                      Organize your snippets into public or private collections.
                      Keep sensitive code secure or contribute openly to the
                      coding community.
                    </p>
                    <Link
                      to="/auth/sign-in"
                      className="linear-gradient-button w-fit"
                    >
                      <span className="button-gradient">Get Started Now</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>

              {/* Step 3 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img
                      className="border-2 rounded-md border-[#303030]"
                      src={StoreSnippets}
                      alt=""
                    />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="font-poppins flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl">Store Your Snippets 📝</h1>
                    <p className="text-white/[0.8] text-justify">
                      Save and manage your code snippets effortlessly. Store
                      solutions, ideas, or reusable code for quick access
                      anytime, anywhere.
                    </p>
                    <Link
                      to="/auth/sign-in"
                      className="linear-gradient-button w-fit"
                    >
                      <span className="button-gradient">Store Snippets</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>

              {/* Step 4 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img
                      className="border-2 rounded-md border-[#303030]"
                      src={Contribute}
                      alt=""
                    />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="font-poppins flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl text-start">
                      Contribute to Open Source 🌐
                    </h1>
                    <p className="text-white/[0.8] text-justify">
                      Share your knowledge and expertise by contributing public
                      snippets. Empower the open-source community with your
                      solutions.
                    </p>
                    <Link
                      to="/auth/sign-in"
                      className="linear-gradient-button w-fit"
                    >
                      <span className="button-gradient">Contribute Now</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>

              {/* Step 5 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img
                      className="border-2 rounded-md border-[#303030]"
                      src={StoreAndAccess}
                      alt=""
                    />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="font-poppins flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl">Store and Access Easily 🎯</h1>
                    <p className="text-white/[0.8] text-justify">
                      Effortlessly store and access your snippets in an
                      organized manner. Streamline your coding workflow with
                      easy retrieval.
                    </p>
                    <Link
                      to="/auth/sign-in"
                      className="linear-gradient-button w-fit"
                    >
                      <span className="button-gradient">
                        View your Snippets
                      </span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
          <div className="md:hidden flex flex-col gap-y-5 mt-5 text-white">
            {/* Step 1 */}
            <div>
              <div className="py-3">
                <img
                  className="border rounded-md border-[#303030]"
                  src={SignIn}
                  alt=""
                />
              </div>
              <div className="font-poppins flex flex-col gap-y-3 justify-center h-full">
                <h1 className="text-xl">Register or Sign In 💻</h1>
                <p className="text-white/[0.8]">
                  Get started by registering or signing in to your account.
                  Enjoy the full suite of features by creating your personalized
                  workspace.
                </p>
                <Link
                  to="/auth/sign-in"
                  className="linear-gradient-button w-fit"
                >
                  <span
                    className="button-gradient"
                    style={{ padding: "8px 15px", borderRadius: "1px" }}
                  >
                    Sign In
                  </span>
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div className="py-3">
                <img
                  className="border rounded-md border-[#303030]"
                  src={CreateCollections}
                  alt=""
                />
              </div>
              <div className="font-poppins flex flex-col gap-y-3 justify-center h-full">
                <h1 className="text-xl text-start">
                  Create Public or Private Collection 🔐
                </h1>
                <p className="text-white/[0.8]">
                  Organize your snippets into public or private collections.
                  Keep sensitive code secure or contribute openly to the coding
                  community.
                </p>
                <Link
                  to="/auth/sign-in"
                  className="linear-gradient-button w-fit"
                >
                  <span className="button-gradient" style={{ padding: "8px 15px", borderRadius: "1px" }}>Get Started Now</span>
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="py-3">
                <img
                  className="border rounded-md border-[#303030]"
                  src={StoreSnippets}
                  alt=""
                />
              </div>
              <div className="font-poppins flex flex-col gap-y-3 justify-center h-full">
                <h1 className="text-xl">Store Your Snippets 📝</h1>
                <p className="text-white/[0.8]">
                  Save and manage your code snippets effortlessly. Store
                  solutions, ideas, or reusable code for quick access anytime,
                  anywhere.
                </p>
                <Link
                  to="/auth/sign-in"
                  className="linear-gradient-button w-fit"
                >
                  <span className="button-gradient" style={{ padding: "8px 15px", borderRadius: "1px" }}>Store Snippets</span>
                </Link>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="py-3">
                <img
                  className="border rounded-md border-[#303030]"
                  src={Contribute}
                  alt=""
                />
              </div>
              <div className="font-poppins flex flex-col gap-y-3 justify-center h-full">
                <h1 className="text-xl text-start">
                  Contribute to Open Source 🌐
                </h1>
                <p className="text-white/[0.8]">
                  Share your knowledge and expertise by contributing public
                  snippets. Empower the open-source community with your
                  solutions.
                </p>
                <Link
                  to="/auth/sign-in"
                  className="linear-gradient-button w-fit"
                >
                  <span className="button-gradient" style={{ padding: "8px 15px", borderRadius: "1px" }}>Contribute Now</span>
                </Link>
              </div>
            </div>

            {/* Step 5 */}
            <div>
              <div className="py-3">
                <img
                  className="border rounded-md border-[#303030]"
                  src={StoreAndAccess}
                  alt=""
                />
              </div>
              <div className="font-poppins flex flex-col gap-y-3 justify-center h-full">
                <h1 className="text-xl">Store and Access Easily 🎯</h1>
                <p className="text-white/[0.8]">
                  Effortlessly store and access your snippets in an organized
                  manner. Streamline your coding workflow with easy retrieval.
                </p>
                <Link
                  to="/auth/sign-in"
                  className="linear-gradient-button w-fit"
                >
                  <span className="button-gradient" style={{ padding: "8px 15px", borderRadius: "1px" }}>View your Snippets</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
