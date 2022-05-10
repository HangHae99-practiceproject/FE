import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {editPlan, deletePlan, getOnePlan} from "../redux/modules/plan";
import {useDispatch, useSelector} from "react-redux";
import {BsChevronLeft} from "react-icons/bs";
import Test from "./Test";
import Real from "./teeest";

import {getDatabase, ref, onValue, child, get} from "firebase/database";

const Detail = (props) => {
    const params = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const plan = useSelector(state => state.plan.showplan.data)
    console.log(plan)

    const [Name, setName] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [time, setTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const [penalty, setPenalty] = React.useState('');

    const planDay = plan && plan ? plan.planDate.split('T')[0].split('-') : null
    const planTime = plan && plan ? plan.planDate.split('T')[1].slice(0, 5) : null

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

    const deletePlanBtn = () => {
        const planId = params.planId
        dispatch(deletePlan({planId, navigate}))
    }

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
    // console.log(plans)
    if (!plans.locationDetail) {
        return;
    }

    return (
        <div style={{
            height: '100vh',
            backgroundColor: '#eee'
        }}
        >
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
                        navigate(-1)
                    }}
                />
                {plan.writer === document.cookie.split("=")[1] ?
                    <h2>선택하신 약속입니다</h2> : <h2>초대장</h2>
                }
            </HeadLine>

            <ScheduleBox>
                {plan.writer === document.cookie.split('=')[1] ?
                    <div style={{position: 'relative',}}>
                        <button
                            onClick={() => {
                                navigate(`/edit/${params.planId}`)
                            }}>수정
                        </button>
                        <button onClick={deletePlanBtn}>삭제</button>
                    </div>
                    :
                    <div style={{position: 'relative',}}>
                        <button onClick={() => {
                            window.alert('작성자만 수정 가능합니다.')
                        }}>수정
                        </button>
                        <button onClick={() => {
                            window.alert('작성자만 수정 가능합니다.')
                        }}>삭제
                        </button>
                    </div>
                }
                <h3>{planDay[0] + '년' + ' ' + planDay[1] + '월' + ' ' + planDay[2] + '일'}</h3>
                <h3>{planTime}</h3>
                <p>{plan.planName}</p>
                <p>{plan?.locationDetail?.name}</p>
                <p>{plan?.penalty}</p>
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
                    </>
                    :
                    <>
                        <button>
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
  position: relative;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

const ScheduleBox = styled.div`
  background-color: #fff;
  border: none;
  border-radius: 5px;
  width: 90%;
  height: 35vh;
  margin: auto;

  h3 {
    padding: 10px 0 5px 10px;
    font-size: 24px;
    font-weight: bold;
  }

  p {
    padding: 10px;
  }

  button: first-of-type {
    position: absolute;
    right: 42.67px;
  } button {
    position: absolute;
    right: 0;
    margin: 8px;
  }
`

const MapBox = styled.div`
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  width: 90%;
  height: 45vh;
  margin: auto;
`

const ButtonBox = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;

  button {
    background-color: #A1ED00;
    width: 100%;
    height: 100%;
    padding: 12px;
    color: black;
    border: none;
    border-radius: 10px;
  }
`