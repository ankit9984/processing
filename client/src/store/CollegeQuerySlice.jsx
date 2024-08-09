import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/AxiosInstance';

// const initialRegions = ['Mumbai', 'Pune', 'Nashik', 'Nagpur'];

export const fetchZonesByRegion = createAsyncThunk(
    'zoneInfo/fetchZonesByRegion',
    async (region, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`search/get-by-region?region=${region}`);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCitiesByZoneAndRegion = createAsyncThunk(
    'citiesInfo/fetchCitiesByZoneAndRegion',
    async ({region, zone}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/search/get-by-zone?region=${region}&zone=${zone}`);
            // console.log('hey');
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const filterColleges = createAsyncThunk(
    'collegeQuery/filterColleges',
    async(filters, {rejectWithValue}) => {
        // console.log(filters);
        try {
            const response = await axiosInstance.get('/search/colleges/filter', {params: filters});
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const querySlice = createSlice({
    name: 'CollegeQuery',
    initialState: {
        showQuery: false,
        selectedFilter: '',
        track: [],
        zones: [],
        area: [],
        filterColleges: [],
        laodingFilterColleges: false,
        loadingZone: false,
        loadingArea: false,
        error: null,
    },
    reducers: {
        setShowQuery: (state, action) => {
            state.showQuery = action.payload;
        },
        setSelectedFilter: (state, action) => {
            state.selectedFilter = action.payload;
        },
        addToTrack: (state, action) => {
            // console.log(action.payload);
            
            const {type, value} = action.payload;
            const index = state.track.findIndex(item => item.type === type);
            if(index !== -1){
                state.track[index] = {type, value};
            }else{
                state.track.push({type, value});
            }
        },
        removeFromTrack: (state, action) => {
            const { value, type } = action.payload;
            if (type === 'region') {
                state.track = state.track.filter(item => item.type !== 'region' && item.type !== 'zone' && item.type !== 'area');
                state.zones = [];
                state.area = [];
            } else if (type === 'zone') {
                state.track = state.track.filter(item => item.type !== 'zone' && item.type !== 'area');
                state.area = [];
            } else {
                state.track = state.track.filter(item => item.value !== value);
            }
        },
        clearTrack: (state) => {
            state.track = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchZonesByRegion.pending, (state) => {
                state.loadingZone = true;
                state.error = null;
            })
            .addCase(fetchZonesByRegion.fulfilled, (state, action) => {
                state.loadingZone = false;
                state.zones = action.payload.zone;
            })
            .addCase(fetchZonesByRegion.rejected, (state, action) => {
                state.loadingZone = false;
                state.error = action.payload?.message || 'Failed to fetch zones';
            })
            .addCase(fetchCitiesByZoneAndRegion.pending, (state) => {
                state.loadingArea = true,
                state.error = null;
            })
            .addCase(fetchCitiesByZoneAndRegion.fulfilled, (state, action) => {
                state.loadingArea = false;
                state.area = action.payload.allArea;
            })
            .addCase(fetchCitiesByZoneAndRegion.rejected, (state, action) => {
                state.loadingArea = false;
                state.error = action.payload?.message || 'Failed to fetch Cities'
            })
            .addCase(filterColleges.pending, (state) => {
                state.laodingFilterColleges = true,
                state.error = null
            })
            .addCase(filterColleges.fulfilled, (state, action) => {
                state.laodingFilterColleges = false,
                state.filterColleges = action.payload.colleges
            })
            .addCase(filterColleges.rejected, (state, action) => (
                state.laodingFilterColleges = false,
                state.error = action.payload?.message || 'Failed to fetch Filters Colleges'
            ))
    },
});

export const { setTrack, setShowQuery, setSelectedFilter, clearTrack, addToTrack, removeFromTrack } = querySlice.actions;

export default querySlice.reducer;
