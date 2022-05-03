import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const ScheduleContainer = (props) => {
    const navigate = useNavigate()

    return (
        <div>

            <ScheduleTop onClick={() => {
                navigate('/detail')
            }}>
                <h3>약속 날짜 / 시간</h3>
                <h3>약속 이름</h3>
                <p>약속 장소</p>
                <p>패널티</p>
            </ScheduleTop>

            <ScheduleList>
                <div>
                    <p>약속 날짜 / 시간</p>
                    <p>약속 이름</p>
                    <p>약속 장소</p>
                    <p>패널티</p>
                </div>

                <div>
                    <p>약속 날짜 / 시간</p>
                    <p>약속 이름</p>
                    <p>약속 장소</p>
                    <p>패널티</p>
                </div>
            </ScheduleList>
        </div>
    )
}

export default ScheduleContainer

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

const ScheduleList = styled.div`
  background-color: steelblue;

  flex-wrap: wrap;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px auto;
  width: 90%;

  div {
    flex: 1;
    margin: 5px;
  }
`