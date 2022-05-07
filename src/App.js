import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import PastPlan from "./pages/PastPlan";
import AddPlans from "./pages/AddPlans";
import Home from "./pages/Home";
import Real from "./pages/teeest";
import PlanSetName from "./pages/PlanSetName";
import NavBar from "./components/NavBar";
import Test from "./pages/Test";
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
                <Route path="/details/:url" element={<PlanSetName islogin={islogin} userNick={userNick} />} />
                <Route path="/past" element={<PastPlan/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/real" element={<Real/>}/>
                <Route path='/drawer' element={<NavBar/>}/>
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

