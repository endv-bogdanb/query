import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "virtual:windi.css";

import { ErrorPage } from "@components";
import { Root } from "@routes/Root";
import { QueryLogin, QueryRoot, QueryUsers } from "@routes/query";
import { SwrLogin, SwrRoot, SwrUsers } from "@routes/swr";
import { ToolkitLogin, ToolkitRoot, ToolkitUsers } from "@routes/toolkit";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/query",
        element: <QueryRoot />,
        children: [
          { path: "/query/", element: <QueryLogin /> },
          { path: "/query/users", element: <QueryUsers /> },
        ],
      },
      {
        path: "/swr",
        element: <SwrRoot />,
        children: [
          { path: "/swr/", element: <SwrLogin /> },
          { path: "/swr/users", element: <SwrUsers /> },
        ],
      },
      {
        path: "/toolkit-query",
        element: <ToolkitRoot />,
        children: [
          { path: "/toolkit-query/", element: <ToolkitLogin /> },
          { path: "/toolkit-query/users", element: <ToolkitUsers /> },
        ],
      },
    ],
  },
]);

function start() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

import("./backend/browser")
  .then(({ worker }) => {
    if (process.env.NODE_ENV === "production") {
      worker.start({ serviceWorker: { url: "/query/mockServiceWorker.js" } });
    } else {
      worker.start();
    }
    return Promise.resolve();
  })
  .then(() => start());