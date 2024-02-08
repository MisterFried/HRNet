import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeInterface } from "../types/employeeType";

const initialState: { employees: Array<EmployeeInterface> } = { employees: [] };

export const employeeSlice = createSlice({
	name: "employee",
	initialState: initialState,
	reducers: {
		addEmployee: (state, action: PayloadAction<EmployeeInterface>) => {
			state.employees.push(action.payload);
		},
		removeEmployee: (state, action: PayloadAction<string>) => {
			state.employees = state.employees.filter(employee => employee.id !== action.payload);
		},
	},
});

export const { addEmployee, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
