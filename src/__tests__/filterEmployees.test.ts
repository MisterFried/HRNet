import { describe, it, expect } from "@jest/globals";

import filterEmployees from "../utils/filterEmployees";
import employees from "../data/employees";

describe("Given the filterEmployees function", () => {
	it("it should filter employees by a search value present in employee properties", () => {
		const value = "Michael";
		const filteredEmployees = filterEmployees(employees, value);
		expect(filteredEmployees.length).toBe(1);
		expect(filteredEmployees).toEqual([employees[2]]);
	});

	it("it should be case insensitive when filtering", () => {
		const value = "MiChAeL";
		const filteredEmployees = filterEmployees(employees, value);
		expect(filteredEmployees.length).toBe(1);
		expect(filteredEmployees).toEqual([employees[2]]);
	});

	it("it should filter by various employee properties", () => {
		const value = "15";
		const filteredEmployees = filterEmployees(employees, value);
		expect(filteredEmployees.length).toBe(8);
	});

	it("it should return an empty array if no employees match the search value", () => {
		const value = "NoWayWeGotAnEmployeeWithThisName";
		const filteredEmployees = filterEmployees(employees, value);
		expect(filteredEmployees.length).toBe(0);
	});
});
