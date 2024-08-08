import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "./SearchSlice";
import CollegeReducer from "./CollegeInfoSlice";
import regionReducer from "./regionSlice";
import CollegeQueryReducer from "./CollegeQuerySlice";
const store = configureStore({
    reducer: {
        search: SearchReducer,
        collegeInfo: CollegeReducer,
        regions: regionReducer,
        collegeQuery: CollegeQueryReducer
    }
});

export default store;