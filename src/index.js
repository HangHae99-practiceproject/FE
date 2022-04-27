import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { Provider } from 'react-redux'
import CustomRouter from './customRouter'
import { createBrowserHistory } from "history";
import GlobalStyle from './Styles/GlobalStyle';


const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle>
      <CustomRouter history={history}>
        <App />
      </CustomRouter>
      </GlobalStyle>
    </Provider>
  </React.StrictMode>
);


export default history;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
