import { AbilityCreate } from "@/models/abilities/abilityCreate";
import { AbilityParams } from "@/models/abilities/abilityParams";
import { AbilityResponse } from "@/models/abilities/abilityResponse";
import { AbilityUpdate } from "@/models/abilities/abilityUpdate";
import { ServiceResponse } from "@/models/serviceResponse";
import server from "@/services/serverService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ReportAbilityMultipleIntelligence } from "@/models/abilities/reportAbilityMultipleIntelligences";
import { ReportAbilityBySchoolAll } from "@/models/abilities/reportAbilityBySchoolAll";


interface AbilityState {
    abilities: AbilityResponse[]
    abilitiesLoaded: boolean
    abilityParams: AbilityParams
    reportAbilityBySchoolId: ReportAbilityMultipleIntelligence[]
    reportAbilityBySchoolIdLoaded: boolean;
    reportAbilityBySchoolAll: ReportAbilityBySchoolAll[]
    reportAbilityBySchoolAllLoaded: boolean;
}

const initParams = (): AbilityParams => {
    return {
        studentName: "",
        schoolId: "",
        classId: "",
        classRoomId: "",
        genderId: "",
        multipleIntelligencesId: ""
    }
}

const initialState: AbilityState = {
    abilities: [],
    abilitiesLoaded: false,
    abilityParams: initParams(),
    reportAbilityBySchoolId: [],
    reportAbilityBySchoolIdLoaded: false,
    reportAbilityBySchoolAll: [],
    reportAbilityBySchoolAllLoaded: false,
}


export const updateAbility = createAsyncThunk<ServiceResponse<any>, AbilityUpdate>("ability/updateAbility",
    async (data) => {
        try {
            return await server.ability.updateAbility(data)
        } catch (error) {
            console.log("error : ", error);
        }
    });

export const createAbility = createAsyncThunk<ServiceResponse<any>, AbilityCreate>("ability/createAbility",
    async (data) => {
        try {
            return await server.ability.createAbility(data)
        } catch (error) {
            console.log("error : ", error);
        }
    });

export const fetchAbilities = createAsyncThunk<ServiceResponse<AbilityResponse[]>, string, { state: RootState }>("ability/createAbility",
    async (schoolId, ThunkAPI) => {

        // set schoolId
        ThunkAPI.dispatch(setParam({
            schoolId
        }))

        const param = ThunkAPI.getState().abilityReducer.abilityParams;
        try {
            return await server.ability.getAbilities(param)
        } catch (error) {
            console.log("error : ", error);
        }
    });

export const fetchAbilityById = createAsyncThunk<ServiceResponse<AbilityResponse>, string>("ability/fetchAbilityById",
    async (id) => {
        try {
            return await server.ability.getAbilityById(id)
        } catch (error) {
            console.log("error : ", error);
        }
    });

export const fetchReportAbilityBySchoolId = createAsyncThunk<ServiceResponse<ReportAbilityMultipleIntelligence[]>, string | "">("ability/fetchReportAbilityBySchoolId",
    async (schoolId) => {
        try {
            return await server.ability.reportAbilityBySchoolId(schoolId)
        } catch (error) {
            console.log("error : ", error);
        }
    });

export const fetchReportAbilityBySchoolAll = createAsyncThunk<ServiceResponse<ReportAbilityBySchoolAll[]>>("ability/fetchReportAbilityBySchoolAll",
    async () => {
        try {
            return await server.ability.reportAbilityBySchoolAll()
        } catch (error) {
            console.log("error : ", error);
        }
    });

const abilitySlice = createSlice({
    name: "ability",
    initialState,
    reducers: {
        refresh: (state) => {
            state.abilitiesLoaded = false;
        },
        setParam: (state, action) => {
            state.abilitiesLoaded = false;
            state.abilityParams = {
                ...state.abilityParams,
                ...action.payload
            }
        },
        resetParam: (state) => {
            state.abilitiesLoaded = false;
            state.abilityParams = initParams()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAbilities.rejected, (state) => {
            state.abilitiesLoaded = true;
        });

        builder.addCase(fetchAbilities.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.abilities = data;
                state.abilitiesLoaded = true;
            }
        })

        // --------- fetchReportAbilityBySchoolId -------
        builder.addCase(fetchReportAbilityBySchoolId.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.reportAbilityBySchoolId = data;
                state.reportAbilityBySchoolIdLoaded = true;
            }
        })

        builder.addCase(fetchReportAbilityBySchoolId.rejected, (state) => {
            state.reportAbilityBySchoolIdLoaded = true;
        })


        // --------- fetchReportAbilityBySchoolAll -------
        builder.addCase(fetchReportAbilityBySchoolAll.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.reportAbilityBySchoolAll = data;
                state.reportAbilityBySchoolAllLoaded = true;
                console.log("reportAbilityBySchoolAll : ", data)

            }
        })

        builder.addCase(fetchReportAbilityBySchoolAll.rejected, (state) => {
            state.reportAbilityBySchoolAllLoaded = true;
        })

    },
});

export default abilitySlice.reducer;

export const { resetParam, setParam, refresh } = abilitySlice.actions;

export const useAbilitySelector = (state: RootState) =>
    state.abilityReducer;