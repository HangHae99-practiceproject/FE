import React from 'react';
import { Input, Grid, Button } from '../elements';
import theme from "../Styles/theme";

const PlanName = ({value, eventHandler, clickHandler}) => {

    return(
        <React.Fragment>
            <Grid padding="16px">
                <Input
                    islabel
                    labelBold
                    labelColor={theme.color.gray1}
                    labelText="먼저 약속 이름을 정해 주세요"
                    _onChange={e => eventHandler(e)}
                    value={value}
                    placeholder='약속 이름을 입력해 주세요'/>
            </Grid>

            {value !== ''?
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
                        onClick={clickHandler}>다음으로
                    </button>
                </Grid>
                :
                <Grid bottom="0" padding="16px">
                    <button
                        style={{
                            backgroundColor: '#eee',
                            width: '100%',
                            height: '100%',
                            padding: '12px',
                            color: 'black',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                        onClick={() => alert('약속 이름을 입력해 주세요')}>다음으로
                    </button>
                </Grid>}
        </React.Fragment>
    )
}

export default PlanName;