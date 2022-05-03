import React, { useEffect, useState } from 'react';
import { Input, Grid, Button } from '../elements';
import theme from '../Styles/theme';
import PlanName from '../components/PlanName';
import SetLocation from '../components/SetLocation';
import SetTime from '../components/SetTime';
import Penalty from '../components/Penalty';
import { BsChevronLeft } from 'react-icons/bs'


const AddPlans = (props) => {
    let [comp, setComp] = React.useState(0)
    const [Name, setName] = React.useState('')
    const [place, setPlace] = React.useState('')
    const [time, setTime] = React.useState('')

    const eventhandler = (e) => {
        setName(e.target.value)
    }
    // const placeHandler = (e) => {
    //     setPlace(e.target.value)
    // }
    const clickHandler =() => {
        setComp(comp +1)
    }
    const goBack = () => {
        if(comp > 0) {
            setComp(comp -1)
        }
    }
    let obj = {
        0: <PlanName value={Name} eventHandler={eventhandler}/>,
        1: <SetLocation setPlace={setPlace}/>,
        2: <SetTime setTime={setTime}/>,
        3: <Penalty />,
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
            <Grid>
                {obj[comp]}
            </Grid>
            <Grid bottom="0" padding="16px" >
                <Button _onClick={clickHandler}>다음으로</Button>
            </Grid>
        </React.Fragment>
    )
}

AddPlans.defaultProps = {
}

export default AddPlans;

<div/>