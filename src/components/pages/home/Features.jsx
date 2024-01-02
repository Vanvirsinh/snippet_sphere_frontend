import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FolderIcon from "@mui/icons-material/Folder";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DashboardIcon from "@mui/icons-material/Dashboard";

const features = [
  {
    icon: <LockIcon sx={{ fontSize: 70 }} />,
    title: "Privacy Control",
    description:
      "Toggle between public and private settings for your snippets. Keep sensitive code secure or share solutions with your team effortlessly.",
  },
  {
    icon: <LockOpenIcon sx={{ fontSize: 70 }} />,
    title: "Seamless Access",
    description:
      "Effortlessly access your snippet library anytime, anywhere. Whether it's desktop or mobile, your code snippets are just a click away.",
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 70 }} />,
    title: "Robust Security",
    description:
      "Robust authentication ensures your account and snippets are secure. Enjoy coding with peace of mind.",
  },
  {
    icon: <FolderIcon sx={{ fontSize: 70 }} />,
    title: "Folder Organization",
    description:
      "Arrange your snippets systematically in folders. Keep your code library tidy and easily navigable.",
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: 70 }} />,
    title: "Free to Use",
    description:
      "Our platform is completely free to use. No limits, no fees. Enjoy unlimited access to organize and utilize your code snippets.",
  },
  {
    icon: <DashboardIcon sx={{ fontSize: 70 }} />,
    title: "Intuitive Interface",
    description:
      "Our user-friendly interface ensures smooth navigation and ease of use. Organize, search, and manage snippets effortlessly.",
  },
];

function Features() {
  return (
    <>
      <div className="bg-primary px-10 py-14">
        <div className="text-white mb-10">
          <h1 className="text-white text-center text-5xl mb-5 font-semibold">
            Why Snippet Sphere?
          </h1>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-7 mb-10 text-white">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="border border-[#404040] bg-secondary h-full p-4 text-center rounded-md flex flex-col gap-y-5"
                >
                  <div>{feature.icon}</div>
                  <div>
                    <h1 className="text-xl border-l-4 pl-2 border-light-purple w-fit mx-auto">
                      {feature.title}
                    </h1>
                  </div>
                  <div>
                    <p className="text-white/[0.7]">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
