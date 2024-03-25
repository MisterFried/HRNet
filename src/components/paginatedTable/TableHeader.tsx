// ** Import icons
import { ChevronDown, ChevronUp } from "lucide-react";

// ** Import Types
import { EmployeesInterface } from "../../types/employeesType";

// ** Types
interface OrderThProps {
	title: string;
	sortText: keyof EmployeesInterface;
	reorderAlphabetically: (order: "asc" | "desc", field: keyof EmployeesInterface) => void;
	activeSort: string;
}

export default function OrderTh({
	title,
	sortText,
	reorderAlphabetically,
	activeSort,
}: OrderThProps) {
	return (
		<th className="relative whitespace-nowrap border-[1px] border-gray-400 px-4 py-4 pr-8 transition-all">
			{title}
			<ChevronUp
				onClick={() => reorderAlphabetically("asc", sortText)}
				className={`${activeSort === `${sortText}_asc` ? "opacity-100" : "opacity-40"} absolute bottom-2/4 right-1 cursor-pointer transition-all`}
			/>
			<ChevronDown
				onClick={() => reorderAlphabetically("desc", sortText)}
				className={`${activeSort === `${sortText}_desc` ? "opacity-100" : "opacity-40"} absolute right-1 top-2/4 cursor-pointer transition-all`}
			/>
		</th>
	);
}
