import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import server from "@/services/serverService";
import { ServiceResponse } from "@/models/serviceResponse";
import { StudentCreate } from "@/models/students/studentCreate";
import { StudentParams } from "@/models/students/studentParams";
import { StudentResponse } from "@/models/students/studentResponse";
import { StudentUpdate } from "@/models/students/studentUpdate";
import { getUserFromSession } from "@/bil/auth";

interface StudentState {
    createStudentLoaded: boolean;
    students: StudentResponse[];
    studentsLoaded: boolean;
    studentParams: StudentParams;
}


const initParams = (): StudentParams => {

    return {
        schoolId: "",
        classId: "",
        classRoomId: "",
        schoolYearId: "",
        termId: "",
        genderId: "",
        searchName: "",
        isAction: true
    }
}

const initialState: StudentState = {
    createStudentLoaded: false,
    studentParams: initParams(),
    students: [],
    studentsLoaded: false
}

export const createStudent = createAsyncThunk<ServiceResponse<StudentResponse[]>, StudentCreate>("student/createStudent",
    async (data, _) => {
        try {
            // console.log("create student : ", data);
            return await server.students.createStudent(data)
        } catch (error) {
            console.log("error : ", error);
        }
    });

export const updateStudent = createAsyncThunk<ServiceResponse<StudentResponse[]>, StudentUpdate>("student/updateStudent",
    async (data, _) => {
        try {
            // console.log("update student : ", data);
            return await server.students.updateStudent(data)
        } catch (error) {
            console.log("error : ", error);
        }
    });

export const getStudents = createAsyncThunk<ServiceResponse<any>, string, { state: RootState }>("student/getStudents",
    async (schoolId, ThunkAPI) => {

        // set schoolId
        ThunkAPI.dispatch(setParam({
            schoolId
        }))

        const param = ThunkAPI.getState().studentReducer.studentParams;
        try {
            return await server.students.getStudents(param);
        } catch (error) {
            console.log("error : ", error);
        }
    })

export const getStudentById = createAsyncThunk<ServiceResponse<StudentResponse>, string>("student/getStudentById",
    async (id) => {
        try {
            return await server.students.getStudentById(id);
        } catch (error) {
            console.log("error : ", error);
        }
    })

const studentSlice = createSlice({
    name: "student",
    reducers: {
        refresh: (state) => {
            state.studentsLoaded = false;
        },
        setParam: (state, action) => {
            state.studentsLoaded = false;
            state.studentParams = {
                ...state.studentParams,
                ...action.payload
            }
        },
        resetParam: (state) => {
            state.studentsLoaded = false;
            state.studentParams = initParams()
        }
    },
    initialState,
    extraReducers: builder => {
        builder.addCase(getStudents.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.students = data;
                state.studentsLoaded = true;
            }
        })
    }
});

export default studentSlice.reducer;

export const { setParam, refresh, resetParam } = studentSlice.actions;

export const studentSelector = (state: RootState) => state.studentReducer;