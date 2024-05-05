import { SchoolResponse } from "@/models/schools/schoolResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SchoolState {
    schools: SchoolResponse[],
    schoolsLoaded: boolean
};

const initialState: SchoolState = {
    schools: [],
    schoolsLoaded: false
}

export const fetchSchools = createAsyncThunk<ServiceResponse<SchoolResponse[]>>
    ("school/fetchSchools", async () => {
        try {
            return await server.schools.getGenders();
        } catch (error) {
            console.log("error : ", error);
        }
    });

const schoolSlice = createSlice({
    name: "school",
    initialState,
    reducers: {

    },
});

export default schoolSlice.reducer;