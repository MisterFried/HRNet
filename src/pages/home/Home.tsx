// ** Import core packages
import { useCallback, useEffect, useState } from "react";

// ** Import icons
import { ChevronDown, ChevronUp } from "lucide-react";

// ** Import assets

// ** Import pages

// ** Import third party
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

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

// ** Types

export default function Home() {
	const { employees: employeesStore } = useSelector((state: RootStateType) => state.employees);
	const [employees, setEmployees] = useState<Array<EmployeesInterface>>(employeesStore);
	const [perPage, setPerPage] = useState(5);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const dispatch = useDispatch();
	const { register, setValue } = useForm();

	function searchRecords(value: string) {
		const employeesCopy = JSON.parse(
			JSON.stringify(employeesStore)
		) as Array<EmployeesInterface>;

		if (value === "") {
			setEmployees(employeesCopy);
			return;
		}

		const employeesFiltered = employeesCopy.filter(employee => {
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

		setEmployees(employeesFiltered);
	}

	const paginate = useCallback(
		(perPage: number, page: number) => {
			if (perPage === 0) return;

			const employeesCopy = JSON.parse(
				JSON.stringify(employeesStore)
			) as Array<EmployeesInterface>;

			const employeesPaginated = employeesCopy.slice(
				page * perPage + 1,
				(page + 1) * perPage + 1
			);

			if (employeesPaginated.length === 0) page >= 1 ? setPage(page - 1) : setPage(0);
			else setPage(page);
			setPerPage(perPage);
			setValue("paginate", perPage.toString());

			setEmployees(employeesPaginated);
		},
		[employeesStore, setValue]
	);

	useEffect(() => {
		paginate(perPage, page);
	}, [paginate, perPage, page]);

	useEffect(() => {
		setTotalPages(Math.ceil((employeesStore.length - 1) / perPage));
	}, [employeesStore, perPage]);

	function handleDeleteEmployee(id: string) {
		dispatch(removeEmployee(id));
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
		const employeesCopy = JSON.parse(JSON.stringify(employees)) as Array<EmployeesInterface>;
		if (order === "asc") {
			employeesCopy.sort((a, b) => {
				if (a[field] < b[field]) return -1;
				if (a[field] > b[field]) return 1;
				return 0;
			});
			setEmployees(employeesCopy);
			return;
		}

		if (order === "desc") {
			employeesCopy.sort((a, b) => {
				if (a[field] > b[field]) return -1;
				if (a[field] < b[field]) return 1;
				return 0;
			});
			setEmployees(employeesCopy);
			return;
		}
	}

	return (
		<main className="mx-auto flex w-fit flex-col gap-4 p-4">
			<h2 className="mb-8 text-center text-xl font-bold">Current Employees</h2>
			<p>List of all the currently registered employees</p>
			<div className="flex justify-between gap-4">
				<p className="flex items-center gap-2">
					Show{" "}
					<select
						{...register("paginate")}
						name="paginate"
						id="paginate"
						onChange={e => paginate(Number(e.target.value), 0)}
						className="p-2"
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>{" "}
					records
				</p>
				<input
					type="text"
					placeholder="Search"
					onChange={e => searchRecords(e.target.value)}
					className="rounded-md border-[1px] border-gray-300 p-2"
				/>
			</div>
			<table>
				<thead>
					<tr className="bg-main-200 font-special">
						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							First Name
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "firstName")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "firstName")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>
						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							Last Name
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "lastName")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "lastName")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>
						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							Start date
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "startDate")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "startDate")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>
						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							Department
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "department")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "department")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>
						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							Date of Birth
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "dateOfBirth")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "dateOfBirth")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>
						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							Street
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "street")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "street")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>
						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							City
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "city")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "city")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>

						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							State
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "state")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "state")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>
						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							Zip Code
							<ChevronUp
								onClick={() => reorderAlphabetically("asc", "zip")}
								className="absolute bottom-2/4 right-1 cursor-pointer"
							/>
							<ChevronDown
								onClick={() => reorderAlphabetically("desc", "zip")}
								className="absolute right-1 top-2/4 cursor-pointer"
							/>
						</th>

						<th className="relative border-[1px] border-gray-400 px-8 py-4 pr-10">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{employees.length === 0 && (
						<tr className="even:bg-main-100">
							<td
								colSpan={10}
								className="border-[1px] border-gray-400 p-2 px-8 text-center"
							>
								No records to display !
							</td>
						</tr>
					)}
					{employees.map(employee => (
						<tr key={employee.id} className="even:bg-main-100">
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{employee.firstName}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{employee.lastName}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{employee.startDate}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{getDepartmentName(employee.department)}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{employee.dateOfBirth}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{employee.street}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{employee.city}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{`${employee.state} (${getStateName(employee.state)})`}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								{employee.zip}
							</td>
							<td className="border-[1px] border-gray-400 p-2 px-8">
								<button
									onClick={() => handleDeleteEmployee(employee.id)}
									className="rounded-md bg-red-500 p-2 text-white transition-all hover:bg-red-700 focus:bg-red-700"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex justify-between gap-4">
				<span className="text-lg">
					Showing {page * perPage + 1} to{" "}
					{(page + 1) * perPage + 1 >= employeesStore.length
						? employeesStore.length
						: (page + 1) * perPage + 1}{" "}
					of {employeesStore.length} records
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
					{page < totalPages - 1 && (
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
