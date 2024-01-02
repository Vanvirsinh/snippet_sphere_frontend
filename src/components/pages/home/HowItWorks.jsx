import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import codeSnippet from "../../../assets/images/code-snippet-demo.png";
import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <div>
      <div className="bg-primary px-10 py-14">
        <div>
          <h1 className="text-white text-center text-5xl mb-5 font-semibold">
            🚀 Explore How Snippet Sphere Works
          </h1>
        </div>
        <div>
          <div className="mt-10 text-white">
            <Timeline position="alternate">
              {/* Step 1 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img src={codeSnippet} alt="" />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl">Register or Sign In 💻</h1>
                    <p className="text-white/[0.8] text-justify">
                      Get started by registering or signing in to your account.
                      Enjoy the full suite of features by creating your
                      personalized workspace.
                    </p>
                    <Link className="linear-gradient-button w-fit">
                      <span className="button-gradient">Sign In</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>

              {/* Step 2 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img src={codeSnippet} alt="" />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl text-start">
                      Create Public or Private Collection 🔐
                    </h1>
                    <p className="text-white/[0.8] text-justify">
                      Organize your snippets into public or private collections.
                      Keep sensitive code secure or contribute openly to the
                      coding community.
                    </p>
                    <Link className="linear-gradient-button w-fit">
                      <span className="button-gradient">Get Started Now</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>

              {/* Step 3 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img src={codeSnippet} alt="" />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl">Store Your Snippets 📝</h1>
                    <p className="text-white/[0.8] text-justify">
                      Save and manage your code snippets effortlessly. Store
                      solutions, ideas, or reusable code for quick access
                      anytime, anywhere.
                    </p>
                    <Link className="linear-gradient-button w-fit">
                      <span className="button-gradient">Store Snippets</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>

              {/* Step 4 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img src={codeSnippet} alt="" />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl text-start">Contribute to Open Source 🌐</h1>
                    <p className="text-white/[0.8] text-justify">
                      Share your knowledge and expertise by contributing public
                      snippets. Empower the open-source community with your
                      solutions.
                    </p>
                    <Link className="linear-gradient-button w-fit">
                      <span className="button-gradient">Contribute Now</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>

              {/* Step 5 */}
              <TimelineItem>
                <TimelineOppositeContent sx={{ py: 0 }}>
                  <div className="py-10">
                    <img src={codeSnippet} alt="" />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector sx={{ backgroundColor: "#ffc0cb" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <div className="flex flex-col gap-y-5 justify-center h-full">
                    <h1 className="text-2xl">Store and Access Easily 🎯</h1>
                    <p className="text-white/[0.8] text-justify">
                      Effortlessly store and access your snippets in an
                      organized manner. Streamline your coding workflow with
                      easy retrieval.
                    </p>
                    <Link className="linear-gradient-button w-fit">
                      <span className="button-gradient">View your Snippets</span>
                    </Link>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
