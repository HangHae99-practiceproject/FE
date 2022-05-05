import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi, getApi} from "../../shared/api/client";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { app } from '../../firebase'

const initialState = {
    loading: 'idle'
}

export const getPlan = createAsyncThunk(
    `/member/list/${document.cookie.split("=")[0]}/1`,
    async ( _ , {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/list/${document.cookie.split("=")[0]}/1`)
            return res.data
        } catch (err) {
            // window.alert(err.response.data.message)
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getOnePlan = createAsyncThunk(
    `member/list`,
    async ( planId , {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/list/${planId}`)
            const data = res.data
            console.log(data.data)
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
    '/member/plan',
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

export const planSlice = createSlice({
    name: 'plan',
    initialState: {
        plans: [],
        showplan: [],
    },
    reducers: {
        // setLoading: (state, action) => {
        //     state.loading = action.payload
        // },
        // getPlanList: (state, action) => {
        //     state.plan = action.payload
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(getPlan.fulfilled, (state, action) => {
                state.plans = action.payload;
            })
            .addCase(getOnePlan.fulfilled, (state, action) => {
                state.showplan = action.payload;
            })
            .addCase(addPlan.fulfilled, (state, action) => {})
    }
})

export const {setLoading, getPlanList} = planSlice.actions

export default planSlice.reducer