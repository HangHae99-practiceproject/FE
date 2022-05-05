import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {postApi} from "../../shared/api/client";

const initialState = {
    user: null,
    loading: 'idle'
}

export const signUp = createAsyncThunk(
    'user/signup',
    async (data, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/user/signup', data)
            window.location.assign('/login')
            return res
        } catch (err) {
            // window.alert(err.response.data.message)

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
                withCredentials: true,
            })
            localStorage.setItem('token', res.headers.authorization)
            window.location.assign('/main')
            return res
        } catch (err) {
            console.log(err)
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
        try {
            const res = await postApi('/user/logout', data)
            localStorage.removeItem('token')
            setTimeout(() => window.location.assign('/main'), 1000)
            return res
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