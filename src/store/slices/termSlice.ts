import { ServiceResponse } from "@/models/serviceResponse";
import { TermResponse } from "@/models/terms/termResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
});

export default termSlice.reducer;