import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface StudentState {

}

const initialState: StudentState = {

}

const studentSlice = createSlice({
    name: "student",
    reducers: {},
    initialState
});

export default studentSlice.reducer;

export const studentSelector = (state: RootState) => state.studentReducer;