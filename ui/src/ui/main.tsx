import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { applyStoredTheme } from "./theme";
import { getLang } from "./i18n";

// Before the first render, not inside a component: a theme applied in an effect
// paints the default palette first and then swaps it, which reads as a flicker
// on every single load.
applyStoredTheme();
document.documentElement.setAttribute("lang", getLang());

const container = document.getElementById("root");
if (!container) throw new Error("#root is missing from index.html");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
