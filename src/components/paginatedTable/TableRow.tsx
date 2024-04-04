// ** Import types
import { TableRowInterface } from "../../types/paginatedTableTypes";

/**
 * Renders a table row for the given employee with the specified columns and a delete functionality.
 *
 * @param employee - The employee object to display
 * @param headers - An array of objects containing the column sort text (and title despite not 
 * being used here). This array defines which column is displayed as well as their order. The sortText 
 * property is the associated property in the employee object (firstName, lastName, department, etc) 
 * that will be used for sorting / filtering.
 * @param deleteEmployee - The function to call when deleting an employee.
 * @return The table row element.
 */
export default function TableRow({
	employee,
	headers,
	deleteEmployee,
}: TableRowInterface) {
	return (
		<tr
			key={employee.id}
			className="transition-all odd:bg-main-100 even:bg-main-50 hover:bg-orange-200"
		>
			{headers.map(header => {
				return (
					<td
						key={`td_${header.sortText}`}
						className="whitespace-nowrap border-[1px] border-gray-400 p-2 px-4"
						data-testid={`table-data-${header.sortText}`}
					>
						{employee[header.sortText]}
					</td>
				);
			})}
			<td className="border-[1px] border-gray-400 p-2 px-4">
				<button
					onClick={() => deleteEmployee(employee.id)}
					className="rounded-md bg-red-600 p-2 font-semibold text-white transition-all hover:bg-red-800 focus:bg-red-800"
				>
					Delete
				</button>
			</td>
		</tr>
	);
}
