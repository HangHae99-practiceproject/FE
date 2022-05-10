import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setUserName, signUp} from "../redux/modules/user";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import {getApi, postApi} from "../shared/api/client";

const Signup = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [pw, setPw] = useState('')
    const [pwCheck, setPwCheck] = useState('')
    const loading = useSelector((state) => state.user.loading)

    const handleSignUp = () => {
        if (!username || !nickname || !pw || !pwCheck) {
            return window.alert('내용을 모두 입력해주세요');
        }
        if (pw !== pwCheck) {
            return window.alert('비밀번호가 일치하지 않습니다');
        } else {
            const data = {
                username,
                nickname,
                password: pw,
            }
            dispatch(signUp({data, navigate}));
        }
    };

    //엔터 입력시
    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSignUp();
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
                <SignupText>
                    <h2>회원가입</h2>
                </SignupText>

                <InputBox>
                    <input
                        value={username}
                        placeholder='아이디를 입력하세요'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputBox>

                <InputBox>
                    <input
                        value={nickname}
                        placeholder='닉네임을 입력하세요'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </InputBox>

                <InputBox>
                    <input
                        value={pw}
                        placeholder='비밀번호를 입력하세요'
                        type='password'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPw(e.target.value)}
                    />
                </InputBox>

                <InputBox>
                    <input
                        value={pwCheck}
                        placeholder='비밀번호를 다시 한번 입력하세요'
                        type='password'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPwCheck(e.target.value)}
                    />
                </InputBox>

                <SignUpDiv>
                    <button
                        onClick={handleSignUp}
                    >회원가입
                    </button>
                </SignUpDiv>
            </Container>
        </>
    )
}

export default Signup

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`

const SignupText = styled.div`
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
    width: 100%;
    height: 30px;
    padding: 12px;
    border: 1px solid #c4c4c4;
    border-radius: 10px;

    &:focus {
      outline: none;
    }
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




// useEffect(() => {
//     const getUser = async () => {
//         try {
//             const res = await getApi('/user/me')
//             if ( res.status === 200 ) {
//                 dispatch(setUserName(res.data.userName))
//             }
//         } catch (e) {
//             //..
//         }
//     }
//     getUser()
// }, [])
//
// const handleSignUp = async () => {
//     try {
//         const res = await postApi('/user/signup', {id, nickname, pw})
//         if ( res.status === 200 ) {
//             dispatch(setUserName(res.data.userName))
//         }
//     } catch (e) {
//         //..
//     }
// }