import React, {useEffect} from "react";
import styled from "styled-components";
import {BsChevronLeft} from 'react-icons/bs'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {getHistoryPlan} from "../redux/modules/plan";

const PastPlan = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const pastPlan = useSelector(state => state.plan.plans)
    console.log(pastPlan)

    useEffect(() => {
        if (pastPlan?.status === 1) {
            dispatch(getHistoryPlan())
        }
    }, [pastPlan])

    return (
        <Container>
            <HeadLine>
                <BsChevronLeft
                    style={{
                        position: 'absolute',
                        padding: '20px 0',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
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
                const planDate = moment(plan.planDate).format('YYYY년 MM월 DD일')
                const planTime = moment(plan.planDate).format('hh시 mm분')
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
  background-color: #eee;
  min-height: 100vh;
`

const HeadLine = styled.div`
  background-color: #fff;
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: 16px;

  h2 {
    font-size: 24px;
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
