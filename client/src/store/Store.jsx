import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "./SearchSlice";
import CollegeReducer from "./CollegeInfoSlice";
import CollegeFilterUiReducer from './UiCollegeQuerySlice';
import regionReducer from "./regionSlice";
import CollegeQueryReducer from "./CollegeQuerySlice";
const store = configureStore({
    reducer: {
        search: SearchReducer,
        collegeInfo: CollegeReducer,
        uiCollQuery: CollegeFilterUiReducer,
        regions: regionReducer,
        collegeQuery: CollegeQueryReducer
    }
});

export default store;