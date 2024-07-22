import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:3000/api';

export const registerAdmin = createAsyncThunk(
    'auth/registerAdmin',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/registeradmin`, userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/loginAdmin`, userData);
            if(response.data.admin){
                localStorage.setItem('token', response.data.token)
            }
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        admin: null,
        isLoading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.admin = null,
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerAdmin.fulfilled, (state, action) => {
                state.isLoading = false,
                state.admin = action.payload.admin
            })
            .addCase(registerAdmin.rejected, (state, action) => {
                state.isLoading = false,
                console.log(state.payload);
                state.error = action.payload.error;
            })
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.isLoading = false,
                state.admin = action.payload.admin;
                console.log(state.admin);
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false,
                state.error = action.payload.error;
            })
    },
});

export default authSlice.reducer;