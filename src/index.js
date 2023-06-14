import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.interceptors.response.use(
  function(res){
    return res
  },
  function(err){
    if(err.response.status === 401){
      if(err.response.data.code === '4401'){
        window.location.href = '/signin'
      }
    }
    return Promise.reject(err);
  }
)


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
