import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi, getApi, putApi, deleteApi} from "../../shared/api/client";
import { getDatabase, ref, set } from "firebase/database";
import { app } from '../../firebase'

export const getPlan = createAsyncThunk(
    'plan/getPlan',
    async (userId, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/list/${userId}/1`)
            console.log(res)
            return res.data.data
        } catch (err) {
            // window.alert(err.response.data.message)
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getMorePlan = createAsyncThunk(
    'plan/getMorePlan',
    async ({userId, page}, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/list/${userId}/${page}`)
            return res.data.data.planList
        } catch (err) {
            // window.alert(err.response.data.message)
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getOnePlan = createAsyncThunk(
    `plan/getOnePlan`,
    async (planUrl, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/list/${planUrl}`)
            const {data} = res.data
            return data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getHistoryPlan = createAsyncThunk(
    'plan/getHistoryPlan',
    async (_, {rejectedWithValue}) => {
        try {
            const res = await getApi('/member/history/1')
            console.log(res)
            return res.data
        } catch (err) {
            // window.alert(err.response.data.message)
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const addPlan = createAsyncThunk(
    'plan/addPlan',
    async ({data, navigate}, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/member/plan', data)
            navigate('/main')
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const editPlan = createAsyncThunk(
    'plan/editPlan',
    async ({data, navigate}, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await putApi(`/member/list/${data.planId}`, data)
            console.log(res)
            // navigate(`/detail/${planId}`)
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const deletePlan = createAsyncThunk(
    'plan/deletePlan',
    async ({planUrl, navigate}, {rejectedWithValue}) => {
        // console.log(planId)
        try {
            const res = await deleteApi(`/member/list/${planUrl}`)
            console.log(res)
            // window.alert(res.data.message)
            navigate('/main')
            return planUrl
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

const initialState = {
    plans: [],
    totalPage: 1,
    showplan: null,
    loading: 'idle',
}

export const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        getPlanList: (state, action) => {
            state.plans = action.payload
        },
        resetPlan: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPlan.pending, state => {
                if (state?.loading === 'idle'){
                    state.loading = 'pending'
                }
            })
            .addCase(getPlan.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'succeeded'
                    const {totalPage, planList} = action.payload
                    state.plans = planList;
                    state.totalPage = totalPage
                }
            })
            .addCase(getPlan.rejected, state => {
                if (state.loading === 'pending') {
                    state.loading = 'failed'
                }
            })
            .addCase(getMorePlan.pending, state => {
                if (state?.loading === 'idle'){
                    state.loading = 'pending'
                }
            })
            .addCase(getMorePlan.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'succeeded'
                    state.plans = [...state.plans, ...action.payload];
                }
            })
            .addCase(getMorePlan.rejected, state => {
                if (state.loading === 'pending') {
                    state.loading = 'failed'
                }
            })
            .addCase(getOnePlan.fulfilled, (state, action) => {
                state.showplan = action.payload;
            })
            .addCase(addPlan.fulfilled, (state, action) => {

            })
            .addCase(editPlan.fulfilled, (state, action) => {
                const data = {...state.showplan, ...action.payload}
                state.showplan = data
                state.plans = state.plans.map((plan) => plan.planId === action.payload.planId ? action.payload : plan)
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.showplan = null
                state.plans = state.plans.filter((plan) => plan.planId !== action.payload)
            })
    }
})

export const {setLoading, getPlanList, resetPlan} = planSlice.actions

export default planSlice.reducer