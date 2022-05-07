import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../shared/api/client';

export const getPlanId = createAsyncThunk(
  'map/getPlanId',
  async (data, { rejectWithValue }) => {
    try {
      const res = await getApi(`/map/${data}`)
      return res.data.data
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    planId: '',
    planName: '',
    publicMaps: [],
    publicChats: [],
    url: '',
    loading: false,
  },
  reducers: {
    setPublicMaps: (state, action) => {
      let index = state.publicMaps.findIndex(
        e =>
          e.sender === action.payload.sender && e.type === action.payload.type,
      );
      if (index !== -1) {
        state.publicMaps[index] = action.payload;
      } else {
        state.publicMaps.push(action.payload);
      }
      if (index !== -1) {
        state.publicChats.push(action.payload);
      } else state.publicMaps[index] = action.payload;
    },
    setPublicChats: (state, action) => {
      if (!state.is_public_send) {
        state.is_public_send = true;
        state.publicChats = action.payload;
        state.is_public_send = false;
      }
    },
    setSoketClear: (state, action) => {
      state.publicChats = [];
      state.publicMaps = [];
    },
    seturl: (state, action) => {
      state.url = action.payload;
    },

    setOnePlan: (state, action) => {
      state.showplan = { ...state.showplan, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPlanId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPlanId.fulfilled, (state, action) => {
        state.planId = action.payload.planId;
        state.planName = action.payload.planName;
        state.loading = false;
      });
  },
});
export const { setPublicMaps, setSoketClear, setPublicChats } =
  mapSlice.actions;

export default mapSlice.reducer;