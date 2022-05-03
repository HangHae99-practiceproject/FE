import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import styled from "styled-components";

import {login, setLoading, setUserName} from "../redux/modules/user";

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

    const setUser = (userName) => {
        dispatch(setUserName(userName))
    }

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
        <Container>
            <div>
                <h1>On it</h1>
            </div>

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
                <button>카카오톡 로그인</button>
            </SignUpDiv>

            <SignUpDiv>
                <button
                    onClick={() => {
                        navigate('/signup')
                    }}
                >회원가입
                </button>
            </SignUpDiv>
        </Container>
    )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputBox = styled.div`
  display: flex;
  width: 70%;
  margin-bottom: 10px;

  input {
    width: 100%;
    height: 30px;
  }
`
const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 10px;

  button {
    width: 100%;
    height: 30px;
    border: 0px;
    color: white;
    background-color: black;
  }
`

const SignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 15px;

  button {
    width: 100%;
    height: 30px;
    border: 0px;
    color: white;
    background-color: black;
  }
`