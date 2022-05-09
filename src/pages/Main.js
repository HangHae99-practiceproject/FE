import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import moment from "moment";
import 'moment/locale/ko'

import {Text} from "../elements";
import theme from "../Styles/theme";
import { BsBell } from "react-icons/bs";
import {useNavigate} from "react-router-dom";

import {useDispatch} from "react-redux";
import {logout} from "../redux/modules/user";
import {getPlan} from "../redux/modules/plan";

const Main = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const planList = useSelector(state => state.plan.plans.data?.planList);

    // console.log(planList && planList)

    const [isOpen, setMenu] = useState(false);

    const logoutBtn = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    };

    useEffect(() => {
        dispatch(getPlan(planList))
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
        <div style={{backgroundColor: '#eee', height:'100vh'}}>
            <HeadBox>
                <div style={{
                    height: '100%',
                    width: '40%',
                    paddingRight: '8px',
                    paddingBottom:'8px',
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
                {/*<div className='lists'>*/}
                {/*    <h3>2022-05-07 T18:55</h3>*/}
                {/*    <p>약속이름</p>*/}
                {/*    <p>약속 장소 이름</p>*/}
                {/*    <p>페널티</p>*/}
                {/*</div>*/}
                {/*<div className='lists'>*/}
                {/*    <h3>2022-05-07 T18:55</h3>*/}
                {/*    <p>약속이름</p>*/}
                {/*    <p>약속 장소 이름</p>*/}
                {/*    <p>페널티</p>*/}
                {/*</div>*/}
                {/*<div className='lists'>*/}
                {/*    <h3>2022-05-07 T18:55</h3>*/}
                {/*    <p>약속이름</p>*/}
                {/*    <p>약속 장소 이름</p>*/}
                {/*    <p>페널티</p>*/}
                {/*</div>*/}
                {/*<div className='lists'>*/}
                {/*    <h3>2022-05-07 T18:55</h3>*/}
                {/*    <p>약속이름</p>*/}
                {/*    <p>약속 장소 이름</p>*/}
                {/*    <p>페널티</p>*/}
                {/*</div>*/}
                {Plans.length === 0 ? (
                    <div style={{
                        textAlign: "center",
                        width: '100%',
                        padding: '10px 0',
                        marginTop: '20px',
                    }}>
                        <Text size="14px" color={theme.color.gray1}>
                            아직 약속이 없습니다!
                            <br style={{padding:'16px'}}/>
                            즐거운 모임 온잇에서 어떠신가요?
                        </Text>
                        <button
                            onClick={() => {
                                navigate('/add')
                            }}
                        >온잇으로 모임 만들기
                        </button>
                    </div>
                ) : (
                    Plans.map((plan, idx) => (
                        <div key={idx}>
                            <div className='lists'
                                onClick={() => {
                                    navigate(`/detail/${plan.planId}`)
                                }}
                            >
                                <h3>{plan.planDate}</h3>
                                <p>{plan.planName}</p>
                                <p>{plan.locationDetail.name}</p>
                                <p>{plan.planList?.penalty}</p>
                            </div>
                        </div>
                    ))
                )}
            </PlanList>
            {Plans.length === 0 ? null :
            <AddButton onClick={() => {
                navigate('/add')
            }}>+</AddButton>}
        </div>
    )
}

export default Main

const HeadBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
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
      top: 7.7px;
    }

    span:nth-of-type(3) {
      bottom: 0;
    }

    /* 2th bar 사라지고,  1st 3rd bar 회전하며 X  */

    &.active {
      span:nth-of-type(1) {
        transform: translateY(7.8px) rotate(-45deg);
      }
      span:nth-of-type(2) {
        opacity: 0;
      }
      span:nth-of-type(3) {
        transform: translateY(-7.8px) rotate(45deg);
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
  margin-top: 30px;
  overflow: hidden;
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
  .lists:first-of-type {
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    background-color: #A1ED00;
    width: 100%;
    height: 25vh;
    font-size: 24px;
  }
  .lists:first-of-type > h3 {
    font-size: 32px;
  }
  
  .lists {
    background-color: white;
    margin-top: 16px;
    width: 100%;
    border: 1px none #ddd;
    border-radius: 10px;
    padding: 16px 10px;
  }
  h3 {
    padding-bottom: 16px;
    font-weight: bold;
    font-size: 20px;
  }
    p + p {
    margin-top: 8px;
  }
`

const Schedules = styled.div`
  background-color: #A1ED00;
  margin: 16px auto;
  width: 100%;
  border: 1px none #ddd;
  border-radius: 10px;
  padding: 16px 10px;
  
  h3: first-of-type { 
    padding-bottom: 8px;
    font-weight: bold;
    font-size: 20px;
  }
  h3 + h3 {
    padding-bottom: 8px;
  }
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