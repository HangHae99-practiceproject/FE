import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi, getApi} from "../../shared/api/client";
import {signUp} from "./user";

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

export const planSlice = createSlice({
        name: 'plan',
        initialState,
        reducers: {
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
        },
    }
)

export const {getPlanList} = planSlice.actions

export default planSlice.reducer