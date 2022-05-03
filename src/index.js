import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as ReactDOMClient from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./redux/configureStore";
import {BrowserRouter} from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";



const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
    <Provider store={store}>
      <GlobalStyle />
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
);

reportWebVitals();