import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import server from "@/services/serverService";
import { ServiceResponse } from "@/models/serviceResponse";
import { LoginResponse } from "@/models/user/loginResponse";
import { LoginRequest } from "@/models/user/loginRequest";
import { RegisterRequest } from "@/models/user/registerRequest";
import { UserResponse } from "@/models/user/userResponse";
import { setParam } from "./studentSlice";

interface UserState {
    userInfo: UserResponse | null;
    status: "fetching" | "success" | "failed" | "init";
    loginLoaded: boolean;
    logoutLoaded: boolean;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
};

const initialState: UserState = {
    status: "init",
    logoutLoaded: false,
    loginLoaded: false,
    isAuthenticated: false, // ได้รับการรับรองความถูกต้องแล้ว
    isAuthenticating: true, // คือการตรวจสอบสิทธิ์
    userInfo: null,
};

export const login = createAsyncThunk<ServiceResponse<LoginResponse>, LoginRequest>("user/login", async (data, thunkAPI) => {
    try {
        const result: ServiceResponse<LoginResponse> = await server.user.login(data);

        // if (result.data) thunkAPI.dispatch(setUserInfo(result.data.user));

        return result;
    } catch (error: any) {
        console.log("error : ", error);
        throw new Error(error)
    }
});

export const fetchInfo = createAsyncThunk<ServiceResponse<UserResponse>, void>("user/fetchInfo",
    async (_, thunkAPI) => {
        try {
            const result: ServiceResponse<UserResponse> = await server.user.getInfo();
            return result;
        } catch (error: any) {
            console.log("error : ", error);
            throw new Error(error)
        }
    });

export const register = createAsyncThunk<any, RegisterRequest>("user/register", async (data, _) => {
    try {

        const result = await server.user.register(data);
        return result;
    } catch (error: any) {
        console.log("error : ", error);
        throw new Error(error)
    }
});

export const logout = createAsyncThunk("user/logout", async () => {
    try {
        // //await new Promise((resolve) => setTimeout(resolve, 2000));
        const result = await server.user.logout();
        return result;
    } catch (error: any) {
        console.log("error : ", error);
        throw new Error(error)
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            // console.log("loading state");
            state.status = "fetching";
            state.isAuthenticating = true;
            state.loginLoaded = true;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            const { data } = action.payload;

            state.status = "success";
            state.isAuthenticated = true;
            state.isAuthenticating = false;
            state.loginLoaded = false;
            state.userInfo = data.user
        });

        builder.addCase(login.rejected, (state) => {
            console.log("failed");
            state.status = "failed";
            state.isAuthenticated = false;
            state.isAuthenticating = false;
            state.loginLoaded = false;
        });

        builder.addCase(fetchInfo.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.userInfo = data;
            }
        });

        builder.addCase(logout.pending, (state) => {
            state.logoutLoaded = true;
        });

        builder.addCase(logout.rejected, (state) => {
            state.logoutLoaded = false;
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.logoutLoaded = false;
        });
    }
});

export default userSlice.reducer;

export const { setUserInfo } = userSlice.actions;

export const userSelector = (state: RootState) => state.userReducer; 