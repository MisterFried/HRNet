import { describe, it, expect } from "@jest/globals";

import sortEmployees from "../utils/sortEmployees";
import employees from "../data/employees";

describe("Given the sortEmployees function", () => {
	// ** Text
	it("it should sort employees by last name in ascending order", () => {
		const sortedEmployees = sortEmployees(employees, "lastName", "asc");
		expect(sortedEmployees[0].lastName).toBe("Brooks");
		expect(sortedEmployees[sortedEmployees.length - 1].lastName).toBe(
			"Watson"
		);
	});
	it("it should sort employees by city in descending order", () => {
		const sortedEmployees = sortEmployees(employees, "city", "desc");
		expect(sortedEmployees[0].city).toBe("Testtown");
		expect(sortedEmployees[sortedEmployees.length - 1].city).toBe(
			"Anothertown"
		);
	});

	// ** Date
	it("it should sort employees by start date in ascending order", () => {
		const sortedEmployees = sortEmployees(employees, "startDate", "asc");
		expect(sortedEmployees[0].startDate).toBe("2021-11-30");
		expect(sortedEmployees[sortedEmployees.length - 1].startDate).toBe(
			"2023-04-30"
		);
	});
	it("it should sort employees by birthDate in descending order", () => {
		const sortedEmployees = sortEmployees(employees, "dateOfBirth", "desc");
		expect(sortedEmployees[0].dateOfBirth).toBe("2005-05-20");
		expect(sortedEmployees[sortedEmployees.length - 1].dateOfBirth).toBe(
			"1985-09-20"
		);
	});

	// ** Number
	it("it should sort employees by Zip in ascending order", () => {
		const sortedEmployees = sortEmployees(employees, "zip", "asc");
		expect(sortedEmployees[0].zip).toBe("12345");
		expect(sortedEmployees[sortedEmployees.length - 1].zip).toBe("98765");
	});
	it("it should sort employees by Zip in descending order", () => {
		const sortedEmployees = sortEmployees(employees, "zip", "desc");
		expect(sortedEmployees[0].zip).toBe("98765");
		expect(sortedEmployees[sortedEmployees.length - 1].zip).toBe("12345");
	});

	// ** Other
	it("it not throw error when sorting an empty array", () => {
		const sortedEmployees = sortEmployees([], "lastName", "asc");
		expect(sortedEmployees.length).toBe(0);
	});
});
