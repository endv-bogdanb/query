import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { routes } from "@routes";
import { getPublicUrl, tokenSlice } from "@utils";

const router = createHashRouter(routes);

function start() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <MantineProvider
        defaultColorScheme="auto"
        stylesTransform={emotionTransform}
      >
        <MantineEmotionProvider>
          <RouterProvider router={router} />
        </MantineEmotionProvider>
      </MantineProvider>
    </React.StrictMode>,
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
    tokenSlice.dispatch({ type: "setup" });
    return Promise.resolve();
  })
  .then(() => start());
