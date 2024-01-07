import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import DashboardLayout from "./components/dashboard/common/DashboardLayout";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Dashboard from "./components/dashboard/Dashboard";
import Features from "./components/pages/home/Features";
import Login from "./components/pages/login/Signin";
import Signup from "./components/pages/login/Signup";
import OTP from "./components/pages/login/OTP";
import Collection from "./components/dashboard/collection/Collection";
import SpecificCollection from "./components/dashboard/collection/snippets/SpecificCollection";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import IndSnippet from "./components/dashboard/snippets/IndSnippet";
import Snippets from "./components/dashboard/snippets/Snippets";
import CreateSnippet from "./components/dashboard/snippets/CreateSnippet";
import UpdateSnippet from "./components/dashboard/snippets/UpdateSnippet";

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
        path: "about",
        element: <About />,
      },
      {
        path: "features",
        element: <Features />,
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
        element: <Signup />,
      },
      {
        path: "email-verification",
        element: <OTP />,
      },
    ],
  },
  {
    path: "/:username",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
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
