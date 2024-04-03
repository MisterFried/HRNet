// ** Import core packages
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Import components
import Table from "../components/paginatedTable/PaginatedTable";
import Modal from "../components/Modal";

// ** Import store
import { deleteEmployee } from "../state/employeeStore";

// ** Import Types
import { EmployeesInterface } from "../types/employeesType";
import { RootState } from "../state/store";

export default function Home() {
	const employeeStore = useSelector((state: RootState) => state.employee);
	const dispatch = useDispatch();

	const [employeeList, setEmployeeList] =
		useState<Array<EmployeesInterface>>(employeeStore);

	const modalRef = useRef<HTMLDialogElement | null>(null);

	function handleDeleteEmployee(id: string) {
		dispatch(deleteEmployee(id));

		modalRef.current?.showModal();
	}

	useEffect(() => {
		setEmployeeList(employeeStore);
	}, [employeeStore]);

	const headers = [
		{ title: "First Name", sortText: "firstName" },
		{ title: "Last Name", sortText: "lastName" },
		{ title: "Start Date", sortText: "startDate" },
		{ title: "Department", sortText: "department" },
		{ title: "Date of Birth", sortText: "dateOfBirth" },
		{ title: "Street", sortText: "street" },
		{ title: "City", sortText: "city" },
		{ title: "State", sortText: "state" },
		{ title: "Zip", sortText: "zip" },
	] as Array<{ title: string; sortText: keyof EmployeesInterface }>;

	return (
		<main className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 p-4">
			<h2 className="mb-8 text-center text-xl font-bold">
				Current Employees
			</h2>
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
