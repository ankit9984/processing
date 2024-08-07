import { createSlice } from "@reduxjs/toolkit";

const initialRegions = ['Mumbai', 'Pune', 'Nashik', 'Nagpur'];
const collegeUiSlice = createSlice({
    name: 'CollegeFilterUi',
    initialState: {
        showQuery: false,
        selectedFilter: ''
    },
    reducers: {
        setShowQuery: (state, action) => {
            state.showQuery = action.payload;
            // console.log(action);
            
        },
        setSelectedFilter: (state, action) => {
            state.selectedFilter = action.payload;
        },
    },
});

export const {setShowQuery, setSelectedFilter} = collegeUiSlice.actions;
export default collegeUiSlice.reducer;