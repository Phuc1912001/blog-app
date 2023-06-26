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
import { createContext, useState } from "react";

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

export const tabContext = createContext(null);

function App() {
  const [showArticles, setShowArticle] = useState<string>("global-feed");
  const [activeTab, setActiveTab] = useState<string>("global-feed");
  const [currentPageTags, setCurrentPageTags] = useState<number>(1);
  const [tagParam, setTagParam] = useState<any>("");

  const values: any = {
    showArticles,
    setShowArticle,
    currentPageTags,
    setCurrentPageTags,
    tagParam,
    setTagParam,
    activeTab,
    setActiveTab,
  };
  return (
    <tabContext.Provider value={values}>
      <RouterProvider router={router} />
    </tabContext.Provider>
  );
}

export default App;
