import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutBlog from "./Layout/LayoutBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Editor from "./pages/Editor";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Article from "./pages/Article";

import AnotherComponent from "./pages/Nhap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutBlog />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "editor/",
        element: <Editor />,
      },
      {
        path: "editor/:slug",
        element: <Editor />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "profiles/:username",
        element: <Profile />,
      },
      {
        path: "articles/:slug",
        element: <Article />,
      },
      {
        path: "nhap",
        element: <AnotherComponent />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
