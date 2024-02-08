// ** Import core packages
import { useEffect, useState } from "react";

// ** Import icons

// ** Import assets

// ** Import pages

// ** Import third party
import { toast } from "react-toastify";

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
import { ChevronDown, ChevronUp } from "lucide-react";

// ** Types

export default function Home() {
	const [employees, setEmployees] = useState<Array<EmployeesInterface>>([]);
	const { employees: employeesStore } = useSelector((state: RootStateType) => state.employees);
	const dispatch = useDispatch();

	useEffect(() => {
		setEmployees(employeesStore);
	}, [employeesStore]);

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

	function paginate(value: string) {
		const number = Number(value);
		if (number === 0 || isNaN(number)) return;

		const employeesCopy = JSON.parse(
			JSON.stringify(employeesStore)
		) as Array<EmployeesInterface>;

		const employeesPaginated = employeesCopy.slice(0, number);
		setEmployees(employeesPaginated);
	}

	return (
		<main className="mx-auto flex w-fit flex-col gap-4 p-4">
			<h2 className="mb-8 text-center text-xl font-bold">Current Employees</h2>
			<p>List of all the currently registered employees</p>
			{employees.length === 0 ? (
				<p>No employees found</p>
			) : (
				<>
					<p className="flex items-center gap-2">
						Show{" "}
						<select
							name="paginate"
							id="paginate"
							onChange={e => paginate(e.target.value)}
							className="p-2"
						>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
						</select>{" "}
						records
					</p>
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
							{employees.map(employee => (
								<tr key={employee.id} className="even:bg-main-100">
									<td className="border-[1px] border-gray-400 p-2 px-8">
										{employee.firstName}
									</td>
									<td className="border-[1px] border-gray-400 p-2 px-8">
										{employee.lastName}
									</td>
									<td className="border-[1px] border-gray-400 p-2 px-8">
										{employee.startDate.slice(0, 10)}
									</td>
									<td className="border-[1px] border-gray-400 p-2 px-8">
										{getDepartmentName(employee.department)}
									</td>
									<td className="border-[1px] border-gray-400 p-2 px-8">
										{employee.dateOfBirth.slice(0, 10)}
									</td>
									<td className="border-[1px] border-gray-400 p-2 px-8">
										{employee.street}
									</td>
									<td className="border-[1px] border-gray-400 p-2 px-8">
										{employee.city}
									</td>
									<td className="border-[1px] border-gray-400 p-2 px-8">
										{`${getStateName(employee.state)} (${employee.state})`}
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
				</>
			)}
		</main>
	);
}
