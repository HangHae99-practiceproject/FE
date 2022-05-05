import React from 'react';
import { Grid, Button } from '../elements';

const Penalty = (props) => {
    return(
        <React.Fragment>
            <Grid padding="16px">
                <h1>늦은 친구가 받을 벌칙이 필요한가요?</h1>
            </Grid>
             <Grid bottom="0" padding="16px" >
                    <Button _onClick={props.clickHandler}>다음으로</Button>
            </Grid>
        </React.Fragment>
    )
}

export default Penalty;