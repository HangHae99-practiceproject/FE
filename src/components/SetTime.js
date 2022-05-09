import React from 'react';
import { Grid, Input, Button } from '../elements';
import theme from "../Styles/theme";

const SetTime = (props) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    let time = String(today.getHours() + ":" + today.getMinutes())
    const handleDate = (e) => {
        props.setDate(e.target.value)
    }
    const handleTime = (e) => {
        props.setTime(e.target.value)
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Input
                    islabel
                    labelBold
                    labelColor={theme.color.gray1}
                    labelText="먼저 날짜를 알려주세요"
                    textAlign="center"
                    placeholder={today = yyyy + '년 ' + mm + '월 ' + dd + '일 '}
                    _onChange={handleDate}/>
                <Input
                    islabel
                    labelBold
                    labelColor={theme.color.gray1}
                    labelText="시간은 몇시가 좋을까요?"
                    textAlign="center"
                    placeholder={time}
                    _onChange={handleTime}
                />
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
                    onClick={props.clickHandler}>다음으로
                </button>
            </Grid>
        </React.Fragment>
    )
}

export default SetTime;