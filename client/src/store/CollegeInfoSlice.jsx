import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../api/AxiosInstance";


export const fetchCollegeByslug = createAsyncThunk(
    'collegeInfo/fetchCollegeByslug',
    async(slug, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/colleges/getcollege/slug/${slug}`);
            // console.log('hey', response.data);
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
            // console.log('streamInfo', response.data);
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
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchSeatsInfoByCollegeId = createAsyncThunk(
    'seatsInfo/fetchSeatsInfoByCollegeId',
    async(collegeId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/reservationseats/getstreamandseatsinfo/${collegeId}`);
            // console.log(response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchFullStreamDetailsByStreamId = createAsyncThunk(
    'streamInfo/fetchFullStreamDetailsByStreamId',
        async (streamId, {rejectWithValue}) => {
            try {
                const response = await axiosInstance.get(`/colleges/getstreamdetailsbystreamid/${streamId}`);
                // console.log(response.data);
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response.data)
            }
        }
);

export const fetchCollegeAddressByCollegeId = createAsyncThunk(
    'addressInfo/fetchCollegeAddressByCollegeId',
    async(collegeId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/colleges/getcollegeaddress/${collegeId}`);
            // console.log(response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCollegeSeatsFullInfoByStreamId = createAsyncThunk(
    'seatsFullInfo/fetchCollegeSeatsFullInfoByStreamId',
    async(streamId, {rejectWithValue}) => {
       try {
        const response = await axiosInstance.get(`/reservationseats/getseatsinfobystreamid/${streamId}`);
        console.log('Full Seats', response.data);
        return response.data;
       } catch (error) {
        return rejectWithValue(error.response.data)
       }
    }
)



const collegeInfoSlice = createSlice({
    name: 'collegeInfo',
    initialState: {
        college: null,
        streamDetails: [],
        streamFullDetails: null,
        collegeAddressInfo: null,
        seatsDetails: [],
        seatsFullInfo: [],
        loadingSeatsFullInfo:false,
        loadingSeats: false,
        loadingAddressInfo: false,
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
            })
            .addCase(fetchFullStreamDetailsByStreamId.pending, (state) => {
                state.loading = false;
                state.error = null
            })
            .addCase(fetchFullStreamDetailsByStreamId.fulfilled, (state, action) => {
                state.loading = false;
                state.streamFullDetails = action.payload.stream
            })
            .addCase(fetchFullStreamDetailsByStreamId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch full Stream details'
            })
            .addCase(fetchCollegeAddressByCollegeId.pending, (state) => {
                state.loadingAddressInfo = true,
                state.error = null
            })
            .addCase(fetchCollegeAddressByCollegeId.fulfilled, (state, action) => {
                state.loadingAddressInfo = false;
                state.collegeAddressInfo = action.payload.collegeAddress
            })
            .addCase(fetchCollegeAddressByCollegeId.rejected, (state, action) => {
                state.loadingAddressInfo = false;
                state.error = action.payload?.message || 'Failed to fetch college Address Info'
            })
            .addCase(fetchSeatsInfoByCollegeId.pending, (state) => {
                state.loadingSeats = true,
                state.error = null
            })
            .addCase(fetchSeatsInfoByCollegeId.fulfilled, (state, action) => {
                state.loadingSeats = false,
                state.seatsDetails = action.payload.college
            })
            .addCase(fetchSeatsInfoByCollegeId.rejected, (state, action) => {
                state.loadingSeats = false,
                state.error = action.payload?.message || 'Failed to fetch Seats Info'
            })
            .addCase(fetchCollegeSeatsFullInfoByStreamId.pending, (state) => {
                state.loadingSeatsFullInfo = true,
                state.error = null
            })
            .addCase(fetchCollegeSeatsFullInfoByStreamId.fulfilled, (state, action) => {
                state.loadingSeatsFullInfo = false,
                state.seatsFullInfo = action.payload.stream
            })
            .addCase(fetchCollegeSeatsFullInfoByStreamId.rejected, (state, action) => {
                state.loadingSeatsFullInfo = false,
                state.error = action.payload?.message || 'Failed to fetch Full Seats Inof'
            })
    }
});

export default collegeInfoSlice.reducer;