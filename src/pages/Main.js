import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import moment from "moment";
import 'moment/locale/ko'

import {Grid, Text} from "../elements";
import theme from "../Styles/theme";
import {IoAddCircle} from "react-icons/io5";
import {BsList, BsBell} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

import {useDispatch} from "react-redux";
import {logout} from "../redux/modules/user";
import {getPlan} from "../redux/modules/plan";

const Main = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const planList = useSelector(state => state.plan.plans.data?.planList);

    const [isOpen, setMenu] = useState(false);

    const logoutBtn = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    };
    // console.log(planList)

    useEffect(() => {
        dispatch(getPlan())
    }, [])

    const Plans = [];
    if (planList) {
        for (let i = 0; i < planList.length; i++) {
            Plans.push(planList[i]);
        }
    }

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }

    const nowDate = moment()
        .format('YYYY년MM월DD일 dddd')


    return (
        <div style={{backgroundColor: '#eee'}}>
            <HeadBox>
                <div style={{
                    height: '100%',
                    width: '40%',
                    paddingRight: '5px',
                    paddingTop: '5px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>
                    <BsBell style={{
                        fontSize: "20px",
                        width: '30px',
                        height: '30px',
                        padding: "5px",
                        cursor: "pointer",
                    }}/>
                    <button className="hamburger-btn" onClick={toggleMenu}>
                        <div className={`menu-trigger ${isOpen ? 'active' : ''}`}>
                            <span/>
                            <span/>
                            <span/>
                        </div>
                    </button>
                </div>
                <ShowMenu isOpen={isOpen}>
                    <div className="side-bar-header">
                        <button className="hamburger-btn" onClick={toggleMenu}>
                            <div className={`menu-trigger ${isOpen ? 'active' : ''}`}>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                        </button>
                    </div>
                    <p>{document.cookie.split("=")[1]} 님</p>
                    <p onClick={() => {
                        navigate('/past')
                    }}>지난 일정</p>
                    <p onClick={logoutBtn}>로그아웃</p>
                </ShowMenu>
            </HeadBox>

            <UserInfo>
                <p>{document.cookie.split("=")[1]} 님</p>
                <p>{nowDate} 입니다.</p>
            </UserInfo>

            <PlanList>
                <Schedules>
                    <p>2022-05-07 T18:55</p>
                    <p>약속이름</p>
                    <p>약속 장소 이름</p>
                    <p>페널티</p>
                </Schedules>
                {Plans.length === 0 ? (
                    <Grid center padding="10px">
                        <Text size="14px" color={theme.color.gray2}>
                            모임이 없습니다
                        </Text>
                        <button
                            onClick={() => {
                                navigate('/add')
                            }}
                        >온잇으로 모임 만들기
                        </button>
                    </Grid>
                ) : (
                    Plans.map((plan, idx) => (
                        <div key={idx}>
                            <Schedules
                                onClick={() => {
                                    navigate(`/detail/${plan.planId}`)
                                }}
                            >
                                <h3>{plan.planDate}</h3>
                                <h3>{plan.planName}</h3>
                                <p>{plan.locationDetail.locationName}</p>
                                <p>{plan.planList?.penalty}</p>
                            </Schedules>
                        </div>
                    ))
                )}
            </PlanList>

            <AddButton onClick={() => {navigate('/add')}}>+</AddButton>
            {Plans.length === 0 ?
                <IoAddCircle
                    onClick={() => {
                        navigate('/add')
                    }}
                    style={{
                        cursor: "pointer",
                        fontSize: "50px",
                        position: "fixed",
                        bottom: "15px",
                        right: "15px",
                        visibility: 'hidden'
                    }}/>
                :
                <IoAddCircle
                    onClick={() => {
                        navigate('/add')
                    }}
                    style={{
                        cursor: "pointer",
                        fontSize: "50px",
                        position: "fixed",
                        bottom: "15px",
                        right: "15px",
                    }}/>}
        </div>
    )
}

export default Main

const HeadBox = styled.div`
  background-color: #eee;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  .hamburger-btn {
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: inherit;
    outline: none;
  }
  .menu-trigger {
    position: relative;
    width: 20px;
    height: 17.6px;
    cursor: pointer;
    &, span {
      display: inline-block;
      transition: all 0.4s;
      box-sizing: border-box;
    }

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #000;
      border-radius: 4px;
    }

    span:nth-of-type(1) {
      top: 0;
    }

    span:nth-of-type(2) {
      top: 7.6px;
    }

    span:nth-of-type(3) {
      bottom: 0;
    }

    /* 2th bar 사라지고,  1st 3rd bar 회전하며 X  */

    &.active {
      span:nth-of-type(1) {
        transform: translateY(7.6px) rotate(-45deg);
      }
      span:nth-of-type(2) {
        opacity: 0;
      }
      span:nth-of-type(3) {
        transform: translateY(-7.6px) rotate(45deg);
      }
    }
  }
`

const UserInfo = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px;
  
  p: first-of-type {
    font-weight: bold;
    font-size: 20px;
  }

  p + p {
    padding-top: 10px;
  }
`

const ShowMenu = styled.div`
  background-color: #ddd;
  width: 40%;
  //height: calc(100% - 40px);
  height: 100%;
  position: fixed;
  right: 0;
  //top: 40px;
  top: 0;
  padding: 10px;
  transform: ${({isOpen}) => `translateX(${isOpen ? 0 : '100%'})`};
  transition: transform 0.2s ease-in-out;
  .side-bar-header {
    display: flex;
    justify-content: flex-end;
  }
  p: first-of-type {
    font-weight: bold;
  }
  p {
    cursor: pointer;
    padding-top: 16px;
  }
`

const PlanList = styled.div`
  padding: 0 30px;
  margin: 30px 0;
  height: 100vh;
  //text-align: center;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }

  button {
    width: 70%;
    height: 35px;
    background-color: #A1ED00;
    border-radius: 10px;
    border: none;
  }
`

const Schedules = styled.div`
  background-color: #A1ED00;
  margin: auto;
  width: 100%;
  border: 1px none #ddd;
  border-radius: 10px;
  padding: 16px 10px;
  p + p {
    margin-top: 16px;
  }
  //p:not(:last-of-type) {
  //  margin-bottom: 1em;
  //}
  //p:not(:first-of-type) {
  //  margin-top: 1em;
  //}
`

const AddButton = styled.button`
  background-color: #A1ED00;
  color: black;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  font-size: 50px;
  font-weight: lighter;
  cursor: pointer;
  position: fixed;
  bottom: 15px;
  right: 15px;

  display: flex;
  text-align: center;
  justify-content: center;
  //line-height: 50px;
  line-height: 1;
`