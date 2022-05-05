import React from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";

const ScheduleContainer = (props) => {
    const navigate = useNavigate()
    const params = useParams()

    return (
        <div>

            <ScheduleTop onClick={() => {
                navigate(`/detail/${props.planList.planId}`)
            }}>
                <h3>{props.planList.planDate} / {props.planList.planTime}</h3>
                <h3>{props.planList.planName}</h3>
                <p>{props.planList.locationDetail.locationName}</p>
                <p>{props.planList.penalty}</p>
            </ScheduleTop>

            {/*<ScheduleList onClick={() => {*/}
            {/*    navigate('/detail')*/}
            {/*}}>*/}
            {/*    <div>*/}
            {/*        <p>{props.planList.planDate} / {props.planList.planTime}</p>*/}
            {/*        <p>{props.planList.planName}</p>*/}
            {/*        <p>{props.planList.locationDetail.locationName}</p>*/}
            {/*        <p>{props.planList.penalty}</p>*/}
            {/*    </div>*/}
            {/*</ScheduleList>*/}
        </div>
    )
}

ScheduleContainer.defaultProps = {
    planList: {
        planId: 1,
        planName: '강남 테러',
        planDate: '2022-05-05',
        planTime: '17시30분',
        locationDetail: {
            locationName: '강남역',
            lat: '12',
            lng: '123',
        },
        penalty: '벌금 100만원',
    }
}

export default ScheduleContainer

const ScheduleTop = styled.div`
  background-color: slateblue;

  margin: auto;
  padding: 0 0 0 5px;
  width: 90%;
  border: 1px solid #ddd;
  border-radius: 10px;

  h3 {
    margin: 10px 0 5px 0;
  }

  p {
    margin: 5px 0 5px 0;
  }
`

const ScheduleList = styled.div`
  background-color: steelblue;

  flex-wrap: wrap;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px auto;
  width: 90%;

  div {
    flex: 1;
    margin: 5px;
  }
`