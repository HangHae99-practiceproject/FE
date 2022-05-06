import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import {setClient} from "./shared/api/client";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import PastPlan from "./pages/PastPlan";
import AddPlans from "./pages/AddPlans";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Real from "./pages/teeest";
import NavBar from "./components/NavBar";
//firebase


function App() {


    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         setClient(token)
    //     }
    // }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/add" element={<AddPlans/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/detail/:planId" element={<Detail/>}/>
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

