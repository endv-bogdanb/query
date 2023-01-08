import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { routes } from "@routes";
import { getPublicUrl, TokenRegistry } from "@utils";

const router = createHashRouter(routes);

function start() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </React.StrictMode>
  );
}

import("./backend/browser")
  .then(({ worker }) => {
    if (import.meta.env.PROD) {
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
