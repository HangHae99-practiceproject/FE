import {useSelector, useDispatch} from "react-redux";
import { updateUser } from "../redux/modules/user";
import styled from "styled-components";
import React, {useEffect} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/ko'

//components
import FCMtoken from "../components/FCMtoken";
import PlanTab from "../components/PlanTab";
import SideMenu from "../components/SideMenu";
import theme from "../styles/theme";
import {ReactComponent as Plus} from "../img/icon/Plus.svg";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

dayjs.locale('ko')

const Main = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.user_info)
    const token = localStorage.getItem('token')
    const nowDate = dayjs()
        .format('YYYY년MM월DD일 dddd')

    useEffect(() => {
      if(userData){
        dispatch(updateUser())
      }
      if(!token){
        Swal.fire({
          text: '로그인을 해주세요!',
          icon: 'error',
          timer: 2000
        })
        navigate('/login')
      }
    }, [userData?.profileImg])

    return (
        <Container>
            <FCMtoken/>
            <SideMenu/>
            <UserInfo>
                <div className='member-profile'
                     style={{
                         backgroundImage: `url(${userData?.profileImg})`,
                         backgroundSize: 'cover',
                     }}/>
                <p>{userData?.nickname ? userData.nickname : '손'} 님 <br/>{nowDate} 입니다.</p>
            </UserInfo>
            <div>
                <PlanTab/>
            </div>
            <Plus className='plus-icon' src='Plus.svg'
                  onClick={() => {
                      navigate('/add')
                  }}/>
        </Container>
    )
}

export default Main

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color.gray7};
  position: relative;

  .logo {
    position: absolute;
    left: 24px;
    top: 20px;
  }

  .plus-icon {
    position: absolute;
    bottom: 15px;
    right: 15px;
    z-index: 1;
    cursor: pointer;
  }
`

const UserInfo = styled.div`
  background-color: transparent;
  width: 100%;
  padding: 10px 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;

  p: first-of-type {
    font-size: 18px;
    margin: auto;
    justify-content: center;
    align-items: center;
  }.member-profile {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
`

