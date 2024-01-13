import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import DashboardLayout from "./components/dashboard/common/DashboardLayout";
import Home from "./components/pages/home/Home";
import Overview from "./components/dashboard/overview/Overview";
import Features from "./components/pages/home/Features";
import Login from "./components/pages/login/Signin";
import SignUp from "./components/pages/login/Signup";
import OTP from "./components/pages/login/OTP";
import Collection from "./components/dashboard/collection/Collection";
import SpecificCollection from "./components/dashboard/collection/snippets/SpecificCollection";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import IndSnippet from "./components/dashboard/snippets/IndSnippet";
import Snippets from "./components/dashboard/snippets/Snippets";
import CreateSnippet from "./components/dashboard/snippets/CreateSnippet";
import UpdateSnippet from "./components/dashboard/snippets/UpdateSnippet";
import Analytics from "./components/dashboard/analytics/Analytics";
import Profile from "./components/dashboard/profile/Profile";
import Settings from "./components/dashboard/setting/Settings";
import AllSnippets from "./components/pages/snippets/AllSnippets";
import PinnedSnippets from "./components/dashboard/pinned/PinnedSnippets";
import Pricing from "./components/pages/home/Pricing";
import FAQ from "./components/pages/home/FAQ";
import ForgetPassword from "./components/pages/login/ForgetPassword";
import OTPForgetPassword from "./components/pages/login/OTPForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "explore-snippets",
        element: <AllSnippets />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "faqs",
        element: <FAQ />,
      },
    ],
  },
  {
    path: "auth",
    element: <Layout />,
    children: [
      {
        path: "sign-in",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "email-verification",
        element: <OTP />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "forget-password/email-verification",
        element: <OTPForgetPassword />,
      },
    ],
  },
  {
    path: "/:username",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "pinned-snippets",
        element: <PinnedSnippets />,
      },
      {
        path: "settings",
        element: <Settings />,
        children: [
          {
            path: "profile",
            element: <Settings />,
          },
          {
            path: "reset-password",
            element: <Settings />,
          },
        ],
      },
      {
        path: "collection",
        children: [
          {
            path: "",
            element: <Collection />,
          },
          {
            path: ":collectionId",
            element: <SpecificCollection />,
          },
        ],
      },
      {
        path: "snippets",
        children: [
          {
            path: "",
            element: <Snippets />,
          },
          {
            path: "new",
            element: <CreateSnippet />,
          },
          {
            path: ":snippetId",
            children: [
              {
                path: "",
                element: <IndSnippet />,
              },
              {
                path: "update",
                element: <UpdateSnippet />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </div>
    </>
  );
}

export default App;
