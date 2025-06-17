import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
