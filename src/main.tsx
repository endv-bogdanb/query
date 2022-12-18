import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "virtual:windi.css";

import { ErrorPage } from "@components";
import { Root } from "@routes/Root";
import { QueryLogin, QueryRoot, QueryUsers } from "@routes/query";
import { SwrLogin, SwrRoot } from "@routes/swr";
import { ToolkitLogin, ToolkitRoot } from "@routes/toolkit";

const router = createBrowserRouter([
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
        children: [{ path: "/swr/", element: <SwrLogin /> }],
      },
      {
        path: "/toolkit-query",
        element: <ToolkitRoot />,
        children: [{ path: "/toolkit-query/", element: <ToolkitLogin /> }],
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
    worker.start();
    return Promise.resolve();
  })
  .then(() => start());
