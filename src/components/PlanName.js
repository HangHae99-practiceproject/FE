import React from 'react';
import { Input, Grid, Button } from '../elements';

const PlanName = ({value, eventHandler}) => {

    return(
        <React.Fragment>
            <Grid padding="16px">
                <h1>약속 이름이 있으신가요?</h1>
                <Input _onChange={e => eventHandler(e)} value={value} placeholder='약속 이름을 적어주세요'/>
            </Grid>
        </React.Fragment>
    )
}

export default PlanName;