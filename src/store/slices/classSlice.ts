import { ClassResponse } from "@/models/classes/classResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ClassState {
    classes: ClassResponse[],
    classesLoaded: boolean
}

const initialState: ClassState = {
    classes: [],
    classesLoaded: false
}

export const fetchClasses = createAsyncThunk<ServiceResponse<ClassResponse[]>>
    ("class/fetchClasses", async () => {
        try {
            //await new Promise((resolve) => setTimeout(resolve, 3000));
            return await server.classes.getClasses();
        } catch (error) {
            console.log("error : ", error);
        }
    });

const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchClasses.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.classes = data;
                state.classesLoaded = true;
                // console.log("fetchClasses : ", state.classes)
            }
        });
    }
});

export default classSlice.reducer;

export const useClassSelector = (state: RootState) => state.classReducer