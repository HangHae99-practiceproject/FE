import React, {useState} from 'react';
import {Grid} from '../elements';
import styled from "styled-components";

const Penalty = (props) => {

    const [penalty, setPenalty] = useState('');

    const penaltyButton = e => {

    };

    console.log(penaltyButton())

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

            <div>
                <PenaltyBox>
                    <div>
                        <p>필요없어요</p>
                    </div>

                    <div>
                        <p>지각생이 커피 쏘기!</p>
                    </div>
                </PenaltyBox>

                <PenaltyBox>
                    <div>
                        <p>입장주 들이키기</p>
                    </div>

                    <div>
                        <p>코끼리코 10바퀴</p>
                    </div>
                </PenaltyBox>

                <PenaltyBox>
                    <div>
                        <p>시간이 돈! 벌금내기</p>
                    </div>

                    <div>
                        <p>통 크게 1차 쏘기!</p>
                    </div>
                </PenaltyBox>
            </div>


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
  margin: 8px auto;
  width: 90%;
  
  div {
    background-color: #ddd;
    
    display: flex;
    flex: 1;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 15vh;
    border: none;
    border-radius: 10px;
    margin: 8px 8px 16px 8px;
    cursor: pointer;
  }
`