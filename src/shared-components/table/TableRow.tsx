// ** Import types
import { EmployeesInterface } from "../../types/employeesType";

// ** Types
interface TableRowInterface {
	employee: EmployeesInterface;
	headers: Array<{
		title: string;
		sortText: keyof EmployeesInterface;
	}>;
	deleteItem: (id: string) => void;
}

export default function TableRow({ employee, headers, deleteItem }: TableRowInterface) {
	return (
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
						{employee[header.sortText]}
					</td>
				);
			})}
			<td className="border-[1px] border-gray-400 p-2 px-4">
				<button
					onClick={() => deleteItem(employee.id)}
					className="rounded-md bg-red-500 p-2 text-white transition-all hover:bg-red-700 focus:bg-red-700"
				>
					Delete
				</button>
			</td>
		</tr>
	);
}
