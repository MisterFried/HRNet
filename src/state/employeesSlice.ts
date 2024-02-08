import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeesInterface } from "../types/employeesType";

const initialState: { employees: Array<EmployeesInterface> } = { employees: [] };

export const employeesSlice = createSlice({
	name: "employees",
	initialState: initialState,
	reducers: {
		addEmployee: (state, action: PayloadAction<EmployeesInterface>) => {
			state.employees.push(action.payload);
		},
		removeEmployee: (state, action: PayloadAction<string>) => {
			state.employees = state.employees.filter(employee => employee.id !== action.payload);
		},
	},
});

export const { addEmployee, removeEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
