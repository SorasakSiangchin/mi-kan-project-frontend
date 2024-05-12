import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import server from "@/services/serverService";
import { ServiceResponse } from "@/models/serviceResponse";
import { LoginRequest } from "@/models/terms/loginRequest";
import { LoginResponse } from "@/models/terms/loginResponse";

interface UserState {
    status: "fetching" | "success" | "failed" | "init";
    isAuthenticated: boolean;
    isAuthenticating: boolean;
};

const initialState: UserState = {
    status: "init",
    isAuthenticated: false, // ได้รับการรับรองความถูกต้องแล้ว
    isAuthenticating: true, // คือการตรวจสอบสิทธิ์
}

export const login = createAsyncThunk<ServiceResponse<LoginResponse>, LoginRequest>("user/login", async (data) => {
    try {
        const result = await server.user.login(data);
        return result;
    } catch (error: any) {
        console.log("error : ", error);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            state.status = "fetching";
            state.isAuthenticating = true;
        });

        builder.addCase(login.rejected, (state) => {
            state.status = "failed";
            state.isAuthenticated = false;
            state.isAuthenticating = false;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.status = "success";
            state.isAuthenticated = true;
            state.isAuthenticating = false;
        });
    }
});

export default userSlice.reducer;

export const userSelector = (state: RootState) => state.userReducer; 