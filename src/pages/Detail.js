import React, {useEffect} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import { getOnePlan } from "../redux/modules/plan";
import ScheduleContainer from "../components/ScheduleContainer";
import { useDispatch, useSelector } from "react-redux";
import Test from "./Test";
import Real from "./teeest";

const Detail = (props) => {
    const params = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 공유 팝업 생성
    const handle = () => {
        if (navigator.share) {
            navigator.share({
                title: '상세페이지 공유',
                text: '강남 테러',
                url: window.location.href,
            })
                .then(() => console.log('성공'))
                .catch((err) => console.log(err))
        } else {
            alert("공유하기가 지원되지 않는 환경 입니다.")
        }
    }
    const plan = useSelector(state => state.plan.showplan.data)
    console.log(plan)
    useEffect(() => {
        dispatch(getOnePlan(params.planId))
    }, [])

    if(!plan){
        return;
    }

    return (
        <div>
            <HeadLine>
                <h2>상세페이지 or 초대장</h2>
            </HeadLine>
            <ScheduleBox>
                <p>{plan?.planDate}</p>
                <p>{plan?.planName}</p>
                <p>{plan?.locationDetail?.name}</p>
                <p>{plan?.penalty}</p>
            </ScheduleBox>
            <MapBox>
                <Test
                props={plan?.locationDetail}
                />
                <Real/>
            </MapBox>
            <ButtonBox>
                {plan?.writer === document.cookie.split("=")[1] ?
                <>
                    <button onClick={handle}>
                        공유하기
                    </button>
                    <button>
                        뒤로가기
                    </button>
                </>
                :
                <>
                    <button onClick={handle}>
                        참석하기
                    </button>
                    <button
                        onClick={() => {
                            navigate('/main')
                        }}>
                        거절하기
                    </button>
                </>
                }
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