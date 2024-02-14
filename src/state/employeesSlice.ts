import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeesInterface } from "../types/employeesType";

const initialState: { employees: Array<EmployeesInterface> } = {
	// Create 10 default employees
	employees: [
		{
			firstName: "Paul",
			lastName: "Doe",
			dateOfBirth: "01/01/1990",
			startDate: "01/01/2020",
			street: "123 Main St",
			city: "Anytown",
			state: "NY",
			zip: "12345",
			department: "legal",
			id: "1",
		},
		{
			firstName: "John",
			lastName: "Doe",
			dateOfBirth: "01/01/1990",
			startDate: "01/01/2020",
			street: "123 Main St",
			city: "Anytown",
			state: "NY",
			zip: "12345",
			department: "hr",
			id: "2",
		},
		{
			firstName: "John",
			lastName: "Doe",
			dateOfBirth: "01/01/1990",
			startDate: "01/01/2020",
			street: "123 Main St",
			city: "Anytown",
			state: "NY",
			zip: "12345",
			department: "sales",
			id: "3",
		},
	],
};

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
