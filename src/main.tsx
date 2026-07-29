import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./app/store";
import "./assets/styles/global.css";
import "./assets/styles/reset.css";
import "./assets/styles/variables.css";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  );
}
