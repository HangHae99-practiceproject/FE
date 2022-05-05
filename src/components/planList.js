import React from 'react';

const PlanList = (props) => {
    console.log(props)
    return(
        <>
            <h3>{props?.planDate}</h3>
            <h3>{props?.planName}</h3>
            <p>{props?.locationDetail?.locationName}</p>
            <p>{props?.planList?.penalty}</p>
        </>
    )
}

export default PlanList;