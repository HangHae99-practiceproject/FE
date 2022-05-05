import React from 'react';
import { Input, Grid, Button } from '../elements';

const PlanName = ({value, eventHandler, clickHandler}) => {

    return(
        <React.Fragment>
            <Grid padding="16px">
                <h1>약속 이름이 있으신가요?</h1>
                <Input _onChange={e => eventHandler(e)} value={value} placeholder='약속 이름을 적어주세요'/>
            </Grid>

            {value !== ''?
            <Grid bottom="0" padding="16px" >
                <Button _onClick={clickHandler}>다음으로</Button>
            </Grid>
            :
            <Grid bottom="0" padding="16px" >
                <Button _onClick={()=> alert('약속 이름을 정해주세요')}>다음으로</Button>
            </Grid>}
        </React.Fragment>
    )
}

export default PlanName;