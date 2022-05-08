import React, {useEffect} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import { editPlan } from "../redux/modules/plan";
import ScheduleContainer from "../components/ScheduleContainer";
import {useDispatch, useSelector} from "react-redux";
import Test from "./Test";
import Real from "./teeest";
import {BsChevronLeft} from "react-icons/bs";

const Detail = (props) => {
    const params = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const plan = useSelector(state => state.plan.showplan.data)

    const [Name, setName] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [time, setTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const [penalty, setPenalty] = React.useState('');


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

    const edit = () => {
        const data = {
            planName: Name,
            planDate: date + ' ' + time,
            location: {
                name: place.name,
                lat: place.lat,
                lng: place.lng,
                address: place.address
            },
            penalty: penalty,
        }
        dispatch(editPlan(data));
    }
    // useEffect(() => {
    //     dispatch(getOnePlan(params.planId))
    // }, [])

    // if (!plan) {
    //     return;
    // }

    return (
        <div style={{
            height: '100vh',
            backgroundColor:'#eee'}}>
            <HeadLine>
                <BsChevronLeft
                    style={{
                        position:'absolute',
                        padding: '20px 0',
                        display:'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}
                    size="64px"
                    cursor="pointer"
                    onClick={() => {navigate(-1)}}
                />
                <h2>선택하신 약속입니다</h2>
            </HeadLine>
            <ScheduleBox>
                <div style={{position:'relative',}}>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <p>약속이름</p>
                <p>2022-05-07 T18:55</p>
                <p>약속 장소 이름</p>
                <p>페널티</p>
            </ScheduleBox>
            <MapBox>
                {/*<Test*/}
                {/*    props={plan?.locationDetail}*/}
                {/*/>*/}
                {/*<Real/>*/}
            </MapBox>
            <ButtonBox>
                <button onClick={handle}>
                    공유하기
                </button>
            </ButtonBox>
            {/*<HeadLine>*/}
            {/*    {plan.writer === document.cookie.split("=")[1] ?*/}
            {/*        <h2>상세페이지</h2> : <h2>초대장</h2>*/}
            {/*    }*/}
            {/*</HeadLine>*/}
            {/*<ScheduleBox>*/}
            {/*    <p>{plan?.planDate}</p>*/}
            {/*    <p>{plan?.planName}</p>*/}
            {/*    <p>{plan?.locationDetail?.name}</p>*/}
            {/*    <p>{plan?.penalty}</p>*/}
            {/*</ScheduleBox>*/}
            {/*<MapBox>*/}
            {/*    <Test*/}
            {/*        props={plan?.locationDetail}*/}
            {/*    />*/}
            {/*    <Real/>*/}
            {/*</MapBox>*/}
            {/*<ButtonBox>*/}
            {/*    {plan.writer === document.cookie.split("=")[1] ?*/}
            {/*        <>*/}
            {/*            <button onClick={handle}>*/}
            {/*                공유하기*/}
            {/*            </button>*/}
            {/*            <button>*/}
            {/*                뒤로가기*/}
            {/*            </button>*/}
            {/*        </>*/}
            {/*        :*/}
            {/*        <>*/}
            {/*            <button onClick={handle}>*/}
            {/*                참석하기*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                onClick={() => {*/}
            {/*                    navigate('/main')*/}
            {/*                }}>*/}
            {/*                거절하기*/}
            {/*            </button>*/}
            {/*        </>*/}
            {/*    }*/}
            {/*</ButtonBox>*/}
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
  p {
    padding: 10px 10px;
  }
  button: first-of-type {
    position: absolute;
    right: 42.67px;
  }
  button {
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