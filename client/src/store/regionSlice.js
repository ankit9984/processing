import { createSlice } from "@reduxjs/toolkit";

const initialRegions = ['Mumbai', 'Pune', 'Nashik', 'Nagpur'];
const collegeType = ['All', 'Boys', 'Co-Ed', 'Girls'];
const stream = ['Science', 'Commerce', 'Arts', 'HSVC'];
const streamStatus = ['Aided', 'B.M.C.', 'Goverment', 'Partially Aided(20% to 80%)', 'Self-Finence', 'Un-Aided'];
const medium = ['English', 'Hindi', 'Gujrati', 'Marathi', 'Kannad', 'Shindi', 'Urdu'];

const regionSlice = createSlice({
    name: 'regions',
    initialState: {
        allRegions: initialRegions,
        filteredRegions: initialRegions,
        stream: stream,
        streamStatus: streamStatus,
        medium: medium,
        type: collegeType,
        searchTerm: '',
        knowSelectedFilters: []
    },
    reducers: {
        setSearchTerm: (state, action) => {
            // console.log(action.pa);
            
            state.searchTerm = action.payload;
            state.filteredRegions = state.allRegions.filter(region => 
                region.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        setKnowSelectedFilters: (state, action) => {
            const filter = action.payload;
            console.log(filter);
            if(state.knowSelectedFilters.includes(filter)){
                state.knowSelectedFilters = state.knowSelectedFilters.filter(item => item !== filter);
            }else{
                state.knowSelectedFilters.push(filter)
            }
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setStream: (state, action) => {
            state.stream = action.payload;
        },
        setStreamStatus: (state, action) => {
            state.streamStatus = action.payload;
        },
        setMedium: (state, action) => {
            state.medium = action.payload;
        },
        clearSearch: (state) => {
            state.searchTerm = '',
            state.filteredRegions = state.allRegions
        },
    },
});

export const {setSearchTerm, clearSearch, setType, setKnowSelectedFilters} = regionSlice.actions;
export default regionSlice.reducer;