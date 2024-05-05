import { ClassRoomResponse } from "@/models/classRooms/classRoomResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
});

export default classRoomSlice.reducer;