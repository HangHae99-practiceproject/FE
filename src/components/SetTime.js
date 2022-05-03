import React from 'react';
import { Grid, Input } from '../elements';
import Headerbar from '../shared/Headerbar';

const SetTime = (props) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return (
        <React.Fragment>
            <Grid padding="16px">
                <h1>언제 만나는게 좋을까요?</h1>
                <Input
                islabel
                labelBold
                labelText="먼저 날짜를 알려주세요"
                textAlign="center"
                placeholder={today = yyyy + '년 '+mm+'월 '+dd+'일 '} />
                <Input
                islabel
                labelBold
                labelText="시간은 몇시가 좋을까요?"
                textAlign="center"
                placeholder={today = yyyy + '년 '+mm+'월 '+dd+'일 '} />
            </Grid>
        </React.Fragment>
    )
}

export default SetTime;