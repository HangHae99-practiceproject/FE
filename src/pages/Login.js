import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import styled from "styled-components";

import {login, setLoading, setUserName} from "../redux/modules/user";
import {KAKAO_AUTH_URL} from "../service/OAuth";

const Login = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user)
    const loading = useSelector((state) => state.user.loading)

    const [username, setUsername] = useState('')
    const [pw, setPw] = useState('')

    const Login = () => {
        if (username === '' || pw === '') {
            window.alert('아이디, 비밀번호 모두 입력해주세요.');
        } else {
            const loginData = {
                username,
                password: pw,
            };
            dispatch(login(loginData));
        }
    };

    //엔터 입력시
    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            Login();
        }
    };


    if (loading === 'pending') {
        return 'loading...'
    }
    if (loading === 'failed') {
        setTimeout(() => {
            dispatch(setLoading('idle'))
        }, 1000)
        return 'failed...'
    }

    return (
        <>
            <Container>
                <div>
                    <h1 style={{
                        fontWeight: 'bold',
                        fontSize:'48px'}}
                    >On it</h1>
                </div>
                <LoginText>
                    <h2>로그인</h2>
                </LoginText>

                <InputBox>
                    <input
                        placeholder='아이디를 입력하세요'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputBox>

                <InputBox>
                    <input
                        placeholder='비밀번호 입력하세요'
                        type='password'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPw(e.target.value)}
                    />
                </InputBox>

                <LoginDiv>
                    <button
                        onClick={Login}
                    >로그인
                    </button>
                </LoginDiv>

                <SignUpDiv>
                    <button
                        onClick={() => {
                            navigate('/signup')
                        }}
                    >회원가입
                    </button>
                </SignUpDiv>

                <KakaoDiv>
                    <a href={KAKAO_AUTH_URL}>
                        카카오로 간편 로그인
                    </a>
                </KakaoDiv>

            </Container>
        </>
    )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`

const LoginText = styled.div`
  width: 80%;
  h2 {
    color : #5A5A5A;
    font-size: 24px;
    font-weight: bold;
    padding: 16px 0;
  }
`

const InputBox = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: 10px;

  input {
    padding: 12px;
    width: 100%;
    height: 30px;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
  }
`
const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 10px;

  button {
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 10px;
    color: black;
    background-color: #A1ED00;
    cursor: pointer;
  }
`

const SignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 15px;

  button {
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 10px;
    color: black;
    background-color: #A1ED00;
    cursor: pointer;
  }
`

const KakaoDiv = styled.div`
  display: flex;
  text-align: center;
  width: 80%;
  margin-top: 15px;

  a {
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 10px;
    color: black;
    cursor: pointer;
  }
`