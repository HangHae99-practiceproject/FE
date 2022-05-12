import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {Grid} from "../elements";
import {editPlan, getOnePlan} from "../redux/modules/plan";
import {BsChevronLeft} from "react-icons/bs";
import {formatDate, formatTime} from "../shared/utils/common";
import Modal from "../components/Modal";
import ModalPortal from "../components/ModalPortal";
import moment from "moment";
import Modal2 from "../components/Modal2";
import {hourModel, minuteModel} from "../statics/time";
import {DropdownList} from "react-widgets/cjs";
import {penaltyModel} from "../statics/penalty";

const EditPlan = (props) => {
    const {planId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const plan = useSelector(state => state.plan.showplan)

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [penalty, setPenalty] = useState('')
    const [place, setPlace] = useState(null)

    const [hour, setHour] = useState(null)
    const [minute, setMinute] = useState(null)
    const [amPmType, setAmPmType] = useState('')

    const planDay = formatDate(plan?.planDate)
    const planTime = formatTime(plan?.planDate)

    useEffect(() => {
        dispatch(getOnePlan(planId))
    }, [])

    useEffect(() => {
        if (plan) {
            setName(plan.planName)
            setTime(formatTime(plan.planDate))
            setDate(plan.planDate)
            setPenalty(plan.penalty)
            setPlace(plan.locationDetail)
            const momentDate = moment(plan.planDate)
            const _hour = momentDate.hour()
            const calcHour = _hour <= 12 ? _hour : _hour - 12
            const _minute = momentDate.minute()
            setAmPmType(() => {
                return Number(_hour) <= 12 ? 'am' : 'pm'
            })
            const hourData = hourModel.find((model) => model.value === calcHour.toString())
            const minuteData = minuteModel.find((model) => model.value === _minute.toString())
            setHour(hourData)
            setMinute(minuteData.id)
        }
    }, [plan])

    useEffect(() => {
        if (hour && minute && amPmType) {
            const _hour = hourModel.find((model) => model.id === hour)
            const _minute = minuteModel.find((model) => model.id === minute)
            setTime(`${amPmType === 'pm' ? parseInt(_hour.value) + 12 : _hour.value}:${_minute.value}`)
        }
    }, [hour, minute, amPmType])

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
        if ( !validModify() ) {
            return
        }
        const data = {
            planId,
            planName: name,
            planDate: `${formatDate(date)} ${formatTime(time)}`,
            location: place,
            penalty,
        }
        dispatch(editPlan({data, navigate}));
    }

    const [editDateModal, setEditDateModal] = useState(false)
    const [editTimeModal, setEditTimeModal] = useState(false)

    const handleEditDateModal = () => {
        setEditDateModal(!editDateModal)
    }

    const handleEditTimeModal = () => {
        setEditTimeModal(!editTimeModal)
    }

    const validModify = () => {
        const modifiedDate = moment(`${date} ${time}`).toISOString()
        return name !== plan.planName || modifiedDate !== plan.planDate || penalty !== plan.penalty
    }

    if (!plan) {
        return <div>loading...</div>
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
                    value={name}
                    onChange={changeName}
                    placeholder={plan.planName}
                />
            </InputBox>

            <InputBox>
                <input
                    readOnly
                    value={formatDate(date)}
                    onChange={changeDate}
                    placeholder={planDay}
                    onClick={handleEditDateModal}
                />
                <ModalPortal>
                    {editDateModal &&
                        <Modal onClose={handleEditDateModal} date={moment(date).toDate()} setDate={setDate}/>}
                </ModalPortal>
            </InputBox>

            <InputBox>
                <input
                    readOnly
                    value={time}
                    onChange={changeTime}
                    placeholder={planTime}
                    onClick={handleEditTimeModal}
                />
                <ModalPortal>
                    {editTimeModal && <Modal2 onClose={handleEditTimeModal}
                                              hour={hour}
                                              setHour={setHour}
                                              minute={minute}
                                              setMinute={setMinute}
                                              amPmType={amPmType}
                                              setAmPmType={setAmPmType}
                    />}
                </ModalPortal>
            </InputBox>

            <InputBox>
                <input
                    placeholder={plan.locationDetail.name}
                />
            </InputBox>

            <InputBox>
                <input
                    value={penalty}
                    placeholder={plan.penalty}
                    onChange={changePenalty}
                />
                {/*<DropdownList*/}
                {/*    dataKey="id"*/}
                {/*    textField="value"*/}
                {/*    value={penalty}*/}
                {/*    onChange={changePenalty}*/}
                {/*    data={penaltyModel}*/}
                {/*/>*/}
            </InputBox>

            <Grid bottom="0" padding="16px">
                <button
                    onClick={editPlanBtn}
                    style={{
                        backgroundColor: validModify() ? '#A1ED00' : '#eee',
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
