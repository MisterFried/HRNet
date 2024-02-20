// ** Import core packages
import { useRef, useState } from "react";

// ** Import icons

// ** Import assets

// ** Import pages

// ** Import third party

// ** Import shared components

// ** Import components

// ** Import sub pages / sections

// ** Import config

// ** Import state manager

// ** Import utils / lib

// ** Import hooks

// ** Import APIs

// ** Import styles

// ** Import Types
import { EmployeesInterface } from "../../types/employeesType";
import Modal from "../../shared-components/Modal";
import Table from "../../shared-components/table/Table";

// ** Types

// sauvegarder state en entier

export default function Home() {
	const storedEmployeeList: Array<EmployeesInterface> = JSON.parse(
		localStorage.getItem("employee") || "[]"
	);
	const [employeeList, setEmployeeList] = useState<Array<EmployeesInterface>>(storedEmployeeList);

	const modalRef = useRef<HTMLDialogElement | null>(null);

	function handleDeleteEmployee(id: string) {
		const newEmployeeList = employeeList.filter(employee => employee.id !== id);

		localStorage.setItem("employee", JSON.stringify(newEmployeeList));
		modalRef.current?.showModal();

		setEmployeeList(newEmployeeList);
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
		<main className="mx-auto flex w-fit flex-col gap-4 p-4">
			<h2 className="mb-8 text-center text-xl font-bold">Current Employees</h2>
			<p>List of all the currently registered employees</p>

			<Table list={employeeList} deleteItem={handleDeleteEmployee} headers={headers} />

			<Modal ref={modalRef}>
				<p>Employee deleted successfully</p>
			</Modal>
		</main>
	);
}
