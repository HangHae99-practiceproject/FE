import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import {setClient} from "./shared/api/client";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import PastSchedule from "./pages/PastSchedule";
import AddPlans from "./pages/AddPlans";
import Test from "./pages/Test";
import Home from "./pages/Home";

function App() {

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setClient(token)
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/add" element={<AddPlans/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/detail" element={<Detail/>}/>
                <Route path="/past" element={<PastSchedule/>}/>
                <Route path="/test" element={<Test/>}/>
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

