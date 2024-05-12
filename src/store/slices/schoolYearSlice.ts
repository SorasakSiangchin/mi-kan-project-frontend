import { SchoolYearResponse } from "@/models/schoolYears/schoolYearResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SchoolYearState {
    schoolYears: SchoolYearResponse[],
    schoolYearsLoaded: boolean
}

const initialState: SchoolYearState = {
    schoolYears: [],
    schoolYearsLoaded: false
}

export const fetchSchoolYears = createAsyncThunk<ServiceResponse<SchoolYearResponse[]>>
    ("schoolYeas/fetchSchoolYears", async () => {
        try {
            return await server.schoolYears.getSchoolYears();
        } catch (error) {
            console.log("error : ", error);
        }
    });

const schoolYeasSlice = createSlice({
    name: "schoolYeas",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchSchoolYears.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.schoolYears = data;
                state.schoolYearsLoaded = true;
                console.log("fetchSchoolYears : ", state.schoolYears)

            }
        });
    }
});

export default schoolYeasSlice.reducer;
export const useSchoolYearsSelector = (state: RootState) => state.schoolYearReducer;