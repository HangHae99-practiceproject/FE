import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import PastSchedule from "./pages/PastSchedule";
import AddPlans from "./pages/AddPlans";
import Home from "./pages/Home";
import Real from "./pages/teeest";
import PlanSetName from "./pages/PlanSetName";
//firebase


function App() {

    const islogin = localStorage.getItem('token') ? true : false;
    const userNick = document.cookie.split("=")[1];


    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/add" element={<AddPlans/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/detail/:planId" element={<Detail/>}/>
                <Route path="/past" element={<PastSchedule/>}/>
                <Route path="/real" element={<Real/>}/>
                <Route path="/details/:url" element={<PlanSetName islogin={islogin} userNick={userNick} />} />
            </Routes>
            <GlobalStyle/>
        </>

    );
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

export default App;

