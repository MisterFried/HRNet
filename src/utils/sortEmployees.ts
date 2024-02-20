// ** Types
import { EmployeesInterface } from "../types/employeesType";

/**
 * Sorts an array of employees based on a specified field in ascending or descending order.
 * @param employeeList - The array of employees to be sorted.
 * @param order - The order in which the employees should be sorted. Can be "asc" for ascending or "desc" for descending.
 * @param field - The field of the employee object to be used for sorting.
 * @returns The sorted array of employees.
 */
export default function sortEmployees(
	employeeList: Array<EmployeesInterface>,
	field: keyof EmployeesInterface,
	order: "asc" | "desc"
) {
	if (order === "asc") {
		employeeList.sort((a, b) => {
			if (a[field] < b[field]) return -1;
			if (a[field] > b[field]) return 1;
			return 0;
		});
	} else if (order === "desc") {
		employeeList.sort((a, b) => {
			if (a[field] > b[field]) return -1;
			if (a[field] < b[field]) return 1;
			return 0;
		});
	}

	return employeeList;
}
