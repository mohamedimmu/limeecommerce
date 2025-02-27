import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </BrowserRouter>
);
