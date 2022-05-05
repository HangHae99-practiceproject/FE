import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

import ScheduleContainer from "../components/ScheduleContainer";

function Detail() {

    const plan = ScheduleContainer.defaultProps

    const navigate = useNavigate()

    // 공유 팝업 생성
    const handle = () => {
        if (navigator.share) {
            navigator.share({
                title: '상세페이지 공유',
                text: '강남 테러',
                url: 'http://localhost:3000/detail',
            })
                .then(() => console.log('성공'))
                .catch((err) => console.log(err))
        } else {
            alert("공유하기가 지원되지 않는 환경 입니다.")
        }
    }

    return (
        <div>

            <HeadLine>
                <h2>상세페이지 or 초대장</h2>
            </HeadLine>

            <ScheduleBox>
                <p>{plan.planList.planDate} / {plan.planList.planTime}</p>
                <p>{plan.planList.planName}</p>
                <p>{plan.planList.locationDetail.locationName}</p>
                <p>{plan.planList.penalty}</p>
            </ScheduleBox>

            <MapBox>
                지도
            </MapBox>

            <ButtonBox>

                <button onClick={handle}>
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