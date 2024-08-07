import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../api/AxiosInstance'


export const fetchZonesByRegion = createAsyncThunk(
    'zoneInfo/fetchZonesByRegion',
    async (region, {rejetWithValue}) => {
        try {
            const response = await axiosInstance.get(`search/get-by-region?region=${region}`);
            console.log(response.data);
            return response.data
        } catch (error) {
            return rejetWithValue(error.response.data)
        }
    }
);


const querySlice = createSlice({
    name: 'CollegeQuery',
    initialState: {
        track: [],
        zones: [],
        loadingZone: false,
        error: null
    },
    reducers: {
        setTrack: (state, action) => {
            state.track = action.payload
        },
        addToTrack: (state, action) => {
            state.track.push(action.payload);
        },
        removeFromTrack: (state, action) => {
            state.track = state.track.filter(item => item !== action.payload);
        },
        clearTrack: (state) => {
            state.track = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchZonesByRegion.pending, (state) => {
                state.loadingZone = true,
                state.error = null
            })
            .addCase(fetchZonesByRegion.fulfilled, (state, action) => {
                state.loadingZone = false,
                state.zones = action.payload.zone
            })
            .addCase(fetchZonesByRegion.rejected, (state, action) => {
                state.loadingZone = false,
                state.error = action.payload?.message || 'Failed to fetch zones'
            })
    }
});

export const {setTrack, addToTrack, removeFromTrack} = querySlice.actions

export default querySlice.reducer;