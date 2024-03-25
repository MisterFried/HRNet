// ** Import core packages
import { useRef, useState } from "react";

// ** Import components
import Table from "../components/paginatedTable/PaginatedTable";
import Modal from "../components/Modal";

// ** Import Types
import { EmployeesInterface } from "../types/employeesType";

export default function Home() {
	const storedEmployeeList: Array<EmployeesInterface> = JSON.parse(
		localStorage.getItem("employee") || "[]"
	);
	const [employeeList, setEmployeeList] = useState<Array<EmployeesInterface>>(storedEmployeeList);

	const modalRef = useRef<HTMLDialogElement | null>(null);

	function handleDeleteEmployee(id: string) {
		const newEmployeeList = employeeList.filter(employee => employee.id !== id);

		localStorage.setItem("employee", JSON.stringify(newEmployeeList));
		setEmployeeList(newEmployeeList);

		modalRef.current?.showModal();
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
	] as Array<{ title: string; sortText: keyof EmployeesInterface }>;

	return (
		<main className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 p-4">
			<h2 className="mb-8 text-center text-xl font-bold">Current Employees</h2>
			<p>List of all the currently registered employees</p>
			<Table
				data={employeeList}
				action={handleDeleteEmployee}
				headers={headers}
				paginateOptions={[5, 10, 20, 50]}
			/>
			<Modal ref={modalRef}>
				<p>Employee deleted successfully</p>
			</Modal>
		</main>
	);
}
