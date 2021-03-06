import React from "react";
import { Router } from "@reach/router";

import Home from "./features/home/Home";

import "./App.css";

function App() {
  return (
    <Router>
      <Home path="/" />
    </Router>
  );
}

export default App;
