import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Input, Grid, Button } from '../elements';
import theme from '../Styles/theme';
import PlanName from '../components/PlanName';
import SetLocation from '../components/SetLocation';
import SetTime from '../components/SetTime';
import Penalty from '../components/Penalty';
import { BsChevronLeft } from 'react-icons/bs'
import KakaoMap from '../shared/KakaoMap';
import { useDispatch } from 'react-redux';
import { addPlan } from '../redux/modules/plan';

const AddPlans = (props) => {
    const dispatch = useDispatch();
    const [Name, setName] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [time, setTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const [penalty, setPenalty] = React.useState('');
    const eventhandler = (e) => {
        setName(e.target.value)
    }

    const clickHandler =() => {
        setComp(comp +1)
    }
    const goBack = () => {
        if(comp > 0) {
            setComp(comp -1)
        }
    }
    // console.log(Name, place, time, date)
    let [comp, setComp] = React.useState(0)
    let obj = {
        0: <PlanName value={Name} eventHandler={eventhandler} clickHandler={clickHandler}/>,
        1: <SetLocation setPlace={setPlace} clickHandler={clickHandler}/>,
        2: <SetTime setTime={setTime} setDate={setDate} clickHandler={clickHandler}/>,
        3: <Penalty clickHandler={clickHandler} />,
    }

    const create = () => {
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
        dispatch(addPlan(data));
    }

    if(comp <= 3) {
        return (
            <React.Fragment>
                <Grid padding="16px">
                    <BsChevronLeft
                        size="24px"
                        cursor="pointer"
                        onClick={goBack}
                    />
                </Grid>
                <Grid>
                    {obj[comp]}
                </Grid>
                {/* <Grid bottom="0" padding="16px" >
                    <Button _onClick={clickHandler}>다음으로</Button>
                </Grid> */}
            </React.Fragment>
        )
    }
    const year = date.split('-')[0]
    const month = date.split('-')[1]
    const day = date.split('-')[2]
    const hour = time.split(':')[0]
    const minute = time.split(':')[1]

    return (
        <React.Fragment>
            <Grid padding="16px">
                <BsChevronLeft
                    size="24px"
                    cursor="pointer"
                    onClick={goBack}
                />
            </Grid>
            <Grid padding="16px">
                <p
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        paddingBottom: '16px',
                    }}>약속이 생성되었습니다!</p>
                <PlanDiv>
                    <p>{Name}</p>
                    <h2>{year}년 {month}월 {day}일</h2>
                    <h2>{hour}시 {minute}분</h2>
                    <p>{place.address}</p>
                    <KakaoMap place={place.name} lat={place.lat} lng={place.lng}/>
                </PlanDiv>
            </Grid>
            <Grid bottom="0" padding="16px">
                <button
                    style={{
                        backgroundColor: '#A1ED00',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                    }}
                    onClick={create}>완성!</button>
            </Grid>
            </React.Fragment>
        )
}


export default AddPlans;

const PlanDiv = styled.div`
  p {
    padding-bottom: 8px;
  }
  p + h2 {
    padding-bottom: 8px;
    font-size: 20px;
    font-weight: bold;
  }
  h2 + h2 {
    padding-bottom: 8px;
    font-size: 20px;
    font-weight: bold;
  }
  
`