import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "./SearchSlice";
import CollegeReducer from "./CollegeInfoSlice";

const store = configureStore({
    reducer: {
        search: SearchReducer,
        collegeInfo: CollegeReducer
    }
});

export default store;