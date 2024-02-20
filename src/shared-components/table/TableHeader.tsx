// ** Import core packages

// ** Import icons
import { ChevronDown, ChevronUp } from "lucide-react";

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

// ** Types
interface OrderThProps {
	title: string;
	sortText: keyof EmployeesInterface;
	reorderAlphabetically: (order: "asc" | "desc", field: keyof EmployeesInterface) => void;
	isActive: string;
}

export default function OrderTh({
	title,
	sortText,
	reorderAlphabetically,
	isActive,
}: OrderThProps) {
	return (
		<th className="relative w-fit border-[1px] border-gray-400 px-4 py-4 pr-8 transition-all">
			{title}
			<ChevronUp
				onClick={() => reorderAlphabetically("asc", sortText)}
				className={`${isActive === `${sortText}_asc` ? "opacity-100" : "opacity-40"} absolute bottom-2/4 right-1 cursor-pointer transition-all`}
			/>
			<ChevronDown
				onClick={() => reorderAlphabetically("desc", sortText)}
				className={`${isActive === `${sortText}_desc` ? "opacity-100" : "opacity-40"} absolute right-1 top-2/4 cursor-pointer transition-all`}
			/>
		</th>
	);
}
