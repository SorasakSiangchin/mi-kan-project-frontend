import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import server from "@/services/serverService";
import { ServiceResponse } from "@/models/serviceResponse";
import { MultipleIntelligencesResponse } from "@/models/multipleIntelligences/multipleIntelligencesResponse";

interface MultipleIntelligencesState {
    multipleIntelligencesBySchoolId: MultipleIntelligencesResponse[]
    multipleIntelligencesBySchoolIdLoaded: boolean
    multipleIntelligences: MultipleIntelligencesResponse[]
    multipleIntelligencesLoaded: boolean
}

const initialState: MultipleIntelligencesState = {
    multipleIntelligencesBySchoolId: [],
    multipleIntelligencesBySchoolIdLoaded: false,
    multipleIntelligences: [],
    multipleIntelligencesLoaded: false
}

export const fetchMultipleIntelligencesBySchoolId =
    createAsyncThunk<ServiceResponse<MultipleIntelligencesResponse[]>, string | null>("multipleIntelligences/fetchMultipleIntelligencesBySchoolId",
        async (schoolId) => {
            try {
                return await server.multipleIntelligences.getMultipleIntelligencesBySchoolId(schoolId);
            } catch (error) {
                console.log("error : ", error);
            }
        });

export const fetchMultipleIntelligences =
    createAsyncThunk("multipleIntelligences/fetchMultipleIntelligences",
        async () => {
            try {
                return await server.multipleIntelligences.getMultipleIntelligences();
            } catch (error) {
                console.log("error : ", error);
            }
        });

const multipleIntelligencesSlice = createSlice({
    name: "multipleIntelligences",
    initialState,
    reducers: {
        refresh: (state) => {
            state.multipleIntelligencesBySchoolIdLoaded = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMultipleIntelligencesBySchoolId.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.multipleIntelligencesBySchoolId = data;
                state.multipleIntelligencesBySchoolIdLoaded = true;
            }
        });

        builder.addCase(fetchMultipleIntelligences.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.multipleIntelligences = data;
                state.multipleIntelligencesLoaded = true;
            }
        });
    }
});

export default multipleIntelligencesSlice.reducer;

export const { refresh } = multipleIntelligencesSlice.actions;

export const useMultipleIntelligencesSelector = (state: RootState) =>
    state.multipleIntelligencesReducer;

