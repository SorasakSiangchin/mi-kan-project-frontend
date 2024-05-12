import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import server from "@/services/serverService";
import { ServiceResponse } from "@/models/serviceResponse";
import { StudentCreate } from "@/models/students/studentCreate";

interface StudentState {
    createStudentLoaded: boolean;
}

const initialState: StudentState = {
    createStudentLoaded: false,
}

export const createStudent = createAsyncThunk<ServiceResponse<any>, StudentCreate>("student/createStudent",
    async (data, _) => {
        try {
            return await server.students.createStudent(data)
        } catch (error) {
            console.log("error : ", error);
        }
    });

const studentSlice = createSlice({
    name: "student",
    reducers: {},
    initialState
});

export default studentSlice.reducer;

export const studentSelector = (state: RootState) => state.studentReducer;