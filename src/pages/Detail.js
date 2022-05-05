import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function Detail() {
    const navigate = useNavigate()
 
    return (
        <div>

            <HeadLine>
                <h2>상세페이지 or 초대장</h2>
            </HeadLine>

            <ScheduleBox>
                <p>약속 날짜 / 시간</p>
                <p>약속 이름</p>
                <p>약속 장소</p>
                <p>패널티</p>
            </ScheduleBox>

            <MapBox>
                지도
            </MapBox>

            <ButtonBox>

                <button>
                    공유 or 참석
                </button>

                <button
                    onClick={() => {
                        navigate('/main')
                    }}>
                    나가기 or 거절
                </button>
            </ButtonBox>

        </div>
    )

}

export default Detail

const HeadLine = styled.div`
  background-color: green;
  width: 100%;
  text-align: center;
  margin: 20px 0 0 0;
`

const ScheduleBox = styled.div`
  background-color: slateblue;

  width: 90%;
  height: 30vh;
  margin: auto;
`

const MapBox = styled.div`
  background-color: steelblue;

  width: 90%;
  height: 40vh;
  margin: auto;
`

const ButtonBox = styled.div`

  width: 90%;
  margin: 20px auto;
  display: flex;

  button {
    flex: 1;
    padding: 5px;
  }
`