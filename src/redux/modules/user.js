import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getApi, postApi} from "../../shared/api/client";
import { deleteCookie, setCookie } from '../../shared/utils/Cookie';


const initialState = {
    user: null,
    loading: 'idle',
    is_login: false,
    user_info: {
    }
}

export const signUp = createAsyncThunk(
    'user/signup',
    async (data, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/user/signup', data, {
                withCredentials: false,
            })
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
    'logout',
    async (_, {rejectedWithValue}) => {
        try {
            // const res = await postApi('/logout');
            localStorage.removeItem('token');
            deleteCookie(document.cookie.split("=")[0])
            setTimeout(() => window.location.assign('/login'), 1000)
            // return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const setFCMToken = createAsyncThunk(
  'plan/setFCMToken',
  async (data, { rejectWithValue }) => {
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
  async (data, { rejectWithValue }) => {
    try {
      return await postApi(`/member/alarms`, data)
        .then(response => response.data.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserbyToken = createAsyncThunk(
  'user/getUserbyToken',
  async (_, { rejectWithValue }) => {
    try {
      return await getApi(`/member`, { withCredentials: true })
        .then(response => {
          return response.data.data;
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);


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
                state.user = action.payload;
            }
        },
        // user/login/rejected === login.rejected
        [login.rejected]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'failed'
            }
        },
        [setFCMToken.fulfilled]: (state, action) => {},
        [isFCMToken.fulfilled]: (state, action) => {},
        [getUserbyToken.fulfilled]: (state, action) => {
        state.is_login = true;
        state.user_info = action.payload;
      },
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

export default userSlice.reducer