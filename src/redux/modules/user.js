import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getApi, postApi} from "../../shared/api/client";
import { deleteCookie, getCookie, setCookie } from '../../shared/utils/Cookie';
import axios from "axios";


const initialState = {
    user: null,
    loading: 'idle',
    is_login: false
}

export const signUp = createAsyncThunk(
    'user/signup',
    async (data, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/user/signup', data)
            console.log(res)
            window.location.assign('/login')
            return {
                data: res.data,
                status: res.status
            }
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)


export const login = createAsyncThunk(
    'user/login',
    async (data, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/user/login', data, {
                withCredentials: false,
            })
            console.log(res.headers)
            localStorage.setItem('token', res.headers.authorization)
            setCookie(res.data.id, res.data.nickname)
            window.location.assign('/main')
            return {
                data: res.data,
                status: res.status
            }
        } catch (err) {
            alert(err.response.data.exception)
            return rejectedWithValue(err.response)
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, {rejectedWithValue}) => {
        console.log(_)
        const data = {
            data : '',
        }
        console.log(data)
        try {
            const res = await postApi('/user/logout', data);
            localStorage.removeItem('token');
            deleteCookie(document.cookie.split("=")[0])
            setTimeout(() => window.location.assign('/login'), 1000)
            return {
                data: res.data,
                status: res.status
            }
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getUserToken = createAsyncThunk(
    'user/getUserToken',
    async (_, {rejectedWithValue}) => {
        try {
            const res = await getApi('/api/kakao/callback',{
                withCredentials : true,
            })
            return {
                data: res.data,
            }
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    extraReducers: {
        // user/signup/pending === signUp.pending
        [signUp.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        // user/signup/fulfilled === signUp.fulfilled
        [signUp.fulfilled]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'succeeded'
                state.user = action.payload
            }
        },
        // user/signUp/rejected === signUp.rejected
        [signUp.rejected]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'failed'
            }
        },
        // user/login/pending === login.pending
        [login.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        // user/login/fulfilled === login.fulfilled
        [login.fulfilled]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'succeeded'
                state.user = action.payload
            }
        },
        // user/login/rejected === login.rejected
        [login.rejected]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'failed'
            }
        },
        [getUserToken.fulfilled]: (state, action) => {
            state.is_login = true
            state.user = action.payload
        }
    },
})

// 1
// export const setUserName = userSlice.actions.setUserName
// export const setUserName1 = userSlice.actions.setUserName1
// export const setUserName2 = userSlice.actions.setUserName2

// 2
export const {setUserName, setLoading} = userSlice.actions

// 3
// export const actions = userSlice.actions

export const KakaoLogin = code => {
    return function () {
        axios({
            method: 'GET',
            url: `https://imonint.shop/api/kakao/callback?code=${code}`,
        })
            .then(res => {
                console.log(res)
                const ACCESS_TOKEN = res.headers.authorization;
                // localStorage.setItem('token', ACCESS_TOKEN);
                setCookie('token', ACCESS_TOKEN, 1)
                window.location.assign('/main')

                debugger;
            })
            .catch(err => {
                console.log('소셜로그인 에러', err);

                window.location.assign('/login');
            });
    };
};
const actionCreators = { KakaoLogin };
export { actionCreators };

export default userSlice.reducer