import React from "react";
import styled from "styled-components";
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import ScheduleContainer from "../components/ScheduleContainer";

const PastSchedule = (props) => {
    const navigate = useNavigate()
 
    return (
        <div>
            <HeadLine>
                <BsArrowLeft
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

            <ScheduleContainer/>
        </div>
    )
}

export default PastSchedule

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