import { test, describe, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import PaginatedTable from "../components/paginatedTable/PaginatedTable.tsx";

import employees from "../data/employees.ts";
import { EmployeesInterface } from "../types/employeesType.ts";
import sortEmployees from "../utils/sortEmployees.ts";

const headers = [
	{ title: "First Name", sortText: "firstName" },
	{ title: "Last Name", sortText: "lastName" },
] as Array<{ title: string; sortText: keyof EmployeesInterface }>;

const paginateOptions = [5, 10, 15];

describe("Given the paginated table component, ", () => {
	test("it should render correctly", () => {
		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		const table = screen.getByRole("table");
		expect(table).toBeDefined();
	});
	test("it should render the correct number of columns", () => {
		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		headers.forEach(header => {
			const tableHeader = screen.getByTestId(
				`table-header-${header.sortText}`
			);
			const tableHeaderTitle = tableHeader.textContent;

			expect(tableHeader).toBeDefined();
			expect(tableHeaderTitle).toBe(header.title);
		});

		const actionColumn = screen.getByTestId("table-header-action");
		expect(actionColumn).toBeDefined();
	});
	test("it should render the correct number of rows", () => {
		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		const rows = screen.getAllByText("Delete");
		expect(rows.length).toBe(paginateOptions[0]);
	});
	test("it should reorder the table correctly", async () => {
		const user = userEvent.setup();

		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		// ** Reorder descending last name
		const reorderDescButton = screen.getByTestId("lastName-desc-reorder");
		expect(reorderDescButton).toBeDefined();
		await user.click(reorderDescButton);

		const descLastNameCell = screen.getAllByTestId("table-data-lastName");
		expect(descLastNameCell[0].textContent).toBe("Watson");

		// ** Reorder ascending first name
		const reorderAscButton = screen.getByTestId("firstName-asc-reorder");
		expect(reorderAscButton).toBeDefined();
		await user.click(reorderAscButton);
		const ascLastNameCell = screen.getAllByTestId("table-data-firstName");
		expect(ascLastNameCell[0].textContent).toBe("Aiden");
	});
	test("it should delete an employee correctly", async () => {
		// Here we only check that the functions passed is called with the correct id
		const user = userEvent.setup();
		const consoleSpy = jest.spyOn(console, "log");

		// Sort the employees to get the correct id for checking the action parameter
		// since they're automatically sorted in the component
		const sortedEmployees = sortEmployees(employees, "firstName", "asc");

		render(
			<PaginatedTable
				data={sortedEmployees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		const deleteButton = screen.getAllByText("Delete");
		await user.click(deleteButton[0]);
		expect(consoleSpy).toBeCalledWith(sortedEmployees[0].id);
	});
	test("it should paginate correctly", async () => {
		const user = userEvent.setup();

		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		const paginate = screen.getByTestId("paginate");
		expect(paginate).toBeDefined();

		await user.selectOptions(paginate, paginateOptions[1].toString());

		const rows = screen.getAllByText("Delete");
		expect(rows.length).toBe(paginateOptions[1]);
	});
	test("it should change page correctly", async () => {
		// Here with simulate going from page 1 to 2, then going back to page 1
		// The first element of both page 1 should be identical, and the first
		// element of page 2 should be different
		const user = userEvent.setup();

		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		const nextPage = screen.getByTestId("next-page");
		expect(nextPage).toBeDefined();
		const firstValue = screen.getAllByTestId("table-data-firstName")[0];

		await user.click(nextPage);

		const secondValue = screen.getAllByTestId("table-data-firstName")[0];
		const previousPage = screen.getByTestId("previous-page");
		expect(previousPage).toBeDefined();

		await user.click(previousPage);

		const thirdValue = screen.getAllByTestId("table-data-firstName")[0];

		expect(firstValue).not.toBe(secondValue);
		expect(secondValue).not.toBe(thirdValue);
		expect(thirdValue).toEqual(firstValue);
	});
	test("It should filter correctly", async () => {
		const user = userEvent.setup();

		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		const filter = screen.getByTestId("filter");
		expect(filter).toBeDefined();

		await user.type(filter, "Aiden");

		const rows = screen.getAllByText("Delete");
		expect(rows.length).toBe(1);
	});
	test("It should display a message when there is no employees", () => {
		render(
			<PaginatedTable
				data={[]}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={paginateOptions}
			/>
		);

		const message = screen.getByText("No records to display !");
		expect(message).toBeDefined();
	});
	test("It should send the user back on the last page when the items per page property is change and that the current page is superior to the total number of pages", async () => {
		const user = userEvent.setup();

		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={[15, 20]}
			/>
		);

		const paginate = screen.getByTestId("paginate");
		const nextPage = screen.getByTestId("next-page");

		await user.click(nextPage);
		await user.selectOptions(paginate, "20");

		const rows = screen.getAllByText("Delete");
		expect(rows.length).toBeGreaterThan(15);
	});
	test("It should not display a pagination select input if all provided options are superior to the number of employees", () => {
		render(
			<PaginatedTable
				data={employees}
				headers={headers}
				action={id => console.log(id)}
				paginateOptions={[100, 250, 500]}
			/>
		);

		const paginate = screen.queryByTestId("paginate");
		expect(paginate).toBeNull();
	});
});
