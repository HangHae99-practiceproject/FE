import React from 'react';
import styled from 'styled-components';
import {KAKAO_AUTH_URL} from '../service/OAuth';
import {useNavigate} from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    return (
        <Container>

            <KakaoDiv>
                <a href={KAKAO_AUTH_URL}>
                    카카오로 간편 로그인
                </a>
            </KakaoDiv>

            <SignUpDiv>
                <button
                    onClick={() => {
                        navigate('/login')
                    }}
                >온잇 시작하기!
                </button>
            </SignUpDiv>
        </Container>
    );
};


export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`

const GuestBtn = styled.div`
  cursor: pointer;
  margin: auto;
`;

const KakaoDiv = styled.div`
  background-color: #A1ED00;
  display: flex;
  width: 90%;
  margin-top: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  a {
    width: 100%;
    height: 40px;
    color: black;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration-line: none;
  }
`

const SignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-top: 15px;

  button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
    color: black;
    background-color: #A1ED00;
    cursor: pointer;
  }
`