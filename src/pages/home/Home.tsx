// ** Import core packages
import { useCallback, useEffect, useState } from "react";

// ** Import icons
import { ChevronDown, ChevronUp } from "lucide-react";

// ** Import assets

// ** Import pages

// ** Import third party
import { toast } from "react-toastify";
import { get, useForm } from "react-hook-form";

// ** Import shared components

// ** Import components

// ** Import sub pages / sections

// ** Import config

// ** Import state manager
import { useDispatch, useSelector } from "react-redux";
import { removeEmployee } from "../../state/employeesSlice";
import { RootStateType } from "../../state/store";

// ** Import utils / lib
import states from "../../utils/states";
import departments from "../../utils/departments";

// ** Import hooks

// ** Import APIs

// ** Import styles

// ** Import Types
import { EmployeesInterface } from "../../types/employeesType";
import OrderTh from "../../shared-components/table/OrderTH";

// ** Types

export default function Home() {
	const { employees: employeesStore } = useSelector((state: RootStateType) => state.employees);

	const [totalEmployees, setTotalEmployees] = useState(employeesStore);
	const [displayedEmployees, setDisplayedEmployees] = useState<Array<EmployeesInterface>>([]);
	const [filter, setFilter] = useState(false);

	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(0);
	const [perPage, setPerPage] = useState(5);

	const dispatch = useDispatch();
	const { register, setValue } = useForm();

	function filterEmployees(value: string) {
		const employeesCopy = JSON.parse(
			JSON.stringify(employeesStore)
		) as Array<EmployeesInterface>;

		if (value === "") {
			setFilter(false);
			setTotalEmployees(employeesCopy);
			return;
		}

		const filteredResults = employeesCopy.filter(employee => {
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

		setFilter(true);
		setTotalEmployees(filteredResults);
	}

	const paginate = useCallback(
		(perPage: number, page: number) => {
			if (perPage === 0) return;

			const employeesCopy = JSON.parse(
				JSON.stringify(totalEmployees)
			) as Array<EmployeesInterface>;

			const employeesPaginated = employeesCopy.slice(page * perPage, (page + 1) * perPage);

			if (employeesPaginated.length === 0) page >= 1 ? setPage(page - 1) : setPage(0);
			else setPage(page);
			setPerPage(perPage);

			setDisplayedEmployees(employeesPaginated);
		},
		[totalEmployees]
	);

	useEffect(() => {
		setTotalEmployees(employeesStore);
	}, [employeesStore]);

	useEffect(() => {
		paginate(perPage, page);
		setTotalPages(Math.ceil(totalEmployees.length / perPage));
	}, [paginate, perPage, page, totalEmployees]);

	function handleDeleteEmployee(id: string) {
		dispatch(removeEmployee(id));
		setValue("search", "");
		setFilter(false);
		toast.success("Employee deleted successfully", { autoClose: 2000 });
	}

	function getStateName(value: string) {
		const state = states.find(state => state.value === value);
		return state?.name;
	}

	function getDepartmentName(value: string) {
		const department = departments.find(department => department.value === value);
		return department?.name;
	}

	function reorderAlphabetically(
		order: "asc" | "desc",
		field:
			| "firstName"
			| "lastName"
			| "department"
			| "street"
			| "city"
			| "zip"
			| "state"
			| "startDate"
			| "dateOfBirth"
	) {
		const employeesCopy = JSON.parse(
			JSON.stringify(totalEmployees)
		) as Array<EmployeesInterface>;
		if (order === "asc") {
			employeesCopy.sort((a, b) => {
				if (a[field] < b[field]) return -1;
				if (a[field] > b[field]) return 1;
				return 0;
			});
			setTotalEmployees(employeesCopy);
			return;
		}

		if (order === "desc") {
			employeesCopy.sort((a, b) => {
				if (a[field] > b[field]) return -1;
				if (a[field] < b[field]) return 1;
				return 0;
			});
			setTotalEmployees(employeesCopy);
			return;
		}
	}

	const headers = [
		{ title: "First Name", sortText: "firstName" },
		{ title: "Last Name", sortText: "lastName" },
		{ title: "Start Name", sortText: "startDate" },
		{ title: "Department", sortText: "department" },
		{ title: "Date of Birth", sortText: "dateOfBirth" },
		{ title: "Street", sortText: "street" },
		{ title: "City", sortText: "city" },
		{ title: "State", sortText: "state" },
		{ title: "Zip", sortText: "zip" },
	];

	const getTdValue = (employee, sortText) => {
		console.log(employee, sortText);
		if (sortText === "department") {
			return getDepartmentName(employee[sortText]);
		} else if (sortText === "state") {
			return getStateName(employee[sortText]);
		} else {
			return employee[sortText];
		}
	};

	return (
		<main className="mx-auto flex w-fit flex-col gap-4 p-4">
			<h2 className="mb-8 text-center text-xl font-bold">Current Employees</h2>
			<p>List of all the currently registered employees</p>
			<div className="flex justify-between gap-4">
				<label className="flex items-center gap-2" htmlFor="paginate">
					Show{" "}
					<select
						{...register("paginate")}
						name="paginate"
						id="paginate"
						onChange={e => paginate(Number(e.target.value), 0)}
						className="rounded-md p-2"
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>{" "}
					records
				</label>
				<input
					{...register("search")}
					type="text"
					placeholder="Search"
					onChange={e => filterEmployees(e.target.value)}
					className="rounded-md border-[1px] border-gray-300 p-2"
				/>
			</div>
			<table>
				<thead>
					<tr className="bg-main-200 font-special">
						{headers.map(header => {
							return (
								<OrderTh
									key={`th_${header.sortText}`}
									title={header.title}
									reorderAlphabetically={direction =>
										reorderAlphabetically(direction, header.sortText)
									}
								/>
							);
						})}

						<th className="relative border-[1px] border-gray-400 px-4 py-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{displayedEmployees.length === 0 ? (
						<tr className="even:bg-main-100">
							<td
								colSpan={10}
								className="border-[1px] border-gray-400 p-2 px-4 text-center"
							>
								No records to display !
							</td>
						</tr>
					) : (
						displayedEmployees.map(employee => (
							<tr
								key={employee.id}
								className="transition-all odd:bg-main-100 even:bg-main-50 hover:bg-orange-200"
							>
								{headers.map(header => {
									return (
										<td
											key={`td_${header.sortText}`}
											className="border-[1px] border-gray-400 p-2 px-4"
										>
											{getTdValue(employee, header.sortText)}
										</td>
									);
								})}
								<td className="border-[1px] border-gray-400 p-2 px-4">
									<button
										onClick={() => handleDeleteEmployee(employee.id)}
										className="rounded-md bg-red-500 p-2 text-white transition-all hover:bg-red-700 focus:bg-red-700"
									>
										Delete
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			<div className="flex justify-between gap-4">
				<span className="text-lg">
					Showing {page * perPage + 1} to{" "}
					{(page + 1) * perPage >= totalEmployees.length
						? totalEmployees.length
						: (page + 1) * perPage}{" "}
					of {totalEmployees.length} records {filter && "(filtered)"}
				</span>
				<menu className="flex gap-4">
					{page >= 1 && (
						<button
							onClick={() => paginate(perPage, page - 1)}
							className="rounded-sm border-[1px] bg-gray-300 px-4 py-2 transition-all hover:bg-gray-400 focus:bg-gray-400"
						>
							Previous page
						</button>
					)}
					{page + 1 < totalPages && (
						<button
							onClick={() => paginate(perPage, page + 1)}
							className="rounded-sm border-[1px] bg-gray-300 px-4 py-2 transition-all hover:bg-gray-400 focus:bg-gray-400"
						>
							Next page
						</button>
					)}
				</menu>
			</div>
		</main>
	);
}
