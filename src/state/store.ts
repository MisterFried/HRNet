import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeStore";

export const store = configureStore({
	reducer: {
		employee: employeeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
