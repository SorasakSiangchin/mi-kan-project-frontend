import { RoleResponse } from "@/models/roles/roleResponse";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface RoleState {
    roles: RoleResponse[];
    rolesLoaded: boolean;
}

const initialState: RoleState = {
    roles: [],
    rolesLoaded: false
}

export const fetchRoles = createAsyncThunk<ServiceResponse<RoleResponse[]>>("role/fetchRoles", async () => {
    try {
        return await server.role.getRoles();
    } catch (error) {
        console.log("error : ", error);
    }
});

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoles.fulfilled, (state, action) => {
            const { data, success } = action.payload
            if (success) {
                state.roles = data
                state.rolesLoaded = true
            }
        })
    },
});

export default roleSlice.reducer

export const useRoleSelector = (state: RootState) => state.roleReducer;