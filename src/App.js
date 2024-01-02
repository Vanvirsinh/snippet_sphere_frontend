import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Dashboard from "./components/dashboard/Dashboard";
import Features from "./components/pages/home/Features";
import Login from "./components/pages/login/Signin";
import Signup from "./components/pages/login/Signup";

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
      {
        path: "auth/sign-in",
        element: <Login />,
      },
      {
        path: "auth/sign-up",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/:username",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
