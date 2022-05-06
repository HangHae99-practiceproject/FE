import React from "react";
import styled from "styled-components";
import { BsChevronLeft } from 'react-icons/bs'
import {useNavigate} from "react-router-dom";
import PlanList from "../components/planList";
import {useSelector} from "react-redux";

const PastPlan = (props) => {
    const navigate = useNavigate()

    const planList = useSelector(state => state.plan.plans.data?.planList)

    const Plans = [];
    if (planList) {
        for (let i = 0; i < planList.length; i++) {
            Plans.push(planList[i]);
        }
    }

    return (
        <div>
            <HeadLine>
                <BsChevronLeft
                    style={{
                        fontSize: '30px',
                        cursor: 'pointer',
                        margin: '5px',
                        position: 'absolute',
                    }}
                    onClick={() => {
                        navigate('/main')
                    }}/>
                <h2>나의 지난 일정</h2>
            </HeadLine>
            {Plans.map((plan, key) => (
                <Schedules
                    key={key}
                onClick={() => {
                    navigate(`/detail/${plan.planId}`)
                }}>
                <h3>{plan.planDate}</h3>
                <h3>{plan.planName}</h3>
                <p>{plan.locationDetail.locationName}</p>
                <p>{plan.planList?.penalty}</p>
            </Schedules>
            ))}

        </div>
    )
}

export default PastPlan

const HeadLine = styled.div`
  background-color: greenyellow;
  position: relative;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  h2 {
    margin: auto;
  }
`
const Schedules = styled.div`
  background-color: slateblue;

  margin: auto;
  padding: 0 0 0 5px;
  width: 90%;
  border: 1px none #ddd;
  border-radius: 10px;
`