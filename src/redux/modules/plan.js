import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi, getApi, putApi, deleteApi} from "../../shared/api/client";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { app } from '../../firebase'

const initialState = {
    loading: 'idle',
}

export const getPlan = createAsyncThunk(
    'plan/getPlan',
    async (_, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/list/${document.cookie.split("=")[0]}/1`)
            return res.data
            console.log(res)
        } catch (err) {
            // window.alert(err.response.data.message)
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getOnePlan = createAsyncThunk(
    `plan/getOnePlan`,
    async (planId, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/list/${planId}`)
            const data = res.data
            // console.log(data.data)
            const db = getDatabase(app);
            set(ref(db, `${planId}`), {
                ...data.data
            })
            return data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const addPlan = createAsyncThunk(
    'plan/addPlan',
    async (data, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/member/plan', data)
            window.location.assign('/main')
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const editPlan = createAsyncThunk(
    'plan/editPlan',
    async (data, {rejectedWithValue}) => {
        console.log(data)
        const planId = data?.planId
        console.log(planId)
        try {
            const res = await putApi(`/member/list/${planId}`, data)
            console.log(res)
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const deletePlan = createAsyncThunk(
    'plan/deletePlan',
    async (planId, {rejectedWithValue}) => {
        console.log(planId)
        try {
            const res = await deleteApi(`/member/list/${planId}`)
            console.log(res)
            window.alert(res.data.message)
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
    initialState: {
        plans: [],
        showplan: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        getPlanList: (state, action) => {
            state.plan = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getPlan.fulfilled, (state, action) => {
                state.plans = action.payload;
            })
            .addCase(getOnePlan.fulfilled, (state, action) => {
                state.showplan = action.payload;
            })
            .addCase(addPlan.fulfilled, (state, action) => {

            })
            .addCase(editPlan.fulfilled, (state, action) => {
                const data = {...state.showplan, ...action.payload}
                state.showplan = data
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.showplan = null
                // state.plans = state.plans.filter(e => e.planId !== action.payload)
            })
    }
})

export const {setLoading, getPlanList} = planSlice.actions

export default planSlice.reducer