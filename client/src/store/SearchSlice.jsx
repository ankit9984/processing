import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/AxiosInstance";

export const searchColleges = createAsyncThunk(
    'search/searchColleges',
    async ({query, region}, {rejectWithValue}) => {
        // console.log(query, region);
        try {
            const response = await axiosInstance.get(`/search/searchcolleges`, {params: {query, region}});
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        colleges: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchColleges.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(searchColleges.fulfilled, (state, action) => {
                state.loading = false;
                state.colleges = action.payload.colleges
            })
            .addCase(searchColleges.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
});

export default searchSlice.reducer;