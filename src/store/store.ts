import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import studentReducer from "./slices/studentSlice";
import classRoomReducer from "./slices/classRoomSlice";
import classReducer from "./slices/classSlice";
import genderReducer from "./slices/genderSlice";
import schoolReducer from "./slices/schoolSlice";
import schoolYearReducer from "./slices/schoolYearSlice";
import termReducer from "./slices/termSlice";

const reducer = {
    studentReducer,
    classRoomReducer,
    classReducer,
    genderReducer,
    schoolReducer,
    schoolYearReducer,
    termReducer
};

export const store = configureStore({
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();