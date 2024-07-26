import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../api/AxiosInstance";


export const fetchCollegeByslug = createAsyncThunk(
    'collegeInfo/fetchCollegeByslug',
    async(slug, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/colleges/getcollege/slug/${slug}`);
            // console.log(response.data);
            return response.data;
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
            console.log(response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const collegeInfoSlice = createSlice({
    name: 'collegeInfo',
    initialState: {
        college: null,
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
                state.college = action.payload.college
            })
            .addCase(fetchCollegeByslug.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload?.message || 'Failed to fetch college Information'
            });
    }
});

export default collegeInfoSlice.reducer;