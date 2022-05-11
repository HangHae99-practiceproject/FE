import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getApi, postApi} from "../../shared/api/client";
import {deleteCookie, setCookie} from '../../shared/utils/Cookie';
import axios from "axios";


const initialState = {
    user: null,
    loading: 'idle',
    is_login: false,
    user_info: {}
}

export const signUp = createAsyncThunk(
    'user/signup',
    async ({data, navigate}, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/user/signup', data, {
                withCredentials: false,
            })
            console.log(res)
            navigate('/login')
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
    async ({data, navigate}, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/user/login', data, {
                withCredentials: false,
            })
            console.log(res.headers)
            localStorage.setItem('token', res.headers.authorization)
            setCookie(res.data.id, res.data.nickname)
            navigate('/main')
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
    async (navigate, {rejectedWithValue}) => {
        const data = {
            data: '',
        }
        try {
            const res = await postApi('/api/logout', data);
            localStorage.removeItem('token');
            deleteCookie(document.cookie.split("=")[0])
            setTimeout(() => navigate('/login'), 1000)
            return {
                data: res.data,
            }
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const setFCMToken = createAsyncThunk(
    'plan/setFCMToken',
    async (data, {rejectWithValue}) => {
        try {
            return await postApi(`/member/devices`, data)
                .then(response => response.data.data);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const isFCMToken = createAsyncThunk(
    'plan/isFCMToken',
    async (data, {rejectWithValue}) => {
        try {
            return await postApi(`/member/alarms`, data)
                .then(response => response.data.data);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const getUserToken = createAsyncThunk(
    'user/getUserToken',
    async (_, {rejectedWithValue}) => {
        try {
            const res = await getApi('/users/kakao/callback', {
                withCredentials: true,
            })
            console.log(res)
            return {
                data: res.data.data,
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
        resetUser: (state) => {
            Object.assign(state, initialState)
        }
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
        [setFCMToken.fulfilled]: (state, action) => {
        },
        [isFCMToken.fulfilled]: (state, action) => {
        },
        [getUserToken.fulfilled]: (state, action) => {
            state.is_login = true
            state.user = action.payload
        },
    },
})

// 1
// export const setUserName = userSlice.actions.setUserName
// export const setUserName1 = userSlice.actions.setUserName1
// export const setUserName2 = userSlice.actions.setUserName2

// 2
export const {setUserName, setLoading, resetUser} = userSlice.actions

// 3
// export const actions = userSlice.actions

export const kakaoLogin = code => {
    return function () {
        axios({
            method: 'GET',
            url: `https://imonint.shop/users/kakao/callback?code=${code}`,
        })
            .then(res => {
                console.log(res)
                const ACCESS_TOKEN = res.data.accessToken;
                localStorage.setItem('token', ACCESS_TOKEN);
                // setCookie('token', ACCESS_TOKEN, 1)
                window.location.assign('/main')

                debugger;
            })
            .catch(err => {
                console.log('소셜로그인 에러', err);
                window.location.assign('/login');
            });
    };
};
const actionCreators = {kakaoLogin};
export {actionCreators};

export default userSlice.reducer