import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi, getApi, putApi, deleteApi} from "../../shared/api/client";
import Swal from "sweetalert2";
import history from '../../index'

export const getPlan = createAsyncThunk(
    'plan/getPlan',
    async (page, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/plans/${page}`)
            return res.data
        } catch (err) {
            console.log(err.response)
            return rejectedWithValue(err.response)
        }
    }
)

export const getTotalPlan = createAsyncThunk(
    'plan/getTotalPlan',
    async ({page}, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/totalplans/${page}`)
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getMyPlan = createAsyncThunk(
    'plan/getTotalPlan',
    async ({page}, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/myplans/${page}`)
            return res.data.planLists
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getInvitePlan = createAsyncThunk(
    'plan/getTotalPlan',
    async ({page}, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/invitation/plans/${page}`)
            return res.data.planLists
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getOnePlan = createAsyncThunk(
    `plan/getOnePlan`,
    async (planUrl, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/plan/${planUrl}`)
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getHistoryPlan = createAsyncThunk(
    'plan/getHistoryPlan',
    async (page, {rejectedWithValue}) => {
        console.log(page)
        try {
            const res = await getApi('/member/history/1')
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const addPlan = createAsyncThunk(
    'plan/addPlan',
    async (data, {rejectedWithValue}) => {
        try {
            const res = await postApi('/member/plan', data)
            setTimeout(() => {
                history.push("/main");
            }, "600")
            return res.data
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: `${err.response.data.msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            return rejectedWithValue(err.response.data)
        }
    }
)

export const joinPlan = createAsyncThunk(
    'plan/joinPlan',
    async (url, {rejectWithValue}) => {
        try {
            const res = await postApi(`/invitation/${url}`)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '약속에 참여하였 습니다.',
                showConfirmButton: false,
                timer: 1500
            })
            return res.data
        } catch (err) {
            console.log(err.response.data.error)
            return rejectWithValue(err.response)
        }
    }
)

export const editPlan = createAsyncThunk(
    'plan/editPlan',
    async ({data, navigate}, {rejectedWithValue}) => {
        try {
            const res = await putApi(`/member/plan/${data.planUrl}`, data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '수정 완료',
                showConfirmButton: false,
                timer: 1500
            })
            navigate(`/detail/${data.planUrl}`)
            return res.data
        } catch (err) {
            console.log(err)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '수정실패',
                text: '수정하실 내용을 확인해 주세요',
                showConfirmButton: false,
                timer: 1500
            })
            return rejectedWithValue(err.response)
        }
    }
)

export const deletePlan = createAsyncThunk(
    'plan/deletePlan',
    async ({planUrl, navigate}, {rejectedWithValue}) => {
        try {
            const res = await deleteApi(`/member/plan/${planUrl}`)
            console.log(res)
            navigate('/main')
            return planUrl
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

const initialState = {
    created: {
        plans: [],
        totalPage: 0,
    },
    invited: {
        plans: [],
        totalPage: 0,
    },
    all: {
        plans:[],
        totalPage: 0
    },
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
            .addCase(getPlan.fulfilled, (state, action) => {
                state.all.plans = action.payload.totalPlanList.planLists;
                state.all.totalPage = action.payload.totalPlanList.totalPage

                state.created.plans = action.payload.myPlanList.planLists;
                state.created.totalPage = action.payload.myPlanList.totalPage;

                state.invited.plans = action.payload.invitedPlanList.planLists;
                state.invited.totalPage = action.payload.invitedPlanList.totalPage;
            })
            .addCase(getTotalPlan.pending, state => {
                if (state.loading === 'idle'){
                    state.loading = 'pending'
                }
            })
            .addCase(getTotalPlan.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'succeeded'
                    state.all.plans = [...action.payload.planLists];
                    state.all.totalPage = [state.all.totalPage, action.payload.totalPage];
                }
            })
            .addCase(getTotalPlan.rejected, state => {
                if (state.loading === 'pending') {
                    state.loading = 'failed'
                }
            })
            .addCase(getOnePlan.pending, (state, action) => {
                state.showplan = []
            })
            .addCase(getOnePlan.fulfilled, (state, action) => {
                state.showplan = action.payload.data;
            })
            .addCase(addPlan.fulfilled, (state, action) => {

            })
            .addCase(joinPlan.fulfilled, (state, action) => {
            })
            .addCase(editPlan.fulfilled, (state, action) => {
                const data = {...state.showplan, ...action.payload}
                state.showplan = data
                state.created.plans = state.created.plans.map((plan) => plan.planId === action.payload.planId ? action.payload : plan)
                window.location.reload()
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.showplan = null
                state.plans = state.plans.filter((plan) => plan.planId !== action.payload)
            })
    }
})

export const {setLoading, getPlanList, resetPlan} = planSlice.actions

export default planSlice.reducer