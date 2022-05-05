import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi, getApi} from "../../shared/api/client";

const initialState = {
    list: [],
    loading: 'idle'
}

export const getPlan = createAsyncThunk(
    '/member/list',
    async (planList, {rejectedWithValue}) => {
        console.log(planList)
        try {
            const res = await getApi('/member/list', planList)
            console.log(res)
            return {
                data: res.data,
                status: res.status
            }
        } catch (err) {
            // window.alert(err.response.data.message)
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const addPlan = createAsyncThunk(
    'member/plan',
    async (data, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/member/plan', data)
            window.location.assign('/main')
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

export const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        getPlanList: (state, action) => {
            state.plan = action.payload
        },
    },
    extraReducers: {
        // plan/setPlan/pending === signUp.pending
        [getPlan.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        // plan/setPlan/fulfilled === signUp.fulfilled
        [getPlan.fulfilled]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'succeeded'
                state.user = action.payload
            }
        },
        // plan/setPlan/rejected === signUp.rejected
        [getPlan.rejected]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'failed'
            }
        },
        [addPlan.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        [addPlan.fulfilled]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'succeeded'
                state.plan = action.payload
            }
        },
        [addPlan.rejected]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'failed'
            }
        },
    }
})

export const {setLoading, getPlanList} = planSlice.actions

export default planSlice.reducer