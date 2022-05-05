import React, {useState} from "react";
import styled from "styled-components";

import { IoAddCircle } from "react-icons/io5";
import { BsList, BsBell } from "react-icons/bs";
import {useNavigate} from "react-router-dom";

import ScheduleContainer from "../components/ScheduleContainer";
import {useDispatch} from "react-redux";
import {logout} from "../redux/modules/user";
import NavBar from "../components/NavBar";

const Main = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutBtn = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        console.log(logout)
    }

    return (
        <div>
            {/*<NavBar />*/}
            <HeadBox>

                <div onClick={logoutBtn}>로그아웃</div>
                <BsBell style={{
                    fontSize: "20px",
                    margin: "5px",
                    cursor: "pointer"
                }}/>
                <BsList style={{
                    fontSize: "20px",
                    margin: "5px",
                    cursor: "pointer"
                }}/>
            </HeadBox>

            <UserInfo>
                <p>{props.nickName} 님</p>
                <p>{props.today} 입니다.</p>
            </UserInfo>

            <ScheduleContainer/>

            <IoAddCircle
                onClick={() => {navigate('/add')}} style={{
                cursor: "pointer",
                fontSize: "50px",
                position: "fixed",
                bottom: "15px",
                right: "15px"
            }}/>
        </div>
    )
}

Main.defaultProps = {
    nickName: '온잇',
    today: '2022년 5월 01일'
}

export default Main

const HeadBox = styled.div`
  background-color: red;
  width: 100%;
  text-align: right;
  padding: 0 5px 0 0;
  margin: 5px 0 5px 0;
`

const UserInfo = styled.div`
  background-color: green;
  width: 100%;
  padding: 0 0 0 5px;
`

const AddButton = styled.div`
  cursor: pointer;
  background-color: slateblue;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;

  font-size: 50px;
  font-weight: 800;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
`