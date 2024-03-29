import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/app";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { history } from "./modules/routes";
import { StoreProvider } from "./context/store-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <Router history={history}>
    <React.StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
