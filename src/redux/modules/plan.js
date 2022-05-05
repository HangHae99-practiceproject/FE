import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi} from "../../shared/api/client";
import {getApi} from '../../shared/api/client';

const initialState = {
    loading: 'idle'
}

export const addPlan = createAsyncThunk(
    'member/plan',
    async (data, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/member/plan', data)
            window.location.assign('/main')
            return res
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
        }
    },
    extraReducers: {
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

export const {setLoading} = planSlice.actions

export default planSlice.reducer