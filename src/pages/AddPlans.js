import React, { useEffect, useState } from 'react';
import Headerbar from '../shared/Headerbar';
import { Input, Grid, Button } from '../elements';
import theme from '../Styles/theme';
import PlanName from '../components/PlanName';
import SetLocation from '../components/SetLocation';
import SetTime from '../components/SetTime';
import Penalty from '../components/Penalty';



const AddPlans = (props) => {
    let [comp, setComp] = React.useState(0)
    const clickHandler =() => {
        setComp(comp +1)
    }

    let obj = {
    0: <PlanName/>,
    1: <SetLocation />,
    2: <SetTime />,
    3: <Penalty />,
}
    return (
        <React.Fragment>
            <Headerbar isback/>
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