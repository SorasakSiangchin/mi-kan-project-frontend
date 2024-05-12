import { GenderResponse } from "@/models/genders/genderResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
    extraReducers: builder => {
        builder.addCase(fetchGenders.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.genders = data;
                state.gendersLoaded = true;
                console.log("fetchGenders : ", state.genders)

            }
        });
    }
});

export default genderSlice.reducer;

export const useGenderSelector = (state: RootState) => state.genderReducer