import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {Grid} from "../elements";

const EditPlan = (props) => {

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    let nowTime = String(today.getHours() + ":" + today.getMinutes())

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const getPlan = useSelector(state => state.plan.plans.data?.planList)
    console.log(getPlan)

    const [name, setName] = useState()
    const [time, setTime] = useState()
    const [date, setDate] = useState()


    const changeName = (e) => {
        setName(e.target.value)
    }
    const changeTime = (e) => {
        setTime(e.target.value)
    }
    const changeDate = (e) => {
        setDate(e.target.value)
    }

    return (
        <>
            <HeadLine>
                <h3>수정할 항목을 선택해 주세요</h3>
            </HeadLine>

            <InputBox>
                <input
                    key={name}
                    onChange={changeName}
                    // placeholder={getPlan.planName}
                />
            </InputBox>

            <InputBox>
                <input
                    key={date}
                    onChange={changeDate}
                    // placeholder={getPlan.planDate}
                />
            </InputBox>

            <InputBox>
                <input
                    key={time}
                    onChange={changeTime}
                    // placeholder={getPlan.planDate}
                />
            </InputBox>

            <InputBox>
                <input
                    // placeholder={getPlan.locationDetail.locationName}
                />
            </InputBox>

            <InputBox>
                <input
                    // placeholder={getPlan.planList.penalty}
                />
            </InputBox>

            <Grid bottom="0" padding="16px">
                <button
                    onClick={navigate('/detail')}
                    style={{
                        backgroundColor: '#A1ED00',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                    }}>수정완료
                </button>
            </Grid>
        </>
    )
}

export default EditPlan

const HeadLine = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0 0 0;
`

const InputBox = styled.div`
  width: 90%;
  margin: auto;
  box-sizing: border-box;

  input {
    border: 1px solid #c4c4c4;
    width: 100%;
    padding: 12px 12px;
    margin: 14px auto 0 auto;
    box-sizing: border-box;
    border-radius: 10px;
    background: #ffffff;
  }
`
