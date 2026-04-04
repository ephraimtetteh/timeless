import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/Context.jsx";
import { Provider } from "react-redux";
import { store } from "./lib/store.js";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

);
