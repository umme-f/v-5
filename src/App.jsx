import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FileProvider } from "./contexts/FileContext";

ReactDOM.render(
  <FileProvider>
    <App />
  </FileProvider>,
  document.getElementById("root")
);
