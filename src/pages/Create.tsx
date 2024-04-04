// ** Import sub pages / sections
import Form from "../components/Form";

// ** Import utils / lib
import dummyEmployees from "../data/employees";

/**
 * Returns the "Create Employee" page
 * @returns Create page
 */
export default function Create() {

	/**
	 * Fetch the employee list from localStorage and log it
	 */
	function logEmployeeList() {
		const data = JSON.parse(localStorage.getItem("employee") || "[]");
		console.log(data);
	}

	/**
	 * Reset the employee list to an empty array
	 */
	function resetEmployeeList() {
		localStorage.setItem("employee", JSON.stringify([]));
	}

	/**
	 * Set the employee list to a dummy array
	 */
	function setDummyEmployeeList() {
		localStorage.setItem("employee", JSON.stringify(dummyEmployees));
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
