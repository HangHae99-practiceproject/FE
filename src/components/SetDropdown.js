import React, {useState} from "react";
import styled from "styled-components";
import 'react-widgets/styles.css'
import {DropdownList} from "react-widgets/cjs";
import {Grid} from "../elements";
import {hourModel, minuteModel} from "../statics/time";

const SetDropdown = ({onClose, hour, minute, setHour, setMinute, amPmType, setAmPmType}) => {
    const [_hour, _setHour] = useState(hour);
    const [_minute, _setMinute] = useState(minute);
    const [_amPmType, _setAmPmType] = useState(amPmType)

    const handleHour = (value) => {
        _setHour(value.id)
    }
    const handleMinute = (value) => {
        _setMinute(value.id)
    }

    const selected = (type) => {
        _setAmPmType(type === _amPmType ? '' : type)
    }

    const handleConfirm = () => {
        if (!hour || !minute) {
            alert('시간을 선택해 주세요')
            return
        }
        setHour(_hour)
        setMinute(_minute)
        setAmPmType(_amPmType)
        onClose()
    }

    return (
        <>
            <Container>
                <ButtonDiv>
                    <button
                        style={{
                            backgroundColor: `${_amPmType === 'am' ? "#A1ED00" : "#ddd"}`,
                            width: '25%',
                            height: '100%',
                            padding: '12px',
                            marginRight: '12px',
                            color: 'black',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                        onClick={() => selected('am')}
                    >오전
                    </button>
                    <button
                        style={{
                            backgroundColor: `${_amPmType === 'pm' ? "#A1ED00" : "#ddd"}`,
                            width: '25%',
                            height: '100%',
                            padding: '12px',
                            color: 'black',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                        onClick={() => selected('pm')}
                    >오후
                    </button>
                </ButtonDiv>
                <DropDiv>
                    <DropdownList
                        style={{marginRight: '12px'}}
                        dataKey="id"
                        textField="value"
                        value={_hour}
                        onChange={handleHour}
                        data={hourModel}
                    />
                    <DropdownList
                        dataKey="id"
                        textField="value"
                        value={_minute}
                        onChange={handleMinute}
                        data={minuteModel}
                    />
                </DropDiv>
            </Container>

            <Grid bottom="0" padding="16px">
                <button
                    style={{
                        backgroundColor:
                        `${_amPmType === '' || _hour === '시' || _minute === '분' ? '#DDD' : '#A1ED00'}`,
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: '1px solid #A1ED00',
                        borderRadius: '10px',
                    }}
                    onClick={handleConfirm}
                >
                    확인
                </button>
            </Grid>
        </>
    )
}

export default SetDropdown

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
`

const DropDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
`