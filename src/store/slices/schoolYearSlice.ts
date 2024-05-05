import { SchoolYearResponse } from "@/models/schoolYears/schoolYearResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
});

export default schoolYeasSlice.reducer;