import { GenderResponse } from "@/models/genders/genderResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GenderState {
    genders: GenderResponse[];
    gendersLoaded: boolean;
}

const initialState: GenderState = {
    genders: [],
    gendersLoaded: false
}

export const fetchGenders = createAsyncThunk<ServiceResponse<GenderResponse[]>>
    ("gender/fetchGenders", async () => {
        try {
            return await server.genders.getGenders();
        } catch (error) {
            console.log("error : ", error);
        }
    });

const genderSlice = createSlice({
    name: "gender",
    initialState,
    reducers: {

    },
});

export default genderSlice.reducer;