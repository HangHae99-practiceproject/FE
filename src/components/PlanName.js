import React, {useState} from 'react';
import { Input, Grid } from '../elements';
import theme from "../Styles/theme";

const PlanName = ({clickHandler, name, setName}) => {
    const [_name, _setName] = useState(name)

    const handleName = (e) => {
        _setName(e.target.value)
    }

    const handleNext = () => {
        if ( !_name ) {
            alert('약속 이름을 입력해 주세요')
            return
        }
        setName(_name)
        clickHandler()
    }

    return(
        <React.Fragment>
            <Grid padding="16px">
                <Input
                    islabel
                    labelBold
                    labelColor={theme.color.gray1}
                    labelText="먼저 약속 이름을 정해 주세요"
                    _onChange={handleName}
                    value={_name}
                    placeholder='약속 이름을 입력해 주세요'/>
            </Grid>
            <Grid bottom="0" padding="16px">
                <button
                    style={{
                        backgroundColor: _name ? '#A1ED00' : '#eee',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                    }}
                    onClick={handleNext}>다음으로
                </button>
            </Grid>
        </React.Fragment>
    )
}

export default PlanName;