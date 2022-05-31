import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {ReactComponent as LeftArrow } from '../img/icon/arrowl.svg';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";

import {getHistoryPlan} from "../redux/modules/plan";
import theme from "../styles/theme";

const PastPlan = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const pastPlan = useSelector(state => state.plan.plans)
    console.log(pastPlan)

    useEffect(() => {
        dispatch(getHistoryPlan(page))
    }, [pastPlan])

    return (
        <Container>
            <HeadLine>
                <LeftArrow
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        top: 12,
                    }}
                    size="64px"
                    cursor="pointer"
                    onClick={() => {
                        navigate('/main')
                    }}
                />
                <h2>나의 지난 일정</h2>
            </HeadLine>
            {pastPlan?.map((plan, list) => {
                const planDate = dayjs(plan.planDate).format('YYYY년 MM월 DD일')
                const planTime = dayjs(plan.planDate).format('HH시 mm분')
                return (
                    <Schedules
                        key={list}
                        onClick={() => {
                            navigate(`/detail/${plan.planId}`)
                        }}
                    >
                        <h3>{planDate}</h3>
                        <h3>{planTime}</h3>
                        <p>{plan.planName}</p>
                        <p>{plan.locationDetail?.name}</p>
                        <p>{plan.penalty}</p>
                    </Schedules>
                )
            })}
        </Container>
    )
}

export default PastPlan

const Container = styled.div`
  background-color: ${theme.color.gray7};
  height: 100%;
`

const HeadLine = styled.div`
  background-color: ${theme.color.white};
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: 16px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

const Schedules = styled.div`
  background-color: white;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 16px auto;
  width: 90%;
  border: 1px none #ddd;
  border-radius: 10px;
  padding: 16px 10px;
`
