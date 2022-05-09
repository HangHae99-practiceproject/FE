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
import PlanSetName from "./pages/PlanSetName";
import NavBar from "./components/NavBar";


//redux
import { setFCMToken } from "./redux/modules/user";
import { useDispatch, useSelector } from "react-redux";

//firebase
import { messaging } from './firebase';
import { deleteToken, getToken} from 'firebase/messaging'

//cookie
import { getCookie, deleteCookie, setCookie } from "./shared/utils/Cookie";

function App() {
    const dispatch = useDispatch();
    const islogin = localStorage.getItem('token') ? true : false;
    const userNick = document.cookie.split("=")[1];
    const user = useSelector(state => state?.user?.user_info)
    const browsernoti = Notification.permission === 'granted' ? true : false;
  useEffect(() => {
    // console.log('app.js::didmount');

    if (user.isNoticeAllowed !== undefined) {
      // console.log('noti ', user);
      if (browsernoti === user.isNoticeAllowed) {
        // console.log('noti서로 같음', user.isNoticeAllowed);
        return;
      } else {
        // console.log('noti서로 다름', user.isNoticeAllowed);
        if (!browsernoti) {
          // console.log("noti '' 보냄");
          const data = {
            token: '',
          };
          getToken(messaging, {
            vapidKey: "BLg2NeG06gdfa1DbdDn1E6VFSD8a82zuaxgPXS5drdMaqUSf_lY421iglOkbev53HaDsl2jkw5vxgMaA4b6wfug",
          }).then(token => {
            deleteToken(messaging).then(() => {
              // console.log('deleteFCMtoken');
              deleteCookie('FCMtoken');
            });
          });

          dispatch(setFCMToken(data));
          return;
        } else {
          // console.log('noti 토큰 보냄');

          getToken(messaging, {
            vapidKey: "BLg2NeG06gdfa1DbdDn1E6VFSD8a82zuaxgPXS5drdMaqUSf_lY421iglOkbev53HaDsl2jkw5vxgMaA4b6wfug",
          }).then(token => {
            // console.log(token);
            setCookie('FCMtoken', token, 20);
            const data = {
              token: getCookie('FCMtoken'),
            };
            dispatch(setFCMToken(data));
          });
        }
      }
    }
  })



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

