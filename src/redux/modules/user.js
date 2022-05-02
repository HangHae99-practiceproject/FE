import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteCookie, setCookie } from '../../shared/utils/Cookie';

export const register = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.post(`/users/signup`, data).then(response => {
        window.location.assign('/login');

        return response;
      });
    } catch (error) {
      window.alert(error.response.data.message);

      console.log(error);
      return rejectWithValue(error.response);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      // const navigate = useNavigate();
      return await URL.post(`/users/login`, data, {
        withCredentials: true,
      }).then(response => {
        setCookie('token', response.headers.authorization, 1);
        // sessionStorage.setItem('token', response.headers.authorization);
        setTimeout(() => {});
        window.location.assign('/main');
        // console.log('asdf');

        return response.data.data;
      });
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);

      return rejectWithValue(error.response);
    }
  },
);


























































export const KakaoLogin = code => {
  return function () {
    axios({
      method: 'GET',
      url: `https://seoultaste.click/users/kakao/callback?code=${code}`,
    })
      .then(response => {
        const ACCESS_TOKEN = response.headers.authorization;

        // localStorage.setItem('token', ACCESS_TOKEN);

        setCookie('token', ACCESS_TOKEN, 1);

        debugger;
      })
      .catch(err => {
        console.log('소셜로그인 에러', err);
        // debugger;

        window.location.assign('/');
      });
  };
};
const actionCreators = { KakaoLogin };
export { actionCreators };