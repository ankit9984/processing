import { createSlice } from "@reduxjs/toolkit";

const initialRegions = ['Mumbai', 'Pune', 'Nashik', 'Nagpur'];

const regionSlice = createSlice({
    name: 'regions',
    initialState: {
        allRegions: initialRegions,
        filteredRegions: initialRegions,
        searchTerm: ''
    },
    reducers: {
        setSearchTerm: (state, action) => {
            // console.log(action.pa);
            
            state.searchTerm = action.payload;
            state.filteredRegions = state.allRegions.filter(region => 
                region.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        clearSearch: (state) => {
            state.searchTerm = '',
            state.filteredRegions = state.allRegions
        },
    },
});

export const {setSearchTerm, clearSearch} = regionSlice.actions;
export default regionSlice.reducer;