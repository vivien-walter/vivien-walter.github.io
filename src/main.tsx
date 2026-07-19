import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";
import "./index.css";
import "./App.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Impossible d’initialiser l’application : l’élément #root est introuvable.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
