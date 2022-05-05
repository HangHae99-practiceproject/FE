import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import {setClient} from "./shared/api/client";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import PastSchedule from "./pages/PastSchedule";
import AddPlans from "./pages/AddPlans";
import Test from "./pages/Test";

function App() {

    useEffect(() => {
        const token = localStorage.getItem('jwt-token')
        if (token) {
            setClient(token)
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
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

