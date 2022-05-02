import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  actionCreators as userActions,
  getUserbyToken,
} from '../redux/modules/user';

import Spinner from '../elements/Spinner';
import axios from 'axios';
import { setCookie } from '../shared/utils/Cookie';
import { useNavigate } from 'react-router-dom';

const OAuthHandler = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    async function fetchData() {
      // axios({
      //   method: 'GET',
      //   url: `https://seoultaste.click/users/kakao/callback?code=${code}`,
      // })
      //   .then(response => {
      //     console.log(response); // 토큰이 넘어올 것임

      //     const ACCESS_TOKEN = response.headers.authorization;

      //     // localStorage.setItem('token', ACCESS_TOKEN);
      //     console.log(ACCESS_TOKEN);

      //     setCookie('token', ACCESS_TOKEN, 1);

      //     debugger;
      //   })
      //   .catch(err => {
      //     console.log('소셜로그인 에러', err);
      //     // debugger;

      //     window.location.assign('/');
      //   });
      await axios
        .get(`https://seoultaste.click/users/kakao/callback?code=${code}`)
        .then(response => {
          // console.log(response); // 토큰이 넘어올 것임

          const ACCESS_TOKEN = response.headers.authorization;

          // localStorage.setItem('token', ACCESS_TOKEN);
          // console.log(ACCESS_TOKEN);

          setCookie('token', ACCESS_TOKEN, 1);
          dispatch(getUserbyToken()).then(res => navigate('/main'));
        })
        .catch(err => {
          console.log('소셜로그인 에러', err);
          // debugger;

          window.location.assign('/');
        });

      // dispatch(userActions.KakaoLogin(code));
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spinner />;
};

export default OAuthHandler;