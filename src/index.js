import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import {MainContextProvider} from "./contexts/MainContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <MainContextProvider>
          <App />
        </MainContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
