import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

// Freeze looping CSS animations in capture mode (?still) for screenshots.
if (new URLSearchParams(window.location.search).has("still")) {
  document.documentElement.classList.add("still");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
