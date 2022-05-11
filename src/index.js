import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as ReactDOMClient from "react-dom/client";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/configureStore";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";


const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
);

reportWebVitals();
