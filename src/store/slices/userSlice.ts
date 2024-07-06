import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "../store";
import server from "@/services/serverService";
import { ServiceResponse } from "@/models/serviceResponse";
import { LoginResponse } from "@/models/user/loginResponse";
import { LoginRequest } from "@/models/user/loginRequest";
import { RegisterRequest } from "@/models/user/registerRequest";
import { UserResponse } from "@/models/user/userResponse";
import { UserUpdate } from "@/models/user/userUpdate";
import { ChangePassword } from "@/models/user/changePassword";
import { ForgotPassword } from "@/models/user/forgotPassword";
import { setTokenToSession } from "@/bil/auth";

interface UserState {
    userInfo: UserResponse | null;
    status: "fetching" | "success" | "failed" | "init";
    loginLoaded: boolean;
    logoutLoaded: boolean;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    updateUserLoaded: boolean;
    registerLoaded: boolean;
    changePasswordLoaded: boolean;
    forgotPasswordLoaded: boolean;
};

const initialState: UserState = {
    status: "init",
    logoutLoaded: false,
    loginLoaded: false,
    isAuthenticated: false, // ได้รับการรับรองความถูกต้องแล้ว
    isAuthenticating: true, // คือการตรวจสอบสิทธิ์
    userInfo: null,
    updateUserLoaded: false,
    registerLoaded: false,
    changePasswordLoaded: false,
    forgotPasswordLoaded: false
};

export const login = createAsyncThunk<ServiceResponse<LoginResponse>, LoginRequest>("user/login", async (data, thunkAPI) => {
    try {

        // console.log("data : ", data);
        const result: ServiceResponse<LoginResponse> = await server.user.login(data);

        if (result.success) {
            var resultToken = await setTokenToSession(result.data.token)
            if (!resultToken) throw new Error("error set token to session");
        }
        // if()

        // if (result.data) thunkAPI.dispatch(setUserInfo(result.data.user));

        return result;
    } catch (error: any) {
        console.log("error : ", error);
        throw new Error(error)
    }
});

export const fetchInfo = createAsyncThunk<ServiceResponse<UserResponse>, void>("user/fetchInfo",
    async () => {
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

export const updateUser = createAsyncThunk<ServiceResponse<any>, UserUpdate>
    ("user/updateUser", async (data) => {
        try {
            const result = await server.user.updateUser(data);
            return result;
        } catch (error: any) {
            console.log("error : ", error);
            throw new Error(error)
        }
    });

export const changePassword = createAsyncThunk<ServiceResponse<any>, ChangePassword>
    ("user/changePassword", async (data) => {
        try {
            const result = await server.user.changePassword(data);
            return result;
        } catch (error: any) {
            console.log("error : ", error);
            throw new Error(error)
        }
    });

export const forgotPassword = createAsyncThunk<ServiceResponse<any>, ForgotPassword>
    ("user/forgotPassword", async (data) => {
        try {
            const result = await server.user.forgotPassword(data);
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

        // ------ update user -------
        builder.addCase(updateUser.pending, (state) => {
            state.updateUserLoaded = true;
        });

        builder.addCase(logout.pending, (state) => {
            state.logoutLoaded = true;
        });

        // ------ register -------
        builder.addCase(register.pending, (state) => {
            state.registerLoaded = true;
        });

        // ------ changePassword -------
        builder.addCase(changePassword.pending, (state) => {
            state.changePasswordLoaded = true;
        });

        // ------ forgotPassword -------
        builder.addCase(forgotPassword.pending, (state) => {
            state.forgotPasswordLoaded = true;
        });

        builder.addMatcher(isAnyOf(changePassword.fulfilled, changePassword.rejected), (state) => {
            state.changePasswordLoaded = false;
        });

        builder.addMatcher(isAnyOf(register.rejected, register.fulfilled), (state) => {
            state.registerLoaded = false;
        });

        builder.addMatcher(isAnyOf(logout.rejected, logout.fulfilled), (state) => {
            state.logoutLoaded = false;
        });

        builder.addMatcher(isAnyOf(updateUser.fulfilled, updateUser.rejected), (state) => {
            state.updateUserLoaded = false;
        });

        builder.addMatcher(isAnyOf(forgotPassword.fulfilled, forgotPassword.rejected), (state) => {
            state.forgotPasswordLoaded = false;
        });
    }
});

export default userSlice.reducer;

export const { setUserInfo } = userSlice.actions;

export const userSelector = (state: RootState) => state.userReducer; 