import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import 'moment/locale/ko'

import { Grid, Text } from "../elements";
import theme from "../Styles/theme";
import { IoAddCircle } from "react-icons/io5";
import { BsList, BsBell } from "react-icons/bs";
import {useNavigate} from "react-router-dom";

import ScheduleContainer from "../components/ScheduleContainer";
import {useDispatch} from "react-redux";
import {logout} from "../redux/modules/user";
import { getPlan } from "../redux/modules/plan";
import {onHidden} from "web-vitals/dist/modules/lib/onHidden";

const Main = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const planList = useSelector(state => state.plan.plans.data?.planList);

    const logoutBtn = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    };
    console.log(planList)
    useEffect(() => {
        dispatch(getPlan())
    }, [])

    const Plans = [];
    if (planList) {
        for (let i = 0; i < planList.length; i++) {
            Plans.push(planList[i]);
        }
    }

    const [isOpen, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }

    const nowTime = moment()
        .format('YYYY'+'년'+'MM'+'월'+'DD'+'일' +' '+ 'HH'+'시'+'mm'+'분')

    return (
        <div>
            <HeadBox>
                <BsBell style={{
                    fontSize: "20px",
                    margin: "5px",
                    cursor: "pointer"
                }}/>
                <BsList style={{
                    fontSize: "20px",
                    margin: "5px",
                    cursor: "pointer"
                }} onClick={() => toggleMenu()}/>
                {isOpen ? <ShowMenu>
                    <p>{document.cookie.split("=")[1]} 님</p>
                    <p onClick={()=>{navigate('/past')}} >지난 일정</p>
                    <p onClick={logoutBtn}>로그아웃</p>
                </ShowMenu> : <HideMenu>
                    <span></span>
                </HideMenu>}
            </HeadBox>

            <UserInfo>
                <p>{document.cookie.split("=")[1]} 님</p>
                <p>{nowTime} 입니다.</p>
            </UserInfo>
            {/* <ScheduleContainer /> */}
            <PlanList>
                {Plans.length === 0 ? (
                    <Grid center padding="10px">
                        <Text size="14px" color={theme.color.gray2}>
                            모임이 없습니다
                        </Text>
                        <button
                            onClick={() => {navigate('/add')}}
                        >온잇으로 모임 만들기</button>
                    </Grid>
                ) : (
                    Plans.map((plan, idx) => (
                        <Grid is_flex key={idx}>
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
                        </Grid>
                    ))
                )}
            </PlanList>
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

Main.defaultProps = {
    nickName: '온잇',
    today: '2022년 5월 01일'
}

export default Main

const Schedules = styled.div`
  background-color: slateblue;

  margin: auto;
  padding: 0 0 0 5px;
  width: 90%;
  border: 1px none #ddd;
  border-radius: 10px;
`

const HeadBox = styled.div`
  background-color: red;
  width: 100%;
  text-align: right;
  padding: 0 5px 0 0;
  margin: 5px 0 5px 0;
`

const ShowMenu = styled.div`
  background-color: #ddd;
  width: 40%;
  height: 100%;
  position: absolute;
  left: 0;
  transition: 1s;
`

const HideMenu = styled.p`
  width: 40%;
  height: 500px;
  position: absolute;
  left: -40%;
  transition: 1s;
`

const PlanList = styled.div`
  padding: 0px 30px;
  text-align: center;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const ScheduleTop = styled.div`
  background-color: slateblue;

  margin: auto;
  padding: 0 0 0 5px;
  width: 90%;
  border: 1px solid #ddd;
  border-radius: 10px;

  h3 {
    margin: 10px 0 5px 0;
  }

  p {
    margin: 5px 0 5px 0;
  }
`

const UserInfo = styled.div`
  background-color: green;
  width: 100%;
  padding: 0 0 0 5px;
`