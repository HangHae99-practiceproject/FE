import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import { getOnePlan } from "../redux/modules/plan";
import ScheduleContainer from "../components/ScheduleContainer";
import { useDispatch, useSelector } from "react-redux";
import Test from "./Test";

import { getDatabase, ref, onValue, child, get} from "firebase/database";


const Detail = (props) => {
    const params = useParams();

    const nav = useNavigate();
    const dispatch = useDispatch();
    const plan = useSelector(state => state.plan.showplan.data)


    // 공유 팝업 생성
    const handle = () => {
        if (navigator.share) {
            navigator.share({
                title: plan.planName,
                text: plan.planName,
                url: window.location.href,
            })
                .then(() => console.log('성공'))
                .catch((err) => console.log(err))
        } else {
            alert("공유하기가 지원되지 않는 환경 입니다.")
        }
    }
    // const plan = useSelector(state => state.plan.showplan.data)
    // console.log(plan)
    useEffect(() => {
        dispatch(getOnePlan(params.planId))
    }, [])

    // if(!plan){
    //     return;
    // }
    const [plans, setPlan] = useState({})
    // const db = getDatabase();
    // const planData = ref(db, `${params.planId}`)
    // onValue(planData, (snapshot) => {
    //     setPlan({...snapshot.val()});
    // })
    const dbRef = ref(getDatabase());
    useEffect(() => {
        get(child(dbRef, `${params.planId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setPlan({...snapshot.val()});
            } else {
                console.log("No data available");
            }
        }).catch((err) => {
            console.log(err)
        });
    }, [])
    console.log(plans)
    if(!plans.locationDetail){
        return;
    }
    return (
        <div>
            <HeadLine>
                {plan.writer === document.cookie.split("=")[1] ?
                    <h2>상세페이지</h2> : <h2>초대장</h2>
                }
            </HeadLine>
            <ScheduleBox>
                <p>{plans?.planDate}</p>
                <p>{plans?.planName}</p>
                <p>{plans?.locationDetail?.name}</p>
                <p>{plans?.penalty}</p>
            </ScheduleBox>
            <MapBox>
                <Test
                {...plans?.locationDetail}
                />
            </MapBox>
            <ButtonBox>
                {plans.writer === document.cookie.split("=")[1] ?
                <>
                    <button onClick={handle}>
                        공유하기
                    </button>
                    <button onClick={() => nav(`/details/${plans.url}`)}>
                        이동
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
                      <button onClick={() => nav(`/details/${plans.url}`)}>
                        이동
                    </button>
                    <button
                        onClick={() => {
                            nav('/main')
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