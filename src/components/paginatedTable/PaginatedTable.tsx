// ** Import core packages
import { useCallback, useEffect, useState } from "react";

// ** Import components
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

// ** Import utils / lib
import filterEmployees from "../../utils/filterEmployees";
import sortEmployees from "../../utils/sortEmployees";

// ** Import Types
import { EmployeesInterface } from "../../types/employeesType";
import {
	TablePropsInterface,
	parametersInterface,
} from "../../types/paginatedTableTypes";

/**
 * Return the PaginatedTable component that displays the provided employee records in a table with
 * pagination, sorting and filtering capabilities.
 *
 * @param data - The list of employee records to display. Each object in the array needs to contain
 * at least an id.
 * @param action - The action to perform when clicking on the delete button.
 * @param headers - An array of objects containing the header titles and sort text. This array defines
 * which column is displayed as well as their order. The sortText property is the associated property
 * in the employee object (firstName, lastName, department, etc) that will be used for sorting / filtering.
 * @param paginateOptions - An array containing the options for the number of items to display per page.
 * @return The PaginatedTable component.
 */
export default function PaginatedTable({
	data,
	action,
	headers,
	paginateOptions = [5, 10, 15],
}: TablePropsInterface) {
	const [totalEmployees, setTotalEmployees] = useState(data); // All stored employees
	const [filteredEmployees, setFilteredEmployees] =
		useState<Array<EmployeesInterface>>(totalEmployees); // Employees after filtering
	const [paginatedEmployees, setPaginatedEmployees] = useState<
		Array<EmployeesInterface>
	>([]); // Filtered employees after pagination

	// Filter / sort parameters
	const [parameters, setParameters] = useState<parametersInterface>({
		filter: "",
		sort: ["firstName", "asc"],
	});

	// Remove unnecessary pagination options (keep only one option that is superior to the number
	// of employees)
	paginateOptions.sort((a, b) => a - b);
	const index = paginateOptions.findIndex(
		option => option >= filteredEmployees.length
	);
	const adjustedPaginatedOptions =
		index === -1 ? paginateOptions : paginateOptions.slice(0, index + 1);

	// Pagination params (items per page and current page)
	const [paginationParams, setPaginationParams] = useState({
		perPage: adjustedPaginatedOptions[0],
		page: 0,
	});

	// Calculate the total number of pages
	let totalPage = Math.ceil(
		filteredEmployees.length / paginationParams.perPage
	);
	if (filteredEmployees.length === 0) totalPage = 1;

	// Calculate the interval of currently displayed employees
	const paginationMin = paginationParams.page * paginationParams.perPage + 1;
	const paginationMax = Math.min(
		filteredEmployees.length,
		(paginationParams.page + 1) * paginationParams.perPage
	);

	/**
	 * Paginates the filtered employees based on the given parameters.
	 *
	 * @param perPage - The number of displayed employees per page.
	 * @param page - The page number.
	 */
	const paginate = useCallback(
		(perPage: number, page: number) => {
			const employeesAfterPagination = filteredEmployees.slice(
				page * perPage,
				(page + 1) * perPage
			);

			setPaginatedEmployees(employeesAfterPagination);
		},
		[filteredEmployees]
	);

	/**
	 * Filter the employees based on the given string then update the filter parameters
	 * state and the filteredEmployees state.
	 *
	 * @param value - The string to search for in the employee properties
	 */
	function handleFilter(value: string) {
		const result = filterEmployees(totalEmployees, value);
		setParameters({ ...parameters, filter: value });
		setFilteredEmployees(result);
	}

	/**
	 * Sort the employees based on the given parameters then update the sort parameters
	 * state and the filteredEmployees state.
	 *
	 * @param order - The order in which the employees should be sorted. Can be "asc" for ascending or "desc" for descending.
	 * @param field - The field of the employee object to be used for sorting.
	 */
	function handleSort(
		order: "asc" | "desc",
		field: keyof EmployeesInterface
	) {
		const sortedEmployees = sortEmployees(
			[...filteredEmployees],
			field,
			order
		);

		setParameters({ ...parameters, sort: [field, order] });
		setFilteredEmployees(sortedEmployees);
	}

	// Update the total and filtered employees list when the provided data changes
	// ? Does an optimization between this useEffect and the handleFilter function is possible ?
	// ? When the handleFilter function is triggered, the parameters are updated, which
	// ? also triggers this useEffect that filter a second time
	useEffect(() => {
		const employeesFiltered = filterEmployees(data, parameters.filter);
		const employeesSorted = sortEmployees(
			employeesFiltered,
			parameters.sort[0],
			parameters.sort[1]
		);

		setTotalEmployees(data);
		setFilteredEmployees(employeesSorted);
	}, [data, parameters]);

	// Update the paginatedEmployees when any of the paginations parameters changes, or when the
	// filteredEmployees list changes
	useEffect(() => {
		paginate(paginationParams.perPage, paginationParams.page);
	}, [paginate, paginationParams, filteredEmployees]);

	// Prevent being on a page that doesn't exist when the number of total page is changed
	// (Can be caused by employee deletion or perPage change)
	useEffect(() => {
		if (paginationParams.page >= totalPage) {
			setPaginationParams({ ...paginationParams, page: totalPage - 1 });
		}
	}, [totalPage, paginationParams]);

	return (
		<>
			{/* Pagination and filter */}
			<section className="flex flex-col justify-between gap-4 p-1 sm:flex-row">
				<div>
					{adjustedPaginatedOptions.length > 1 &&
						filteredEmployees.length > 0 && (
							<label
								className="flex items-center gap-2"
								htmlFor="paginate"
							>
								Show{" "}
								<select
									name="paginate"
									id="paginate"
									onChange={e =>
										setPaginationParams({
											...paginationParams,
											perPage: Number(e.target.value),
										})
									}
									className="border-gray- 300 rounded-md border p-2"
									data-testid="paginate"
								>
									{adjustedPaginatedOptions.map(option => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>{" "}
								records
							</label>
						)}
				</div>
				<input
					type="text"
					placeholder="Search"
					onChange={e => handleFilter(e.target.value)}
					className="rounded-md border-[1px] border-gray-300 p-2"
					data-testid="filter"
				/>
			</section>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="mx-auto">
					<thead>
						<tr className="bg-main-200 font-special">
							{headers.map(header => {
								return (
									<TableHeader
										key={`th_${header.sortText}`}
										title={header.title}
										sortText={header.sortText}
										reorderAlphabetically={handleSort}
										activeSort={`${parameters.sort[0]}_${parameters.sort[1]}`}
									/>
								);
							})}

							<th
								className="relative border-[1px] border-gray-400 px-4 py-4"
								data-testid="table-header-action"
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{paginatedEmployees.length === 0 ? (
							<tr className="even:bg-main-100">
								<td
									colSpan={10}
									className="border-[1px] border-gray-400 p-2 px-4 text-center"
								>
									No records to display !
								</td>
							</tr>
						) : (
							paginatedEmployees.map(employee => (
								<TableRow
									key={employee.id}
									employee={employee}
									headers={headers}
									deleteEmployee={action}
								/>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Per page display and page navigation */}
			<section className="flex flex-col justify-between gap-4 sm:flex-row">
				<span className="text-lg">
					{filteredEmployees.length === 0
						? "Showing 0 records"
						: `Showing ${paginationMin} to ${paginationMax} of ${filteredEmployees.length} records 
						${filteredEmployees.length !== totalEmployees.length ? "(filtered)" : ""}`}
				</span>
				<div className="flex items-center justify-center gap-4">
					<span>
						Page {paginationParams.page + 1} of {totalPage}
					</span>
					{paginationParams.page >= 1 && (
						<button
							onClick={() =>
								setPaginationParams({
									...paginationParams,
									page: paginationParams.page - 1,
								})
							}
							className="rounded-sm border-[1px] bg-gray-300 px-4 py-2 transition-all hover:bg-gray-400 focus:bg-gray-400"
							data-testid="previous-page"
						>
							Previous page
						</button>
					)}
					{paginationParams.page < totalPage - 1 && (
						<button
							onClick={() =>
								setPaginationParams({
									...paginationParams,
									page: paginationParams.page + 1,
								})
							}
							className="rounded-sm border-[1px] bg-gray-300 px-4 py-2 transition-all hover:bg-gray-400 focus:bg-gray-400"
							data-testid="next-page"
						>
							Next page
						</button>
					)}
				</div>
			</section>
		</>
	);
}
