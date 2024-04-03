import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeesInterface } from "../types/employeesType";

const initialEmployees = [] as Array<EmployeesInterface>;

const employeeSlice = createSlice({
	name: "employee",
	initialState: initialEmployees,
	reducers: {
		addEmployee: (state, action: PayloadAction<EmployeesInterface>) => {
			state.push(action.payload);
		},
		resetEmployees: () => initialEmployees,
		deleteEmployee: (state, action: PayloadAction<string>) => {
			return state.filter(employee => employee.id !== action.payload);
		},
		setEmployees: (_, action: PayloadAction<Array<EmployeesInterface>>) => {
			return action.payload;
		},
	},
});

export default employeeSlice.reducer;
export const { addEmployee, deleteEmployee, resetEmployees, setEmployees } =
	employeeSlice.actions;
