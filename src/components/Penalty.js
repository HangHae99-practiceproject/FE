import React, {useState} from 'react';
import {Grid} from '../elements';
import styled from "styled-components";
import {penaltyModel} from "../statics/penalty";

const PenaltyItem = ({onClick, value, active}) => {
    return (
        <PenaltyItemCard
            active={active}
            onClick={onClick}
        >
            <p>{value}</p>
        </PenaltyItemCard>
    )
}

const Penalty = (props) => {
    const [selectedPenalty, setSelectedPenalty] = useState(null)
    const onClick = (id) => {
        setSelectedPenalty(selectedPenalty === id ? '' : id)
    }

    const handleNext = () => {
        if ( selectedPenalty ) {
            const selected = penaltyModel.find(model => model.id === selectedPenalty)
            // 이걸 주면 되지
            // selected.value
        }
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <p
                    style={{
                        fontSize: '1em',
                        fontWeight: 'bold',
                        color: '#5A5A5A',
                    }}>늦은 친구가 받을 벌칙이 필요한가요?</p>
            </Grid>

            <PenaltyBox>
                {penaltyModel.map(({id, value}) => (
                    <PenaltyItem key={id}
                                 value={value}
                                 onClick={() => onClick(id)}
                                 active={selectedPenalty === id}/>
                ))}
            </PenaltyBox>


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

export default Penalty;

const PenaltyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px auto;
  width: 90%;
`

const PenaltyItemCard = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: calc(50% - 16px);
  height: 15vh;
  border: none;
  border-radius: 10px;
  margin: 8px 8px 16px 8px;
  cursor: pointer;
  background-color: ${({active}) => active ? '#A1ED00' : '#DDD'};
`