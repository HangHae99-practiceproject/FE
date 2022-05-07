import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import PlanList from "./planList";


const ScheduleContainer = (props) => {
    const posts = useSelector((state) => state?.plan?.plans?.data?.planList)
    console.log(posts)
    const navigate = useNavigate()
    if(!posts){
        return;
    }
    return (
        posts.map((el, idx) => {
            console.log(el)
            return (
                <Schedules key={idx} onClick={() => {
                    navigate(`/detail/${el?.planId}`)
                }}>
                    <PlanList {...el}/>
                </Schedules>
            )
        })
    )
}

export default ScheduleContainer

const Schedules = styled.div`
  background-color: slateblue;

  margin: auto;
  padding: 0 0 0 5px;
  width: 100%;
  border: 1px none #ddd;
  border-radius: 10px;

  h3 {
    margin: 10px 0 5px 0;
  }

  p {
    margin: 5px 0 5px 0;
  }
`
