// ** Import core packages
import { useDispatch, useSelector } from "react-redux";

// ** Import sub pages / sections
import Form from "../components/Form";

// ** Import utils / lib
import dummyEmployees from "../data/employees";

// ** Import store
import { resetEmployees, setEmployees } from "../state/employeeStore";

// ** Import types
import { RootState } from "../state/store";

export default function Create() {
	const employeeStore = useSelector((state: RootState) => state.employee);
	const dispatch = useDispatch();

	function logEmployeeList() {
		console.log(employeeStore);
	}

	function resetEmployeeList() {
		dispatch(resetEmployees());
	}

	function setDummyEmployeeList() {
		dispatch(setEmployees(dummyEmployees));
	}

	return (
		<main className="mx-auto flex w-fit flex-col gap-4 p-2 sm:p-4">
			<h2 className="mb-8 text-center text-xl font-bold">
				Create employee
			</h2>
			<p>Create a record for a new employee</p>
			<Form />
			<button
				className="rounded-md border-[1px] border-gray-400 p-2 transition-all hover:bg-gray-300 "
				onClick={logEmployeeList}
			>
				Log employee list
			</button>
			<button
				className="rounded-md border-[1px] border-gray-400 p-2 transition-all hover:bg-gray-300"
				onClick={resetEmployeeList}
			>
				Reset employee list
			</button>
			<button
				className="rounded-md border-[1px] border-gray-400 p-2 transition-all hover:bg-gray-300 "
				onClick={setDummyEmployeeList}
			>
				Set dummy employee list
			</button>
		</main>
	);
}
