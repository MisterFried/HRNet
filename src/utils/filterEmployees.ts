// ** Types
import { EmployeesInterface } from "../types/employeesType";

/**
 * Filters the employee list based on the provided value.
 * @param employeeList - The array of employees to filter.
 * @param value - The value to search for in the employee properties.
 * @returns The filtered array of employees.
 */
export default function filterEmployees(
	employeeList: Array<EmployeesInterface>,
	value: string
) {
	const filteredEmployeeList = employeeList.filter(employee => {
		return (
			employee.firstName.toLowerCase().includes(value.toLowerCase()) ||
			employee.lastName.toLowerCase().includes(value.toLowerCase()) ||
			employee.department.toLowerCase().includes(value.toLowerCase()) ||
			employee.street.toLowerCase().includes(value.toLowerCase()) ||
			employee.city.toLowerCase().includes(value.toLowerCase()) ||
			employee.state.toLowerCase().includes(value.toLowerCase()) ||
			employee.zip.toLowerCase().includes(value.toLowerCase()) ||
			employee.startDate.toLowerCase().includes(value.toLowerCase()) ||
			employee.dateOfBirth.toLowerCase().includes(value.toLowerCase())
		);
	});

	return filteredEmployeeList;
}
