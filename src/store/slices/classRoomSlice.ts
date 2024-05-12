import { ClassRoomResponse } from "@/models/classRooms/classRoomResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ClassRoomState {
    classRooms: ClassRoomResponse[],
    classRoomsLoaded: boolean
}

const initialState: ClassRoomState = {
    classRooms: [],
    classRoomsLoaded: false
}

export const fetchClassRooms = createAsyncThunk<ServiceResponse<ClassRoomResponse[]>>
    ("classRoom/fetchClassRooms", async () => {
        try {
            return await server.classRooms.getClassRooms();
        } catch (error) {
            console.log("error : ", error);
        }
    });

const classRoomSlice = createSlice({
    name: "classRoom",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchClassRooms.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.classRooms = data;
                state.classRoomsLoaded = true;
                console.log("fetchClassRooms : ", state.classRooms)
            }
        });
    }
});

export default classRoomSlice.reducer;

export const classRoomSelector = (state: RootState) => state.classRoomReducer;