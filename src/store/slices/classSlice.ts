import { ClassResponse } from "@/models/classes/classResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
});

export default classSlice.reducer;