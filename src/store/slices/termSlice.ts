import { ServiceResponse } from "@/models/serviceResponse";
import { TermResponse } from "@/models/terms/termResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TermState {
    terms: TermResponse[],
    termsLoaded: boolean
}

const initialState: TermState = {
    terms: [],
    termsLoaded: false
}

export const fetchTerms = createAsyncThunk<ServiceResponse<TermResponse[]>>
    ("term/fetchTerms", async () => {
        try {
            return await server.terms.getTerms();
        } catch (error) {
            console.log("error : ", error);
        }
    });

const termSlice = createSlice({
    name: "term",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchTerms.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.terms = data;
                state.termsLoaded = true;
                console.log("fetchTerms : ", state.terms)

            }
        });
    }
});

export default termSlice.reducer;
export const useTermSelector = (state: RootState) => state.termReducer