import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {Grid} from "../elements";
import {editPlan} from "../redux/modules/plan";
import {BsChevronLeft} from "react-icons/bs";

const EditPlan = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const plan = useSelector(state => state.plan.showplan.data)
    console.log(plan)

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [penalty, setPenalty] = useState('')

    const planDay = plan.planDate.split('T')[0]
    const planTime = plan.planDate.split('T')[1].slice(0,5)

    const changeName = (e) => {
        setName(e.target.value)
    }
    const changeTime = (e) => {
        setTime(e.target.value)
    }
    const changeDate = (e) => {
        setDate(e.target.value)
    }
    const changePenalty = (e) => {
        setPenalty(e.target.value)
    }


    const editPlanBtn = () => {
        const data = {
            planId: params.planId,
            planName: plan.planName,
            planDate: plan.planDate,
            location: {
                name: plan.locationDetail.name,
                lat: plan.locationDetail.lat,
                lng: plan.locationDetail.lng,
                address: plan.locationDetail.address
            },
            penalty: penalty,
        }
        dispatch(editPlan({data, navigate}));
    }

    return (
        <>
            <HeadLine>
                <BsChevronLeft
                    style={{
                        position: 'absolute',
                        padding: '20px 0',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}
                    size="64px"
                    cursor="pointer"
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <h3>약속을 수정해 주세요</h3>
            </HeadLine>

            <InputBox>
                <input
                    key={name}
                    onChange={changeName}
                    placeholder={plan.planName}
                />
            </InputBox>

            <InputBox>
                <input
                    key={date}
                    onChange={changeDate}
                    placeholder={planDay}
                />
            </InputBox>

            <InputBox>
                <input
                    key={time}
                    onChange={changeTime}
                    placeholder={planTime}
                />
            </InputBox>

            <InputBox>
                <input
                    placeholder={plan.locationDetail.name}
                />
            </InputBox>

            <InputBox>
                <input
                    key={penalty}
                    placeholder={plan.penalty}
                    onChange={changePenalty}
                />
            </InputBox>

            <Grid bottom="0" padding="16px">
                <button
                    onClick={editPlanBtn}
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
  position: relative;
  width: 100%;
  text-align: center;

  h3 {
    font-size: 24px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }
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
