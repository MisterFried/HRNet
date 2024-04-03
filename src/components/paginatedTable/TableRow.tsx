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

export default function TableRow({
	employee,
	headers,
	deleteItem,
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
					onClick={() => deleteItem(employee.id)}
					className="rounded-md bg-red-600 p-2 font-semibold text-white transition-all hover:bg-red-800 focus:bg-red-800"
				>
					Delete
				</button>
			</td>
		</tr>
	);
}
