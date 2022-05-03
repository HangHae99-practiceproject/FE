import React, { useEffect, useState } from 'react';
import { Input, Grid, Button } from '../elements';
import theme from '../Styles/theme';
import PlanName from '../components/PlanName';
import SetLocation from '../components/SetLocation';
import SetTime from '../components/SetTime';
import Penalty from '../components/Penalty';
import { BsChevronLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import KakaoMap from '../shared/KakaoMap';

const AddPlans = (props) => {
    const nav = useNavigate();
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
        0: <PlanName value={Name} eventHandler={eventhandler}/>,
        1: <SetLocation setPlace={setPlace}/>,
        2: <SetTime setTime={setTime} setDate={setDate}/>,
        3: <Penalty />,
    }
    if(comp <= 3) {
        return (
            <React.Fragment>
                <Grid padding="16px">
                    <BsChevronLeft
                        size="22px"
                        cursor="pointer"
                        onClick={goBack}
                    />
                </Grid>
                <Grid>
                    {obj[comp]}
                </Grid>
                <Grid bottom="0" padding="16px" >
                    <Button _onClick={clickHandler}>다음으로</Button>
                </Grid>
            </React.Fragment>
        )
    }
        return (
            <React.Fragment>
                <Grid padding="16px">
                    <BsChevronLeft
                        size="22px"
                        cursor="pointer"
                        onClick={goBack}
                    />
                </Grid>
                <Grid padding="16px">
                    <h2>약속이 생성되었습니다!</h2>
                    <div>
                        <p>{Name}</p>
                        <h2>{date}</h2>
                        <h2>{time}</h2>
                        <p>{place.address}</p>
                        <KakaoMap place={place.name} lat={place.lat} lng={place.lng}/>
                    </div>
                </Grid>
                <Grid bottom="0" padding="16px" >
                    <Button _onClick={() => nav('/main')}>공유하기</Button>
                </Grid>
            </React.Fragment>
        )
}

AddPlans.defaultProps = {
}

export default AddPlans;

<div/>