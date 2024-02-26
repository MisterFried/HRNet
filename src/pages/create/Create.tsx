// ** Import core packages

// ** Import icons

// ** Import assets

// ** Import pages

// ** Import third party

// ** Import shared components

// ** Import components

// ** Import sub pages / sections
import Form from "../../shared-components/form/Form";

// ** Import config

// ** Import state manager

// ** Import utils / lib

// ** Import hooks

// ** Import APIs

// ** Import styles

// ** Import Types

// ** Types

export default function Create() {
	function logEmployeeList() {
		const data = JSON.parse(localStorage.getItem("employee") || "[]");
		console.log(data);
	}

	function resetEmployeeList() {
		localStorage.setItem("employee", JSON.stringify([]));
	}

	return (
		<main className="mx-auto flex w-fit flex-col gap-4 p-4">
			<h2 className="mb-8 text-center text-xl font-bold">Create employee</h2>
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
		</main>
	);
}
