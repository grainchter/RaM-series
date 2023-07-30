import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { SeriesContext } from "./context";

import { Provider } from "react-redux";
import { store } from "./store/hooks";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
