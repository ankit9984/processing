import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../api/AxiosInstance";


export const fetchCollegeByslug = createAsyncThunk(
    'collegeInfo/fetchCollegeByslug',
    async(slug, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/colleges/getcollege/slug/${slug}`);
            // console.log(response.data);
            return response.data.college;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCollegeById = createAsyncThunk(
    'collegeInfo/fetchCollegeById',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/colleges/getcollege/${id}`);
            // console.log(response.data);
            return response.data.college
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const fetchStreamInfoByCollegeId = createAsyncThunk(
    'streamInfo/fetchStreamInfoByCollegeId',
    async(collegeId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/colleges/getstreaminfobycollegeid/${collegeId}`);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchStreamInfoByCollegeUrl = createAsyncThunk(
    'collegeInfo/fetchStreamInfoByCollegeUrl',
    async (slug, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/colleges/getstreaminfobycollegeurl/${slug}/course-fees`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const collegeInfoSlice = createSlice({
    name: 'collegeInfo',
    initialState: {
        college: null,
        streamDetails: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollegeByslug.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(fetchCollegeByslug.fulfilled, (state, action) => {
                state.loading = false,
                state.college = action.payload
            })
            .addCase(fetchCollegeByslug.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload?.message || 'Failed to fetch college Information'
            })
            .addCase(fetchStreamInfoByCollegeId.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchStreamInfoByCollegeId.fulfilled, (state, action) => {
                state.loading = false;
                state.streamDetails = action.payload;
            })
            .addCase(fetchStreamInfoByCollegeId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch details'
            })
            .addCase(fetchStreamInfoByCollegeUrl.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStreamInfoByCollegeUrl.fulfilled, (state, action) => {
                state.loading = false;
                state.streamDetails = action.payload.streams;
            })
            .addCase(fetchStreamInfoByCollegeUrl.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch stream details';
            });
    }
});

export default collegeInfoSlice.reducer;