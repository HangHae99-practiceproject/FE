import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Grid, Text } from "../elements";
import theme from "../Styles/theme";
import { IoAddCircle } from "react-icons/io5";
import { BsList, BsBell } from "react-icons/bs";
import {useNavigate} from "react-router-dom";

import ScheduleContainer from "../components/ScheduleContainer";
import {useDispatch} from "react-redux";
import {logout} from "../redux/modules/user";
import { getPlan } from "../redux/modules/plan";

const Main = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const planList = useSelector(state => state.plan.plans.data?.planList);
    const logoutBtn = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        console.log(logoutBtn)
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

    return (
        <div>
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
                <p>{document.cookie.split("=")[1]} 님</p>
                <p>{props.today} 입니다.</p>
            </UserInfo>
            {/* <ScheduleContainer /> */}
            <PlanList>
                {Plans.length === 0 ? (
                    <Grid is_flex center padding="10px">
                        <Text size="14px" color={theme.color.gray3}>
                            모임이 없습니다
                            <br />
                            모임을 추가해보세요!
                        </Text>
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

            <IoAddCircle
                onClick={() => {navigate('/add')}}
                style={{
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

const Schedules = styled.div`
  background-color: slateblue;

  margin: auto;
  padding: 0 0 0 5px;
  width: 90%;
  border: 1px solid #ddd;
  border-radius: 10px;
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