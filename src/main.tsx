import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import { routes } from "@routes";
import { getPublicUrl, isProduction, TokenRegistry } from "@utils";

const router = createHashRouter(routes);

function start() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

import("./backend/browser")
  .then(({ worker }) => {
    if (isProduction()) {
      worker.start({
        serviceWorker: { url: getPublicUrl("mockServiceWorker.js") },
      });
    } else {
      worker.start();
    }
    return Promise.resolve();
  })
  .then(() => {
    TokenRegistry.setup();
    return Promise.resolve();
  })
  .then(() => start());
