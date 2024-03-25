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

// ** Types
interface TablePropsInterface {
	data: Array<EmployeesInterface>;
	action: (id: string) => void;
	headers: Array<{ title: string; sortText: keyof EmployeesInterface }>;
	paginateOptions: Array<number>;
}

interface parametersInterface {
	filter: string;
	sort: [keyof EmployeesInterface, "asc" | "desc"];
}

export default function PaginatedTable({
	data,
	action,
	headers,
	paginateOptions = [5, 10, 15],
}: TablePropsInterface) {
	const [totalEmployees, setTotalEmployees] = useState(data); // All stored employees
	const [filteredEmployees, setFilteredEmployees] =
		useState<Array<EmployeesInterface>>(totalEmployees); // Employees after filtering
	const [paginatedEmployees, setPaginatedEmployees] = useState<Array<EmployeesInterface>>([]); // Filtered employees after pagination

	// Filter / sort parameters
	const [parameters, setParameters] = useState<parametersInterface>({
		filter: "",
		sort: ["firstName", "asc"],
	});

	// Remove unnecessary pagination options (greater than the number of items)
	paginateOptions.sort((a, b) => a - b);
	const index = paginateOptions.findIndex(option => option >= filteredEmployees.length);
	const adjustedPaginatedOptions = paginateOptions.slice(0, index + 1);

	// Pagination params (items per page and current page)
	const [paginationParams, setPaginationParams] = useState({
		perPage: adjustedPaginatedOptions[0],
		page: 0,
	});

	let totalPage = Math.ceil(filteredEmployees.length / paginationParams.perPage);
	if (filteredEmployees.length === 0) totalPage = 1;

	// Calculate the interval of currently displayed items
	const paginationMin = paginationParams.page * paginationParams.perPage + 1;
	const paginationMax = Math.min(
		filteredEmployees.length,
		(paginationParams.page + 1) * paginationParams.perPage
	);

	/**
	 * Paginates the filtered employees based on the given parameters.
	 *
	 * @param perPageParams - The number of employees per page.
	 * @param pageParams - The current page number.
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

	// Filter the items and update the filter parameters
	function handleFilter(value: string) {
		const result = filterEmployees(totalEmployees, value);
		setParameters({ ...parameters, filter: value });
		setFilteredEmployees(result);
	}

	// Sort the items and update the sort parameters
	function handleSort(order: "asc" | "desc", field: keyof EmployeesInterface) {
		const sortedEmployees = sortEmployees([...filteredEmployees], field, order);

		setParameters({ ...parameters, sort: [field, order] });
		setFilteredEmployees(sortedEmployees);
	}

	// Update the total and filtered employees list when the data changes
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

	// Update the pagination when page or perPage changes, or when the employees are filtered
	useEffect(() => {
		paginate(paginationParams.perPage, paginationParams.page);
	}, [paginate, paginationParams, filteredEmployees]);

	// Prevent being on a page that doesn't exist when the number of records per page changes
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
					{adjustedPaginatedOptions.length > 1 && filteredEmployees.length > 0 && (
						<label className="flex items-center gap-2" htmlFor="paginate">
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

							<th className="relative border-[1px] border-gray-400 px-4 py-4">
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
									deleteItem={action}
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
						>
							Next page
						</button>
					)}
				</div>
			</section>
		</>
	);
}
